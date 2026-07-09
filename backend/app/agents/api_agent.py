from app.llm.provider import llm_provider


class APIAgent:

    def generate(self, startup_idea: str) -> str:

        history = [
            {
                "role": "user",
                "content": f"""
You are a Senior Backend Engineer.

Startup Idea:
{startup_idea}

Design ONLY the REST APIs.

Return ONLY:

For every API include:

- HTTP Method
- Endpoint
- Description
- Request Body
- Response Body

Rules:

- Do NOT generate software architecture.
- Do NOT generate database design.
- Do NOT generate deployment.
- Do NOT generate cost estimation.
- Output in Markdown.
"""
            }
        ]

        return llm_provider.generate(history)


api_agent = APIAgent()