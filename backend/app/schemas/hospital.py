from typing import List, Optional
from pydantic import BaseModel, Field

class HospitalBase(BaseModel):
    hospitalId: str
    name: str
    address: str
    latitude: float
    longitude: float
    distanceKm: Optional[float] = None
    phone: Optional[str] = None
    emergencyAvailable: bool = True
    availableBeds: Optional[int] = 0
    icuAvailable: Optional[int] = 0
    specialties: List[str] = Field(default_factory=list)
    ambulanceAvailable: Optional[bool] = False
    estimatedArrivalMinutes: Optional[int] = None
    operatingHours: Optional[str] = "24x7"
    rating: Optional[float] = 4.5
    score: Optional[float] = None
    matchReason: Optional[str] = None

class Hospital(HospitalBase):
    pass

class HospitalCreate(HospitalBase):
    pass
