from fastapi import FastAPI
from app.api.plans import router as plans_router
app = FastAPI(
    title="PlanB",
    description=(
        "An AI-powered contingency planner that challenges your Plan A, "
        "identifies what could go wrong, and helps you build a smarter Plan B."
    ),
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)
app.include_router(plans_router)

@app.get(
    "/health",
    tags=["Health"],
    summary="Check API health",
)
async def health_check() -> dict[str, str]:
    return {"status": "ok"}