from app.llm.provider import llm_provider


class ArchitectureAgent:

    def generate(self, startup_idea: str) -> str:

        history = [
            {
                "role": "user",
                "content": f"""
You are a Senior Software Architect.

Startup Idea:
{startup_idea}

Design ONLY the software architecture.

Return ONLY:

# Architecture Style

# Frontend

# Backend

# Database Recommendation

# Cache

# Message Queue (If Needed)

# Cloud Services

# Data Flow

Rules:

- Do NOT generate features.
- Do NOT generate database tables.
- Do NOT generate APIs.
- Do NOT generate deployment.
- Do NOT generate cost estimation.
- Output in Markdown.
"""
            }
        ]

        return llm_provider.generate(history)


architecture_agent = ArchitectureAgent()