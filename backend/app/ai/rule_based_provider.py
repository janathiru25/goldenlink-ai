from typing import Dict, Any, List
from app.ai.provider import AIProvider
from app.schemas.ai import AIAssessRequest, AIAssessResponse

class RuleBasedProvider(AIProvider):
    """
    Deterministic clinical triage decision-tree provider.
    Explicitly documented as rule-based fallback logic, NOT a trained neural model.
    """

    @property
    def provider_name(self) -> str:
        return "rule_based"

    @property
    def is_trained_model(self) -> bool:
        return False

    async def assess(self, req: AIAssessRequest) -> AIAssessResponse:
        conditions: List[str] = []
        resources: List[str] = []

        if req.unconscious:
            conditions.append("UNCONSCIOUS_PATIENT")
            resources.append("ADVANCED_LIFE_SUPPORT_AMBULANCE")
            resources.append("PARAMEDIC_AIRWAY_MANAGEMENT")

        if req.bleeding:
            conditions.append("HEAVY_HEMORRHAGE")
            resources.append("HEMOSTATIC_DRESSINGS")
            resources.append("IV_FLUID_RESUSCITATION")

        if req.breathingDifficulty:
            conditions.append("RESPIRATORY_DISTRESS")
            resources.append("OXYGEN_CYLINDER_ALS")
            resources.append("BVM_RESUSCITATOR")

        if req.trapped:
            conditions.append("VEHICULAR_ENTRAPMENT")
            resources.append("HYDRAULIC_EXTRICATION_RESCUE")
            resources.append("FIRE_AND_RESCUE_SQUAD")

        if req.victims >= 3:
            conditions.append(f"MASS_CASUALTY_INCIDENT_{req.victims}_VICTIMS")
            resources.append("MULTI_AMBULANCE_DISPATCH")
            resources.append("TRIAGE_AREA_COORDINATOR")
        elif req.victims == 2:
            conditions.append("DUAL_CASUALTY")
            resources.append("DUAL_STRETCHER_AMBULANCE")

        # Determine severity and confidence
        is_critical = req.unconscious or req.bleeding or req.breathingDifficulty or req.trapped
        is_serious = req.victims >= 3 or ("HEAD" in req.description.upper()) or ("FIRE" in req.description.upper())

        if is_critical:
            severity = "critical"
            confidence = 94.0
            emergency_level = "LEVEL_1_IMMEDIATE_RED"
            summary = (
                f"CRITICAL EMERGENCY: {req.victims} victim(s) identified with life-threatening signs "
                f"({', '.join(conditions) if conditions else 'Critical status'}). Immediate Golden Hour intervention mandatory."
            )
            recommended_action = (
                "Dispatch nearest 108 Advanced Life Support (ALS) Ambulance, alert Trauma Center, "
                "and deploy immediate First-Aid responders to maintain airway and control hemorrhage."
            )
            resources.append("PRIORITY_1_POLICE_GREEN_CORRIDOR")
        elif is_serious:
            severity = "serious"
            confidence = 89.0
            emergency_level = "LEVEL_2_URGENT_ORANGE"
            summary = (
                f"SERIOUS EMERGENCY: {req.victims} victim(s) involved in {req.accidentType}. "
                f"Urgent medical support and community responder perimeter control needed."
            )
            recommended_action = (
                "Alert nearest available ambulance and mobilize nearby community volunteers "
                "for traffic diversion, crowd control, and preliminary stabilization."
            )
            resources.append("BASIC_LIFE_SUPPORT_AMBULANCE")
            resources.append("TRAFFIC_SUPPORT_VOLUNTEER")
        elif req.victims >= 1:
            severity = "moderate"
            confidence = 85.0
            emergency_level = "LEVEL_3_STANDARD_YELLOW"
            summary = (
                f"MODERATE INCIDENT: {req.victims} person(s) reported in {req.accidentType}. "
                f"No direct loss of consciousness or critical hemorrhage detected."
            )
            recommended_action = (
                "Notify nearby community responders to verify scene safety, assist with documentation, "
                "and stand by for professional ambulance assessment."
            )
            resources.append("FIRST_AID_KIT")
            resources.append("COMMUNITY_FIRST_RESPONDER")
        else:
            severity = "normal"
            confidence = 80.0
            emergency_level = "LEVEL_4_MONITOR_GREEN"
            summary = "Minor incident reported with no immediate medical emergencies flagged."
            recommended_action = "Maintain community monitoring and log accident details."
            resources.append("COMMUNITY_MONITOR")

        # Ensure uniqueness of resources and conditions
        unique_conditions = list(dict.fromkeys(conditions))
        unique_resources = list(dict.fromkeys(resources))

        return AIAssessResponse(
            severity=severity,
            confidence=confidence,
            summary=summary,
            recommendedAction=recommended_action,
            emergencyLevel=emergency_level,
            detectedConditions=unique_conditions,
            requiredResources=unique_resources
        )

    def get_status(self) -> Dict[str, Any]:
        return {
            "provider": self.provider_name,
            "mode": "demo",
            "model_loaded": False,
            "model_name": None,
            "fallback_active": False,
            "description": "Rule-based clinical emergency assessment engine (deterministic decision-tree triage)"
        }
