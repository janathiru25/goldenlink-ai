from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.notification import NotificationRecord, NotificationDispatchPayload, NotificationDispatchResponse
from app.services.notification_service import NotificationService, get_notification_service

router = APIRouter(prefix="/notifications", tags=["Notifications"])

@router.post("/dispatch", response_model=NotificationDispatchResponse)
async def dispatch_notification(
    payload: NotificationDispatchPayload,
    notification_service: NotificationService = Depends(get_notification_service)
):
    """Trigger simulated emergency notifications for 112/108/100 and nearby responders."""
    records = await notification_service.dispatch_simulated_emergency(
        incident_id=payload.incidentId,
        severity=payload.severity,
        accident_type=payload.accidentType,
        location=payload.location,
        victims=payload.victims,
        ai_summary=payload.aiSummary
    )
    return NotificationDispatchResponse(
        success=True,
        dispatchId=f"DISP-{payload.incidentId}",
        incidentId=payload.incidentId,
        notifications=records
    )

@router.get("/incident/{incident_id}", response_model=List[NotificationRecord])
async def get_incident_notifications(
    incident_id: str,
    notification_service: NotificationService = Depends(get_notification_service)
):
    """Retrieve all simulated notification records associated with an incident."""
    return await notification_service.get_notifications_for_incident(incident_id)
