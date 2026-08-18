from pydantic import BaseModel
from typing import Optional

# Schema untuk menerima input dari Frontend (keluhan customer)
class TicketCreate(BaseModel):
    customer_name: str
    complaint_text: str

# Schema untuk mengembalikan response ke Frontend (setelah diproses AI)
class TicketResponse(BaseModel):
    id: int  # ID tiket (nanti dari database)
    customer_name: str
    complaint_text: str
    ai_analysis: Optional[str] = None   # Hasil analisis dari Node 1 (AI Analyst)
    ai_draft_reply: Optional[str] = None # Draf balasan dari Node 2 (CX Manager)
    status: str  # Status: "PROCESSING", "RESOLVED", atau "FAILED"