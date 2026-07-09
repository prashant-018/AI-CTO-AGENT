import time
import re

from groq import Groq, RateLimitError

from app.core.config import settings
from app.tools.tool_definitions import calculator_tool


class GroqClient:

    def __init__(self):
        self.client = Groq(
            api_key=settings.GROQ_API_KEY
        )

        self.model = settings.MODEL_NAME

        # Fallback models to try when rate-limited on the primary model
        self.fallback_models = [
            "llama-3.1-8b-instant",
            "gemma2-9b-it",
        ]

        self.system_prompt = """
You are an AI CTO Agent.

You help users by generating:
- Development Plans
- System Architecture
- Database Design
- API Design
- Folder Structure
- Software Blueprint
- README Files
- SQL Schema

Always answer professionally.
"""

        self.max_retries = 3
        self.base_delay = 5  # seconds

    def _extract_retry_after(self, error_message: str) -> float:
        """Extract retry-after duration from Groq error message."""
        match = re.search(r'Please try again in (\d+)m([\d.]+)s', str(error_message))
        if match:
            minutes = int(match.group(1))
            seconds = float(match.group(2))
            return minutes * 60 + seconds
        return 0

    def generate_response(self, history: list) -> str:

        messages = [
            {
                "role": "system",
                "content": self.system_prompt
            }
        ]

        for message in history:
            messages.append({
                "role": message["role"],
                "content": message["content"]
            })

        # Try primary model with retries
        last_error = None
        for attempt in range(self.max_retries):
            try:
                response = self.client.chat.completions.create(
                    model=self.model,
                    messages=messages,
                    tools=[calculator_tool],
                    tool_choice="auto",
                    temperature=0.7,
                    max_tokens=2048,
                )

                print("\n========== GROQ RESPONSE ==========")
                print(response.choices[0].message)
                print("===================================\n")

                return response.choices[0].message.content

            except RateLimitError as e:
                last_error = e
                retry_after = self._extract_retry_after(str(e))

                if retry_after > 60:
                    # Rate limit too long, try fallback models instead
                    print(f"\n⚠️ Rate limit on {self.model}: wait time {retry_after:.0f}s is too long. Trying fallback models...")
                    break

                wait_time = min(self.base_delay * (2 ** attempt), 30)
                print(f"\n⚠️ Rate limited (attempt {attempt + 1}/{self.max_retries}). Retrying in {wait_time}s...")
                time.sleep(wait_time)

        # Try fallback models
        for fallback_model in self.fallback_models:
            try:
                print(f"\n🔄 Trying fallback model: {fallback_model}")
                response = self.client.chat.completions.create(
                    model=fallback_model,
                    messages=messages,
                    temperature=0.7,
                    max_tokens=2048,
                )

                print("\n========== GROQ RESPONSE (FALLBACK) ==========")
                print(f"Model: {fallback_model}")
                print(response.choices[0].message)
                print("================================================\n")

                return response.choices[0].message.content

            except RateLimitError:
                print(f"⚠️ Fallback model {fallback_model} also rate limited.")
                continue
            except Exception as e:
                print(f"⚠️ Fallback model {fallback_model} failed: {e}")
                continue

        # All models exhausted — raise a clear error
        raise RateLimitError(
            message=f"Rate limit exceeded on all available models. Please wait a few minutes and try again. Original error: {last_error}",
            response=getattr(last_error, 'response', None),
            body=getattr(last_error, 'body', None),
        )


groq_client = GroqClient()