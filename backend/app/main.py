from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.chat import router as chat_router

app = FastAPI(
    title="AI CTO Agent API",
    version="1.0.0"
)

# Allowed Frontend Origins
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",

    "http://localhost:3001",
    "http://127.0.0.1:3001",

    "http://localhost:5500",
    "http://127.0.0.1:5500",

    "http://localhost:5501",
    "http://127.0.0.1:5501",
]

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(chat_router)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "🚀 AI CTO Agent Backend Running"
    }