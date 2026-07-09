from app.memory.conversation import conversation_memory
from app.agents.cto_agent import cto_agent


class ChatService:

    def chat(self, message: str):

        user_id = "default_user"

        conversation_memory.add_message(
            user_id=user_id,
            role="user",
            content=message
        )

        result = cto_agent.execute(message)

        if "error" in result:
            return result

        memory_response = f"""
📋 DEVELOPMENT PLAN

{result['planner']}

==================================================

🏗️ SYSTEM ARCHITECTURE

{result['architecture']}

==================================================

🗄️ DATABASE DESIGN

{result['database']}

==================================================

🔌 API DESIGN

{result['api']}

==================================================

📁 PROJECT STRUCTURE

{result['folder']}

==================================================

📄 SOFTWARE BLUEPRINT

{result['blueprint']}

==================================================

📘 README

{result['readme']}

==================================================

🗄️ SQL SCHEMA

{result['sql']}
"""

        conversation_memory.add_message(
            user_id=user_id,
            role="assistant",
            content=memory_response
        )

        return result


chat_service = ChatService()