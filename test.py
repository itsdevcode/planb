import asyncio
import time
from app.ai.gemma import GemmaClient


async def main() -> None:
    client = GemmaClient()

    # for model in client.client.models.list():
    #     print(model.name)
    start = time.perf_counter()
    response = await client.analyze_plan(
        "Tomorrow I have an interview in Delhi at 11 AM. "
        + "My train leaves at 6 AM."
    )

    elapsed = time.perf_counter() - start

    print(response)
    print(f"\nTime taken: {elapsed:.2f} seconds")


asyncio.run(main())