import { create } from 'zustand';
import type { MoodType } from '@/types';

interface PetState {
  mood: MoodType;
  affinity: number;
  isOnline: boolean;
  setMood: (mood: MoodType) => void;
  setAffinity: (value: number) => void;
  setOnline: (value: boolean) => void;
  resetMood: () => void;
}

export const usePetStore = create<PetState>((set) => ({
  mood: 'neutral',
  affinity: 50,
  isOnline: false,
  setMood: (mood) => set({ mood }),
  setAffinity: (affinity) => set({ affinity: Math.max(0, Math.min(100, affinity)) }),
  setOnline: (isOnline) => set({ isOnline }),
  resetMood: () => set({ mood: 'neutral' }),
}));
