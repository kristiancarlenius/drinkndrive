# Pydantic schemas for users
from pydantic import BaseModel
from pydantic import BaseModel
from datetime import date, time

class ScheduleCreate(BaseModel):
    date: date
    time: time
    location: str
    
class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserCreate(BaseModel):
    email: str
    password: str