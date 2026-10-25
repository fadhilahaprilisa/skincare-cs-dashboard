from fastapi import APIRouter, Depends
from fastapi.responses import StreamingResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from io import StringIO
import csv
from datetime import datetime
from app.core.database import get_db
from app.models.ticket import Ticket
from app.api.deps import require_admin
from app.models.user import User


router = APIRouter()


@router.get("/export/tickets")
async def export_tickets_csv(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_admin),
):
    """Export all tickets as CSV."""
    result = await db.execute(select(Ticket).order_by(Ticket.id.desc()))
    tickets = result.scalars().all()

    output = StringIO()
    output.write("\ufeff")  # BOM for Excel

    writer = csv.writer(output)
    writer.writerow([
        "Ticket ID", "Customer Name", "Product", "Product Batch",
        "Category", "Severity", "Status", "Assigned CS",
        "Created At", "Complaint Text", "AI Analysis", "AI Draft Reply",
    ])

    for t in tickets:
        writer.writerow([
            f"#TK-{str(t.id).zfill(4)}",
            t.customer_name or "",
            t.product or "",
            t.product_batch or "",
            t.category or "",
            t.severity or "",
            t.status.value if t.status else "",
            t.assigned_cs or "",
            t.created_at.strftime("%Y-%m-%d %H:%M:%S") if t.created_at else "",
            (t.complaint_text or "").replace("\n", " "),
            (t.ai_analysis or "").replace("\n", " "),
            (t.ai_draft_reply or "").replace("\n", " "),
        ])

    output.seek(0)
    filename = f"lumiere_tickets_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv"

    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )