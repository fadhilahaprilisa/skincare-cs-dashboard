from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from app.models.ticket import Base
from app.core.database import engine
from app.models.user import User, UserRole
from app.core.security import hash_password
from app.api.v1.endpoints import auth, tickets, analytics, insights, export

# Inisialisasi aplikasi FastAPI
app = FastAPI(
    title="Skincare CS Dashboard API",
    description="API untuk mengintegrasikan Langflow AI (Sequential Prompt Chaining) ke dalam dashboard customer service.",
    version="1.0.0"
)


# ==========================================
# EVENT STARTUP: Buat tabel & seed users
# ==========================================
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Database tables checked/created successfully!")

    from app.core.database import AsyncSessionLocal
    async with AsyncSessionLocal() as session:
        # Seed Admin
        result = await session.execute(
            select(User).where(User.email == "admin@lumiereskin.id")
        )
        if not result.scalar_one_or_none():
            session.add(User(
                email="admin@lumiereskin.id",
                full_name="Dr. Adrian Wicaksono",
                role=UserRole.ADMIN,
                role_label="Admin & Head of Care",
                initials="AW",
                hashed_password=hash_password("admin123"),
            ))
            print("✅ Seeded admin: admin@lumiereskin.id / admin123")

        # Seed CS
        result = await session.execute(
            select(User).where(User.email == "sarah@lumiereskin.id")
        )
        if not result.scalar_one_or_none():
            session.add(User(
                email="sarah@lumiereskin.id",
                full_name="Sarah Pramudita",
                role=UserRole.CS,
                role_label="CS Agent",
                initials="SP",
                hashed_password=hash_password("cs123"),
            ))
            print("✅ Seeded CS Agent: sarah@lumiereskin.id / cs123")

        await session.commit()


# ==========================================
# CORS Middleware
# ==========================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# REGISTER ROUTERS
# PENTING: Export router didaftarkan SEBELUM tickets router
# agar /api/v1/export/tickets tidak bentrok dengan /api/v1/tickets/{id}
# ==========================================
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])
app.include_router(insights.router, prefix="/api/v1/insights", tags=["AI Insights"])
app.include_router(export.router, prefix="/api/v1", tags=["Export"])
app.include_router(tickets.router, prefix="/api/v1", tags=["Tickets"])  # ← PALING AKHIR


# Root endpoint
@app.get("/")
async def root():
    return {
        "message": "Skincare CS Dashboard is running!",
        "docs": "/docs",
        "status": "Online"
    }