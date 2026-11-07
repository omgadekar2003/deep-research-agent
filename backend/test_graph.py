"""Structural check — runs the graph with 1 sub-query, asserts a report is produced.
This will make real API calls. Run once when ready."""
import asyncio
from run import run_research


async def main():
    print("=== Smoke test: real API calls ===\n")
    md = await run_research("What is quantum computing in one paragraph?")
    assert md and len(md) > 100, "Report too short"
    print("\n✅ Graph produced a report.")


if __name__ == "__main__":
    asyncio.run(main())