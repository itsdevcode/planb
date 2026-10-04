from fastapi import APIRouter
from app.services.planner import PlannerService
from app.schemas.plan import PlanAnalysisResponse, PlanRequest


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