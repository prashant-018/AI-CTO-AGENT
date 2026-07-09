from app.llm.provider import llm_provider


class PackageAgent:

    def generate(self, idea: str):

        history = [
            {
                "role": "user",
                "content": f"""
You are an Expert Full Stack Software Architect.

Generate ONLY the package.json for the following project.

Project Idea:
{idea}

Rules:
- Return only package.json
- No explanation
- No markdown
- No code block
- Include scripts
- Include dependencies
- Include devDependencies
- Production ready
"""
            }
        ]

        return llm_provider.generate(history)


package_agent = PackageAgent()