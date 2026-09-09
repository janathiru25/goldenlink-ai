from abc import ABC, abstractmethod
from typing import Dict, Any
from app.schemas.ai import AIAssessRequest, AIAssessResponse

class AIProvider(ABC):
    """Abstract Base Class for AI Assessment Providers."""

    @property
    @abstractmethod
    def provider_name(self) -> str:
        """Return unique provider identifier."""
        pass

    @property
    @abstractmethod
    def is_trained_model(self) -> bool:
        """Return True only if this provider runs a real trained ML/Deep Learning model."""
        pass

    @abstractmethod
    async def assess(self, request: AIAssessRequest) -> AIAssessResponse:
        """Assess an emergency incident and return clinical/triage assessment."""
        pass

    @abstractmethod
    def get_status(self) -> Dict[str, Any]:
        """Return provider status, model path, and fallback details."""
        pass
