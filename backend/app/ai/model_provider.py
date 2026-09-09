import os
import logging
from typing import Dict, Any, Optional
import httpx
from app.ai.provider import AIProvider
from app.ai.rule_based_provider import RuleBasedProvider
from app.schemas.ai import AIAssessRequest, AIAssessResponse
from app.config import get_settings

logger = logging.getLogger("goldenlink.ai.model")

class ModelProvider(AIProvider):
    """
    Model-based AI Provider supporting:
    1. Local trained ML model artifact (if present at AI_MODEL_PATH)
    2. External LLM/API endpoint (if EXTERNAL_AI_API_KEY / EXTERNAL_AI_ENDPOINT configured)
    3. Transparent, resilient fallback to RuleBasedProvider for demo mode.
    """

    def __init__(self):
        self.settings = get_settings()
        self.fallback_provider = RuleBasedProvider()
        self._model = None
        self._is_loaded = False
        self._load_model()

    def _load_model(self):
        model_path = self.settings.AI_MODEL_PATH
        if model_path and os.path.exists(model_path):
            try:
                # Attempt loading pickle/joblib if available
                import joblib
                self._model = joblib.load(model_path)
                self._is_loaded = True
                logger.info(f"Loaded trained ML model from {model_path}")
            except Exception as e:
                logger.warning(f"Could not load local model from {model_path}: {e}")
                self._is_loaded = False
        elif self.settings.EXTERNAL_AI_API_KEY and self.settings.EXTERNAL_AI_ENDPOINT:
            self._is_loaded = True
            logger.info("External AI Endpoint configured.")
        else:
            self._is_loaded = False
            logger.info("No trained model or external API found; utilizing RuleBasedProvider fallback.")

    @property
    def provider_name(self) -> str:
        return "model" if self._is_loaded else "rule_based"

    @property
    def is_trained_model(self) -> bool:
        return self._is_loaded

    async def assess(self, request: AIAssessRequest) -> AIAssessResponse:
        # If external API configured, attempt remote inference
        if self.settings.EXTERNAL_AI_API_KEY and self.settings.EXTERNAL_AI_ENDPOINT:
            try:
                async with httpx.AsyncClient(timeout=5.0) as client:
                    headers = {"Authorization": f"Bearer {self.settings.EXTERNAL_AI_API_KEY}"}
                    resp = await client.post(
                        self.settings.EXTERNAL_AI_ENDPOINT,
                        json=request.model_dump(),
                        headers=headers
                    )
                    if resp.status_code == 200:
                        data = resp.json()
                        return AIAssessResponse(**data)
            except Exception as e:
                logger.warning(f"External AI inference failed: {e}. Falling back to rule-based.")

        # Local model inference if loaded
        if self._model is not None:
            try:
                # Feature vector extraction:
                features = [
                    int(request.unconscious),
                    int(request.bleeding),
                    int(request.breathingDifficulty),
                    int(request.trapped),
                    request.victims
                ]
                pred = self._model.predict([features])[0]
                base_resp = await self.fallback_provider.assess(request)
                base_resp.severity = str(pred).lower()
                return base_resp
            except Exception as e:
                logger.warning(f"Local ML model prediction error: {e}. Falling back.")

        # Default fallback
        return await self.fallback_provider.assess(request)

    def get_status(self) -> Dict[str, Any]:
        return {
            "provider": "model" if self._is_loaded else "rule_based",
            "mode": "production" if self._is_loaded else "demo",
            "model_loaded": self._is_loaded,
            "model_name": os.path.basename(self.settings.AI_MODEL_PATH) if self.settings.AI_MODEL_PATH else None,
            "fallback_active": not self._is_loaded,
            "description": "Trained ML / External AI provider with automatic rule-based triage fallback"
        }
