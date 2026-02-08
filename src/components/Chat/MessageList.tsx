'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { MessageBubble } from './MessageBubble';

function throttle<T extends (...args: unknown[]) => void>(fn: T, delay: number): T {
  let lastCall = 0;
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return ((...args: unknown[]) => {
    const now = Date.now();
    const remaining = delay - (now - lastCall);

    if (remaining <= 0) {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      lastCall = now;
      fn(...args);
    } else if (!timeoutId) {
      timeoutId = setTimeout(() => {
        lastCall = Date.now();
        timeoutId = null;
        fn(...args);
      }, remaining);
    }
  }) as T;
}

export function MessageList() {
  const messages = useChatStore((s) => s.messages);
  const currentThinking = useChatStore((s) => s.currentThinking);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  }, []);

  const throttledScrollToBottom = useRef(throttle(scrollToBottom, 100)).current;

  useEffect(() => {
    throttledScrollToBottom();
  }, [messages, currentThinking, throttledScrollToBottom]);

  const hasMessages = messages.length > 0;

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
      style={{ overflowAnchor: 'auto', contain: 'content' }}
    >
      {!hasMessages && (
        <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
          <p className="text-sm">和你的像素崽聊聊天吧</p>
        </div>
      )}

      {messages.map((msg) => (
        <MessageBubble
          key={msg.id}
          message={msg}
          isStreaming={msg.isStreaming}
        />
      ))}
    </div>
  );
}
