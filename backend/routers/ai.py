import json
import os

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
from groq import Groq
from sqlalchemy.orm import Session

import models
import schemas
from database import get_db

load_dotenv()

router = APIRouter(prefix="/ai", tags=["ai"])


def get_groq_client() -> Groq:
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise RuntimeError("GROQ_API_KEY is not configured")
    return Groq(api_key=api_key)


@router.post("/prioritize", response_model=schemas.PrioritizeResponse)
def prioritize_tasks(db: Session = Depends(get_db)):
    pending = (
        db.query(models.Task)
        .filter(models.Task.status != models.StatusEnum.done)
        .all()
    )

    if not pending:
        raise HTTPException(status_code=400, detail="No pending tasks to prioritize")

    task_summaries = [
        {
            "id": t.id,
            "title": t.title,
            "description": t.description or "",
            "priority": t.priority.value,
            "due_date": t.due_date.isoformat() if t.due_date else None,
        }
        for t in pending
    ]

    system_prompt = (
        "You are a task prioritization assistant. Given a list of tasks with "
        "id, title, description, priority, and due_date, decide the best order "
        "to work on them. Respond ONLY with JSON matching this exact shape: "
        '{"ordered_task_ids": [int, ...], "reasoning": "short paragraph"}. '
        "ordered_task_ids must contain every id from the input, each exactly once."
    )

    try:
        completion = get_groq_client().chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": json.dumps(task_summaries)},
            ],
            response_format={"type": "json_object"},
            temperature=0.3,
        )
        result = json.loads(completion.choices[0].message.content)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"AI prioritization failed: {e}")

    valid_ids = {t.id for t in pending}
    if set(result.get("ordered_task_ids", [])) != valid_ids:
        raise HTTPException(
            status_code=502, detail="AI response did not include all task ids"
        )

    return schemas.PrioritizeResponse(**result)
