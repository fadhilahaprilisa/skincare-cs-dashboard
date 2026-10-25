from sqlalchemy import Column, Integer, String, Text, Enum as SQLEnum, DateTime
from sqlalchemy.sql import func
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()


class TicketStatus(str, enum.Enum):
    PROCESSING = "PROCESSING"
    RESOLVED = "RESOLVED"
    FAILED = "FAILED"
    IN_REVIEW = "IN_REVIEW"


class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    complaint_text = Column(Text, nullable=False)
    product = Column(String(150), nullable=True)
    product_batch = Column(String(50), nullable=True)
    category = Column(String(100), nullable=True)
    severity = Column(String(20), nullable=True)
    assigned_cs = Column(String(100), nullable=True)
    ai_analysis = Column(Text, nullable=True)
    ai_draft_reply = Column(Text, nullable=True)
    status = Column(SQLEnum(TicketStatus), default=TicketStatus.PROCESSING)
    created_at = Column(DateTime(timezone=True), server_default=func.now())