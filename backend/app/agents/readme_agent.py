from app.llm.provider import llm_provider


class ReadmeAgent:

    def generate(self, blueprint: str) -> str:

        history = [
            {
                "role": "user",
                "content": f"""
You are a Senior Software Engineer.

Below is a software project blueprint.

{blueprint}

Generate a professional README.md.

Return ONLY markdown.

Include the following sections:

# Project Title

# Overview

# Features

# Tech Stack

# Project Structure

# Installation

# Environment Variables

# Run Project

# API Endpoints

# Future Improvements

# License

Do not explain anything.
Do not use markdown code fences.
Return only README content.
"""
            }
        ]

        return llm_provider.generate(history)


readme_agent = ReadmeAgent()