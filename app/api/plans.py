from fastapi import APIRouter
from app.services.planner import PlannerService
from app.schemas.plan import (
    PlanAnalysisResponse,
    PlanRequest,
    RecoveryRequest,
    RecoveryResponse,
)

router = APIRouter(
    prefix="/api/v1/plans",
    tags=["Plans"],
)


@router.post(
    "/analyze",
    response_model=PlanAnalysisResponse,
    summary="Analyze Plan A",
)
async def analyze_plan(payload: PlanRequest) -> PlanAnalysisResponse:
    planner = PlannerService()
    return await planner.analyze(payload)

@router.post(
    "/recover",
    response_model=RecoveryResponse,
    summary="Recover from a failed Plan A",
)
async def recover_plan(
    payload: RecoveryRequest,
) -> RecoveryResponse:
    planner = PlannerService()

    return await planner.recover(payload)