'use client';

import { useEffect, useRef } from 'react';
import { useChatStore } from '@/stores/chatStore';
import { MessageBubble } from './MessageBubble';

export function MessageList() {
  const messages = useChatStore((s) => s.messages);
  const currentThinking = useChatStore((s) => s.currentThinking);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, currentThinking]);

  const hasMessages = messages.length > 0;

  return (
    <div
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-4 py-4 space-y-3"
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
