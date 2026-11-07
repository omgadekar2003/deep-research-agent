"""CLI entry point: run the full research pipeline for a user question."""
import asyncio
import sys
import uuid
from datetime import datetime, timezone
from pathlib import Path

from config import settings
from graph import get_compiled_graph


REPORTS_DIR = Path("reports")
REPORTS_DIR.mkdir(exist_ok=True)


async def run_research(question: str) -> str:
    graph = await get_compiled_graph()

    thread_id = str(uuid.uuid4())
    config = {"configurable": {"thread_id": thread_id}}

    initial_state = {
        "question": question,
        "user_id": "cli",
        "sub_queries": [],
        "prior_queries": [],
        "sources": [],
        "enriched": [],
        "report": {},
        "loop_count": 0,
        "decision": "",
        "final_markdown": "",
        "errors": [],
        "tokens_used": 0,
        "searches_used": 0,
        "started_at": datetime.now(timezone.utc).isoformat(),
        "finished_at": "",
    }

    # Stream node-by-node so the user sees progress
    print(f"\nQuestion: {question}\n")
    final_state = None
    async for event in graph.astream(initial_state, config=config, stream_mode="updates"):
        for node_name, update in event.items():
            print(f"  [{node_name}]")
            if isinstance(update, dict):
                if "sub_queries" in update:
                    for q in update["sub_queries"]:
                        print(f"      • {q}")
                if "sources" in update:
                    print(f"      → {len(update['sources'])} sources")
                if "enriched" in update:
                    print(f"      → {len(update['enriched'])} sources with facts")
                if "report" in update:
                    r = update["report"]
                    print(f"      → supported={len(r.get('supported', []))} "
                          f"single={len(r.get('single', []))} "
                          f"contradicted={len(r.get('contradicted', []))}")
                if "decision" in update:
                    print(f"      → {update['decision']}")
                if "final_markdown" in update:
                    print(f"      → report generated ({len(update['final_markdown'])} chars)")
                if "errors" in update and update["errors"]:
                    for e in update["errors"]:
                        tag = "FATAL" if e.get("fatal") else "warn"
                        print(f"      [{tag}] {e['node']}: {e['error']}")
            final_state = update

    # Get final state from checkpointer
    # snapshot = graph.get_state(config)
    snapshot = await graph.aget_state(config) 
    state = snapshot.values

    md = state.get("final_markdown", "# No report produced")
    ts = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    out_path = REPORTS_DIR / f"{ts}.md"
    out_path.write_text(md, encoding="utf-8")

    print(f"\nReport saved to: {out_path}")
    return md


def main():
    if len(sys.argv) < 2:
        print('Usage: python run.py "your research question"')
        sys.exit(1)
    question = " ".join(sys.argv[1:])
    asyncio.run(run_research(question))


if __name__ == "__main__":
    main()