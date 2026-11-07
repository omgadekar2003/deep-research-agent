from datetime import datetime, timezone
from sqlalchemy.orm import Session

from app.models.user import User, RefreshToken
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    hash_refresh_token,
)


def register_user(db: Session, email: str, password: str, full_name: str | None) -> User:
    existing = db.query(User).filter(User.email == email.lower()).first()
    if existing:
        raise ValueError("Email already registered")

    user = User(
        email=email.lower(),
        hashed_password=hash_password(password),
        full_name=full_name,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def authenticate(db: Session, email: str, password: str) -> User:
    user = db.query(User).filter(User.email == email.lower()).first()
    if not user or not verify_password(password, user.hashed_password):
        raise ValueError("Invalid email or password")
    if not user.is_active:
        raise ValueError("Account is inactive")
    return user


def issue_tokens(db: Session, user: User) -> dict:
    access, expires_in = create_access_token(user.id)
    raw_refresh, token_hash, expires_at = create_refresh_token()

    db_token = RefreshToken(
        user_id=user.id,
        token_hash=token_hash,
        expires_at=expires_at,
    )
    db.add(db_token)
    db.commit()

    return {
        "access_token": access,
        "refresh_token": raw_refresh,
        "token_type": "bearer",
        "expires_in": expires_in,
    }


def refresh_tokens(db: Session, raw_refresh: str) -> dict:
    token_hash = hash_refresh_token(raw_refresh)
    row = (
        db.query(RefreshToken)
        .filter(
            RefreshToken.token_hash == token_hash,
            RefreshToken.revoked == False,  # noqa
        )
        .first()
    )
    if not row:
        raise ValueError("Invalid refresh token")

    # if row.expires_at < datetime.now(timezone.utc):
    #     row.revoked = True
    #     db.commit()
    #     raise ValueError("Refresh token expired")
    
    # Normalize both datetimes to timezone-aware UTC
    expires_at = row.expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    now = datetime.now(timezone.utc)

    if expires_at < now:
        row.revoked = True
        db.commit()
        raise ValueError("Refresh token expired")

    user = db.query(User).filter(User.id == row.user_id).first()
    if not user or not user.is_active:
        raise ValueError("User not found or inactive")

    # Revoke old token (rotation)
    row.revoked = True
    db.commit()

    return issue_tokens(db, user)


def revoke_refresh(db: Session, raw_refresh: str) -> None:
    token_hash = hash_refresh_token(raw_refresh)
    db.query(RefreshToken).filter(RefreshToken.token_hash == token_hash).update(
        {"revoked": True}
    )
    db.commit()