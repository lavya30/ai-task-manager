from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict

from models import PriorityEnum, StatusEnum


class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None
    priority: PriorityEnum = PriorityEnum.medium
    due_date: Optional[datetime] = None


class TaskUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[PriorityEnum] = None
    status: Optional[StatusEnum] = None
    due_date: Optional[datetime] = None


class TaskOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    title: str
    description: Optional[str]
    priority: PriorityEnum
    status: StatusEnum
    due_date: Optional[datetime]
    ai_notes: Optional[str]
    created_at: datetime


class PrioritizeResponse(BaseModel):
    ordered_task_ids: list[int]
    reasoning: str
