from app.llm.provider import llm_provider


class FolderStructureAgent:

    def generate(self, startup_idea: str) -> str:

        history = [
            {
                "role": "user",
                "content": f"""
You are a Senior Software Architect.

Startup Idea:
{startup_idea}

Generate a professional production-ready project folder structure.

Technology Stack:

Frontend:
- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

Backend:
- FastAPI
- Python

Database:
- PostgreSQL

Return ONLY folder structure.

Include:

frontend/
backend/
database/
docker/
docs/

Frontend folders:
- app
- components
- hooks
- lib
- public
- styles
- types

Backend folders:
- api
- agents
- core
- llm
- memory
- models
- schemas
- services

Also include

README.md
requirements.txt
package.json
docker-compose.yml
.env.example

Output in markdown.

Do not explain anything.
"""
            }
        ]

        return llm_provider.generate(history)


folder_agent = FolderStructureAgent()