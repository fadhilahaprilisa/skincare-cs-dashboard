from sqlalchemy import Column, Integer, String, Enum as SQLEnum, DateTime
from sqlalchemy.sql import func
from app.models.ticket import Base
import enum


class UserRole(str, enum.Enum):
    ADMIN = "admin"
    CS = "cs"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(150), unique=True, nullable=False, index=True)
    full_name = Column(String(150), nullable=False)
    role = Column(SQLEnum(UserRole), nullable=False, default=UserRole.CS)
    role_label = Column(String(100), nullable=True)  # "CS Agent", "Admin & Head of Care"
    initials = Column(String(5), nullable=True)  # "SP", "AW"
    hashed_password = Column(String(255), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())