# from fastapi import APIRouter, Depends, HTTPException
# from sqlalchemy.orm import Session

# from app.db import get_db
# from app.core.deps import get_current_user
# from app.models.user import User
# from app.models.research_run import ResearchRun
# from app.schemas.research import (
#     ResearchStartRequest,
#     ResearchRunOut,
#     ResearchRunSummary,
# )


# router = APIRouter(prefix="/research", tags=["research"])


# @router.post("/start", response_model=ResearchRunOut, status_code=201)
# def start_research(
#     payload: ResearchStartRequest,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user),
# ):
#     """
#     Creates a research run record.
#     Phase 3 will kick off the actual pipeline here.
#     """
#     run = ResearchRun(
#         user_id=current_user.id,
#         question=payload.question,
#         status="pending",
#     )
#     db.add(run)
#     db.commit()
#     db.refresh(run)
#     return run


# @router.get("/history", response_model=list[ResearchRunSummary])
# def history(
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user),
#     limit: int = 20,
# ):
#     rows = (
#         db.query(ResearchRun)
#         .filter(ResearchRun.user_id == current_user.id)
#         .order_by(ResearchRun.created_at.desc())
#         .limit(limit)
#         .all()
#     )
#     return rows


# @router.get("/{run_id}", response_model=ResearchRunOut)
# def get_run(
#     run_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user),
# ):
#     run = db.query(ResearchRun).filter(ResearchRun.id == run_id).first()
#     if not run:
#         raise HTTPException(status_code=404, detail="Run not found")
#     if run.user_id != current_user.id:
#         raise HTTPException(status_code=403, detail="Not your run")
#     return run


#### PHase 3


# from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
# from sqlalchemy.orm import Session

# from app.db import get_db, SessionLocal
# from app.core.deps import get_current_user
# from app.models.user import User
# from app.models.research_run import ResearchRun
# from app.schemas.research import (
#     ResearchStartRequest,
#     ResearchRunOut,
#     ResearchRunSummary,
# )
# from app.services.research_service import run_pipeline_for_run


# router = APIRouter(prefix="/research", tags=["research"])


# def _pipeline_worker(run_id: int):
#     """Background worker — runs the pipeline with its own DB session."""
#     db = SessionLocal()
#     try:
#         import asyncio
#         asyncio.run(run_pipeline_for_run(db, run_id))
#     finally:
#         db.close()


# @router.post("/start", response_model=ResearchRunOut, status_code=201)
# def start_research(
#     payload: ResearchStartRequest,
#     background_tasks: BackgroundTasks,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user),
# ):
#     run = ResearchRun(
#         user_id=current_user.id,
#         question=payload.question,
#         status="pending",
#     )
#     db.add(run)
#     db.commit()
#     db.refresh(run)

#     # Kick off pipeline in background — response returns immediately
#     background_tasks.add_task(_pipeline_worker, run.id)

#     return run


# @router.get("/history", response_model=list[ResearchRunSummary])
# def history(
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user),
#     limit: int = 20,
# ):
#     rows = (
#         db.query(ResearchRun)
#         .filter(ResearchRun.user_id == current_user.id)
#         .order_by(ResearchRun.created_at.desc())
#         .limit(limit)
#         .all()
#     )
#     return rows


# @router.get("/{run_id}", response_model=ResearchRunOut)
# def get_run(
#     run_id: int,
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user),
# ):
#     run = db.query(ResearchRun).filter(ResearchRun.id == run_id).first()
#     if not run:
#         raise HTTPException(status_code=404, detail="Run not found")
#     if run.user_id != current_user.id:
#         raise HTTPException(status_code=403, detail="Not your run")
#     return run




#phase 4: SSE
import json

from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException
from fastapi.responses import StreamingResponse
from sqlalchemy.orm import Session

from app.db import get_db
from app.core.deps import get_current_user
from app.models.user import User
from app.models.research_run import ResearchRun
from app.schemas.research import (
    ResearchStartRequest,
    ResearchRunOut,
    ResearchRunSummary,
)

from app.services.research_service import (
    run_pipeline_streaming,
    run_pipeline_for_run,
)


from fastapi.responses import StreamingResponse, Response
from app.services.pdf_service import render_pdf


import requests
from fastapi import UploadFile, File
from app.config import app_settings # Assuming you store keys here


router = APIRouter(prefix="/research", tags=["research"])


def _pipeline_worker(run_id: int):
    """Legacy background worker — used when client doesn't open the stream."""
    import asyncio
    asyncio.run(run_pipeline_for_run(None, run_id))


@router.post("/start", response_model=ResearchRunOut, status_code=201)
def start_research(
    payload: ResearchStartRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Creates the run and returns immediately.
    Client then opens /research/{id}/stream to receive live events.
    """
    run = ResearchRun(
        user_id=current_user.id,
        question=payload.question,
        status="pending",
    )
    db.add(run)
    db.commit()
    db.refresh(run)
    return run


@router.get("/{run_id}/stream")
async def stream_research(
    run_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    SSE endpoint. Opens a persistent connection and pushes events
    as the pipeline progresses.
    """
    run = db.query(ResearchRun).filter(ResearchRun.id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Run not found")
    if run.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your run")

    async def event_generator():
        async for event in run_pipeline_streaming(run_id):
            yield f"data: {json.dumps(event)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",   # disable nginx buffering in production
            "Connection": "keep-alive",
        },
    )


@router.get("/history", response_model=list[ResearchRunSummary])
def history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
    limit: int = 20,
):
    rows = (
        db.query(ResearchRun)
        .filter(ResearchRun.user_id == current_user.id)
        .order_by(ResearchRun.created_at.desc())
        .limit(limit)
        .all()
    )
    return rows




@router.get("/{run_id}/pdf")
def download_pdf(
    run_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """
    Generate and return a PDF version of the completed report.
    """
    run = db.query(ResearchRun).filter(ResearchRun.id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Run not found")
    if run.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your run")
    if run.status != "completed" or not run.report_md:
        raise HTTPException(
            status_code=400,
            detail=f"Run is {run.status}, not completed. No PDF available.",
        )

    try:
        pdf_bytes = render_pdf(run.question, run.report_md)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"PDF generation failed: {type(e).__name__}: {e}",
        )

    filename = f"research_report_{run_id}.pdf"
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f'attachment; filename="{filename}"',
        },
    )





@router.get("/{run_id}", response_model=ResearchRunOut)
def get_run(
    run_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    run = db.query(ResearchRun).filter(ResearchRun.id == run_id).first()
    if not run:
        raise HTTPException(status_code=404, detail="Run not found")
    if run.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not your run")
    return run






@router.post("/transcribe")
async def transcribe_audio(file: UploadFile = File(...)):
    """
    Receives audio from the frontend, sends it to Sarvam, returns text.
    """
    # Read the uploaded audio
    audio_bytes = await file.read()
    
    # Prepare Sarvam API request
    # You need to add SARVAM_API_KEY to your .env and config
    sarvam_url = "https://api.sarvam.ai/speech-to-text"
    headers = {
        "api-subscription-key": app_settings.sarvam_api_key
    }
    files = {
        "file": (file.filename, audio_bytes, file.content_type)
    }
    data = {
        "model": "saaras:v3", # Recommended model [citation:16]
        "language_code": "unknown", # Auto-detect language
    }

    try:
        response = requests.post(sarvam_url, headers=headers, files=files, data=data)
        response.raise_for_status()
        result = response.json()
        return {"text": result.get("transcript", "")}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Transcription failed: {str(e)}")