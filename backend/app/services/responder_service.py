import math
import logging
from typing import List, Optional, Dict, Any
from app.database import get_db
from app.schemas.responder import Responder, ResponderCreate, ResponderStatusUpdate

logger = logging.getLogger("goldenlink.responder_service")

def haversine_distance(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """Calculate the great circle distance between two points on the earth in kilometers."""
    R = 6371.0  # Earth's radius in km
    dLat = math.radians(lat2 - lat1)
    dLon = math.radians(lon2 - lon1)
    a = (math.sin(dLat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(dLon / 2) ** 2)
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return round(R * c, 2)

class ResponderService:
    def __init__(self):
        self.db_manager = get_db()

    @property
    def collection(self):
        return self.db_manager.get_collection("responders")

    async def get_all_responders(self) -> List[Responder]:
        cursor = self.collection.find({})
        docs = await cursor.to_list(length=100)
        return [Responder(**doc) for doc in docs]

    async def get_responder_by_id(self, responder_id: Any) -> Optional[Responder]:
        # Try both int and str matching
        doc = await self.collection.find_one({"responderId": str(responder_id)})
        if not doc:
            try:
                int_id = int(responder_id)
                doc = await self.collection.find_one({"id": int_id})
            except (ValueError, TypeError):
                pass
        if not doc:
            doc = await self.collection.find_one({"id": str(responder_id)})
        if doc:
            return Responder(**doc)
        return None

    async def get_nearby_responders(
        self,
        lat: float,
        lng: float,
        radius_km: float = 5.0
    ) -> List[Responder]:
        all_responders = await self.get_all_responders()
        nearby: List[Responder] = []

        for r in all_responders:
            r_lat = r.latitude if r.latitude is not None else 11.0168
            r_lng = r.longitude if r.longitude is not None else 76.9558

            dist = haversine_distance(lat, lng, r_lat, r_lng)
            # update calculated fields
            r.distanceKm = dist
            r.distance = f"{dist:.1f} km"
            eta_mins = max(2, int(dist * 3.5 + 2))
            r.estimatedArrivalMinutes = eta_mins
            r.eta = f"{eta_mins} min"

            if dist <= radius_km:
                nearby.append(r)

        nearby.sort(key=lambda x: (not x.available, x.distanceKm or 999))
        return nearby

    async def get_recommended_responders(
        self,
        incident_id: str,
        incident_lat: float,
        incident_lng: float,
        severity: str = "moderate",
        required_skills: Optional[List[str]] = None
    ) -> List[Responder]:
        """Rank and recommend the best suited responders for an incident."""
        responders = await self.get_nearby_responders(incident_lat, incident_lng, radius_km=10.0)
        scored: List[tuple] = []

        for r in responders:
            score = 100.0

            # Distance penalty
            dist = r.distanceKm or 1.0
            score -= (dist * 12.0)

            # Availability boost
            if not r.available or r.status != "available":
                score -= 60.0
            else:
                score += 20.0

            # Workload penalty
            score -= (r.workload or 0) * 15.0

            # Skill match boost
            skills = [s.lower() for s in r.skills]
            if severity in ["critical", "serious"]:
                if any("first aid" in s or "cpr" in s or "trauma" in s for s in skills):
                    score += 25.0
                if r.type in ["ambulance", "medical"]:
                    score += 30.0

            if required_skills:
                for req in required_skills:
                    if req.lower() in skills:
                        score += 15.0

            # Rating factor
            score += ((r.rating or 4.0) * 4.0)

            scored.append((score, r))

        # Sort descending by score
        scored.sort(key=lambda x: x[0], reverse=True)
        return [r for _, r in scored]

    async def assign_responder_to_incident(
        self,
        responder_id: Any,
        incident_id: str
    ) -> Optional[Responder]:
        responder = await self.get_responder_by_id(responder_id)
        if not responder:
            return None

        # Update responder status in DB
        update_data = {
            "status": "dispatched",
            "available": False,
            "assignedIncidentId": incident_id,
            "workload": (responder.workload or 0) + 1
        }
        await self.collection.update_one(
            {"_id": getattr(responder, "id", None) or responder.responderId},
            {"$set": update_data}
        )
        return await self.get_responder_by_id(responder_id)

    async def update_status(
        self,
        responder_id: Any,
        status_update: ResponderStatusUpdate
    ) -> Optional[Responder]:
        responder = await self.get_responder_by_id(responder_id)
        if not responder:
            return None

        upd = {"status": status_update.status}
        if status_update.status == "available":
            upd["available"] = True
            upd["assignedIncidentId"] = None
        elif status_update.status in ["busy", "dispatched", "offline"]:
            upd["available"] = False

        if status_update.latitude is not None:
            upd["latitude"] = status_update.latitude
        if status_update.longitude is not None:
            upd["longitude"] = status_update.longitude

        await self.collection.update_one(
            {"_id": getattr(responder, "id", None) or responder.responderId},
            {"$set": upd}
        )
        return await self.get_responder_by_id(responder_id)

responder_service_instance = ResponderService()

def get_responder_service() -> ResponderService:
    return responder_service_instance
