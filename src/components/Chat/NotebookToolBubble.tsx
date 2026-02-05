'use client';

import { motion } from 'framer-motion';
import { BookOpen, PenLine, Eraser, Search } from 'lucide-react';
import type { ToolCall } from '@/types';

const NOTEBOOK_TOOLS = {
  read_notebook: {
    icon: Search,
    label: '翻看小本本',
    getMessage: () => '让我翻翻小本本看看...',
    bgColor: 'from-blue-50 to-cyan-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-500',
  },
  add_to_notebook: {
    icon: PenLine,
    label: '记到小本本',
    getMessage: (args: Record<string, unknown>) =>
      `我记下来啦: "${args.content}"`,
    bgColor: 'from-emerald-50 to-green-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
  },
  update_notebook: {
    icon: BookOpen,
    label: '修改小本本',
    getMessage: (args: Record<string, unknown>) =>
      `我把第 ${args.index} 条改成: "${args.new_content}"`,
    bgColor: 'from-amber-50 to-yellow-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
  },
  remove_from_notebook: {
    icon: Eraser,
    label: '删掉记录',
    getMessage: (args: Record<string, unknown>) =>
      `我把第 ${args.index} 条划掉啦~`,
    bgColor: 'from-rose-50 to-red-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-500',
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
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="max-w-[85%]"
    >
      <div
        className={`relative p-3 rounded-2xl rounded-bl-md bg-gradient-to-br ${config.bgColor} border ${config.borderColor}`}
      >
        <div className="flex items-start gap-2.5">
          <div className={`p-1.5 rounded-lg ${config.iconBg}`}>
            <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
          </div>
          <div className="flex-1 min-w-0">
            <span className={`text-[10px] font-medium uppercase tracking-wider ${config.iconColor}`}>
              {config.label}
            </span>
            <p className={`text-sm mt-0.5 ${config.textColor} break-words leading-relaxed`}>
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
