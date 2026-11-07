"""LangGraph state machine for the research pipeline."""
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.sqlite.aio import AsyncSqliteSaver

from config import settings
from state import ResearchState
from nodes import (
    planner_node,
    searcher_node,
    reader_node,
    verifier_node,
    decider_node,
    writer_node,
    error_node,
)


def _has_fatal(state: ResearchState) -> bool:
    return any(e.get("fatal") for e in state.get("errors", []))


def route_after_planner(state: ResearchState) -> str:
    return "error" if _has_fatal(state) else "searcher"


def route_after_searcher(state: ResearchState) -> str:
    return "error" if _has_fatal(state) else "reader"


def route_after_reader(state: ResearchState) -> str:
    return "error" if _has_fatal(state) else "verifier"


def route_after_decider(state: ResearchState) -> str:
    return "writer" if state.get("decision") == "proceed" else "planner"


def build_graph() -> StateGraph:
    g = StateGraph(ResearchState)

    g.add_node("planner", planner_node)
    g.add_node("searcher", searcher_node)
    g.add_node("reader", reader_node)
    g.add_node("verifier", verifier_node)
    g.add_node("decider", decider_node)
    g.add_node("writer", writer_node)
    g.add_node("error", error_node)

    g.add_edge(START, "planner")
    g.add_conditional_edges("planner", route_after_planner, {"searcher": "searcher", "error": "error"})
    g.add_conditional_edges("searcher", route_after_searcher, {"reader": "reader", "error": "error"})
    g.add_conditional_edges("reader", route_after_reader, {"verifier": "verifier", "error": "error"})
    g.add_edge("verifier", "decider")
    g.add_conditional_edges("decider", route_after_decider, {"writer": "writer", "planner": "planner"})
    g.add_edge("writer", END)
    g.add_edge("error", END)

    return g


# Keep the saver open for the process lifetime — cache it at module level.
_checkpointer_cm = None
_compiled_graph = None


async def get_compiled_graph():
    """Returns a compiled graph with SQLite checkpointer (process-cached)."""
    global _checkpointer_cm, _compiled_graph

    if _compiled_graph is not None:
        return _compiled_graph

    _checkpointer_cm = AsyncSqliteSaver.from_conn_string(settings.checkpoint_db)
    checkpointer = await _checkpointer_cm.__aenter__()

    _compiled_graph = build_graph().compile(checkpointer=checkpointer)
    return _compiled_graph


