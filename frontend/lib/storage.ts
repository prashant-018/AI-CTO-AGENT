// Local storage utilities for conversation history and preferences

import { ChatResponse } from "@/types/chat";

export interface ConversationHistory {
  id: string;
  message: string;
  response: ChatResponse;
  timestamp: number;
}

const STORAGE_KEYS = {
  HISTORY: "ai-cto-history",
  DARK_MODE: "ai-cto-dark-mode",
};

export const storage = {
  getHistory(): ConversationHistory[] {
    if (typeof window === "undefined") return [];

    try {
      const data = localStorage.getItem(STORAGE_KEYS.HISTORY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveHistory(history: ConversationHistory[]) {
    if (typeof window === "undefined") return;

    try {
      localStorage.setItem(
        STORAGE_KEYS.HISTORY,
        JSON.stringify(history.slice(-50))
      );
    } catch (error) {
      console.error(error);
    }
  },

  addToHistory(item: ConversationHistory) {
    const history = this.getHistory();
    history.push(item);
    this.saveHistory(history);
  },

  clearHistory() {
    if (typeof window === "undefined") return;
    localStorage.removeItem(STORAGE_KEYS.HISTORY);
  },

  getDarkMode(): boolean {
    if (typeof window === "undefined") return true;

    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
      return saved !== null ? saved === "true" : true;
    } catch {
      return true;
    }
  },

  setDarkMode(enabled: boolean) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, String(enabled));
  },
};