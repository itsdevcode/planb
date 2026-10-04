from fastapi import APIRouter

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
    return PlanAnalysisResponse(
        summary=payload.plan,
        assumptions=[
            "The plan can be executed as expected.",
        ],
        risks=[],
        prepare_now=[],
    )