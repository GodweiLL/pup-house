'use client';

import { useState } from 'react';
import { Pencil, Trash2, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { NotebookEntry } from '@/types';
import { cn } from '@/lib/utils';

interface NotebookEntryItemProps {
  entry: NotebookEntry;
  index: number;
  onUpdate: (index: number, content: string) => void;
  onDelete: (index: number) => void;
}

export function NotebookEntryItem({
  entry,
  index,
  onUpdate,
  onDelete,
}: NotebookEntryItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(entry.content);

  const isAgent = entry.source === 'agent';

  const handleSave = () => {
    if (editContent.trim()) {
      onUpdate(index, editContent.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditContent(entry.content);
    setIsEditing(false);
  };

  return (
    <div
      className={cn(
        'p-3 rounded-lg border',
        isAgent ? 'bg-primary/5 border-primary/20' : 'bg-card border-border'
      )}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          {isAgent ? (
            <>
              <Bot className="w-3 h-3" />
              <span>崽崽记的</span>
            </>
          ) : (
            <>
              <User className="w-3 h-3" />
              <span>主人记的</span>
            </>
          )}
        </div>

        {!isEditing && (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7"
              onClick={() => setIsEditing(true)}
            >
              <Pencil className="w-3 h-3" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-7 h-7 text-destructive hover:text-destructive"
              onClick={() => onDelete(index)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[60px] text-sm"
            autoFocus
          />
          <div className="flex justify-end gap-2">
            <Button variant="ghost" size="sm" onClick={handleCancel}>
              取消
            </Button>
            <Button size="sm" onClick={handleSave}>
              保存
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm whitespace-pre-wrap">{entry.content}</p>
      )}
    </div>
  );
}
