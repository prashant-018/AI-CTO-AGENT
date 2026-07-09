from pydantic import BaseModel


class ChatRequest(BaseModel):
    message: str


class ChatResponse(BaseModel):
    planner: str
    architecture: str
    database: str
    api: str
    folder: str
    blueprint: str
    readme: str
    sql: str
    package_json: str