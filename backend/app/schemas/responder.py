from typing import List, Optional, Union, Any
from pydantic import BaseModel, Field

class ResponderBase(BaseModel):
    id: Optional[Union[int, str]] = None
    responderId: Optional[Union[str, int]] = None
    name: Optional[str] = "Community Responder"
    initials: Optional[str] = "CR"
    type: Optional[str] = "volunteer"  # ambulance, police, fire, medical, rescue, volunteer
    role: Optional[str] = "Community Responder"
    phone: Optional[str] = None
    status: Optional[str] = "available"  # available, dispatched, on-scene, busy, offline
    vehicleNumber: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    distance: Optional[str] = None
    distanceKm: Optional[float] = None
    eta: Optional[str] = None
    estimatedArrivalMinutes: Optional[int] = None
    rating: Optional[float] = 4.8
    verified: Optional[bool] = True
    available: Optional[bool] = True
    skills: List[str] = Field(default_factory=list)
    icon: Optional[str] = "bi-person-check-fill"
    organization: Optional[str] = None
    assignedIncidentId: Optional[Union[str, int]] = None
    lastUpdated: Optional[str] = None
    workload: Optional[int] = 0

class Responder(ResponderBase):
    pass

class ResponderCreate(ResponderBase):
    pass

class ResponderAcceptRequest(BaseModel):
    responderId: Optional[Union[int, str]] = None
    incidentId: Optional[str] = None

class ResponderStatusUpdate(BaseModel):
    status: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None
