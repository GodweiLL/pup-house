'use client';

import { motion } from 'framer-motion';
import { Heart, Smile, Frown, Angry, Zap, Moon, Sparkles } from 'lucide-react';
import type { ToolCall } from '@/types';

const EMOTION_CONFIG: Record<string, {
  icon: typeof Heart;
  label: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  iconColor: string;
}> = {
  happy: {
    icon: Smile,
    label: '开心',
    bgColor: 'from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    textColor: 'text-green-700',
    iconColor: 'text-green-500',
  },
  sad: {
    icon: Frown,
    label: '难过',
    bgColor: 'from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    textColor: 'text-blue-700',
    iconColor: 'text-blue-500',
  },
  angry: {
    icon: Angry,
    label: '生气',
    bgColor: 'from-red-50 to-rose-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    iconColor: 'text-red-500',
  },
  surprised: {
    icon: Zap,
    label: '惊讶',
    bgColor: 'from-cyan-50 to-sky-50',
    borderColor: 'border-cyan-200',
    textColor: 'text-cyan-700',
    iconColor: 'text-cyan-500',
  },
  excited: {
    icon: Sparkles,
    label: '兴奋',
    bgColor: 'from-amber-50 to-yellow-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    iconColor: 'text-amber-500',
  },
  sleepy: {
    icon: Moon,
    label: '困了',
    bgColor: 'from-purple-50 to-violet-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    iconColor: 'text-purple-500',
  },
  love: {
    icon: Heart,
    label: '爱心',
    bgColor: 'from-pink-50 to-rose-50',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-700',
    iconColor: 'text-pink-500',
  },
};

interface EmotionToolBubbleProps {
  toolCall: ToolCall;
}

export function EmotionToolBubble({ toolCall }: EmotionToolBubbleProps) {
  const emotion = toolCall.args.emotion as string;
  const config = EMOTION_CONFIG[emotion];

  if (!config) return null;

  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r ${config.bgColor} border ${config.borderColor}`}
    >
      <Icon className={`w-3.5 h-3.5 ${config.iconColor}`} />
      <span className={`text-xs font-medium ${config.textColor}`}>
        {config.label}
      </span>
    </motion.div>
  );
}

export function isEmotionTool(name: string): boolean {
  return name === 'express_emotion';
}
