import { api, ChatRequest } from './api';

export const chatService = {
  sendMessage: async (message: string, conversationId?: string) => {
    const request: ChatRequest = {
      message,
      conversation_id: conversationId,
    };
    return api.sendMessage(request);
  },

  streamMessage: async (message: string, conversationId?: string) => {
    const request: ChatRequest = {
      message,
      conversation_id: conversationId,
    };
    return api.streamMessage(request);
  },
};
