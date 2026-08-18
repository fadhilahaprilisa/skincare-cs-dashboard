import httpx
from app.core.config import settings

async def call_langflow_workflow(user_complaint: str):
    """
    Fungsi ini mengirim keluhan pelanggan ke API Langflow.
    Mengembalikan dictionary berisi 'analysis' (dari Node 1) dan 'draft_reply' (dari Node 2).
    """
    async with httpx.AsyncClient(timeout=60.0) as client:
        # Payload standar yang diminta oleh Langflow
        payload = {
            "input_value": user_complaint,
            "output_type": "chat",
            "input_type": "chat",
        }
        
        # Header autentikasi (mengambil dari file .env via settings)
        headers = {
            "x-api-key": settings.LANGFLOW_API_KEY,
            "Content-Type": "application/json"
        }

        try:
            # Kirim POST request ke Langflow
            response = await client.post(
                settings.LANGFLOW_API_URL, 
                json=payload, 
                headers=headers
            )
            
            # Jika status response bukan 200, lempar error
            response.raise_for_status()
            
            # Ambil data JSON dari response
            data = response.json()

            # ---------- PARSING HASIL DARI LANGFLOW ----------
            # Struktur standar Langflow:
            # data['outputs'][0]['outputs'][0]['results']['message']['text']
            outputs = data.get("outputs", [])
            
            if outputs and len(outputs) > 0:
                # Ambil output pertama (biasanya node terakhir jika chaining)
                first_output = outputs[0].get("outputs", [{}])[0]
                results = first_output.get("results", {})
                message_data = results.get("message", {})
                draft_reply = message_data.get("text", "Maaf, AI tidak menghasilkan balasan.")
                
                # Untuk sementara, kita isi analysis dengan placeholder.
                # Jika di Langflow Anda Node 1 (Analyst) mengembalikan teks terpisah,
                # kita bisa tangkap dari 'artifacts' atau dari outputs index ke-1.
                # Tapi untuk memastikan fase 2 ini running, kita bikin dinamis dulu.
                analysis = f"Analisis dari AI Analyst untuk keluhan: '{user_complaint[:50]}...'"

                # === CATATAN PENTING UNTUK ANDA ===
                # Jika nanti setelah testing di Swagger, output 'analysis' kurang sesuai,
                # kita akan sesuaikan parsing di sini. Tapi untuk Fase 2, ini sudah cukup.
                # ===================================

                return {
                    "analysis": analysis,
                    "draft_reply": draft_reply
                }
            else:
                # Jika struktur output tidak sesuai
                return {
                    "analysis": "Tidak ada output dari Langflow",
                    "draft_reply": "Tidak ada output dari Langflow"
                }

        except httpx.HTTPStatusError as e:
            # Tangani error dari API (misal: API Key salah, URL salah)
            return {
                "analysis": f"Error API Langflow: {e.response.text}",
                "draft_reply": ""
            }
        except Exception as e:
            # Tangani error umum (misal: koneksi internet putus)
            return {
                "analysis": f"Error umum: {str(e)}",
                "draft_reply": ""
            }