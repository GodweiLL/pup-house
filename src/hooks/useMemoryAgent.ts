'use client';

import { useCallback, useRef, useState } from 'react';
import type { NotebookEntry, WSMessageType } from '@/types';

const WS_BASE = process.env.NEXT_PUBLIC_WS_BASE || 'ws://localhost:8000';

// 工具到阶段的映射
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

interface MemoryAgentState {
  isProcessing: boolean;
  currentTool: string | null;
  isComplete: boolean;
  error: string | null;
}

export function useMemoryAgent(threadId: string) {
  const wsRef = useRef<WebSocket | null>(null);
  const [state, setState] = useState<MemoryAgentState>({
    isProcessing: false,
    currentTool: null,
    isComplete: false,
    error: null,
  });
  const [visitedStages, setVisitedStages] = useState<Set<number>>(new Set());

  const buildMemory = useCallback(async (notebookContent: NotebookEntry[]) => {
    if (!threadId || notebookContent.length === 0) {
      setState(s => ({ ...s, error: '小本本是空的' }));
      return;
    }

    setState({ isProcessing: true, currentTool: null, isComplete: false, error: null });
    setVisitedStages(new Set());

    return new Promise<void>((resolve, reject) => {
      const ws = new WebSocket(`${WS_BASE}/memory/ws/${threadId}`);
      wsRef.current = ws;

      ws.onopen = () => {
        ws.send(JSON.stringify({
          type: 'build',
          notebook_content: notebookContent,
        }));
      };

      ws.onmessage = (event) => {
        try {
          const data: WSMessageType = JSON.parse(event.data);

          switch (data.type) {
            case 'tool_call':
              const stage = TOOL_TO_STAGE[data.name];
              if (stage !== undefined) {
                setVisitedStages(prev => new Set(prev).add(stage));
              }
              setState(s => ({ ...s, currentTool: data.name }));
              break;

            case 'done':
              setState({ isProcessing: false, currentTool: null, isComplete: true, error: null });
              ws.close();
              // 2秒后重置完成状态
              setTimeout(() => {
                setState(s => ({ ...s, isComplete: false }));
              }, 2000);
              resolve();
              break;

            case 'error':
              setState({ isProcessing: false, currentTool: null, isComplete: false, error: data.message });
              ws.close();
              reject(new Error(data.message));
              break;
          }
        } catch {
          // Ignore parse errors
        }
      };

      ws.onerror = () => {
        setState({ isProcessing: false, currentTool: null, isComplete: false, error: '连接失败' });
        reject(new Error('连接失败'));
      };

      ws.onclose = () => {
        wsRef.current = null;
      };
    });
  }, [threadId]);

  const cancel = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    setState({ isProcessing: false, currentTool: null, isComplete: false, error: null });
    setVisitedStages(new Set());
  }, []);

  return {
    ...state,
    visitedStages,
    buildMemory,
    cancel,
  };
}
