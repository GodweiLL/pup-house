'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Plus, Pencil, Trash2, User, Bot, X, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotebookStore } from '@/stores/notebookStore';
import { useMemoryAgent } from '@/hooks/useMemoryAgent';
import { MemoryBuildOverlay } from './MemoryBuildOverlay';
import { cn } from '@/lib/utils';

interface NotebookListProps {
  threadId: string;
}

export function NotebookList({ threadId }: NotebookListProps) {
  const [newEntry, setNewEntry] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editContent, setEditContent] = useState('');

  const {
    entries,
    isLoading,
    fetchEntries,
    addEntry,
    updateEntry,
    deleteEntry,
  } = useNotebookStore();

  const {
    isProcessing,
    currentTool,
    isComplete,
    buildMemory,
  } = useMemoryAgent(threadId);

  useEffect(() => {
    if (threadId) {
      fetchEntries(threadId);
    }
  }, [threadId, fetchEntries]);

  const handleAdd = async () => {
    if (newEntry.trim() && threadId) {
      await addEntry(threadId, newEntry.trim());
      setNewEntry('');
      setIsAdding(false);
    }
  };

  const handleStartEdit = (index: number, content: string) => {
    setEditingIndex(index);
    setEditContent(content);
  };

  const handleSaveEdit = async () => {
    if (editingIndex !== null && editContent.trim() && threadId) {
      await updateEntry(threadId, editingIndex, editContent.trim());
      setEditingIndex(null);
      setEditContent('');
    }
  };

  const handleDelete = async (index: number) => {
    if (threadId) {
      await deleteEntry(threadId, index);
    }
  };

  const handleBuildMemory = () => {
    if (entries.length > 0) {
      buildMemory(entries);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card rounded-2xl border border-border shadow-sm overflow-hidden relative">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" />
          <h3 className="font-medium text-sm">小本本</h3>
          {entries.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-medium">
              {entries.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {entries.length > 0 && (
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-amber-500 hover:text-amber-600 hover:bg-amber-50"
              onClick={handleBuildMemory}
              disabled={isProcessing}
              title="整理记忆"
            >
              <Sparkles className="w-4 h-4" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setIsAdding(true)}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          <AnimatePresence>
            {isAdding && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
                  <Textarea
                    value={newEntry}
                    onChange={(e) => setNewEntry(e.target.value)}
                    placeholder="记点什么..."
                    className="min-h-[60px] text-sm border-0 bg-transparent p-0 focus-visible:ring-0 resize-none"
                    autoFocus
                  />
                  <div className="flex justify-end gap-1 mt-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => {
                        setIsAdding(false);
                        setNewEntry('');
                      }}
                    >
                      <X className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      size="icon"
                      className="h-7 w-7"
                      onClick={handleAdd}
                      disabled={!newEntry.trim()}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              加载中...
            </div>
          ) : entries.length === 0 && !isAdding ? (
            <div className="py-8 text-center text-muted-foreground text-sm">
              <p>还没有记录</p>
              <p className="text-xs mt-1">点击 + 添加第一条</p>
            </div>
          ) : (
            entries.map((entry, idx) => {
              const isAgent = entry.source === 'agent';
              const isEditing = editingIndex === idx;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    'group p-3 rounded-xl border transition-colors',
                    isAgent
                      ? 'bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200'
                      : 'bg-white border-border hover:border-primary/30'
                  )}
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    {isAgent ? (
                      <Bot className="w-3 h-3 text-amber-500" />
                    ) : (
                      <User className="w-3 h-3 text-gray-400" />
                    )}
                    <span className="text-[10px] text-muted-foreground">
                      {isAgent ? '崽崽记的' : '主人记的'}
                    </span>
                  </div>

                  {isEditing ? (
                    <div>
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="min-h-[40px] text-sm border-0 bg-transparent p-0 focus-visible:ring-0 resize-none"
                        autoFocus
                      />
                      <div className="flex justify-end gap-1 mt-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => setEditingIndex(null)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                        <Button
                          size="icon"
                          className="h-6 w-6"
                          onClick={handleSaveEdit}
                        >
                          <Check className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-foreground leading-relaxed flex-1">
                        {entry.content}
                      </p>
                      <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleStartEdit(idx, entry.content)}
                        >
                          <Pencil className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-destructive hover:text-destructive"
                          onClick={() => handleDelete(idx)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })
          )}
        </div>
      </ScrollArea>

      {/* 整理记忆遮罩 */}
      <AnimatePresence>
        {(isProcessing || isComplete) && (
          <MemoryBuildOverlay
            isProcessing={isProcessing}
            currentTool={currentTool || undefined}
            isComplete={isComplete}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
