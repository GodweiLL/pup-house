import { create } from 'zustand';
import type { MoodType } from '@/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

interface AffinityChange {
  id: number;
  amount: number;
}

interface PetState {
  mood: MoodType;
  affinity: number;
  isOnline: boolean;
  affinityChanges: AffinityChange[];
  setMood: (mood: MoodType) => void;
  setAffinity: (value: number) => void;
  setOnline: (value: boolean) => void;
  resetMood: () => void;
  triggerAffinityChange: (amount: number) => void;
  removeAffinityChange: (id: number) => void;
  fetchIntimacy: () => Promise<void>;
}

let changeIdCounter = 0;

export const usePetStore = create<PetState>((set) => ({
  mood: 'neutral',
  affinity: 50,
  isOnline: false,
  affinityChanges: [],
  setMood: (mood) => set({ mood }),
  setAffinity: (affinity) => set({ affinity: Math.max(0, Math.min(100, affinity)) }),
  setOnline: (isOnline) => set({ isOnline }),
  resetMood: () => set({ mood: 'neutral' }),
  triggerAffinityChange: (amount) => set((state) => {
    const id = ++changeIdCounter;
    const newAffinity = Math.max(0, Math.min(100, state.affinity + amount));
    return {
      affinity: newAffinity,
      affinityChanges: [...state.affinityChanges, { id, amount }],
    };
  }),
  removeAffinityChange: (id) => set((state) => ({
    affinityChanges: state.affinityChanges.filter((c) => c.id !== id),
  })),
  fetchIntimacy: async () => {
    try {
      const res = await fetch(`${API_BASE}/global-state/intimacy`);
      if (!res.ok) return;
      const data = await res.json();
      set({ affinity: data.value });
    } catch {
      // ignore
    }
  },
}));
