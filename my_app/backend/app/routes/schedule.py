from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import models, schemas
from ..db import get_db
from ..services.auth import get_current_user  # assuming this returns a User object

router = APIRouter(prefix="/api/schedule", tags=["Schedule"])

@router.post("/")
def create_schedule(schedule: schemas.ScheduleCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_schedule = models.Schedule(
        date=schedule.date,
        time=schedule.time,
        location=schedule.location,
        user_id=current_user.id
    )
    db.add(new_schedule)
    db.commit()
    db.refresh(new_schedule)
    return {"message": "Schedule created successfully"}