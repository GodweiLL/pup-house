'use client';

import { useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
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
    <div className="h-full flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <div className="flex items-center gap-2 p-4 border-b border-border">
        <MessageCircle className="w-4 h-4 text-primary" />
        <h3 className="font-medium text-sm">聊天</h3>
      </div>

      <MessageList />

      <ChatInput onSend={sendMessage} disabled={!isConnected} />
    </div>
  );
}
