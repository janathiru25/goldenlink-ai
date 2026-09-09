from typing import List
from fastapi import APIRouter, Depends, HTTPException
from app.schemas.hospital import Hospital
from app.services.hospital_service import HospitalService, get_hospital_service

router = APIRouter(prefix="/hospitals", tags=["Hospitals"])

@router.get("", response_model=List[Hospital])
async def get_hospitals(
    hospital_service: HospitalService = Depends(get_hospital_service)
):
    """List all registered emergency hospitals."""
    return await hospital_service.get_all_hospitals()

@router.get("/{hospital_id}", response_model=Hospital)
async def get_hospital(
    hospital_id: str,
    hospital_service: HospitalService = Depends(get_hospital_service)
):
    """Get hospital details by hospital ID."""
    hospital = await hospital_service.get_hospital_by_id(hospital_id)
    if not hospital:
        raise HTTPException(status_code=404, detail=f"Hospital '{hospital_id}' not found.")
    return hospital
