# 🚀 AI CTO Agent

AI CTO Agent is a GenAI-powered application that transforms a simple project idea into a complete software blueprint.

It acts like a virtual CTO by generating:

- 📋 Development Plan
- 🏗 Software Architecture
- 🗄 Database Design
- 🔌 API Design
- 📁 Folder Structure
- 📄 Software Blueprint
- 📘 README
- 🗃 SQL Schema
- 📦 package.json

---

# ✨ Features

- 🤖 AI-powered project planning
- 🧠 Multi-Agent architecture
- 💬 ChatGPT-style chat interface
- 📜 Conversation history
- 🔍 Search chats
- 📝 Markdown rendering
- 📄 Copy generated response
- 🗑 Delete chat
- ➕ New Chat
- 📂 Project blueprint generation
- ⚡ FastAPI Backend
- ⚛️ Next.js Frontend

---

# 🛠 Tech Stack

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- React Hot Toast

## Backend

- FastAPI
- Python
- Pydantic

## AI

- Google Gemini
- Groq
- OpenAI (Optional)
- Ollama (Optional)

---

# 📂 Project Structure

```text
AI-CTO-AGENT/
│
├── backend/
│   ├── app/
│   │   ├── agents/
│   │   ├── api/
│   │   ├── core/
│   │   ├── llm/
│   │   ├── memory/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── tools/
│   │
│   ├── main.py
│   └── requirements.txt
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── store/
│   ├── styles/
│   ├── types/
│   └── utils/
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/prashant-018/AI-CTO-AGENT.git
```

```bash
cd AI-CTO-AGENT
```

---

# Backend Setup

```bash
cd backend
```

```bash
python -m venv venv
```

### Windows

```bash
venv\Scripts\activate
```

### Linux / macOS

```bash
source venv/bin/activate
```

Install dependencies

```bash
pip install -r requirements.txt
```

Create `.env`

```env
GEMINI_API_KEY=YOUR_API_KEY
GROQ_API_KEY=YOUR_API_KEY
```

Run server

```bash
uvicorn app.main:app --reload
```

---

# Frontend Setup

```bash
cd frontend
```

Install packages

```bash
npm install
```

Run

```bash
npm run dev
```

---

# Screenshots

Add screenshots here.

---

# Roadmap

- ✅ Multi-Agent System
- ✅ Chat History
- ✅ Markdown Support
- ✅ Copy Response
- ✅ Delete Chat
- ✅ Search Chat
- 🔄 Rename Chat
- 🔄 Streaming Response
- 🔄 Authentication
- 🔄 MongoDB Support
- 🔄 Export PDF
- 🔄 Voice Input
- 🔄 Team Workspace

---

# Author

**Prashant Shrivastava**

- GitHub: https://github.com/prashant-018

---

# License

MIT License
