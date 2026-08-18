from fastapi import APIRouter, HTTPException
from app.schemas.ticket import TicketCreate, TicketResponse
from app.services.langflow_service import call_langflow_workflow

router = APIRouter()

# ==========================================
# SIMULASI DATABASE SEMENTARA (Fake DB)
# Nanti di Fase 4 kita ganti dengan PostgreSQL
# ==========================================
fake_db = []
counter = 1

@router.post("/tickets", response_model=TicketResponse)
async def create_ticket(ticket: TicketCreate):
    """
    Endpoint untuk membuat tiket baru.
    - Menerima nama customer dan teks keluhan.
    - Memanggil AI Langflow untuk analisis & draf balasan.
    - Menyimpan hasil ke database (sementara di list).
    """
    global counter
    
    # 1. Buat tiket dengan status PROCESSING
    new_ticket = {
        "id": counter,
        "customer_name": ticket.customer_name,
        "complaint_text": ticket.complaint_text,
        "status": "PROCESSING",
        "ai_analysis": None,
        "ai_draft_reply": None
    }
    fake_db.append(new_ticket)
    counter += 1

    # 2. Panggil service Langflow (fungsi async yang sudah kita buat di Fase 2)
    ai_result = await call_langflow_workflow(ticket.complaint_text)
    
    # 3. Update tiket dengan hasil AI
    new_ticket["ai_analysis"] = ai_result.get("analysis")
    new_ticket["ai_draft_reply"] = ai_result.get("draft_reply")
    
    # 4. Tentukan status: RESOLVED jika AI berhasil ngasih balasan, FAILED jika error
    if ai_result.get("draft_reply") and "Error" not in ai_result.get("analysis", ""):
        new_ticket["status"] = "RESOLVED"
    else:
        new_ticket["status"] = "FAILED"
    
    return new_ticket


@router.get("/tickets", response_model=list[TicketResponse])
async def get_all_tickets():
    """
    Endpoint untuk mengambil semua riwayat tiket.
    Berguna untuk dashboard monitoring.
    """
    return fake_db