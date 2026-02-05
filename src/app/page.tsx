'use client';

import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PixelDog } from '@/components/PixelDog';
import { ChatContainer } from '@/components/Chat/ChatContainer';
import { NotebookPanel } from '@/components/Notebook/NotebookPanel';
import { StatusCard } from '@/components/Status/StatusCard';
import { usePetStore } from '@/stores/petStore';
import { useChatStore } from '@/stores/chatStore';
import { useNotebookStore } from '@/stores/notebookStore';

function generateThreadId(): string {
  return `thread-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export default function Home() {
  const [threadId, setThreadId] = useState('');
  const mood = usePetStore((s) => s.mood);
  const isStreaming = useChatStore((s) => s.isStreaming);
  const currentThinking = useChatStore((s) => s.currentThinking);
  const fetchEntries = useNotebookStore((s) => s.fetchEntries);

  useEffect(() => {
    const stored = localStorage.getItem('pixel-pup-thread-id');
    const id = stored || generateThreadId();
    if (!stored) {
      localStorage.setItem('pixel-pup-thread-id', id);
    }
    setThreadId(id);
    fetchEntries(id);
  }, [fetchEntries]);

  if (!threadId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">加载中...</div>
      </div>
    );
  }

  const isThinking = isStreaming && !!currentThinking;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold tracking-tight">像素崽</span>
            <span className="text-xs text-muted-foreground">Pixel Pup</span>
          </div>

          <div className="flex items-center gap-2">
            <NotebookPanel threadId={threadId} />
            <Button variant="ghost" size="icon">
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 flex flex-col gap-4 max-w-2xl">
        <div className="flex flex-col items-center pt-16 pb-6 bg-card/30 rounded-lg border border-border">
          <PixelDog
            mood={mood}
            size="lg"
            isThinking={isThinking}
            thinkingContent={currentThinking}
          />
        </div>

        <StatusCard />

        <div className="flex-1 min-h-[400px]">
          <ChatContainer threadId={threadId} />
        </div>
      </main>
    </div>
  );
}
