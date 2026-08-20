from sqlalchemy import Column, Integer, String, Text, Enum as SQLEnum
from sqlalchemy.ext.declarative import declarative_base
import enum

Base = declarative_base()

class TicketStatus(str, enum.Enum):
    PROCESSING = "PROCESSING"
    RESOLVED = "RESOLVED"
    FAILED = "FAILED"

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), nullable=False)
    complaint_text = Column(Text, nullable=False)
    ai_analysis = Column(Text, nullable=True)
    ai_draft_reply = Column(Text, nullable=True)
    status = Column(SQLEnum(TicketStatus), default=TicketStatus.PROCESSING)