'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { usePetStore } from '@/stores/petStore';
import { useNotebookStore } from '@/stores/notebookStore';
import type { WSMessageType, MoodType } from '@/types';

const WS_BASE = process.env.NEXT_PUBLIC_WS_BASE || 'ws://localhost:8000';

const NOTEBOOK_TOOL_NAMES = ['read_notebook', 'add_to_notebook', 'update_notebook', 'remove_from_notebook'];
const EMOTION_TOOL_NAME = 'express_emotion';

export function useWebSocket(threadId: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const {
    addMessage,
    appendToLastMessage,
    appendThinking,
    addToolCall,
    setStreaming,
    finishStreaming,
    setThinking,
  } = useChatStore();

  const { setOnline, setMood } = usePetStore();
  const { fetchEntries } = useNotebookStore();

  const connect = useCallback(() => {
    if (!threadId) return;

    const ws = new WebSocket(`${WS_BASE}/ws/${threadId}`);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setOnline(true);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setOnline(false);
      reconnectTimeoutRef.current = setTimeout(() => {
        connect();
      }, 3000);
    };

    ws.onerror = () => {
      ws.close();
    };

    ws.onmessage = (event) => {
      try {
        const data: WSMessageType = JSON.parse(event.data);

        switch (data.type) {
          case 'thinking':
            appendThinking(data.content);
            break;

          case 'token':
            setThinking('');
            appendToLastMessage(data.content);
            break;

          case 'tool_call':
            addToolCall({ name: data.name, args: data.args });
            if (data.name === 'update_mood' && data.args.mood) {
              setMood(data.args.mood as MoodType);
            }
            if (data.name === EMOTION_TOOL_NAME && data.args.emotion) {
              setMood(data.args.emotion as MoodType);
            }
            if (NOTEBOOK_TOOL_NAMES.includes(data.name)) {
              setTimeout(() => fetchEntries(threadId), 500);
            }
            break;

          case 'done':
            finishStreaming();
            break;
        }
      } catch {
        // Ignore parse errors
      }
    };
  }, [threadId, addMessage, appendToLastMessage, appendThinking, addToolCall, setStreaming, finishStreaming, setOnline, setMood, fetchEntries, setThinking]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  const sendMessage = useCallback((content: string) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      const messageId = `msg-${Date.now()}`;

      addMessage({
        id: messageId,
        role: 'user',
        content,
        timestamp: new Date(),
      });

      addMessage({
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      });

      setStreaming(true);
      wsRef.current.send(JSON.stringify({ type: 'message', content }));
    }
  }, [addMessage, setStreaming]);

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  return {
    isConnected,
    sendMessage,
  };
}
