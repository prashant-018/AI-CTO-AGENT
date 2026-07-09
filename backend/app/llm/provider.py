from app.llm.groq import groq_client


class LLMProvider:

    def generate(self, history: list) -> str:

        return groq_client.generate_response(history)


llm_provider = LLMProvider()