export type MoodType = 'happy' | 'neutral' | 'sad' | 'excited' | 'sleepy' | 'angry' | 'surprised' | 'love';

export type AgentType = 'pixel-pup' | 'memory';

export interface NotebookEntry {
  content: string;
  source: 'agent' | 'human';
}

export interface ToolCall {
  name: string;
  args: Record<string, unknown>;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  thinking?: string;
  toolCalls?: ToolCall[];
  timestamp: Date;
  isStreaming?: boolean;
}

export type WSMessageType =
  | { type: 'thinking'; content: string; agent_type?: AgentType }
  | { type: 'token'; content: string; agent_type?: AgentType }
  | { type: 'tool_call'; name: string; args: Record<string, unknown>; agent_type?: AgentType }
  | { type: 'done'; agent_type?: AgentType }
  | { type: 'error'; message: string; agent_type?: AgentType };
