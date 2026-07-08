from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import models
from database import engine
from routers import ai, tasks

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Task Manager API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(tasks.router)
app.include_router(ai.router)


@app.get("/health")
def health():
    return {"status": "ok"}
