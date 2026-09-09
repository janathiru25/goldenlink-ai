from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.incident import Incident, IncidentCreate, IncidentUpdate, IncidentStatusUpdate
from app.schemas.responder import Responder
from app.schemas.hospital import Hospital
from app.services.incident_service import IncidentService, get_incident_service
from app.services.responder_service import ResponderService, get_responder_service
from app.services.hospital_service import HospitalService, get_hospital_service

router = APIRouter(prefix="/incidents", tags=["Incidents"])

@router.post("", response_model=Incident, status_code=201)
async def create_incident(
    data: IncidentCreate,
    incident_service: IncidentService = Depends(get_incident_service)
):
    """
    Create a new emergency incident.
    Orchestrates:
    1. Validation
    2. Incident ID generation
    3. AI assessment
    4. Recommended responders matching
    5. Recommended hospital determination
    6. Simulated 112/108/100 notifications
    7. Storage in MongoDB (or in-memory demo)
    """
    return await incident_service.create_incident(data)

@router.get("", response_model=List[Incident])
async def get_incidents(
    incident_service: IncidentService = Depends(get_incident_service)
):
    """Get list of all emergency incidents, ordered by most recent."""
    return await incident_service.get_all_incidents()

@router.get("/active", response_model=Optional[Incident])
async def get_active_incident(
    incident_service: IncidentService = Depends(get_incident_service)
):
    """Retrieve the currently active incident for the citizen/responder view."""
    return await incident_service.get_active_incident()

@router.get("/{incident_id}", response_model=Incident)
async def get_incident_by_id(
    incident_id: str,
    incident_service: IncidentService = Depends(get_incident_service)
):
    """Get single incident by its ID."""
    inc = await incident_service.get_incident_by_id(incident_id)
    if not inc:
        raise HTTPException(status_code=404, detail=f"Incident '{incident_id}' not found.")
    return inc

@router.put("/{incident_id}", response_model=Incident)
async def update_incident(
    incident_id: str,
    data: IncidentUpdate,
    incident_service: IncidentService = Depends(get_incident_service)
):
    """Update incident fields."""
    inc = await incident_service.update_incident(incident_id, data)
    if not inc:
        raise HTTPException(status_code=404, detail=f"Incident '{incident_id}' not found.")
    return inc

@router.patch("/{incident_id}/status", response_model=Incident)
async def update_incident_status(
    incident_id: str,
    status_data: IncidentStatusUpdate,
    incident_service: IncidentService = Depends(get_incident_service)
):
    """
    Advance or update incident status through response lifecycle:
    reported -> responder_search -> responder_assigned -> responder_en_route ->
    on_scene -> transporting -> hospital_arrived -> resolved -> cancelled
    """
    inc = await incident_service.update_incident_status(incident_id, status_data)
    if not inc:
        raise HTTPException(status_code=404, detail=f"Incident '{incident_id}' not found.")
    return inc

@router.get("/{incident_id}/recommended-responders", response_model=List[Responder])
async def get_recommended_responders_for_incident(
    incident_id: str,
    incident_service: IncidentService = Depends(get_incident_service),
    responder_service: ResponderService = Depends(get_responder_service)
):
    """Calculate and return ranked recommended responders specifically for this incident."""
    inc = await incident_service.get_incident_by_id(incident_id)
    if not inc:
        raise HTTPException(status_code=404, detail=f"Incident '{incident_id}' not found.")

    responders = await responder_service.get_recommended_responders(
        incident_id=incident_id,
        incident_lat=inc.location.latitude,
        incident_lng=inc.location.longitude,
        severity=inc.severity,
        required_skills=inc.aiAssessment.requiredResources
    )
    return responders

@router.get("/{incident_id}/recommended-hospital", response_model=Hospital)
async def get_recommended_hospital_for_incident(
    incident_id: str,
    incident_service: IncidentService = Depends(get_incident_service),
    hospital_service: HospitalService = Depends(get_hospital_service)
):
    """Calculate and return best recommended hospital specifically for this incident."""
    inc = await incident_service.get_incident_by_id(incident_id)
    if not inc:
        raise HTTPException(status_code=404, detail=f"Incident '{incident_id}' not found.")

    if inc.hospital:
        return inc.hospital

    hospital = await hospital_service.get_recommended_hospital(
        incident_lat=inc.location.latitude,
        incident_lng=inc.location.longitude,
        severity=inc.severity,
        requires_icu=(inc.severity == "critical" or inc.unconscious)
    )
    if not hospital:
        raise HTTPException(status_code=404, detail="No suitable hospital found in service area.")
    return hospital
