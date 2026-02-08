'use client';

import { motion } from 'framer-motion';
import { Search, Brain, User, GitBranch } from 'lucide-react';
import type { ToolCall } from '@/types';

const KNOWLEDGE_GRAPH_TOOLS = {
  search_entities: {
    icon: Search,
    label: '搜索记忆',
    message: '让我搜搜记忆库...',
    bgColor: 'from-violet-50 to-purple-50',
    borderColor: 'border-violet-200',
    textColor: 'text-violet-700',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-500',
  },
  semantic_search_entities: {
    icon: Brain,
    label: '语义搜索',
    message: '让我仔细想想...',
    bgColor: 'from-fuchsia-50 to-pink-50',
    borderColor: 'border-fuchsia-200',
    textColor: 'text-fuchsia-700',
    iconBg: 'bg-fuchsia-100',
    iconColor: 'text-fuchsia-500',
  },
  get_entity: {
    icon: User,
    label: '查看详情',
    message: '我看看这个是什么...',
    bgColor: 'from-indigo-50 to-blue-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-500',
  },
  get_entity_relations: {
    icon: GitBranch,
    label: '查看关系',
    message: '让我看看有什么关联...',
    bgColor: 'from-cyan-50 to-teal-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-500',
  },
};

interface KnowledgeGraphToolBubbleProps {
  toolCall: ToolCall;
}

export function KnowledgeGraphToolBubble({ toolCall }: KnowledgeGraphToolBubbleProps) {
  const config = KNOWLEDGE_GRAPH_TOOLS[toolCall.name as keyof typeof KNOWLEDGE_GRAPH_TOOLS];

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

export function isKnowledgeGraphTool(name: string): boolean {
  return name in KNOWLEDGE_GRAPH_TOOLS;
}
