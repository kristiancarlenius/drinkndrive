# SQLAlchemy models for users
from sqlalchemy import Column, Integer, String, Date, Time, ForeignKey
from sqlalchemy.orm import relationship
from ..db.database import Base

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    schedules = relationship("Schedule", back_populates="user")

class Schedule(Base):
    __tablename__ = 'schedules'
    id = Column(Integer, primary_key=True, index=True)
    date = Column(Date)
    time = Column(Time)
    location = Column(String)

    user_id = Column(Integer, ForeignKey('users.id'))
    user = relationship("User", back_populates="schedules")