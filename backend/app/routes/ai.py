from fastapi import APIRouter, Depends
from app.schemas.ai import AIAssessRequest, AIAssessResponse, AIStatusResponse
from app.services.ai_service import AIService, get_ai_service

router = APIRouter(prefix="/ai", tags=["AI"])

@router.post("/assess", response_model=AIAssessResponse)
async def assess_incident(
    request: AIAssessRequest,
    ai_service: AIService = Depends(get_ai_service)
):
    """Run real AI assessment / clinical triage on emergency incident parameters."""
    return await ai_service.assess(request)

@router.get("/status", response_model=AIStatusResponse)
async def get_ai_status(
    ai_service: AIService = Depends(get_ai_service)
):
    """
    Expose active AI Provider status.
    Accurately indicates whether running rule_based or trained model.
    """
    return ai_service.get_status()
