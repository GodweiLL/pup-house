'use client';

import { useState, useCallback, type KeyboardEvent } from 'react';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useChatStore } from '@/stores/chatStore';

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [input, setInput] = useState('');
  const isStreaming = useChatStore((s) => s.isStreaming);

  const handleSend = useCallback(() => {
    const content = input.trim();
    if (content && !isStreaming && !disabled) {
      onSend(content);
      setInput('');
    }
  }, [input, isStreaming, disabled, onSend]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4 border-t border-border bg-card/50">
      <div className="flex items-end gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="说点什么..."
          className="min-h-[44px] max-h-32 resize-none bg-background"
          disabled={disabled || isStreaming}
        />
        <Button
          onClick={handleSend}
          disabled={!input.trim() || isStreaming || disabled}
          size="icon"
          className="shrink-0 h-11 w-11"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
