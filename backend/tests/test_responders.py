import pytest
from app.database import get_db
from app.services.responder_service import ResponderService

@pytest.mark.asyncio
async def test_responder_matching():
    db = get_db()
    await db.connect()

    svc = ResponderService()
    responders = await svc.get_all_responders()
    assert len(responders) >= 1

    nearby = await svc.get_nearby_responders(lat=11.0168, lng=76.9558, radius_km=5.0)
    assert len(nearby) >= 1

    recommended = await svc.get_recommended_responders(
        incident_id="TEST-INC-1",
        incident_lat=11.0168,
        incident_lng=76.9558,
        severity="critical"
    )
    assert len(recommended) >= 1
    # Top responder should be available and close
    assert recommended[0].available is True
