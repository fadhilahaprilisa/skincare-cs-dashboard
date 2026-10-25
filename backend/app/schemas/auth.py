from pydantic import BaseModel, EmailStr
from typing import Optional


class LoginRequest(BaseModel):
    email: EmailStr
    password: str
    role: Optional[str] = None  # "admin" atau "cs"


class UserResponse(BaseModel):
    id: int
    email: str
    full_name: str
    role: str
    role_label: Optional[str] = None
    initials: Optional[str] = None

    class Config:
        from_attributes = True


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse


class RegisterRequest(BaseModel):
    email: EmailStr
    password: str
    full_name: str
    role: str = "cs"  # "admin" atau "cs"
    role_label: Optional[str] = None
    initials: Optional[str] = None