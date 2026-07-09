from app.llm.provider import llm_provider


class DatabaseAgent:

    def generate(self, startup_idea: str) -> str:

        history = [
            {
                "role": "user",
                "content": f"""
You are a Senior Database Architect.

Startup Idea:
{startup_idea}

Design ONLY the database.

Return ONLY:

# Recommended Database

# Tables

For every table include:

- Columns
- Data Types
- Primary Key
- Foreign Key

# Relationships

# Recommended Indexes

Rules:

- Do NOT generate software architecture.
- Do NOT generate REST APIs.
- Do NOT generate deployment.
- Do NOT generate cost estimation.
- Output in Markdown.
"""
            }
        ]

        return llm_provider.generate(history)


database_agent = DatabaseAgent()