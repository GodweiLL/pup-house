'use client';

import { useEffect } from 'react';
import { useWebSocket } from '@/hooks/useWebSocket';
import { useChatStore } from '@/stores/chatStore';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';

interface ChatContainerProps {
  threadId: string;
}

export function ChatContainer({ threadId }: ChatContainerProps) {
  const { isConnected, sendMessage } = useWebSocket(threadId);
  const setThreadId = useChatStore((s) => s.setThreadId);

  useEffect(() => {
    setThreadId(threadId);
  }, [threadId, setThreadId]);

  return (
    <div className="flex flex-col h-full bg-background/50 rounded-lg border border-border overflow-hidden">
      <MessageList />
      <ChatInput onSend={sendMessage} disabled={!isConnected} />
    </div>
  );
}
