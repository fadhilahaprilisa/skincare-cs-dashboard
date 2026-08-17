import os
from dotenv import load_dotenv

load_dotenv()  # Muat isi file .env

class Settings:
    LANGFLOW_API_URL: str = os.getenv("LANGFLOW_API_URL", "")
    LANGFLOW_API_KEY: str = os.getenv("LANGFLOW_API_KEY", "")

settings = Settings()