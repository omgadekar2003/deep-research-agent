"""Shared state passed between LangGraph nodes."""
from typing import TypedDict


class ResearchState(TypedDict, total=False):
    # Input
    question: str
    user_id: str

    # Planning
    sub_queries: list[str]
    prior_queries: list[str]

    # Search + reading
    sources: list[dict]
    enriched: list[dict]

    # Verification
    report: dict           # {"supported": [...], "single": [...], "contradicted": [...]}

    # Control
    loop_count: int
    decision: str          # "proceed" | "loop"

    # Output
    final_markdown: str

    # Tracking
    errors: list[dict]     # [{"node": str, "error": str, "fatal": bool}]
    tokens_used: int
    searches_used: int
    started_at: str
    finished_at: str