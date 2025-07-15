# SQLAlchemy models for users
from sqlalchemy import Column, Integer, String
from ..db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_employee = Column(Integer, default=0)  # 0 = user, 1 = employee