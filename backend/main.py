from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import tickets
from app.models.ticket import Base
from app.core.database import engine
from app.api.v1.endpoints import auth
from app.models.user import User, UserRole
from app.core.security import hash_password
from sqlalchemy import select
from app.api.v1.endpoints import auth, analytics
from app.api.v1.endpoints import auth, analytics, insights

# Inisialisasi aplikasi FastAPI
app = FastAPI(
    title="Skincare CS Dashboard API",
    description="API untuk mengintegrasikan Langflow AI (Sequential Prompt Chaining) ke dalam dashboard customer service.",
    version="1.0.0"
)

# ==========================================
# EVENT STARTUP: Buat tabel di database (jika belum ada)
# ==========================================
@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Database tables checked/created successfully!")

    # ===== SEED USERS (hanya jika belum ada) =====
    from app.core.database import AsyncSessionLocal

    async with AsyncSessionLocal() as session:
        # Admin seed
        admin_email = "admin@lumiereskin.id"
        result = await session.execute(select(User).where(User.email == admin_email))
        if not result.scalar_one_or_none():
            admin = User(
                email=admin_email,
                full_name="Dr. Adrian Wicaksono",
                role=UserRole.ADMIN,
                role_label="Admin & Head of Care",
                initials="AW",
                hashed_password=hash_password("admin123"),
            )
            session.add(admin)
            print(f"✅ Seeded admin: {admin_email} / admin123")

        # CS Agent seed
        cs_email = "sarah@lumiereskin.id"
        result = await session.execute(select(User).where(User.email == cs_email))
        if not result.scalar_one_or_none():
            cs = User(
                email=cs_email,
                full_name="Sarah Pramudita",
                role=UserRole.CS,
                role_label="CS Agent",
                initials="SP",
                hashed_password=hash_password("cs123"),
            )
            session.add(cs)
            print(f"✅ Seeded CS Agent: {cs_email} / cs123")

        await session.commit()

# ==========================================
# KONFIGURASI CORS (Agar frontend React nanti bisa akses)
# ==========================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Untuk development, izinkan semua origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Daftarkan semua endpoint yang ada di file tickets.py
app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])
app.include_router(tickets.router, prefix="/api/v1", tags=["Tickets"])
app.include_router(analytics.router, prefix="/api/v1/analytics", tags=["Analytics"])
app.include_router(insights.router, prefix="/api/v1/insights", tags=["AI Insights"])

# Root endpoint untuk cek apakah server hidup
@app.get("/")
async def root():
    return {
        "message": "Skincare CS Dashboard is running!",
        "docs": "/docs",
        "status": "Online"
    }