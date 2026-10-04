

from google import genai
from app.core.config import settings
from app.schemas.plan import PlanAnalysisResponse

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