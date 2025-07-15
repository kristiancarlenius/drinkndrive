# Entry point for FastAPI app
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from . import models
from .db.database import engine
from .routes import schedule  # add this

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # or "*"
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(schedule.router)