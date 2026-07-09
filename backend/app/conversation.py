from typing import Dict, List


class ConversationMemory:
    """
    Temporary In-Memory Conversation Store

    Later we will replace this with:
    - PostgreSQL
    - Redis
    - MongoDB
    """

    def __init__(self):
        # user_id -> conversation history
        self.conversations: Dict[str, List[dict]] = {}

    def add_message(self, user_id: str, role: str, content: str):

        if user_id not in self.conversations:
            self.conversations[user_id] = []

        self.conversations[user_id].append({
            "role": role,
            "content": content
        })

    def get_history(self, user_id: str) -> List[dict]:
        return self.conversations.get(user_id, [])

    def clear_history(self, user_id: str):

        if user_id in self.conversations:
            del self.conversations[user_id]


conversation_memory = ConversationMemory()