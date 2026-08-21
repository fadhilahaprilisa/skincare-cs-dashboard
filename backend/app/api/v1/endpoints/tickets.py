from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.ticket import TicketCreate, TicketResponse
from app.models.ticket import Ticket, TicketStatus
from app.services.langflow_service import call_langflow_workflow
from app.core.database import get_db

router = APIRouter()

@router.post("/tickets", response_model=TicketResponse)
async def create_ticket(ticket: TicketCreate, db: AsyncSession = Depends(get_db)):
    # 1. Buat objek tiket baru dengan status PROCESSING
    new_ticket = Ticket(
        customer_name=ticket.customer_name,
        complaint_text=ticket.complaint_text,
        status=TicketStatus.PROCESSING
    )
    db.add(new_ticket)
    await db.commit()
    await db.refresh(new_ticket)

    # 2. Panggil AI Langflow
    ai_result = await call_langflow_workflow(ticket.complaint_text)
    
    # 3. Update tiket dengan hasil AI
    new_ticket.ai_analysis = ai_result.get("analysis")
    new_ticket.ai_draft_reply = ai_result.get("draft_reply")
    
    # 4. Tentukan status
    if ai_result.get("draft_reply") and "Error" not in ai_result.get("analysis", ""):
        new_ticket.status = TicketStatus.RESOLVED
    else:
        new_ticket.status = TicketStatus.FAILED
        
    await db.commit()
    await db.refresh(new_ticket)
    
    return new_ticket

@router.get("/tickets", response_model=list[TicketResponse])
async def get_all_tickets(db: AsyncSession = Depends(get_db)):
    from sqlalchemy import select
    result = await db.execute(select(Ticket).order_by(Ticket.id.desc()))
    tickets = result.scalars().all()
    return tickets