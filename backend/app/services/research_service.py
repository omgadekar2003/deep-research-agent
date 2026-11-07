# import json
# import uuid
# from datetime import datetime, timezone

# from sqlalchemy.orm import Session

# from app.models.research_run import ResearchRun
# from graph import get_compiled_graph


# async def run_pipeline_for_run(db: Session, run_id: int) -> None:
#     """
#     Executes the LangGraph pipeline for a given research_run row.
#     Updates the row with status, report, sources, errors, and timings.
#     """
#     run = db.query(ResearchRun).filter(ResearchRun.id == run_id).first()
#     if not run:
#         return

#     # Mark as running
#     run.status = "running"
#     db.commit()

#     thread_id = str(uuid.uuid4())
#     config = {"configurable": {"thread_id": thread_id}}

#     initial_state = {
#         "question": run.question,
#         "user_id": str(run.user_id),
#         "sub_queries": [],
#         "prior_queries": [],
#         "sources": [],
#         "enriched": [],
#         "report": {},
#         "loop_count": 0,
#         "decision": "",
#         "final_markdown": "",
#         "errors": [],
#         "tokens_used": 0,
#         "searches_used": 0,
#         "started_at": datetime.now(timezone.utc).isoformat(),
#         "finished_at": "",
#     }

#     try:
#         graph = await get_compiled_graph()

#         # Run the graph to completion
#         async for _ in graph.astream(initial_state, config=config, stream_mode="updates"):
#             pass  # Phase 4 will emit these as SSE

#         snapshot = await graph.aget_state(config)
#         state = snapshot.values

#         # Extract results
#         markdown = state.get("final_markdown", "")
#         sources = state.get("enriched", [])
#         errors = state.get("errors", [])
#         tokens = state.get("tokens_used", 0)
#         searches = state.get("searches_used", 0)

#         # Save
#         run.report_md = markdown
#         run.sources_json = json.dumps(
#             [{"title": s.get("title"), "url": s.get("url")} for s in sources]
#         )
#         run.tokens_used = tokens
#         run.searches_used = searches
#         run.finished_at = datetime.now(timezone.utc)

#         # Fatal errors → failed status
#         fatal = [e for e in errors if e.get("fatal")]
#         if fatal:
#             run.status = "failed"
#             run.error = "\n".join(f"[{e['node']}] {e['error']}" for e in fatal)
#         else:
#             run.status = "completed"
#             if errors:
#                 run.error = "\n".join(
#                     f"[{e['node']}] {e['error']}" for e in errors if not e.get("fatal")
#                 )

#         db.commit()

#     except Exception as e:
#         run.status = "failed"
#         run.error = f"{type(e).__name__}: {e}"
#         run.finished_at = datetime.now(timezone.utc)
#         db.commit()


### PHASE 4:
import asyncio
import json
import uuid
from datetime import datetime, timezone
from typing import AsyncGenerator

from sqlalchemy.orm import Session

from app.db import SessionLocal
from app.models.research_run import ResearchRun
from graph import get_compiled_graph


def _summarize_event(node_name: str, update: dict) -> dict:
    """Turn a raw node update into a clean SSE payload."""
    payload = {"node": node_name}

    if node_name == "planner":
        if "sub_queries" in update:
            payload["sub_queries"] = update["sub_queries"]
            payload["message"] = f"Planned {len(update['sub_queries'])} sub-queries"
        elif update.get("decision") == "proceed":
            payload["message"] = "Refiner had nothing new to add, proceeding"

    elif node_name == "searcher":
        if "sources" in update:
            payload["count"] = len(update["sources"])
            payload["message"] = f"Found {len(update['sources'])} unique sources"

    elif node_name == "reader":
        if "enriched" in update:
            payload["count"] = len(update["enriched"])
            total_facts = sum(len(s.get("facts", [])) for s in update["enriched"])
            payload["facts"] = total_facts
            payload["message"] = f"Read {len(update['enriched'])} sources, extracted {total_facts} facts"

    elif node_name == "verifier":
        if "report" in update:
            r = update["report"]
            payload["supported"] = len(r.get("supported", []))
            payload["single"] = len(r.get("single", []))
            payload["contradicted"] = len(r.get("contradicted", []))
            payload["message"] = (
                f"Verified: {payload['supported']} supported, "
                f"{payload['single']} single, {payload['contradicted']} contradicted"
            )

    elif node_name == "decider":
        if "decision" in update:
            payload["decision"] = update["decision"]
            payload["message"] = f"Decision: {update['decision']}"

    elif node_name == "writer":
        if "final_markdown" in update:
            payload["length"] = len(update["final_markdown"])
            payload["message"] = f"Report generated ({payload['length']} chars)"

    elif node_name == "error":
        payload["message"] = "Pipeline terminated due to fatal error"
        payload["fatal"] = True

    # Include any new errors from this step
    if "errors" in update:
        new_errors = [
            {"node": e["node"], "error": e["error"], "fatal": e.get("fatal", False)}
            for e in update["errors"]
        ]
        if new_errors:
            payload["errors"] = new_errors

    return payload


async def run_pipeline_streaming(run_id: int) -> AsyncGenerator[dict, None]:
    """
    Runs the pipeline and yields SSE-ready dicts as each node completes.
    Also updates the database row so polling clients (older versions) still work.
    """
    # Fresh DB session — we can't share the request-scoped one across yields
    db: Session = SessionLocal()

    try:
        run = db.query(ResearchRun).filter(ResearchRun.id == run_id).first()
        if not run:
            yield {"node": "error", "message": f"Run {run_id} not found", "fatal": True}
            return

        run.status = "running"
        db.commit()

        thread_id = str(uuid.uuid4())
        config = {"configurable": {"thread_id": thread_id}}

        initial_state = {
            "question": run.question,
            "user_id": str(run.user_id),
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

        graph = await get_compiled_graph()

        # Stream node-by-node
        async for event in graph.astream(initial_state, config=config, stream_mode="updates"):
            for node_name, update in event.items():
                if not isinstance(update, dict):
                    continue
                yield _summarize_event(node_name, update)

        # Get final state
        snapshot = await graph.aget_state(config)
        state = snapshot.values

        markdown = state.get("final_markdown", "")
        sources = state.get("enriched", [])
        errors = state.get("errors", [])
        searches = state.get("searches_used", 0)

        # Save to DB
        run = db.query(ResearchRun).filter(ResearchRun.id == run_id).first()
        if run:
            run.report_md = markdown
            run.sources_json = json.dumps(
                [{"title": s.get("title"), "url": s.get("url")} for s in sources]
            )
            run.searches_used = searches
            run.finished_at = datetime.now(timezone.utc)

            fatal = [e for e in errors if e.get("fatal")]
            if fatal:
                run.status = "failed"
                run.error = "\n".join(f"[{e['node']}] {e['error']}" for e in fatal)
            else:
                run.status = "completed"
                if errors:
                    run.error = "\n".join(
                        f"[{e['node']}] {e['error']}" for e in errors if not e.get("fatal")
                    )
            db.commit()

            yield {
                "node": "done",
                "status": run.status,
                "run_id": run.id,
                "message": "Pipeline complete",
            }
        else:
            yield {"node": "error", "message": "Run disappeared mid-execution", "fatal": True}

    except Exception as e:
        # Best-effort mark as failed
        try:
            run = db.query(ResearchRun).filter(ResearchRun.id == run_id).first()
            if run:
                run.status = "failed"
                run.error = f"{type(e).__name__}: {e}"
                run.finished_at = datetime.now(timezone.utc)
                db.commit()
        except Exception:
            pass
        yield {
            "node": "error",
            "message": f"{type(e).__name__}: {e}",
            "fatal": True,
        }
    finally:
        db.close()


async def run_pipeline_for_run(db: Session, run_id: int) -> None:
    """
    Non-streaming version for background tasks.
    Kept for /research/start compatibility.
    """
    async for _ in run_pipeline_streaming(run_id):
        pass