import time
import random
import logging
from datetime import datetime, timezone
from typing import List, Optional, Dict, Any
from app.database import get_db
from app.schemas.incident import (
    Incident,
    IncidentCreate,
    IncidentUpdate,
    IncidentStatusUpdate,
    IncidentLocation,
    IncidentAI,
    standardize_status
)
from app.schemas.ai import AIAssessRequest
from app.services.ai_service import get_ai_service
from app.services.responder_service import get_responder_service
from app.services.hospital_service import get_hospital_service
from app.services.notification_service import get_notification_service

logger = logging.getLogger("goldenlink.incident_service")

class IncidentService:
    def __init__(self):
        self.db_manager = get_db()
        self.ai_service = get_ai_service()
        self.responder_service = get_responder_service()
        self.hospital_service = get_hospital_service()
        self.notification_service = get_notification_service()

    @property
    def collection(self):
        return self.db_manager.get_collection("incidents")

    def generate_incident_id(self) -> str:
        ts = str(int(time.time()))[-6:]
        rnd = random.randint(10, 99)
        return f"GL{ts}{rnd}"

    async def create_incident(self, data: IncidentCreate) -> Incident:
        incident_id = self.generate_incident_id()
        now = datetime.now(timezone.utc).isoformat()

        # 1. Location handling with safe GPS fallback
        loc = data.location
        if loc is None or (loc.latitude == 0 and loc.longitude == 0):
            loc = IncidentLocation(
                latitude=11.0168,
                longitude=76.9558,
                address=loc.address if (loc and loc.address) else "Coimbatore, Tamil Nadu (Demo GPS)",
                isFallbackLocation=True
            )

        # 2. Run backend AI assessment
        ai_req = AIAssessRequest(
            accidentType=data.accidentType or "Road Accident",
            victims=data.victims or 1,
            unconscious=bool(data.unconscious),
            bleeding=bool(data.bleeding),
            breathingDifficulty=bool(data.breathingDifficulty),
            trapped=bool(data.trapped),
            description=data.description or "",
            latitude=loc.latitude,
            longitude=loc.longitude,
            address=loc.address
        )
        ai_res = await self.ai_service.assess(ai_req)

        ai_assessment = IncidentAI(
            severity=ai_res.severity,
            confidence=ai_res.confidence,
            summary=ai_res.summary,
            recommendedAction=ai_res.recommendedAction,
            emergencyLevel=ai_res.emergencyLevel,
            detectedConditions=ai_res.detectedConditions,
            requiredResources=ai_res.requiredResources
        )

        effective_severity = data.severity or ai_res.severity
        ambulance_status = "requested" if effective_severity == "critical" else (data.ambulanceStatus or "not_requested")

        # 3. Find recommended responders
        rec_responders = await self.responder_service.get_recommended_responders(
            incident_id=incident_id,
            incident_lat=loc.latitude,
            incident_lng=loc.longitude,
            severity=effective_severity,
            required_skills=ai_res.requiredResources
        )

        # 4. Generate recommended hospital
        rec_hospital = await self.hospital_service.get_recommended_hospital(
            incident_lat=loc.latitude,
            incident_lng=loc.longitude,
            severity=effective_severity,
            requires_icu=(effective_severity == "critical" or data.unconscious)
        )

        # 5. Trigger simulated emergency notifications
        notifications = await self.notification_service.dispatch_simulated_emergency(
            incident_id=incident_id,
            severity=effective_severity,
            accident_type=data.accidentType or "Road Accident",
            location=loc.model_dump(),
            victims=data.victims or 1,
            ai_summary=ai_res.summary
        )

        # 6. Assemble complete incident
        incident_doc = Incident(
            incidentId=incident_id,
            reportedAt=now,
            status="reported",
            accidentType=data.accidentType or "Road Accident",
            severity=effective_severity,
            victims=data.victims or 1,
            unconscious=bool(data.unconscious),
            bleeding=bool(data.bleeding),
            breathingDifficulty=bool(data.breathingDifficulty),
            trapped=bool(data.trapped),
            description=data.description or "",
            location=loc,
            aiAssessment=ai_assessment,
            responder=data.responder,
            ambulanceStatus=ambulance_status,
            hospital=rec_hospital,
            emergencyContact=data.emergencyContact,
            lastUpdated=now,
            notifications=notifications,
            recommendedResponders=rec_responders[:4]
        )

        # 7. Persist to MongoDB
        await self.collection.insert_one(incident_doc.model_dump())
        logger.info(f"Incident {incident_id} created with severity {effective_severity} and saved to database.")

        return incident_doc

    async def get_all_incidents(self) -> List[Incident]:
        cursor = self.collection.find({}).sort("reportedAt", -1)
        docs = await cursor.to_list(length=100)
        return [Incident(**doc) for doc in docs]

    async def get_incident_by_id(self, incident_id: str) -> Optional[Incident]:
        doc = await self.collection.find_one({"incidentId": incident_id})
        if doc:
            return Incident(**doc)
        return None

    async def get_active_incident(self) -> Optional[Incident]:
        # Return most recently updated non-resolved, non-cancelled incident
        active_statuses = [
            "reported", "under-review", "confirmed",
            "responder_search", "responder_assigned",
            "responder_en_route", "on_scene", "transporting",
            "handed_over", "hospital_arrived"
        ]
        cursor = self.collection.find({"status": {"$in": active_statuses}}).sort("reportedAt", -1).limit(1)
        docs = await cursor.to_list(length=1)
        if docs:
            return Incident(**docs[0])

        # Fallback to most recent incident if any
        cursor = self.collection.find({}).sort("reportedAt", -1).limit(1)
        docs = await cursor.to_list(length=1)
        return Incident(**docs[0]) if docs else None

    async def update_incident(self, incident_id: str, updates: IncidentUpdate) -> Optional[Incident]:
        existing = await self.get_incident_by_id(incident_id)
        if not existing:
            return None

        update_dict = updates.model_dump(exclude_unset=True)
        if "status" in update_dict:
            update_dict["status"] = standardize_status(update_dict["status"])
        update_dict["lastUpdated"] = datetime.now(timezone.utc).isoformat()

        await self.collection.update_one(
            {"incidentId": incident_id},
            {"$set": update_dict}
        )
        return await self.get_incident_by_id(incident_id)

    async def update_incident_status(self, incident_id: str, status_data: IncidentStatusUpdate) -> Optional[Incident]:
        existing = await self.get_incident_by_id(incident_id)
        if not existing:
            return None

        new_status = standardize_status(status_data.status)
        now = datetime.now(timezone.utc).isoformat()

        upd: Dict[str, Any] = {
            "status": new_status,
            "lastUpdated": now
        }

        # Lifecycle side-effects
        if new_status == "hospital_arrived" or new_status == "transporting":
            if not existing.hospital:
                rec_hosp = await self.hospital_service.get_recommended_hospital(
                    incident_lat=existing.location.latitude,
                    incident_lng=existing.location.longitude,
                    severity=existing.severity
                )
                if rec_hosp:
                    upd["hospital"] = rec_hosp.model_dump()

        if new_status in ["resolved", "completed", "cancelled"]:
            # Free up responder if assigned
            if existing.responder:
                r_id = getattr(existing.responder, "id", None) or getattr(existing.responder, "responderId", None)
                if r_id:
                    from app.schemas.responder import ResponderStatusUpdate
                    await self.responder_service.update_status(
                        responder_id=r_id,
                        status_update=ResponderStatusUpdate(status="available")
                    )

        await self.collection.update_one(
            {"incidentId": incident_id},
            {"$set": upd}
        )
        logger.info(f"Incident {incident_id} status updated to {new_status}")
        return await self.get_incident_by_id(incident_id)

incident_service_instance = IncidentService()

def get_incident_service() -> IncidentService:
    return incident_service_instance
