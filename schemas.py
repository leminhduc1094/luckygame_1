from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class UserCreateRequest(BaseModel):
    email: str
    password: str


class UserDetailResponse(BaseModel):
    id: int
    is_active: bool
    email: str
    score: int
    played_at: Optional[datetime] = None #cho phép played_at nhận giá trị null

    class Config:
        orm_mode = True


class UserScoreRequest(BaseModel):
    score: int