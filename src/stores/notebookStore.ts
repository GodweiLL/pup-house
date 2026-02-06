import { create } from 'zustand';
import type { NotebookEntry } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

interface NotebookState {
  entries: NotebookEntry[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  setOpen: (isOpen: boolean) => void;
  clearEntries: () => void;
  fetchEntries: (threadId: string) => Promise<void>;
  addEntry: (threadId: string, content: string) => Promise<void>;
  updateEntry: (threadId: string, index: number, content: string) => Promise<void>;
  deleteEntry: (threadId: string, index: number) => Promise<void>;
}

export const useNotebookStore = create<NotebookState>((set) => ({
  entries: [],
  isOpen: false,
  isLoading: false,
  error: null,

  setOpen: (isOpen) => set({ isOpen }),

  clearEntries: () => set({ entries: [], error: null }),

  fetchEntries: async (threadId) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/notebook/${threadId}`);
      if (!res.ok) throw new Error('Failed to fetch notebook');
      const data = await res.json();
      set({ entries: data.notebook || [], isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  addEntry: async (threadId, content) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/notebook/${threadId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error('Failed to add entry');
      const data = await res.json();
      set({ entries: data.notebook || [], isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  updateEntry: async (threadId, index, content) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/notebook/${threadId}/${index}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
      });
      if (!res.ok) throw new Error('Failed to update entry');
      const data = await res.json();
      set({ entries: data.notebook || [], isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },

  deleteEntry: async (threadId, index) => {
    set({ isLoading: true, error: null });
    try {
      const res = await fetch(`${API_BASE}/notebook/${threadId}/${index}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete entry');
      const data = await res.json();
      set({ entries: data.notebook || [], isLoading: false });
    } catch (err) {
      set({ error: (err as Error).message, isLoading: false });
    }
  },
}));
