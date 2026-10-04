from typing import Literal
from pydantic import BaseModel, Field


class PlanRequest(BaseModel):
    plan: str = Field(
        min_length=10,
        max_length=3000,
        description="The user's Plan A to analyze.",
    )


class Risk(BaseModel):
    risk: str
    impact: Literal["low", "medium", "high"]
    warning_signs: list[str]
    prevention: str
    backup: str


class PlanAnalysisResponse(BaseModel):
    summary: str
    assumptions: list[str]
    risks: list[Risk]
    prepare_now: list[str]

class RecoveryRequest(BaseModel):
    original_plan: str
    analysis: PlanAnalysisResponse
    what_went_wrong: str = Field(
        min_length=5,
        max_length=1000,
    )


class RecoveryResponse(BaseModel):
    situation_summary: str
    immediate_actions: list[str]
    revised_plan: list[str]
    additional_risks: list[str]