import { create } from 'zustand';
import type { Message, ToolCall } from '@/types';

interface ChatState {
  messages: Message[];
  isStreaming: boolean;
  threadId: string;
  currentThinking: string;
  addMessage: (msg: Message) => void;
  updateLastMessage: (updates: Partial<Message>) => void;
  appendToLastMessage: (token: string) => void;
  setThinking: (thinking: string) => void;
  appendThinking: (content: string) => void;
  addToolCall: (toolCall: ToolCall) => void;
  setStreaming: (value: boolean) => void;
  setThreadId: (id: string) => void;
  clearMessages: () => void;
  finishStreaming: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isStreaming: false,
  threadId: '',
  currentThinking: '',

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  updateLastMessage: (updates) =>
    set((state) => {
      const messages = [...state.messages];
      const lastIndex = messages.length - 1;
      if (lastIndex >= 0) {
        messages[lastIndex] = { ...messages[lastIndex], ...updates };
      }
      return { messages };
    }),

  appendToLastMessage: (token) =>
    set((state) => {
      const messages = [...state.messages];
      const lastIndex = messages.length - 1;
      if (lastIndex >= 0 && messages[lastIndex].role === 'assistant') {
        messages[lastIndex] = {
          ...messages[lastIndex],
          content: messages[lastIndex].content + token,
        };
      }
      return { messages };
    }),

  setThinking: (currentThinking) => set({ currentThinking }),

  appendThinking: (content) =>
    set((state) => ({
      currentThinking: state.currentThinking + content,
    })),

  addToolCall: (toolCall) =>
    set((state) => {
      const messages = [...state.messages];
      const lastIndex = messages.length - 1;
      if (lastIndex >= 0 && messages[lastIndex].role === 'assistant') {
        const existing = messages[lastIndex].toolCalls || [];
        messages[lastIndex] = {
          ...messages[lastIndex],
          toolCalls: [...existing, toolCall],
        };
      }
      return { messages };
    }),

  setStreaming: (isStreaming) => set({ isStreaming }),

  setThreadId: (threadId) => set({ threadId }),

  clearMessages: () => set({ messages: [], currentThinking: '' }),

  finishStreaming: () =>
    set((state) => {
      const messages = [...state.messages];
      const lastIndex = messages.length - 1;
      if (lastIndex >= 0) {
        messages[lastIndex] = {
          ...messages[lastIndex],
          isStreaming: false,
          thinking: state.currentThinking || undefined,
        };
      }
      return {
        messages,
        isStreaming: false,
        currentThinking: '',
      };
    }),
}));
