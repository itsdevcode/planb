

from google import genai
from app.core.config import settings
from app.schemas.plan import (
    PlanAnalysisResponse,
    RecoveryRequest,
    RecoveryResponse,
)


class GemmaClient:
    def __init__(self) -> None:
        self.client = genai.Client(api_key=settings.gemma_api_key)

    async def analyze_plan(self, plan: str) -> PlanAnalysisResponse:
        prompt = f"""
You are PlanB, an AI contingency planner.

Your job is NOT to encourage the user or rewrite their plan.
Your job is to challenge Plan A and identify realistic ways it could fail.

Analyze the plan below.

PLAN A:
{plan}

Return ONLY valid JSON using exactly this structure:

{{
  "summary": "short summary of the goal",
  "assumptions": [
    "important assumption"
  ],
  "risks": [
    {{
      "risk": "realistic failure scenario",
      "impact": "low, medium, or high",
      "warning_signs": [
        "early warning sign"
      ],
      "prevention": "action to reduce the risk",
      "backup": "what to do if it happens"
    }}
  ],
  "prepare_now": [
    "action the user should take now"
  ]
}}

Rules:
- Return at most 3 risks.
- Keep every field concise.
- Focus on realistic failures.
- Do not invent extreme scenarios.
- Do not give motivational advice.
- Do not use Markdown.
- Return JSON only.
"""

        response = await self.client.aio.models.generate_content(  # pyright: ignore[reportUnknownMemberType]
            model="gemma-4-26b-a4b-it",
            contents=prompt,
            config={
                "temperature": 0.2
            },
        )
        text = response.text

        if not text:
            raise RuntimeError("Gemma returned an empty response.")

        return PlanAnalysisResponse.model_validate_json(text)

    async def recover_plan(
        self,
        request: RecoveryRequest,
    ) -> RecoveryResponse:
        analysis_json = request.analysis.model_dump_json()

        prompt = f"""
You are PlanB, an AI contingency and recovery planner.

The user's original plan has encountered a real problem.
Your job is to create a practical Plan C based on what actually happened.

ORIGINAL PLAN:
{request.original_plan}

ORIGINAL PLAN B ANALYSIS:
{analysis_json}

WHAT WENT WRONG:
{request.what_went_wrong}

Return ONLY valid JSON using exactly this structure:

{{
  "situation_summary": "short summary of the current situation",
  "immediate_actions": [
    "action to take immediately"
  ],
  "revised_plan": [
    "step in the new Plan C"
  ],
  "additional_risks": [
    "new realistic risk created by this situation"
  ]
}}

Rules:
- Focus on recovery, not blame.
- Prioritize actions by urgency.
- Use the original plan and Plan B context.
- Keep recommendations realistic and actionable.
- Return at most 4 immediate actions.
- Return at most 5 revised plan steps.
- Return at most 3 additional risks.
- Do not give motivational advice.
- Do not use Markdown.
- Return JSON only.
"""

        response = await self.client.aio.models.generate_content(
            model="gemma-4-26b-a4b-it",
            contents=prompt,
            config={
                "temperature": 0.2,
            },
        )

        text = response.text

        if not text:
            raise RuntimeError("Gemma returned an empty recovery response.")

        return RecoveryResponse.model_validate_json(text)