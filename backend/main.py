# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from slowapi import Limiter, _rate_limit_exceeded_handler
# from slowapi.util import get_remote_address
# from slowapi.errors import RateLimitExceeded



# from app.config import app_settings
# from app.api import auth as auth_api
# from app.api import research as research_api


# limiter = Limiter(key_func=get_remote_address)

# app = FastAPI(
#     title=app_settings.app_name,
#     version="0.1.0",
#     debug=app_settings.debug,
# )

# app.state.limiter = limiter
# app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=app_settings.allowed_origins_list,
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# app.include_router(auth_api.router)
# app.include_router(research_api.router)


# @app.get("/health")
# def health():
#     return {"status": "ok", "environment": app_settings.environment}




# V2:


from contextlib import asynccontextmanager
from datetime import datetime, timezone

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from sqlalchemy import update

from app.config import app_settings
from app.api import auth as auth_api
from app.api import research as research_api
from app.db import SessionLocal
from app.models.research_run import ResearchRun


limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: sweep any runs left in "pending" or "running" from a previous process
    db = SessionLocal()
    try:
        result = db.execute(
            update(ResearchRun)
            .where(ResearchRun.status.in_(["pending", "running"]))
            .values(
                status="failed",
                error="Server restarted during run",
                finished_at=datetime.now(timezone.utc),
            )
        )
        db.commit()
        print(f"✅ Swept {result.rowcount} orphaned run(s)")
    finally:
        db.close()

    yield


app = FastAPI(
    title=app_settings.app_name,
    version="0.1.0",
    debug=app_settings.debug,
    lifespan=lifespan,
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=app_settings.allowed_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_api.router)
app.include_router(research_api.router)


@app.get("/health")
def health():
    return {"status": "ok", "environment": app_settings.environment}