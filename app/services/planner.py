from app.ai.gemma import GemmaClient
from app.schemas.plan import (
    PlanAnalysisResponse,
    PlanRequest,
    RecoveryRequest,
    RecoveryResponse,
)

class PlannerService:
    def __init__(self) -> None:
        self.gemma = GemmaClient()

    async def analyze(
        self,
        request: PlanRequest,
    ) -> PlanAnalysisResponse:
        return await self.gemma.analyze_plan(request.plan)

    async def recover(
        self,
        request: RecoveryRequest,
    ) -> RecoveryResponse:
        return await self.gemma.recover_plan(request)