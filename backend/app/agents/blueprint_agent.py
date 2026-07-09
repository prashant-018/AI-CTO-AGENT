from app.llm.provider import llm_provider


class BlueprintAgent:

    def generate(
        self,
        idea: str,
        planner: str,
        architecture: str,
        database: str,
        api: str,
        folder: str,
    ) -> str:

        history = [
            {
                "role": "user",
                "content": f"""
You are a Principal Software Architect at Google.

Your task is to generate a clean, modern, professional Software Blueprint.

Project Idea

{idea}

Development Plan

{planner}

Architecture

{architecture}

Database

{database}

REST APIs

{api}

Folder Structure

{folder}

IMPORTANT RULES

- Return ONLY Markdown.
- Never use =======
- Never use plain text headings.
- Use only Markdown headings (# ## ###).
- Use short paragraphs.
- Use bullet points.
- Use markdown tables whenever possible.
- Keep spacing clean.
- Do not repeat information.
- Make the output similar to ChatGPT Pro documentation.

Generate exactly in the following format.

# 📄 Software Blueprint

## 🎯 Project Overview

Write 3-5 lines describing the project.

---

## 💼 Business Goal

- Goal 1
- Goal 2
- Goal 3

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | ... |
| Backend | ... |
| Database | ... |
| Cache | ... |
| Cloud | ... |

---

## ✨ Features

### User Features

- Feature

### Admin Features

- Feature

---

## 🏗 Software Architecture

Explain the architecture using bullet points.

---

## 🗄 Database Design

Summarize the database design.

---

## 🔌 REST APIs

| Method | Endpoint | Description |
|--------|----------|-------------|

Fill the table with the main APIs.

---

## 📁 Project Folder Structure

frontend/
    app/
    components/
    hooks/
    lib/
    styles/

backend/
    api/
    agents/
    services/
    schemas/
    llm/

database/
    schema.sql

docs/

README.md

requirements.txt

package.json

docker-compose.yml

.env.example

---

## 🚀 Development Roadmap

### Phase 1

- Task

### Phase 2

- Task

### Phase 3

- Task

---

## ☁ Deployment Strategy

- Docker
- Nginx
- CI/CD
- GitHub Actions
- PostgreSQL

---

## 🔮 Future Improvements

- AI Features
- Mobile Application
- Analytics Dashboard
- Notification System

Return ONLY Markdown.
"""
            }
        ]

        return llm_provider.generate(history)


blueprint_agent = BlueprintAgent()