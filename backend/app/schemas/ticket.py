from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TicketCreate(BaseModel):
    customer_name: str
    complaint_text: str
    product: Optional[str] = "Ceramide Barrier Moisturizer"
    product_batch: Optional[str] = "#GB-2024A"
    category: Optional[str] = "Iritasi"
    severity: Optional[str] = "Moderate"
    assigned_cs: Optional[str] = "Sarah Pramudita"


class TicketResponse(BaseModel):
    id: int
    customer_name: str
    complaint_text: str
    product: Optional[str] = None
    product_batch: Optional[str] = None
    category: Optional[str] = None
    severity: Optional[str] = None
    assigned_cs: Optional[str] = None
    ai_analysis: Optional[str] = None
    ai_draft_reply: Optional[str] = None
    status: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class TicketStatusUpdate(BaseModel):
    status: str  # "PROCESSING", "RESOLVED", "FAILED", "IN_REVIEW"