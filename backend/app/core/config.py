import os
from dotenv import load_dotenv

load_dotenv()


class Settings:

    def __init__(self):

        # App
        self.APP_NAME = os.getenv(
            "APP_NAME",
            "AI CTO Agent"
        )

        self.DEBUG = os.getenv(
            "DEBUG",
            "True"
        ).lower() == "true"

        # LLM Model
        self.MODEL_NAME = os.getenv(
            "MODEL_NAME",
            "llama-3.3-70b-versatile"
        )

        # Groq API Key
        self.GROQ_API_KEY = os.getenv("GROQ_API_KEY")

        if not self.GROQ_API_KEY:
            raise ValueError("❌ GROQ_API_KEY not found in .env")


settings = Settings()