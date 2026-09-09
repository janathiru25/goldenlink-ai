from typing import Optional
from pydantic import BaseModel, Field


class BystanderRegister(BaseModel):
    fullName: str = Field(min_length=2, max_length=100)
    phoneNumber: str = Field(min_length=10, max_length=20)
    email: str = Field(min_length=5, max_length=150)
    password: str = Field(min_length=6, max_length=128)
    location: str = Field(min_length=2, max_length=200)


class BystanderLogin(BaseModel):
    phoneNumber: str = Field(min_length=10, max_length=20)
    password: str = Field(min_length=6, max_length=128)


class BystanderResponse(BaseModel):
    userId: str
    fullName: str
    phoneNumber: str
    email: str
    location: str
    createdAt: str


class AuthResponse(BaseModel):
    success: bool
    message: str
    accessToken: Optional[str] = None
    user: Optional[BystanderResponse] = None