import pytest
from app.database import get_db
from app.services.incident_service import IncidentService
from app.schemas.incident import IncidentCreate, IncidentLocation, IncidentStatusUpdate

@pytest.mark.asyncio
async def test_create_and_lifecycle_incident():
    db = get_db()
    await db.connect()

    svc = IncidentService()
    create_req = IncidentCreate(
        accidentType="Two-Wheeler Accident",
        victims=1,
        unconscious=True,
        bleeding=True,
        breathingDifficulty=False,
        trapped=False,
        description="Rider thrown from motorcycle",
        location=IncidentLocation(latitude=11.0168, longitude=76.9558, address="Avinashi Road, Coimbatore")
    )

    incident = await svc.create_incident(create_req)
    assert incident.incidentId.startswith("GL")
    assert incident.severity == "critical"
    assert incident.aiAssessment.severity == "critical"
    assert incident.hospital is not None
    assert len(incident.notifications) >= 1

    # Verify active incident retrieval
    active = await svc.get_active_incident()
    assert active is not None
    assert active.incidentId == incident.incidentId

    # Progress status: responder_assigned -> responder_en_route -> on_scene -> transporting -> hospital_arrived -> resolved
    updated = await svc.update_incident_status(incident.incidentId, IncidentStatusUpdate(status="responder_assigned"))
    assert updated.status == "responder_assigned"

    updated = await svc.update_incident_status(incident.incidentId, IncidentStatusUpdate(status="responder_en_route"))
    assert updated.status == "responder_en_route"

    updated = await svc.update_incident_status(incident.incidentId, IncidentStatusUpdate(status="on_scene"))
    assert updated.status == "on_scene"

    updated = await svc.update_incident_status(incident.incidentId, IncidentStatusUpdate(status="transporting"))
    assert updated.status == "transporting"

    updated = await svc.update_incident_status(incident.incidentId, IncidentStatusUpdate(status="hospital_arrived"))
    assert updated.status == "hospital_arrived"

    updated = await svc.update_incident_status(incident.incidentId, IncidentStatusUpdate(status="resolved"))
    assert updated.status == "resolved"
