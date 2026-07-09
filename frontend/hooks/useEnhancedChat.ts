import { useState, useCallback, useEffect, useRef } from "react";
import { chatApi, ApiError } from "@/lib/api";
import { ChatResponse } from "@/types/chat";
import { storage, ConversationHistory } from "@/lib/storage";
import toast from "react-hot-toast";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export function useEnhancedChat() {

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [messages, setMessages] = useState<Message[]>([]);

  const [history, setHistory] = useState<ConversationHistory[]>([]);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(storage.getHistory());
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  const formatResponse = (r: ChatResponse) => `
# 📋 Development Plan

${r.planner}

---

# 🏗 Architecture

${r.architecture}

---

# 🗄 Database

${r.database}

---

# 🔌 API Design

${r.api}

---

# 📁 Folder Structure

${r.folder}

---

# 📄 Software Blueprint

${r.blueprint}

---

# 📘 README

${r.readme}

---

# 🗃 SQL Schema

${r.sql}

---

# 📦 package.json

${r.package_json}
`;  const sendMessage = useCallback(
    async (message: string) => {

      if (!message.trim()) return;

      setError(null);

      setIsLoading(true);

      const userMessage: Message = {
        id: crypto.randomUUID(),
        role: "user",
        content: message,
      };

      setMessages((prev) => [
        ...prev,
        userMessage,
      ]);

      try {

        const result: ChatResponse =
          await chatApi.sendMessage({
            message,
          });

        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: formatResponse(result),
        };

        setMessages((prev) => [
          ...prev,
          assistantMessage,
        ]);

        const historyItem: ConversationHistory = {
          id: crypto.randomUUID(),
          message,
          response: result,
          timestamp: Date.now(),
        };

        storage.addToHistory(historyItem);

        setHistory(storage.getHistory());

        toast.success(
          "Blueprint Generated 🚀"
        );

      } catch (err) {

        const apiError = err as ApiError;

        setError(apiError.message);

        toast.error(apiError.message);

      } finally {

        setIsLoading(false);

      }

    },
    []
  );

  const loadFromHistory = useCallback(
    (id: string) => {

      const item = history.find(
        (h) => h.id === id
      );

      if (!item) return;

      setMessages([
        {
          id: crypto.randomUUID(),
          role: "user",
          content: item.message,
        },
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: formatResponse(
            item.response
          ),
        },
      ]);

      toast.success(
        "History Loaded"
      );

    },
    [history]
  );  /* -----------------------------
      Delete Chat
  ------------------------------ */

  const deleteChat = useCallback(
    (id: string) => {

      const updatedHistory = history.filter(
        (chat) => chat.id !== id
      );

      storage.saveHistory(updatedHistory);

      setHistory(updatedHistory);

      setMessages([]);

      toast.success("Chat Deleted");

    },
    [history]
  );

  /* -----------------------------
      Clear History
  ------------------------------ */

  const clearHistory = useCallback(() => {

    storage.clearHistory();

    setHistory([]);

    setMessages([]);

    toast.success("History Cleared");

  }, []);

  /* -----------------------------
      Reset Chat
  ------------------------------ */

  const reset = useCallback(() => {

    setMessages([]);

    setError(null);

    setIsLoading(false);

  }, []);

  /* -----------------------------
      Retry
  ------------------------------ */

  const retry = useCallback(() => {

    const lastUserMessage = [...messages]
      .reverse()
      .find(
        (m) => m.role === "user"
      );

    if (lastUserMessage) {

      sendMessage(lastUserMessage.content);

    }

  }, [messages, sendMessage]);

  return {

    isLoading,

    error,

    messages,

    history,

    scrollRef,

    sendMessage,

    loadFromHistory,

    deleteChat,

    clearHistory,

    reset,

    retry,

  };

}