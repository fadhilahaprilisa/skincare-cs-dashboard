# ✨ Lumière Skin - AI-Powered Skincare CS Dashboard

**Lumière Skin** is a full-stack, production-ready customer service dashboard built to automate and streamline skincare complaint handling. By integrating **Langflow** with **Gemini 2.5 Flash** (Sequential Prompt Chaining), the system intelligently analyzes customer complaints and generates empathetic, structured draft replies—empowering CS teams to respond faster and more effectively.

> **"Nuansa premium, berkesan bersinar dan sehat."**

<img width="1365" height="689" alt="Screenshot 2026-08-21 175148" src="https://github.com/user-attachments/assets/64ef90af-761b-4ff4-9d2c-c59e494777a1" />


---

## 🚀 Key Features

- **AI-Powered Analysis**: Uses a 2-node Langflow chain (AI Data Analyst → Senior CX Manager) to detect product irritation levels and craft professional responses.
- **Real-time Dashboard**: Built with React and Tailwind CSS, featuring a dynamic ticket list with expandable AI reply previews.
- **Persistent Storage**: PostgreSQL (Supabase) database to securely store all ticket histories.
- **Production-Ready Backend**: FastAPI with async support, CORS configuration, and environment variable management.
- **Professional Git Flow**: Organized branches (`phase-1` to `phase-5`) demonstrating industry-standard development practices.

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 18, Vite, Tailwind CSS |
| **Backend** | FastAPI (Python 3.11+) |
| **Database** | PostgreSQL (Supabase) |
| **AI Orchestration** | Langflow (Local) + Gemini 2.5 Flash |
| **Package Manager** | npm (Frontend), pip (Backend) |

---

## 📂 Project Structure
skincare-cs-dashboard/
├── backend/
│ ├── app/
│ │ ├── api/ # REST API endpoints (v1)
│ │ ├── core/ # Config & DB connection
│ │ ├── models/ # SQLAlchemy models
│ │ ├── schemas/ # Pydantic schemas
│ │ └── services/ # Langflow AI integration
│ ├── .env # Environment variables (excluded from git)
│ ├── .env.example # Template for env variables
│ ├── main.py # FastAPI entry point
│ └── requirements.txt
├── frontend/
│ ├── src/
│ │ ├── components/ # React components (Form, List, Layout)
│ │ ├── App.jsx
│ │ └── index.css
│ ├── package.json
│ └── tailwind.config.js
└── README.md

---

## ⚙️ Prerequisites

- **Python 3.11+** and `pip`
- **Node.js 18+** and `npm`
- **PostgreSQL** or a **Supabase** account (free tier works)
- **Langflow** installed locally (`pip install langflow -U`)

---

## 🏃 How to Run the Project Locally

Follow these steps in order:

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR_USERNAME/skincare-cs-dashboard.git
cd skincare-cs-dashboard

2. Set Up the Backend (FastAPI)
# Navigate to backend
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Configure environment variables
cp .env.example .env
# Edit .env and fill in your Langflow URL/Key and Database URL.

Important: Make sure to:

Replace YOUR_FLOW_ID_HERE with your Langflow Flow ID.

Replace YOUR_LANGFLOW_API_KEY_HERE with your Langflow API Key.

Replace YOUR_PASSWORD and YOUR_REFERENCE with your Supabase/PostgreSQL credentials.

3. Run Langflow (AI Engine)
Open a new terminal and run:

3. Run Langflow (AI Engine)
Open a new terminal and run:
python -m langflow run
(Default address: http://127.0.0.1:7861)

Ensure your workflow is active and contains the 2-node chain (Analyst → CX Manager).

4. Start the Backend Server
In the backend terminal, run:

bash
uvicorn main:app --reload
The API will be available at http://localhost:8000. You can test it via Swagger UI at http://localhost:8000/docs.

5. Set Up the Frontend (React)
Open a third terminal (or split your current one):

bash
cd frontend
npm install
npm run dev
The dashboard will be available at http://localhost:5173.

🧪 Testing the Flow
Open http://localhost:5173.

Fill in the Customer Name and Complaint.

Click "Kirim ke AI".

The backend will:

Store the ticket in the database.

Send the complaint to Langflow.

Update the ticket with the AI-generated reply.

The dashboard table will refresh, showing the new ticket. Click "Lihat Balasan" to read the full empathetic reply from the AI.

📸 Screenshots
<img width="1365" height="689" alt="Screenshot 2026-08-21 175148" src="https://github.com/user-attachments/assets/cd51b54a-4574-40ae-8b45-a0af006185f2" />


Main Dashboard: Overview of ticket form and list.

AI Response View: Expanded view of the AI draft reply.

🗂️ Branch Structure (Git Flow)
This project was built following a structured branching strategy to simulate an enterprise environment:

main → Production-ready code.

phase-1-backend-setup → Environment, config, and dependencies.

phase-2-ai-integration → Langflow service and Pydantic schemas.

phase-3-api-testing → REST API endpoints and Swagger testing.

phase-4-fullstack-build → PostgreSQL integration and React UI setup.

phase-5-frontend-integration → Final API connection, UI enhancements, and documentation.

🤝 Contributing
This project is part of my portfolio to demonstrate full-stack AI engineering capabilities. Feedback and suggestions are always welcome!

📝 License
This project is for educational and portfolio purposes.

text

---

### 📤 3. PUSH KE GITHUB & MERGE KE MAIN

Sekarang kita push semua file baru (`README.md` dan `backend/.env.example`) ke branch `phase-5-frontend-integration`, lalu merge ke `main`.

Buka terminal VS Code di **root proyek** `skincare-cs-dashboard` dan jalankan perintah ini:

```bash
# 1. Pastikan kita di branch phase-5-frontend-integration
git checkout phase-5-frontend-integration

# 2. Tambahkan semua file baru (README, .env.example, dll)
git add .

# 3. Commit dengan pesan final
git commit -m "docs: add README and .env.example, finalize Phase 5 documentation"

# 4. Push ke GitHub
git push origin phase-5-frontend-integration

# 5. Pindah ke branch main
git checkout main

# 6. Tarik perubahan terbaru dari main (pastikan main terupdate)
git pull origin main

# 7. Merge branch phase-5-frontend-integration ke main
git merge phase-5-frontend-integration

# 8. Push main ke GitHub
git push origin main
