from fastapi import APIRouter, Depends

from app.schemas.auth import (
    BystanderRegister,
    BystanderLogin,
    AuthResponse
)
from app.services.auth_service import (
    AuthService,
    get_auth_service
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post(
    "/register",
    response_model=AuthResponse,
    status_code=201
)
async def register_bystander(
    data: BystanderRegister,
    auth_service: AuthService = Depends(get_auth_service)
):
    """
    Create a new GoldenLink AI bystander account.
    """

    return await auth_service.register(data)


@router.post(
    "/login",
    response_model=AuthResponse
)
async def login_bystander(
    data: BystanderLogin,
    auth_service: AuthService = Depends(get_auth_service)
):
    """
    Authenticate a GoldenLink AI bystander.
    """

    return await auth_service.login(data)