from app.llm.provider import llm_provider
import json


class IdeaAnalyzer:

    def analyze(self, startup_idea: str) -> dict:

        history = [
            {
                "role": "user",
                "content": f"""
You are an Expert Startup Consultant and Senior CTO.

Analyze the startup idea.

Startup Idea:
{startup_idea}

If the input is NOT a software startup idea
(example: hi, hello, ok, thanks, xyz)

Return JSON:

{{
    "valid": false,
    "message": "Please provide a valid software startup idea."
}}

Otherwise return ONLY valid JSON.

Format:

{{
    "valid": true,
    "project_name": "",
    "project_type": "",
    "industry": "",

    "frontend": "",
    "backend": "",
    "database": "",
    "cache": "",
    "cloud": "",
    "authentication": "",

    "features":[]
}}

Rules:

- Return ONLY JSON.
- No markdown.
- No explanation.
- No extra text.
"""
            }
        ]

        response = llm_provider.generate(history)

        try:
            return json.loads(response)

        except Exception:

            return {
                "valid": False,
                "message": "Unable to analyze startup idea."
            }


idea_analyzer = IdeaAnalyzer()