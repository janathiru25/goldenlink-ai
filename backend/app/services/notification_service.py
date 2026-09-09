import logging
from datetime import datetime, timezone
from typing import List, Dict, Any, Optional
import httpx
from app.database import get_db
from app.schemas.notification import NotificationRecord, NotificationDispatchPayload
from app.config import get_settings

logger = logging.getLogger("goldenlink.notification_service")

class NotificationService:
    def __init__(self):
        self.settings = get_settings()
        self.db_manager = get_db()

    @property
    def collection(self):
        return self.db_manager.get_collection("notifications")

    def _generate_simulated_records(
        self,
        incident_id: str,
        severity: str,
        accident_type: str,
        recipients: Optional[List[str]] = None
    ) -> List[NotificationRecord]:
        default_recipients = [
            "112 Emergency Control",
            "108 Ambulance",
            "100 Police",
            "Nearby Responders"
        ]
        target_recipients = recipients or default_recipients
        now = datetime.now(timezone.utc).isoformat()
        records = []

        for recipient in target_recipients:
            rec = NotificationRecord(
                incidentId=incident_id,
                recipient=recipient,
                notificationType="CRITICAL_DISPATCH_ALERT" if severity in ["critical", "serious"] else "INCIDENT_UPDATE",
                timestamp=now,
                status="DELIVERED",
                SIMULATED=True,
                message=f"[SIMULATED] GoldenLink Dispatch: {severity.upper()} {accident_type} reported at Incident #{incident_id}.",
                channels=["RADIO_SIMULATED", "DASHBOARD_ALERT", "MOBILE_PUSH"]
            )
            records.append(rec)
        return records

    async def dispatch_simulated_emergency(
        self,
        incident_id: str,
        severity: str,
        accident_type: str,
        location: Dict[str, Any],
        victims: int,
        ai_summary: Optional[str] = None
    ) -> List[NotificationRecord]:
        """Dispatch simulated emergency notifications via Node microservice or direct MongoDB audit."""
        payload = NotificationDispatchPayload(
            incidentId=incident_id,
            severity=severity,
            accidentType=accident_type,
            location=location,
            victims=victims,
            aiSummary=ai_summary,
            recipients=[
                "112 Emergency Control",
                "108 Ambulance",
                "100 Police",
                "Nearby Responders"
            ]
        )

        records: List[NotificationRecord] = []
        node_success = False

        # Attempt call to Node.js microservice if configured
        if self.settings.NOTIFICATION_SERVICE_URL:
            try:
                async with httpx.AsyncClient(timeout=2.0) as client:
                    resp = await client.post(
                        f"{self.settings.NOTIFICATION_SERVICE_URL}/notifications/dispatch",
                        json=payload.model_dump()
                    )
                    if resp.status_code in [200, 201]:
                        data = resp.json()
                        notifs_data = data.get("notifications", [])
                        records = [NotificationRecord(**n) for n in notifs_data]
                        node_success = True
                        logger.info(f"Dispatched {len(records)} simulated events via Node.js microservice.")
            except Exception as e:
                logger.warning(
                    f"Node.js notification microservice at {self.settings.NOTIFICATION_SERVICE_URL} unavailable: {e}. "
                    "Proceeding with direct MongoDB simulated audit trail."
                )

        if not node_success or not records:
            records = self._generate_simulated_records(incident_id, severity, accident_type)

        # Store in MongoDB notifications collection
        for r in records:
            try:
                await self.collection.insert_one(r.model_dump())
            except Exception as e:
                logger.error(f"Failed to persist notification record: {e}")

        return records

    async def get_notifications_for_incident(self, incident_id: str) -> List[NotificationRecord]:
        cursor = self.collection.find({"incidentId": incident_id})
        docs = await cursor.to_list(length=50)
        return [NotificationRecord(**doc) for doc in docs]

notification_service_instance = NotificationService()

def get_notification_service() -> NotificationService:
    return notification_service_instance
