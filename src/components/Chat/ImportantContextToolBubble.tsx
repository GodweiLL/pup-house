'use client';

import { motion } from 'framer-motion';
import { Star, PlusCircle, MinusCircle, RefreshCw } from 'lucide-react';
import type { ToolCall } from '@/types';

const IMPORTANT_CONTEXT_TOOLS = {
  view_important_contexts: {
    icon: Star,
    label: '查看重要信息',
    message: '让我看看重要信息...',
    bgColor: 'from-amber-50 to-orange-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-500',
  },
  add_important_context: {
    icon: PlusCircle,
    label: '记住重要信息',
    message: '这个很重要，我牢牢记住!',
    bgColor: 'from-emerald-50 to-green-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-500',
  },
  remove_important_context: {
    icon: MinusCircle,
    label: '删除重要信息',
    message: '好的，我把它删掉~',
    bgColor: 'from-rose-50 to-red-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-500',
  },
  update_important_context: {
    icon: RefreshCw,
    label: '更新重要信息',
    message: '我更新一下~',
    bgColor: 'from-sky-50 to-blue-50',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-700',
    iconBg: 'bg-sky-100',
    iconColor: 'text-sky-500',
  },
};

interface ImportantContextToolBubbleProps {
  toolCall: ToolCall;
}

export function ImportantContextToolBubble({ toolCall }: ImportantContextToolBubbleProps) {
  const config = IMPORTANT_CONTEXT_TOOLS[toolCall.name as keyof typeof IMPORTANT_CONTEXT_TOOLS];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="max-w-[85%]"
    >
      <div
        className={`relative p-3 rounded-2xl rounded-bl-md bg-gradient-to-br ${config.bgColor} border ${config.borderColor}`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 rounded-lg ${config.iconBg}`}>
            <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
          </div>
          <p className={`text-sm ${config.textColor}`}>
            {config.message}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function isImportantContextTool(name: string): boolean {
  return name in IMPORTANT_CONTEXT_TOOLS;
}
