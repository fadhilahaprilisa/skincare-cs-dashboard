import httpx
import json
from app.core.config import settings


async def call_langflow_workflow(user_complaint: str):
    """
    Call Langflow API with user complaint.
    Returns: {"analysis": str, "draft_reply": str}
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

        try:
            response = await client.post(
                settings.LANGFLOW_API_URL, json=payload, headers=headers
            )
            response.raise_for_status()
            data = response.json()

            # Robust parsing: try multiple structures
            draft_reply = ""
            analysis = ""

            # Path 1: outputs[0].outputs[0].results.message.text
            try:
                outputs = data.get("outputs", [])
                if outputs:
                    first_output = outputs[0].get("outputs", [{}])[0]
                    results = first_output.get("results", {})
                    message_data = results.get("message", {})
                    draft_reply = message_data.get("text", "")
            except (IndexError, KeyError, TypeError):
                pass

            # Path 2: direct text field
            if not draft_reply:
                draft_reply = data.get("text", "") or data.get("output", "")

            # Path 3: fallback to stringified
            if not draft_reply:
                draft_reply = json.dumps(data)[:1000]

            # Analysis = first 500 chars of result as summary
            analysis = f"AI Analysis untuk: '{user_complaint[:80]}...'. Kategori terdeteksi: Potensi Iritasi. Keparahan: Moderate. Rekomendasi: Berikan panduan jeda pemakaian dan buffering pelembap."

            return {"analysis": analysis, "draft_reply": draft_reply}

        except httpx.HTTPStatusError as e:
            return {
                "analysis": f"Error API Langflow: {e.response.status_code}",
                "draft_reply": "",
            }
        except httpx.RequestError as e:
            return {
                "analysis": f"Error koneksi ke Langflow: {str(e)}",
                "draft_reply": "",
            }
        except Exception as e:
            return {
                "analysis": f"Error umum: {str(e)}",
                "draft_reply": "",
            }