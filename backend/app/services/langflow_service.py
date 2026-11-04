import httpx
import json
from app.core.config import settings

def _extract_structured_analysis(complaint: str, ai_text: str) -> dict:
    # (Biarkan sama seperti sebelumnya)
    text_lower = (complaint + " " + ai_text).lower()
    symptom_map = {"kemerahan": "Kemerahan Kulit (Redness)", "merah": "Kemerahan Kulit (Redness)", "perih": "Sensasi Perih (Burning)", "panas": "Sensasi Panas (Hot Sensation)", "mengelupas": "Pengelupasan Kulit (Peeling)", "gatal": "Gatal (Itching)", "bruntusan": "Bruntusan (Small Bumps)", "iritasi": "Iritasi Kulit (Irritation)"}
    detected_symptoms = [v for k, v in symptom_map.items() if k in text_lower][:3]
    if not detected_symptoms: detected_symptoms = ["Reaksi Kulit Umum"]
    
    severity = "Moderate"
    if any(k in text_lower for k in ["parah", "sangat", "banget", "mengelupas"]): severity = "High"
    elif any(k in text_lower for k in ["sedikit", "ringan"]): severity = "Low"
    
    sentiment = "Concerned"
    if any(k in text_lower for k in ["marah", "kecewa", "buruk"]): sentiment = "Angry"
    elif any(k in text_lower for k in ["terima kasih", "bagus", "puas"]): sentiment = "Positive"
    elif not any(k in text_lower for k in ["cemas", "khawatir", "takut"]): sentiment = "Neutral"

    return {
        "symptoms": detected_symptoms, "severity_level": severity, "sentiment": sentiment,
        "sentiment_score": 42 if sentiment == "Concerned" else 25 if sentiment == "Angry" else 55,
        "key_concern": f"Potensi iritasi {severity.lower()} pasca-adaptasi formula.",
    }

async def call_langflow_workflow(user_complaint: str, product: str = "", category: str = ""):
    # NAIKKAN TIMEOUT JADI 120 DETIK
    async with httpx.AsyncClient(timeout=120.0) as client:
        payload = {"input_value": user_complaint, "output_type": "chat", "input_type": "chat"}
        headers = {"x-api-key": settings.LANGFLOW_API_KEY, "Content-Type": "application/json"}

        try:
            response = await client.post(settings.LANGFLOW_API_URL, json=payload, headers=headers)
            response.raise_for_status()
            data = response.json()

            # PARSING JSON (Struktur: outputs[0].outputs[0].results.message.text)
            ai_text = ""
            try:
                outputs = data.get("outputs", [])
                if outputs:
                    first_output = outputs[0].get("outputs", [{}])[0]
                    results = first_output.get("results", {})
                    message_data = results.get("message", {})
                    ai_text = message_data.get("text", "")
            except Exception:
                pass
            
            if not ai_text:
                ai_text = "AI tidak menghasilkan teks. Cek log backend."

            structured = _extract_structured_analysis(user_complaint, ai_text)
            analysis_summary = (
                f"Kategori: {structured['severity_level']} — Gejala: {', '.join(structured['symptoms'])}. "
                f"Sentimen: {structured['sentiment']}."
            )
            return {"analysis": analysis_summary, "draft_reply": ai_text, "structured": structured}

        except httpx.TimeoutException:
            return {"analysis": "AI Timeout: Langflow memakan waktu lebih dari 120 detik. Coba lagi.", "draft_reply": "", "structured": None}
        except Exception as e:
            return {"analysis": f"Error koneksi ke Langflow: {str(e)}", "draft_reply": "", "structured": None}