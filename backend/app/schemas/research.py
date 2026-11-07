from datetime import datetime
from pydantic import BaseModel, Field


class ResearchStartRequest(BaseModel):
    question: str = Field(..., min_length=10, max_length=500)


class ResearchRunOut(BaseModel):
    id: int
    question: str
    status: str
    report_md: str | None
    error: str | None
    created_at: datetime
    finished_at: datetime | None

    class Config:
        from_attributes = True


class ResearchRunSummary(BaseModel):
    id: int
    question: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True