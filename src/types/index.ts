export type MoodType = 'happy' | 'neutral' | 'sad' | 'excited' | 'sleepy' | 'angry' | 'surprised' | 'love';

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
  | { type: 'thinking'; content: string }
  | { type: 'token'; content: string }
  | { type: 'tool_call'; name: string; args: Record<string, unknown> }
  | { type: 'done' };
