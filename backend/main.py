from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import tickets

# Inisialisasi aplikasi FastAPI
app = FastAPI(
    title="Skincare CS Dashboard API",
    description="API untuk mengintegrasikan Langflow AI (Sequential Prompt Chaining) ke dalam dashboard customer service.",
    version="1.0.0"
)

# ==========================================
# KONFIGURASI CORS (Agar frontend React nanti bisa akses)
# ==========================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Untuk development, izinkan semua origin. Nanti di production kita batasi.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Daftarkan semua endpoint yang ada di file tickets.py
# Semua endpoint akan punya prefix /api/v1
app.include_router(tickets.router, prefix="/api/v1", tags=["Tickets"])

# Root endpoint untuk cek apakah server hidup
@app.get("/")
async def root():
    return {
        "message": "Skincare CS Dashboard is running!",
        "docs": "/docs",
        "status": "Online"
    }