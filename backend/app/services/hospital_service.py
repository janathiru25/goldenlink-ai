import logging
from typing import List, Optional, Dict, Any
from app.database import get_db
from app.schemas.hospital import Hospital
from app.services.responder_service import haversine_distance

logger = logging.getLogger("goldenlink.hospital_service")

class HospitalService:
    def __init__(self):
        self.db_manager = get_db()

    @property
    def collection(self):
        return self.db_manager.get_collection("hospitals")

    async def get_all_hospitals(self) -> List[Hospital]:
        cursor = self.collection.find({})
        docs = await cursor.to_list(length=100)
        return [Hospital(**doc) for doc in docs]

    async def get_hospital_by_id(self, hospital_id: str) -> Optional[Hospital]:
        doc = await self.collection.find_one({"hospitalId": hospital_id})
        if doc:
            return Hospital(**doc)
        return None

    async def get_recommended_hospital(
        self,
        incident_lat: float,
        incident_lng: float,
        severity: str = "moderate",
        requires_icu: bool = False
    ) -> Optional[Hospital]:
        hospitals = await self.get_all_hospitals()
        if not hospitals:
            return None

        scored: List[tuple] = []

        for h in hospitals:
            dist = haversine_distance(incident_lat, incident_lng, h.latitude, h.longitude)
            h.distanceKm = dist
            eta_mins = max(4, int(dist * 2.5 + 3))
            h.estimatedArrivalMinutes = eta_mins

            score = 100.0
            reasons = []

            # Distance factor (closer is better)
            score -= (dist * 7.0)

            # Emergency facility check
            if h.emergencyAvailable:
                score += 25.0
                reasons.append("24x7 Emergency Active")
            else:
                score -= 80.0

            # ICU availability
            if (h.icuAvailable or 0) > 0:
                score += min(20.0, (h.icuAvailable or 0) * 3.0)
                reasons.append(f"{h.icuAvailable} ICU Beds Available")
                if requires_icu or severity == "critical":
                    score += 25.0
            else:
                if requires_icu or severity == "critical":
                    score -= 40.0

            # General Bed Availability
            if (h.availableBeds or 0) > 5:
                score += 10.0
                reasons.append(f"{h.availableBeds} General Beds")

            # Trauma / Specialty matching
            specialties = [s.lower() for s in h.specialties]
            if "trauma care" in specialties or "emergency medicine" in specialties:
                score += 20.0
                reasons.append("Trauma Center Certified")

            if h.ambulanceAvailable:
                score += 10.0
                reasons.append("Ambulance Unit On-Site")

            h.score = round(score, 1)
            h.matchReason = "; ".join(reasons)
            scored.append((score, h))

        scored.sort(key=lambda x: x[0], reverse=True)
        return scored[0][1] if scored else None

hospital_service_instance = HospitalService()

def get_hospital_service() -> HospitalService:
    return hospital_service_instance
