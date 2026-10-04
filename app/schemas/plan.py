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