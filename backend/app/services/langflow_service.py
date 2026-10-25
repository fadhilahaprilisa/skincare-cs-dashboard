import httpx
import json
import re
from app.core.config import settings


def _extract_structured_analysis(complaint: str, ai_text: str) -> dict:
    """
    Extract structured analysis from AI response.
    Parses keywords to determine symptoms, severity, sentiment.
    """
    text_lower = (complaint + " " + ai_text).lower()

    # ===== SYMPTOMS DETECTION =====
    symptom_map = {
        "kemerahan": "Kemerahan Kulit (Redness)",
        "merah": "Kemerahan Kulit (Redness)",
        "redness": "Kemerahan Kulit (Redness)",
        "perih": "Sensasi Perih (Burning)",
        "panas": "Sensasi Panas (Hot Sensation)",
        "mengelupas": "Pengelupasan Kulit (Peeling)",
        "peeling": "Pengelupasan Kulit (Peeling)",
        "gatal": "Gatal (Itching)",
        "bruntusan": "Bruntusan (Small Bumps)",
        "jerawat": "Breakout (Acne)",
        "kering": "Kulit Kering (Dryness)",
        "iritasi": "Iritasi Kulit (Irritation)",
        "bengkak": "Pembengkakan (Swelling)",
    }

    detected_symptoms = []
    for keyword, symptom_name in symptom_map.items():
        if keyword in text_lower and symptom_name not in detected_symptoms:
            detected_symptoms.append(symptom_name)

    if not detected_symptoms:
        detected_symptoms = ["Reaksi Kulit Umum"]

    detected_symptoms = detected_symptoms[:3]  # Max 3 symptoms

    # ===== SEVERITY DETECTION =====
    severity = "Moderate"
    severity_percentage = 58

    severe_keywords = ["parah", "sangat", "hebat", "banget", "akut", "takut", "mengelupas", "bernanah"]
    mild_keywords = ["sedikit", "ringan", "kadang", "kecil"]

    if any(k in text_lower for k in severe_keywords):
        severity = "High"
        severity_percentage = 82
    elif any(k in text_lower for k in mild_keywords):
        severity = "Low"
        severity_percentage = 32

    # ===== SENTIMENT DETECTION =====
    sentiment = "Concerned"
    sentiment_score = 42

    angry_keywords = ["marah", "kecewa", "buruk", "tidak cocok", "parah banget", "mau komplain"]
    positive_keywords = ["terima kasih", "bagus", "suka", "puas", "membantu"]

    if any(k in text_lower for k in angry_keywords):
        sentiment = "Angry"
        sentiment_score = 25
    elif any(k in text_lower for k in positive_keywords):
        sentiment = "Positive"
        sentiment_score = 78
    elif any(k in text_lower for k in ["cemas", "khawatir", "takut", "panik", "bingung"]):
        sentiment = "Concerned"
        sentiment_score = 38
    else:
        sentiment = "Neutral"
        sentiment_score = 55

    # ===== KEY CONCERN =====
    if severity == "High":
        key_concern = "Potensi iritasi akut yang memerlukan tindakan segera dan pemantauan intensif."
    elif severity == "Moderate":
        key_concern = "Potensi iritasi ringan pasca-adaptasi formula. Bukan infeksi maupun reaksi alergi sistemik."
    else:
        key_concern = "Reaksi ringan yang dapat diatasi dengan penyesuaian rutinitas skincare."

    # ===== RECOMMENDATION =====
    recommendation = (
        "Berikan tanggapan yang menenangkan, akui kecemasan customer secara tulus. "
        "Sarankan untuk menghentikan sementara pemakaian produk dan gunakan pelembap dasar. "
        "Anjurkan konsultasi ke dokter spesialis bila keluhan menetap >48 jam. "
        "Dilarang membuat diagnosis medis definitif."
    )

    return {
        "symptoms": detected_symptoms,
        "severity_level": severity,
        "severity_percentage": severity_percentage,
        "sentiment": sentiment,
        "sentiment_score": sentiment_score,
        "key_concern": key_concern,
        "recommendation": recommendation,
    }


async def call_langflow_workflow(user_complaint: str, product: str = "", category: str = ""):
    """
    Call Langflow API. Returns structured analysis + draft reply.
    """
    async with httpx.AsyncClient(timeout=90.0) as client:
        payload = {
            "input_value": user_complaint,
            "output_type": "chat",
            "input_type": "chat",
        }
        headers = {
            "x-api-key": settings.LANGFLOW_API_KEY,
            "Content-Type": "application/json",
        }

        ai_text = ""
        try:
            response = await client.post(
                settings.LANGFLOW_API_URL, json=payload, headers=headers
            )
            response.raise_for_status()
            data = response.json()

            # Robust parsing
            try:
                outputs = data.get("outputs", [])
                if outputs:
                    first_output = outputs[0].get("outputs", [{}])[0]
                    results = first_output.get("results", {})
                    message_data = results.get("message", {})
                    ai_text = message_data.get("text", "")
            except (IndexError, KeyError, TypeError):
                pass

            if not ai_text:
                ai_text = data.get("text", "") or data.get("output", "")

            if not ai_text:
                ai_text = "Terima kasih atas laporannya. Kami akan segera menindaklanjuti keluhan ini."

        except httpx.HTTPStatusError as e:
            ai_text = f"Error API Langflow: {e.response.status_code}"
        except httpx.RequestError as e:
            ai_text = f"Error koneksi ke Langflow: {str(e)}"
        except Exception as e:
            ai_text = f"Error umum: {str(e)}"

        # ===== EXTRACT STRUCTURED ANALYSIS =====
        structured = _extract_structured_analysis(user_complaint, ai_text)

        # Build analysis summary
        analysis_summary = (
            f"Kategori: {structured['severity_level']} — "
            f"Gejala: {', '.join(structured['symptoms'])}. "
            f"Sentimen: {structured['sentiment']} "
            f"(skor {structured['sentiment_score']}/100). "
            f"{structured['key_concern']}"
        )

        # Store structured analysis as JSON string di ai_analysis
        # Prefix dengan __STRUCTURED__ marker
        structured_json = json.dumps(structured)

        return {
            "analysis": analysis_summary,
            "draft_reply": ai_text,
            "structured": structured,  # untuk API response
            "structured_json": structured_json,  # untuk DB storage
        }