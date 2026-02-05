'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Plus, X, Loader2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useNotebookStore } from '@/stores/notebookStore';
import { NotebookEntryItem } from './NotebookEntry';

interface NotebookPanelProps {
  threadId: string;
}

export function NotebookPanel({ threadId }: NotebookPanelProps) {
  const [newEntry, setNewEntry] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const {
    entries,
    isOpen,
    isLoading,
    setOpen,
    fetchEntries,
    addEntry,
    updateEntry,
    deleteEntry,
  } = useNotebookStore();

  useEffect(() => {
    if (isOpen && threadId) {
      fetchEntries(threadId);
    }
  }, [isOpen, threadId, fetchEntries]);

  const handleAdd = async () => {
    if (newEntry.trim() && threadId) {
      await addEntry(threadId, newEntry.trim());
      setNewEntry('');
      setIsAdding(false);
    }
  };

  const handleUpdate = async (index: number, content: string) => {
    if (threadId) {
      await updateEntry(threadId, index, content);
    }
  };

  const handleDelete = async (index: number) => {
    if (threadId) {
      await deleteEntry(threadId, index);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <BookOpen className="w-5 h-5" />
          {entries.length > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-[10px] flex items-center justify-center text-primary-foreground">
              {entries.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[340px] sm:w-[400px] flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            小本本
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />

        <ScrollArea className="flex-1 -mx-6 px-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
            </div>
          ) : entries.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <p>还没有任何记录</p>
              <p className="mt-1">点击下方按钮添加第一条</p>
            </div>
          ) : (
            <div className="space-y-3 pb-4">
              {entries.map((entry, idx) => (
                <NotebookEntryItem
                  key={idx}
                  entry={entry}
                  index={idx}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </ScrollArea>

        <Separator className="my-4" />

        {isAdding ? (
          <div className="space-y-3">
            <Textarea
              value={newEntry}
              onChange={(e) => setNewEntry(e.target.value)}
              placeholder="记点什么..."
              className="min-h-[80px]"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsAdding(false);
                  setNewEntry('');
                }}
              >
                <X className="w-4 h-4 mr-1" />
                取消
              </Button>
              <Button size="sm" onClick={handleAdd} disabled={!newEntry.trim()}>
                <Plus className="w-4 h-4 mr-1" />
                添加
              </Button>
            </div>
          </div>
        ) : (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            添加记录
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
}
