from typing import List, Optional, Any
from fastapi import APIRouter, Depends, HTTPException, Query
from app.schemas.responder import Responder, ResponderCreate, ResponderStatusUpdate, ResponderAcceptRequest
from app.services.responder_service import ResponderService, get_responder_service
from app.services.incident_service import IncidentService, get_incident_service

router = APIRouter(prefix="/responders", tags=["Responders"])

@router.get("", response_model=List[Responder])
async def get_responders(
    responder_service: ResponderService = Depends(get_responder_service)
):
    """List all registered emergency responders."""
    return await responder_service.get_all_responders()

@router.get("/nearby", response_model=List[Responder])
async def get_nearby_responders(
    lat: float = Query(default=11.0168, ge=-90.0, le=90.0, description="Latitude"),
    lng: float = Query(default=76.9558, ge=-180.0, le=180.0, description="Longitude"),
    radius_km: float = Query(default=5.0, ge=0.5, le=50.0, description="Search radius in kilometers"),
    responder_service: ResponderService = Depends(get_responder_service)
):
    """Retrieve nearby responders within the specified radius, ordered by availability and distance."""
    return await responder_service.get_nearby_responders(lat=lat, lng=lng, radius_km=radius_km)

@router.get("/{responder_id}", response_model=Responder)
async def get_responder(
    responder_id: str,
    responder_service: ResponderService = Depends(get_responder_service)
):
    """Get single responder by ID."""
    responder = await responder_service.get_responder_by_id(responder_id)
    if not responder:
        raise HTTPException(status_code=404, detail=f"Responder '{responder_id}' not found.")
    return responder

@router.post("/{responder_id}/accept/{incident_id}")
async def accept_incident(
    responder_id: str,
    incident_id: str,
    responder_service: ResponderService = Depends(get_responder_service),
    incident_service: IncidentService = Depends(get_incident_service)
):
    """Responder accepts an emergency incident."""
    incident = await incident_service.get_incident_by_id(incident_id)
    if not incident:
        raise HTTPException(status_code=404, detail=f"Incident '{incident_id}' not found.")

    updated_responder = await responder_service.assign_responder_to_incident(responder_id, incident_id)
    if not updated_responder:
        raise HTTPException(status_code=404, detail=f"Responder '{responder_id}' not found.")

    # Update incident with responder details and status 'responder_assigned'
    from app.schemas.incident import IncidentUpdate
    updated_incident = await incident_service.update_incident(
        incident_id,
        IncidentUpdate(
            status="responder_assigned",
            responder=updated_responder
        )
    )

    return {
        "success": True,
        "message": f"Responder {updated_responder.name} successfully assigned to incident {incident_id}.",
        "incident": updated_incident,
        "responder": updated_responder
    }

@router.patch("/{responder_id}/status", response_model=Responder)
async def update_responder_status(
    responder_id: str,
    status_update: ResponderStatusUpdate,
    responder_service: ResponderService = Depends(get_responder_service)
):
    """Update responder status (available, busy, dispatched, offline)."""
    res = await responder_service.update_status(responder_id, status_update)
    if not res:
        raise HTTPException(status_code=404, detail=f"Responder '{responder_id}' not found.")
    return res
