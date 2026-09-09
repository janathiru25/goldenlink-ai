import pytest
from app.ai.rule_based_provider import RuleBasedProvider
from app.schemas.ai import AIAssessRequest

@pytest.mark.asyncio
async def test_ai_assessment_critical():
    provider = RuleBasedProvider()
    req = AIAssessRequest(
        accidentType="Car Crash",
        victims=2,
        unconscious=True,
        bleeding=True,
        breathingDifficulty=False,
        trapped=False,
        description="High speed collision on highway"
    )
    result = await provider.assess(req)
    assert result.severity == "critical"
    assert result.confidence >= 90.0
    assert "UNCONSCIOUS_PATIENT" in result.detectedConditions
    assert "HEAVY_HEMORRHAGE" in result.detectedConditions
    assert "ADVANCED_LIFE_SUPPORT_AMBULANCE" in result.requiredResources

@pytest.mark.asyncio
async def test_ai_assessment_moderate():
    provider = RuleBasedProvider()
    req = AIAssessRequest(
        accidentType="Minor Two-Wheeler Skid",
        victims=1,
        unconscious=False,
        bleeding=False,
        breathingDifficulty=False,
        trapped=False,
        description="Skid at low speed, scraped knee"
    )
    result = await provider.assess(req)
    assert result.severity == "moderate"
    assert result.confidence >= 80.0

@pytest.mark.asyncio
async def test_ai_status_reporting():
    provider = RuleBasedProvider()
    status = provider.get_status()
    assert status["provider"] == "rule_based"
    assert status["model_loaded"] is False
