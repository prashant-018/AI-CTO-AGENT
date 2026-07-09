from google import genai
from google.genai import types

from backend.app.core.config import settings


class GeminiClient:

    def __init__(self):

        self.client = genai.Client(
            api_key=settings.GEMINI_API_KEY
        )

        self.model = settings.MODEL_NAME

        self.system_prompt = """
You are a helpful AI Assistant.

You specialize in:
- AI Engineering
- Programming
- Machine Learning

Rules:
- Answer naturally.
- Explain code step by step.
- Keep answers concise.
- If you don't know something, say you don't know.
"""

    def generate_response(self, history: list) -> str:

        try:

            prompt = self.system_prompt + "\n\n"

            for message in history:

                if message["role"] == "user":
                    prompt += f"User: {message['content']}\n"

                else:
                    prompt += f"Assistant: {message['content']}\n"

            prompt += "\nAssistant:"

            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.7,
                    max_output_tokens=2048,
                ),
            )

            return response.text

        except Exception as e:
            raise Exception(f"Gemini Error: {str(e)}")


gemini_client = GeminiClient()