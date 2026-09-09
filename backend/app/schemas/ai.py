from typing import List, Optional
from pydantic import BaseModel, Field

class AIAssessRequest(BaseModel):
    accidentType: str = Field(default="Road Accident", description="Type of accident")
    victims: int = Field(default=1, ge=0, description="Number of affected victims")
    unconscious: bool = Field(default=False, description="Whether victims are unconscious")
    bleeding: bool = Field(default=False, description="Whether heavy bleeding is present")
    breathingDifficulty: bool = Field(default=False, description="Whether breathing difficulty reported")
    trapped: bool = Field(default=False, description="Whether individuals are trapped")
    description: str = Field(default="", description="Description of the scene")
    latitude: Optional[float] = Field(default=0.0, description="GPS latitude")
    longitude: Optional[float] = Field(default=0.0, description="GPS longitude")
    address: Optional[str] = Field(default="", description="Human readable address")

class AIAssessResponse(BaseModel):
    severity: str = Field(description="'normal', 'moderate', 'serious', or 'critical'")
    confidence: float = Field(ge=0.0, le=100.0, description="Confidence percentage or score")
    summary: str = Field(description="Clinical triage summary of the situation")
    recommendedAction: str = Field(description="Recommended immediate emergency protocol")
    emergencyLevel: str = Field(description="Categorical emergency level e.g. LEVEL_1_IMMEDIATE")
    detectedConditions: List[str] = Field(default_factory=list, description="List of recognized clinical conditions")
    requiredResources: List[str] = Field(default_factory=list, description="Recommended emergency equipment/roles")

class AIStatusResponse(BaseModel):
    provider: str = Field(description="Active AI Provider type ('rule_based', 'model', 'external_api')")
    mode: str = Field(description="Operational mode ('production', 'demo')")
    model_loaded: bool = Field(description="Whether a trained ML/LLM model is actively loaded")
    model_name: Optional[str] = None
    fallback_active: bool = False
    supported_providers: List[str] = Field(default_factory=lambda: ["rule_based", "model", "external_api"])
