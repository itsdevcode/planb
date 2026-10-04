from unittest.mock import AsyncMock, patch

import pytest
from httpx import AsyncClient

from app.schemas.plan import PlanAnalysisResponse, Risk
from app.schemas.plan import PlanAnalysisResponse, RecoveryResponse, Risk

@pytest.mark.asyncio
async def test_analyze_plan(client: AsyncClient):
    mocked_analysis = PlanAnalysisResponse(
        summary="Attend a job interview in Delhi at 11 AM.",
        assumptions=[
            "The train arrives on time.",
            "Local transport is available.",
        ],
        risks=[
            Risk(
                risk="Train delay",
                impact="high",
                warning_signs=["Train status shows a delay."],
                prevention="Check train status before leaving.",
                backup="Use an alternative train or bus.",
            )
        ],
        prepare_now=[
            "Check train status.",
            "Research alternative transport.",
        ],
    )

    with patch(
        "app.services.planner.PlannerService.analyze",
        new_callable=AsyncMock,
        return_value=mocked_analysis,
    ):
        response = await client.post(
            "/api/v1/plans/analyze",
            json={
                "plan": (
                    "Tomorrow I have a job interview in Delhi at 11 AM "
                    "and my train leaves at 6 AM."
                )
            },
        )

    assert response.status_code == 200

    data = response.json()

    assert data["summary"] == "Attend a job interview in Delhi at 11 AM."
    assert len(data["risks"]) == 1
    assert data["risks"][0]["risk"] == "Train delay"
    assert data["risks"][0]["impact"] == "high"
    assert len(data["prepare_now"]) == 2

@pytest.mark.asyncio
async def test_analyze_plan_rejects_short_plan(client: AsyncClient):
    response = await client.post(
        "/api/v1/plans/analyze",
        json={"plan": "Trip"},
    )

    assert response.status_code == 422

@pytest.mark.asyncio
async def test_recover_plan(client: AsyncClient):
    mocked_recovery = RecoveryResponse(
        situation_summary="The train is running two hours late.",
        immediate_actions=[
            "Check the latest train ETA.",
            "Contact the interviewer immediately.",
        ],
        revised_plan=[
            "Look for alternative transport.",
            "Ask whether the interview can be moved online.",
            "Request a later interview slot if needed.",
        ],
        additional_risks=[
            "Alternative transport may also be delayed.",
            "The interviewer may not be able to reschedule.",
        ],
    )

    with patch(
        "app.services.planner.PlannerService.recover",
        new_callable=AsyncMock,
        return_value=mocked_recovery,
    ):
        response = await client.post(
            "/api/v1/plans/recover",
            json={
                "original_plan": (
                    "Tomorrow I have a job interview in Delhi at 11 AM "
                    "and my train leaves at 6 AM."
                ),
                "analysis": {
                    "summary": "Attend a job interview in Delhi at 11 AM.",
                    "assumptions": [
                        "The train arrives on time.",
                    ],
                    "risks": [
                        {
                            "risk": "Train delay",
                            "impact": "high",
                            "warning_signs": [
                                "Train status shows a delay."
                            ],
                            "prevention": "Check train status before leaving.",
                            "backup": "Use alternative transport.",
                        }
                    ],
                    "prepare_now": [
                        "Check train status.",
                    ],
                },
                "what_went_wrong": "My train is running two hours late.",
            },
        )

    assert response.status_code == 200

    data = response.json()

    assert data["situation_summary"] == (
        "The train is running two hours late."
    )
    assert len(data["immediate_actions"]) == 2
    assert len(data["revised_plan"]) == 3
    assert len(data["additional_risks"]) == 2

@pytest.mark.asyncio
async def test_recover_plan_rejects_invalid_request(client: AsyncClient):
    response = await client.post(
        "/api/v1/plans/recover",
        json={
            "original_plan": (
                "Tomorrow I have a job interview in Delhi at 11 AM."
            ),
            "analysis": {
                "summary": "Attend the interview.",
                "assumptions": [],
                "risks": [],
                "prepare_now": [],
            },
            "what_went_wrong": "Late",
        },
    )

    assert response.status_code == 422