'use client';

import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
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
    <ScrollArea className="flex-1 px-4" ref={scrollRef}>
      <div className="py-4 space-y-4">
        {!hasMessages && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
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
    </ScrollArea>
  );
}
