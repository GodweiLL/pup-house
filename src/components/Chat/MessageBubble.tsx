'use client';

import { motion } from 'framer-motion';
import type { Message } from '@/types';
import { cn } from '@/lib/utils';
import { NotebookToolBubble, isNotebookTool } from './NotebookToolBubble';
import { EmotionToolBubble, isEmotionTool } from './EmotionToolBubble';

interface MessageBubbleProps {
  message: Message;
  isStreaming?: boolean;
}

export function MessageBubble({ message, isStreaming }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  const notebookTools = message.toolCalls?.filter((t) => isNotebookTool(t.name)) || [];
  const emotionTools = message.toolCalls?.filter((t) => isEmotionTool(t.name)) || [];
  const otherTools = message.toolCalls?.filter((t) => !isNotebookTool(t.name) && !isEmotionTool(t.name)) || [];

  return (
    <div
      className={cn(
        'flex flex-col gap-2',
        isUser ? 'items-end' : 'items-start'
      )}
    >
      {notebookTools.map((tool, idx) => (
        <NotebookToolBubble key={`notebook-${idx}`} toolCall={tool} />
      ))}

      {(message.content || isStreaming) && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn('max-w-[85%]', isUser ? 'ml-auto' : 'mr-auto')}
        >
          <div
            className={cn(
              'px-4 py-2.5 rounded-2xl',
              isUser
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-card border border-border rounded-bl-md'
            )}
          >
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
              {isStreaming && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-1.5 h-4 bg-current ml-0.5 align-middle"
                />
              )}
            </p>
          </div>
        </motion.div>
      )}

      {emotionTools.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {emotionTools.map((tool, idx) => (
            <EmotionToolBubble key={`emotion-${idx}`} toolCall={tool} />
          ))}
        </div>
      )}

      {otherTools.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {otherTools.map((tool, idx) => (
            <div
              key={idx}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/20 text-xs text-accent-foreground"
            >
              <span>{tool.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
