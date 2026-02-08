'use client';

import { motion } from 'framer-motion';
import { Search, Tags, User, Link2, Check, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// 工具名称到阶段的映射
const TOOL_TO_STAGE: Record<string, number> = {
  list_entity_types: 0,
  list_relation_types: 0,
  create_entity_type: 1,
  create_relation_type: 1,
  search_entities: 2,
  semantic_search_entities: 2,
  create_entity: 2,
  get_entity: 2,
  update_entity: 2,
  delete_entity: 2,
  create_relation: 3,
  get_entity_relations: 3,
  delete_relation: 3,
};

const STAGES = [
  { icon: Search, label: '分析' },
  { icon: Tags, label: '定义' },
  { icon: User, label: '实体' },
  { icon: Link2, label: '关联' },
];

interface MemoryBuildOverlayProps {
  isProcessing: boolean;
  currentTool?: string;
  isComplete?: boolean;
  visitedStages: Set<number>;
}

export function MemoryBuildOverlay({
  isProcessing,
  currentTool,
  isComplete,
  visitedStages,
}: MemoryBuildOverlayProps) {
  if (!isProcessing && !isComplete) return null;

  const currentStage = currentTool ? TOOL_TO_STAGE[currentTool] : undefined;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 flex items-center justify-center"
    >
      {/* 毛玻璃背景 */}
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm rounded-2xl" />

      {/* 内容 */}
      <div className="relative flex flex-col items-center gap-4 p-6">
        {/* 标题 */}
        <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
          {!isComplete && (
            <Loader2 className="w-4 h-4 animate-spin text-primary" />
          )}
          <span>{isComplete ? '整理完成' : '正在整理记忆...'}</span>
        </div>

        {/* 阶段指示器 */}
        <div className="flex items-center gap-1">
          {STAGES.map((stage, idx) => {
            const Icon = stage.icon;
            const isActive = idx === currentStage && !isComplete;
            const isVisited = visitedStages.has(idx) || isComplete;

            return (
              <div key={idx} className="flex items-center">
                {/* 阶段图标 */}
                <motion.div
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    opacity: isVisited || isActive ? 1 : 0.4,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={cn(
                    'flex flex-col items-center gap-1',
                    isActive && 'text-primary',
                    isVisited && !isActive && 'text-green-500',
                    !isActive && !isVisited && 'text-gray-400'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                      isActive && 'bg-primary/10',
                      isVisited && !isActive && 'bg-green-50',
                      !isActive && !isVisited && 'bg-gray-100'
                    )}
                  >
                    {isVisited && !isActive ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Icon className={cn('w-4 h-4', isActive && 'animate-pulse')} />
                    )}
                  </div>
                  <span className="text-[10px] font-medium">{stage.label}</span>
                </motion.div>

                {/* 连接线 - 静态灰色 */}
                {idx < STAGES.length - 1 && (
                  <div className="w-4 h-0.5 mx-0.5 mt-[-12px] bg-gray-200" />
                )}
              </div>
            );
          })}
        </div>

        {/* 当前工具提示 */}
        {currentTool && !isComplete && (
          <motion.div
            key={currentTool}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
          >
            {currentTool.replace(/_/g, ' ')}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
