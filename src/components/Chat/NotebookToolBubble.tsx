'use client';

import { motion } from 'framer-motion';
import { BookOpen, PenLine, Eraser, Search } from 'lucide-react';
import type { ToolCall } from '@/types';

const NOTEBOOK_TOOLS = {
  read_notebook: {
    icon: Search,
    label: '翻看小本本',
    getMessage: () => '让我翻翻小本本看看...',
    color: 'from-blue-500/20 to-cyan-500/10',
    borderColor: 'border-blue-500/30',
    textColor: 'text-blue-300',
    iconColor: 'text-blue-400',
  },
  add_to_notebook: {
    icon: PenLine,
    label: '记到小本本',
    getMessage: (args: Record<string, unknown>) =>
      `我记下来啦: "${args.content}"`,
    color: 'from-green-500/20 to-emerald-500/10',
    borderColor: 'border-green-500/30',
    textColor: 'text-green-300',
    iconColor: 'text-green-400',
  },
  update_notebook: {
    icon: BookOpen,
    label: '修改小本本',
    getMessage: (args: Record<string, unknown>) =>
      `我把第 ${args.index} 条改成: "${args.new_content}"`,
    color: 'from-amber-500/20 to-yellow-500/10',
    borderColor: 'border-amber-500/30',
    textColor: 'text-amber-300',
    iconColor: 'text-amber-400',
  },
  remove_from_notebook: {
    icon: Eraser,
    label: '删掉记录',
    getMessage: (args: Record<string, unknown>) =>
      `我把第 ${args.index} 条划掉啦~`,
    color: 'from-red-500/20 to-rose-500/10',
    borderColor: 'border-red-500/30',
    textColor: 'text-red-300',
    iconColor: 'text-red-400',
  },
};

interface NotebookToolBubbleProps {
  toolCall: ToolCall;
}

export function NotebookToolBubble({ toolCall }: NotebookToolBubbleProps) {
  const config = NOTEBOOK_TOOLS[toolCall.name as keyof typeof NOTEBOOK_TOOLS];

  if (!config) return null;

  const Icon = config.icon;
  const message = config.getMessage(toolCall.args);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="max-w-[85%]"
    >
      <div
        className={`relative p-3 rounded-2xl rounded-bl-md bg-gradient-to-br ${config.color} border ${config.borderColor} backdrop-blur-sm`}
      >
        <div className="flex items-start gap-2">
          <div className={`p-1.5 rounded-lg bg-black/20 ${config.iconColor}`}>
            <Icon className="w-3.5 h-3.5" />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`text-[10px] font-medium uppercase tracking-wider ${config.iconColor} opacity-80`}>
              {config.label}
            </span>
            <p className={`text-sm mt-1 ${config.textColor} break-words`}>
              {message}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function isNotebookTool(name: string): boolean {
  return name in NOTEBOOK_TOOLS;
}
