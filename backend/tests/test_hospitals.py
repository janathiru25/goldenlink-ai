import pytest
from app.database import get_db
from app.services.hospital_service import HospitalService

@pytest.mark.asyncio
async def test_hospital_recommendation():
    db = get_db()
    await db.connect()

    svc = HospitalService()
    hospitals = await svc.get_all_hospitals()
    assert len(hospitals) >= 1

    rec = await svc.get_recommended_hospital(
        incident_lat=11.0168,
        incident_lng=76.9558,
        severity="critical",
        requires_icu=True
    )
    assert rec is not None
    assert rec.emergencyAvailable is True
    assert (rec.icuAvailable or 0) > 0
