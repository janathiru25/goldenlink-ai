from typing import List, Optional, Union, Dict, Any
from datetime import datetime, timezone
from pydantic import BaseModel, Field
from app.schemas.responder import Responder
from app.schemas.hospital import Hospital
from app.schemas.ai import AIAssessResponse
from app.schemas.notification import NotificationRecord

# Standardized statuses matching user specification
# reported -> responder_search -> responder_assigned -> responder_en_route -> on_scene -> transporting -> hospital_arrived -> resolved -> cancelled
STATUS_COMPATIBILITY_MAP = {
    # frontend legacy aliases -> standardized status
    "under-review": "reported",
    "confirmed": "responder_search",
    "responder-dispatched": "responder_assigned",
    "responder-on-scene": "on_scene",
    "handed_over": "transporting",
    "completed": "resolved",
    # standardized passes through
    "reported": "reported",
    "responder_search": "responder_search",
    "responder_assigned": "responder_assigned",
    "responder_en_route": "responder_en_route",
    "on_scene": "on_scene",
    "transporting": "transporting",
    "hospital_arrived": "hospital_arrived",
    "resolved": "resolved",
    "cancelled": "cancelled"
}

def standardize_status(status_str: str) -> str:
    cleaned = str(status_str).strip().lower().replace(" ", "_")
    return STATUS_COMPATIBILITY_MAP.get(cleaned, cleaned)

class IncidentLocation(BaseModel):
    latitude: float = Field(default=11.0168, description="GPS latitude (-90 to 90)")
    longitude: float = Field(default=76.9558, description="GPS longitude (-180 to 180)")
    address: str = Field(default="Coimbatore, Tamil Nadu", description="Readable location address")
    isFallbackLocation: bool = Field(default=False, description="True if safe fallback coordinates used")

class IncidentAI(BaseModel):
    severity: str = "moderate"
    confidence: float = 1.0
    summary: str = "Incident registered"
    recommendedAction: Optional[str] = "Coordinate response"
    emergencyLevel: Optional[str] = "LEVEL_2_URGENT"
    detectedConditions: Optional[List[str]] = Field(default_factory=list)
    requiredResources: Optional[List[str]] = Field(default_factory=list)

class IncidentBase(BaseModel):
    incidentId: str
    reportedAt: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())
    status: str = "reported"
    accidentType: str = "Road Accident"
    severity: str = "moderate"
    victims: int = 1
    unconscious: bool = False
    bleeding: bool = False
    breathingDifficulty: bool = False
    trapped: bool = False
    description: str = ""
    location: IncidentLocation
    aiAssessment: IncidentAI
    responder: Optional[Responder] = None
    ambulanceStatus: Optional[str] = "not_requested"
    hospital: Optional[Hospital] = None
    emergencyContact: Optional[str] = None
    lastUpdated: Optional[str] = None
    notifications: Optional[List[NotificationRecord]] = Field(default_factory=list)
    recommendedResponders: Optional[List[Responder]] = Field(default_factory=list)

class Incident(IncidentBase):
    pass

class IncidentCreate(BaseModel):
    accidentType: Optional[str] = "Road Accident"
    severity: Optional[str] = None
    victims: Optional[int] = 1
    unconscious: Optional[bool] = False
    bleeding: Optional[bool] = False
    breathingDifficulty: Optional[bool] = False
    trapped: Optional[bool] = False
    description: Optional[str] = ""
    location: Optional[IncidentLocation] = None
    aiAssessment: Optional[IncidentAI] = None
    responder: Optional[Responder] = None
    ambulanceStatus: Optional[str] = None
    hospital: Optional[Hospital] = None
    emergencyContact: Optional[str] = None

class IncidentUpdate(BaseModel):
    status: Optional[str] = None
    severity: Optional[str] = None
    victims: Optional[int] = None
    unconscious: Optional[bool] = None
    bleeding: Optional[bool] = None
    breathingDifficulty: Optional[bool] = None
    trapped: Optional[bool] = None
    description: Optional[str] = None
    location: Optional[IncidentLocation] = None
    aiAssessment: Optional[IncidentAI] = None
    responder: Optional[Responder] = None
    ambulanceStatus: Optional[str] = None
    hospital: Optional[Hospital] = None
    emergencyContact: Optional[str] = None

class IncidentStatusUpdate(BaseModel):
    status: str
    notes: Optional[str] = None
