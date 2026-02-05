'use client';

import { useEffect, useState, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PixelDog } from '@/components/PixelDog';
import { ChatContainer } from '@/components/Chat/ChatContainer';
import { NotebookList } from '@/components/Notebook/NotebookList';
import { StatusCard } from '@/components/Status/StatusCard';
import { usePetStore } from '@/stores/petStore';
import { useChatStore } from '@/stores/chatStore';

function generateThreadId(): string {
  return `thread-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export default function Home() {
  const [threadId, setThreadId] = useState('');
  const mood = usePetStore((s) => s.mood);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const currentThinking = useChatStore((s) => s.currentThinking);
  const clearMessages = useChatStore((s) => s.clearMessages);

  useEffect(() => {
    const stored = localStorage.getItem('pixel-pup-thread-id');
    const id = stored || generateThreadId();
    if (!stored) {
      localStorage.setItem('pixel-pup-thread-id', id);
    }
    setThreadId(id);
  }, []);

  const handleNewChat = useCallback(() => {
    const newId = generateThreadId();
    localStorage.setItem('pixel-pup-thread-id', newId);
    clearMessages();
    setThreadId(newId);
  }, [clearMessages]);

  if (!threadId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">加载中...</div>
      </div>
    );
  }

  const isThinking = isStreaming && !!currentThinking;

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">像素崽</h1>
            <p className="text-sm text-muted-foreground">Pixel Pup - 你的 AI 电子宠物</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNewChat}
            className="gap-1.5"
          >
            <Plus className="w-4 h-4" />
            新对话
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6 h-[calc(100vh-140px)]">
          <div className="flex flex-col gap-4">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border border-indigo-100">
              <PixelDog
                mood={mood}
                size="lg"
                isThinking={isThinking}
                thinkingContent={currentThinking}
              />
            </div>

            <StatusCard />

            <div className="flex-1 min-h-0">
              <NotebookList threadId={threadId} />
            </div>
          </div>

          <div className="min-h-0">
            <ChatContainer threadId={threadId} />
          </div>
        </div>
      </div>
    </div>
  );
}
