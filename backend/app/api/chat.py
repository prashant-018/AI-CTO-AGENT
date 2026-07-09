from fastapi import APIRouter, HTTPException
import traceback

from groq import RateLimitError

from app.schemas.chat import ChatRequest, ChatResponse
from app.services.chat_service import chat_service

router = APIRouter()


@router.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest):
    try:
        result = chat_service.chat(request.message)

        if "error" in result:
            return ChatResponse(
                planner=result["error"],
                architecture="",
                database="",
                api="",
                folder="",
                blueprint="",
                readme="",
                sql="",
                package_json=""
            )

        return ChatResponse(
            planner=result["planner"],
            architecture=result["architecture"],
            database=result["database"],
            api=result["api"],
            folder=result["folder"],
            blueprint=result["blueprint"],
            readme=result["readme"],
            sql=result["sql"],
            package_json=result["package_json"]
        )

    except RateLimitError as e:
        print("\n========== RATE LIMIT ERROR ==========")
        print(str(e))
        print("======================================\n")
        raise HTTPException(
            status_code=429,
            detail="Rate limit exceeded. The AI service is temporarily unavailable. Please wait a few minutes and try again."
        )

    except Exception as e:
        print("\n========== BACKEND ERROR ==========")
        traceback.print_exc()
        print("==================================\n")
        raise HTTPException(status_code=500, detail=str(e))