from typing import Dict, List


class ConversationMemory:

    def __init__(self):
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