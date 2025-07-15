# Authentication logic
from sqlalchemy.orm import Session
from ..models.user import User
from ..utils.security import get_password_hash, create_access_token
from ..schemas.user import UserCreate
from datetime import timedelta
from fastapi import HTTPException

def create_user(db: Session, user_data: UserCreate):
    existing = db.query(User).filter(User.email == user_data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_pw = get_password_hash(user_data.password)
    new_user = User(email=user_data.email, hashed_password=hashed_pw)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

def register_and_get_token(user: User):
    return create_access_token(data={"sub": user.email}, expires_delta=timedelta(minutes=60))