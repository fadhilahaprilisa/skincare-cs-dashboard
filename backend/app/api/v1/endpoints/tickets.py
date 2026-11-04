from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import Optional
from datetime import datetime, timedelta, timezone
from app.schemas.ticket import TicketCreate, TicketResponse, TicketStatusUpdate
from app.models.ticket import Ticket, TicketStatus
from app.services.langflow_service import call_langflow_workflow
from app.core.database import get_db
from app.api.deps import get_current_user, require_cs_or_admin
from app.models.user import User

router = APIRouter()


@router.post("/tickets", response_model=TicketResponse)
async def create_ticket(
    ticket: TicketCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_cs_or_admin),
):
    """
    Create new ticket AS DRAFT. SLA timer starts immediately.
    AI Analysis will be triggered later when user opens AI Analysis page.
    """
    # 1. Hitung SLA berdasarkan severity
    now = datetime.now(timezone.utc)
    if ticket.severity == "High":
        sla_minutes = 30
    elif ticket.severity == "Moderate":
        sla_minutes = 120  # 2 Jam
    else:
        sla_minutes = 1440  # 24 Jam (Low)

    sla_deadline = now + timedelta(minutes=sla_minutes)

    # 2. Buat tiket dengan status DRAFT
    new_ticket = Ticket(
        customer_name=ticket.customer_name,
        complaint_text=ticket.complaint_text,
        product=ticket.product,
        product_batch=ticket.product_batch,
        category=ticket.category,
        severity=ticket.severity,
        assigned_cs=ticket.assigned_cs or current_user.full_name,
        status=TicketStatus.DRAFT,
        sla_deadline=sla_deadline,
        sla_remaining_minutes=sla_minutes,
        # ai_analysis dan ai_draft_reply dibiarkan NULL dulu
    )
    db.add(new_ticket)
    await db.commit()
    await db.refresh(new_ticket)

    return new_ticket


@router.post("/tickets/{ticket_id}/analyze", response_model=TicketResponse)
async def analyze_ticket(
    ticket_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_cs_or_admin),
):
    """
    Trigger AI analysis for a DRAFT ticket.
    PENTING: Status tiket TIDAK diubah selama proses ini. Tetap DRAFT.
    """
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one_or_none()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    # Jika sudah punya analisis, langsung return (biar gak dobel)
    if ticket.ai_analysis and ticket.ai_draft_reply:
        return ticket

    # ===== PANGGIL LANGFLOW (TANPA UBAH STATUS) =====
    ai_result = await call_langflow_workflow(ticket.complaint_text)

    draft_reply = ai_result.get("draft_reply", "")
    analysis = ai_result.get("analysis", "")

    # Simpan hasil AI ke database. Status TETAP DRAFT.
    ticket.ai_analysis = analysis
    ticket.ai_draft_reply = draft_reply if draft_reply else None
    
    # JANGAN UBAH STATUS. Biarkan DRAFT.

    await db.commit()
    await db.refresh(ticket)
    return ticket


@router.get("/tickets", response_model=list[TicketResponse])
async def get_all_tickets(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_cs_or_admin),
    status_filter: Optional[str] = Query(None, alias="status"),
    severity_filter: Optional[str] = Query(None, alias="severity"),
    assigned_to_me: Optional[bool] = Query(False),
):
    """
    Get all tickets with filters.
    - status: DRAFT, PROCESSING, RESOLVED, FAILED, IN_REVIEW
    - severity: Low, Moderate, High
    - assigned_to_me: only current user's tickets
    """
    stmt = select(Ticket).order_by(desc(Ticket.id))

    if status_filter:
        try:
            status_enum = TicketStatus[status_filter.upper()]
            stmt = stmt.where(Ticket.status == status_enum)
        except KeyError:
            raise HTTPException(status_code=400, detail=f"Invalid status: {status_filter}")

    if severity_filter:
        stmt = stmt.where(Ticket.severity == severity_filter)

    if assigned_to_me:
        stmt = stmt.where(Ticket.assigned_cs == current_user.full_name)

    result = await db.execute(stmt)
    tickets = result.scalars().all()
    return tickets


@router.get("/tickets/{ticket_id}", response_model=TicketResponse)
async def get_ticket_by_id(
    ticket_id: int,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_cs_or_admin),
):
    """Get single ticket by ID."""
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one_or_none()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket


@router.patch("/tickets/{ticket_id}/status", response_model=TicketResponse)
async def update_ticket_status(
    ticket_id: int,
    payload: TicketStatusUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_cs_or_admin),
):
    """
    Update ticket status. If RESOLVED, clear SLA timer (set to 0).
    """
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one_or_none()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    try:
        new_status = TicketStatus[payload.status.upper()]
        ticket.status = new_status

        # Jika RESOLVED, set SLA jadi 0
        if new_status == TicketStatus.RESOLVED:
            ticket.sla_remaining_minutes = 0
            ticket.sla_deadline = None
    except KeyError:
        raise HTTPException(status_code=400, detail=f"Invalid status: {payload.status}")

    await db.commit()
    await db.refresh(ticket)
    return ticket