from app.llm.provider import llm_provider


class SQLAgent:

    def generate(self, database_design: str) -> str:

        history = [
            {
                "role": "user",
                "content": f"""
You are a Senior PostgreSQL Database Engineer.

Below is the database design.

{database_design}

Generate production-ready PostgreSQL SQL schema.

Requirements:

- Return ONLY SQL.
- Use CREATE TABLE statements.
- Add PRIMARY KEY.
- Add FOREIGN KEY.
- Use proper PostgreSQL data types.
- Add NOT NULL where required.
- Add UNIQUE constraints where needed.
- Do not explain anything.
- No markdown.
"""
            }
        ]

        return llm_provider.generate(history)


sql_agent = SQLAgent()