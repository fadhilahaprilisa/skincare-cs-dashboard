import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    LANGFLOW_API_URL: str = os.getenv("LANGFLOW_API_URL", "http://localhost:7860/api/v1/run/f4fa642c-04ac-41d7-94c8-c2f36f568861")
    LANGFLOW_API_KEY: str = os.getenv("LANGFLOW_API_KEY", "sGOvDuGSEUfMKlj_zCUzpJMVgrJpu5JZwktOnKZjyGM")
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://postgres.azkhcgrvqtfludkbsiwz:LqxR4XU/Ve8V.6m@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres")
    JWT_SECRET_KEY: str = os.getenv("JWT_SECRET_KEY", "fallback-secret")
    JWT_ALGORITHM: str = os.getenv("JWT_ALGORITHM", "HS256")
    JWT_ACCESS_TOKEN_EXPIRE_MINUTES: int = int(
        os.getenv("JWT_ACCESS_TOKEN_EXPIRE_MINUTES", "10080")
    )


settings = Settings()