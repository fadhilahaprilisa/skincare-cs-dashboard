from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, desc
from typing import Optional
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
    Create new ticket + auto-trigger AI analysis.
    Requires: CS Agent or Admin.
    """
    new_ticket = Ticket(
        customer_name=ticket.customer_name,
        complaint_text=ticket.complaint_text,
        product=ticket.product,
        product_batch=ticket.product_batch,
        category=ticket.category,
        severity=ticket.severity,
        assigned_cs=ticket.assigned_cs or current_user.full_name,
        status=TicketStatus.PROCESSING,
    )
    db.add(new_ticket)
    await db.commit()
    await db.refresh(new_ticket)

    # Panggil Langflow AI
    ai_result = await call_langflow_workflow(ticket.complaint_text)

    new_ticket.ai_analysis = ai_result.get("analysis")
    new_ticket.ai_draft_reply = ai_result.get("draft_reply")

    if ai_result.get("draft_reply") and "Error" not in ai_result.get("analysis", ""):
        new_ticket.status = TicketStatus.RESOLVED
    else:
        new_ticket.status = TicketStatus.FAILED

    await db.commit()
    await db.refresh(new_ticket)
    return new_ticket


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
    - status: PROCESSING, RESOLVED, FAILED, IN_REVIEW
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
    """Update ticket status (RESOLVED, FAILED, IN_REVIEW, PROCESSING)."""
    result = await db.execute(select(Ticket).where(Ticket.id == ticket_id))
    ticket = result.scalar_one_or_none()
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")

    try:
        ticket.status = TicketStatus[payload.status.upper()]
    except KeyError:
        raise HTTPException(status_code=400, detail=f"Invalid status: {payload.status}")

    await db.commit()
    await db.refresh(ticket)
    return ticket