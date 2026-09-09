from typing import List, Optional
from pydantic import BaseModel, Field
from datetime import datetime, timezone

class NotificationRecord(BaseModel):
    incidentId: str
    recipient: str  # "112 Emergency Control", "108 Ambulance", "100 Police", "Nearby Responders"
    notificationType: str  # "DISPATCH_ALERT", "STATUS_UPDATE", "CRITICAL_ESCALATION"
    timestamp: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "DELIVERED"  # DELIVERED, SIMULATED_SENT, ACKNOWLEDGED
    SIMULATED: bool = True
    message: Optional[str] = None
    channels: List[str] = Field(default_factory=lambda: ["RADIO_SIMULATED", "DASHBOARD_ALERT", "MOBILE_PUSH"])

class NotificationDispatchPayload(BaseModel):
    incidentId: str
    severity: str
    accidentType: str
    location: dict
    victims: int
    aiSummary: Optional[str] = None
    recipients: Optional[List[str]] = None

class NotificationDispatchResponse(BaseModel):
    success: bool = True
    dispatchId: str
    incidentId: str
    notifications: List[NotificationRecord]
    simulatedNotice: str = "NATIONAL DEMO SAFETY: All dispatches are strictly SIMULATED. No actual 112/108/100 calls were made."
