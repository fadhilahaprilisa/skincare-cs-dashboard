from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import hash_password, verify_password, create_access_token
from app.models.user import User, UserRole
from app.schemas.auth import (
    LoginRequest,
    LoginResponse,
    UserResponse,
    RegisterRequest,
)
from app.api.deps import get_current_user


router = APIRouter()


@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest, db: AsyncSession = Depends(get_db)):
    """Login dengan email & password, return JWT token + user data."""
    # Cari user by email
    result = await db.execute(select(User).where(User.email == payload.email))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email atau password salah",
        )

    if not verify_password(payload.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email atau password salah",
        )

    # Generate JWT
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "role": user.role.value}
    )

    return LoginResponse(
        access_token=access_token,
        token_type="bearer",
        user=UserResponse(
            id=user.id,
            email=user.email,
            full_name=user.full_name,
            role=user.role.value,
            role_label=user.role_label,
            initials=user.initials,
        ),
    )


@router.get("/me", response_model=UserResponse)
async def get_me(current_user: User = Depends(get_current_user)):
    """Get current logged-in user profile."""
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        full_name=current_user.full_name,
        role=current_user.role.value,
        role_label=current_user.role_label,
        initials=current_user.initials,
    )


@router.post("/register", response_model=UserResponse, status_code=201)
async def register(payload: RegisterRequest, db: AsyncSession = Depends(get_db)):
    """
    Register user baru. Untuk demo lomba, endpoint ini tidak dikunci
    agar bisa seed admin/CS dengan mudah.
    """
    # Check existing email
    result = await db.execute(select(User).where(User.email == payload.email))
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email sudah terdaftar",
        )

    # Convert role string ke enum
    role_enum = UserRole.ADMIN if payload.role.lower() == "admin" else UserRole.CS

    new_user = User(
        email=payload.email,
        full_name=payload.full_name,
        role=role_enum,
        role_label=payload.role_label,
        initials=payload.initials,
        hashed_password=hash_password(payload.password),
    )
    db.add(new_user)
    await db.commit()
    await db.refresh(new_user)

    return UserResponse(
        id=new_user.id,
        email=new_user.email,
        full_name=new_user.full_name,
        role=new_user.role.value,
        role_label=new_user.role_label,
        initials=new_user.initials,
    )