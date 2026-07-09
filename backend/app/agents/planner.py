from app.llm.provider import llm_provider


class PlannerAgent:

    def plan(self, startup_idea: str) -> str:

        history = [
            {
                "role": "user",
                "content": f"""
You are a Senior Product Manager.

Startup Idea:
{startup_idea}

Create a professional Development Plan.

Return ONLY the following sections.

# Features
- List all major features.

# User Roles
- List all user roles.

# Functional Requirements
- Bullet points only.

# Non-Functional Requirements
- Performance
- Security
- Scalability

Rules:

- Do NOT generate software architecture.
- Do NOT generate database design.
- Do NOT generate REST APIs.
- Do NOT generate deployment.
- Do NOT generate cost estimation.
- Output in Markdown.
"""
            }
        ]

        return llm_provider.generate(history)


planner_agent = PlannerAgent()