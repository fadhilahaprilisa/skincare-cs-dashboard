import os
from dotenv import load_dotenv

load_dotenv()

class Settings:
    LANGFLOW_API_URL: str = os.getenv("LANGFLOW_API_URL", "http://localhost:7860/api/v1/run/f4fa642c-04ac-41d7-94c8-c2f36f568861")
    LANGFLOW_API_KEY: str = os.getenv("LANGFLOW_API_KEY", "sGOvDuGSEUfMKlj_zCUzpJMVgrJpu5JZwktOnKZjyGM")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres.azkhcgrvqtfludkbsiwz:LqxR4XU/Ve8V.6m@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres")

settings = Settings()