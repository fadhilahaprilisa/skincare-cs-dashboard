from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import tickets
from app.models.ticket import Base
from app.core.database import engine

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
        # run_sync menjalankan perintah SQLAlchemy sync (create_all) di lingkungan async
        await conn.run_sync(Base.metadata.create_all)
    print("✅ Database tables checked/created successfully!")

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
app.include_router(tickets.router, prefix="/api/v1", tags=["Tickets"])

# Root endpoint untuk cek apakah server hidup
@app.get("/")
async def root():
    return {
        "message": "Skincare CS Dashboard is running!",
        "docs": "/docs",
        "status": "Online"
    }