from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase

from app.config import app_settings


class Base(DeclarativeBase):
    pass


connect_args = (
    {"check_same_thread": False}
    if app_settings.database_url.startswith("sqlite")
    else {}
)

engine = create_engine(
    app_settings.database_url,
    connect_args=connect_args,
    echo= False, #app_settings.debug,
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


def get_db():
    """FastAPI dependency — yields a session, closes it after the request."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()