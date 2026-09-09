import logging
from typing import Dict, Any
from app.ai.provider import AIProvider
from app.ai.rule_based_provider import RuleBasedProvider
from app.ai.model_provider import ModelProvider
from app.schemas.ai import AIAssessRequest, AIAssessResponse, AIStatusResponse
from app.config import get_settings

logger = logging.getLogger("goldenlink.ai_service")

class AIService:
    def __init__(self):
        settings = get_settings()
        self.provider_type = settings.AI_PROVIDER_TYPE.lower()

        if self.provider_type in ["model", "external_api"]:
            self.provider: AIProvider = ModelProvider()
        else:
            self.provider: AIProvider = RuleBasedProvider()

        logger.info(f"AIService initialized with active provider: {self.provider.provider_name} (Trained: {self.provider.is_trained_model})")

    async def assess(self, request: AIAssessRequest) -> AIAssessResponse:
        return await self.provider.assess(request)

    def get_status(self) -> AIStatusResponse:
        status_dict = self.provider.get_status()
        return AIStatusResponse(
            provider=status_dict["provider"],
            mode=status_dict["mode"],
            model_loaded=status_dict["model_loaded"],
            model_name=status_dict.get("model_name"),
            fallback_active=status_dict.get("fallback_active", False)
        )

ai_service_instance = AIService()

def get_ai_service() -> AIService:
    return ai_service_instance
