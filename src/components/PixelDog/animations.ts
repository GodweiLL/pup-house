import type { MoodType } from '@/types';

type PixelColor = string | null;

export interface DogFrame {
  pixels: PixelColor[][];
}

const COLORS = {
  primary: '#8B4513',
  secondary: '#D2691E',
  light: '#DEB887',
  nose: '#1a1a1a',
  tongue: '#FF6B6B',
  eye: '#2d1810',
  eyeWhite: '#ffffff',
  blush: '#FFB6C1',
  angry: '#FF4444',
  heart: '#FF69B4',
};

const EMPTY = null;
const P = COLORS.primary;
const S = COLORS.secondary;
const L = COLORS.light;
const N = COLORS.nose;
const T = COLORS.tongue;
const E = COLORS.eye;
const W = COLORS.eyeWhite;
const B = COLORS.blush;
const A = COLORS.angry;
const H = COLORS.heart;

// 16x16 pixel dog base frame
const BASE_DOG: PixelColor[][] = [
  [EMPTY, EMPTY, EMPTY, P, P, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, P, P, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, P, P, P, P, P, P, P, P, P, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, P, S, S, S, S, S, S, S, S, P, P, EMPTY, EMPTY],
  [EMPTY, P, P, S, S, W, E, S, S, W, E, S, S, P, P, EMPTY],
  [EMPTY, P, S, S, S, S, S, S, S, S, S, S, S, S, P, EMPTY],
  [EMPTY, P, S, S, S, S, S, N, N, S, S, S, S, S, P, EMPTY],
  [EMPTY, P, S, S, L, L, L, L, L, L, L, L, S, S, P, EMPTY],
  [EMPTY, EMPTY, P, S, L, L, L, L, L, L, L, L, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, S, S, S, S, S, S, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, P, S, S, S, S, S, S, P, P, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, P, P, P, EMPTY, P, P, P, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
];

// Neutral - standing
const NEUTRAL_FRAMES: DogFrame[] = [
  { pixels: BASE_DOG },
];

// Happy - with tongue out
const HAPPY_DOG: PixelColor[][] = BASE_DOG.map((row, y) =>
  row.map((pixel, x) => {
    if (y === 9 && (x === 7 || x === 8)) return T;
    if (y === 10 && (x === 7 || x === 8)) return T;
    return pixel;
  })
);

const HAPPY_FRAMES: DogFrame[] = [
  { pixels: HAPPY_DOG },
];

// Sad - droopy ears
const SAD_DOG: PixelColor[][] = [
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, P, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, P, P, EMPTY, EMPTY],
  [EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY],
  [EMPTY, P, S, S, P, P, P, P, P, P, P, P, P, S, S, P],
  [EMPTY, EMPTY, P, P, S, S, S, S, S, S, S, S, P, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, W, E, S, S, W, E, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, S, S, S, S, S, S, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, S, S, N, N, S, S, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, L, L, L, L, L, L, L, L, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, L, L, L, L, L, L, L, L, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, S, S, S, S, S, S, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, P, S, S, S, S, S, S, P, P, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, P, P, P, EMPTY, P, P, P, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
];

const SAD_FRAMES: DogFrame[] = [
  { pixels: SAD_DOG },
];

// Excited - jumping with blush
const EXCITED_DOG: PixelColor[][] = BASE_DOG.map((row, y) =>
  row.map((pixel, x) => {
    if (y === 6 && (x === 3 || x === 4)) return B;
    if (y === 6 && (x === 11 || x === 12)) return B;
    if (y === 9 && (x === 7 || x === 8)) return T;
    return pixel;
  })
);

const EXCITED_FRAMES: DogFrame[] = [
  { pixels: EXCITED_DOG },
];

// Sleepy - closed eyes
const SLEEPY_DOG: PixelColor[][] = BASE_DOG.map((row, y) =>
  row.map((pixel, x) => {
    if (y === 5 && (x === 5 || x === 6 || x === 9 || x === 10)) return S;
    return pixel;
  })
);

const SLEEPY_FRAMES: DogFrame[] = [
  { pixels: SLEEPY_DOG },
];

// Thinking - head tilt (looking up)
const THINKING_DOG_1: PixelColor[][] = [
  [EMPTY, EMPTY, EMPTY, P, P, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, P, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY],
  [EMPTY, EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, P, P, P, P, P, P, P, P, P, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, S, S, S, S, S, S, S, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, S, W, E, S, W, E, S, S, S, P, EMPTY],
  [EMPTY, EMPTY, P, S, S, S, S, S, S, S, S, S, S, S, P, EMPTY],
  [EMPTY, EMPTY, P, S, S, S, S, S, N, N, S, S, S, S, P, EMPTY],
  [EMPTY, EMPTY, P, S, S, L, L, L, L, L, L, L, S, S, P, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, S, L, L, L, L, L, L, L, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, S, S, S, S, S, S, S, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, P, P, S, S, S, S, S, P, P, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, P, S, S, P, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, P, S, S, P, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, P, P, P, P, P, P, P, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
];

const THINKING_DOG_2: PixelColor[][] = [
  [EMPTY, EMPTY, P, P, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, P, P, EMPTY, EMPTY, EMPTY],
  [EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY, EMPTY],
  [EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, P, P, P, P, P, P, P, P, P, P, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, S, S, S, S, S, S, S, P, EMPTY, EMPTY, EMPTY],
  [EMPTY, P, S, S, W, E, S, S, W, E, S, S, S, P, EMPTY, EMPTY],
  [EMPTY, P, S, S, S, S, S, S, S, S, S, S, S, P, EMPTY, EMPTY],
  [EMPTY, P, S, S, S, S, N, N, S, S, S, S, S, P, EMPTY, EMPTY],
  [EMPTY, P, S, L, L, L, L, L, L, L, L, S, S, P, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, L, L, L, L, L, L, L, S, P, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, P, S, S, S, S, S, S, S, S, S, P, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, P, S, S, S, S, S, P, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, S, S, P, EMPTY, P, S, S, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, P, P, P, P, EMPTY, P, P, P, P, EMPTY, EMPTY, EMPTY, EMPTY],
  [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
];

export const THINKING_FRAMES: DogFrame[] = [
  { pixels: THINKING_DOG_1 },
  { pixels: THINKING_DOG_2 },
];

// Angry - furrowed brows and red face
const ANGRY_DOG: PixelColor[][] = BASE_DOG.map((row, y) =>
  row.map((pixel, x) => {
    // Red tint on face
    if (y === 4 && (x === 4 || x === 11)) return A;
    if (y === 5 && (x === 3 || x === 12)) return A;
    return pixel;
  })
);

const ANGRY_FRAMES: DogFrame[] = [
  { pixels: ANGRY_DOG },
];

// Surprised - wide eyes
const SURPRISED_DOG: PixelColor[][] = BASE_DOG.map((row, y) =>
  row.map((pixel, x) => {
    // Bigger eyes
    if (y === 4 && (x === 5 || x === 6 || x === 9 || x === 10)) return W;
    if (y === 5 && (x === 4 || x === 7 || x === 8 || x === 11)) return W;
    if (y === 5 && (x === 6 || x === 10)) return E;
    return pixel;
  })
);

const SURPRISED_FRAMES: DogFrame[] = [
  { pixels: SURPRISED_DOG },
];

// Love - heart eyes and blush
const LOVE_DOG: PixelColor[][] = BASE_DOG.map((row, y) =>
  row.map((pixel, x) => {
    // Heart eyes
    if (y === 5 && (x === 5 || x === 6 || x === 9 || x === 10)) return H;
    // Blush
    if (y === 6 && (x === 3 || x === 4)) return B;
    if (y === 6 && (x === 11 || x === 12)) return B;
    // Tongue
    if (y === 9 && (x === 7 || x === 8)) return T;
    return pixel;
  })
);

const LOVE_FRAMES: DogFrame[] = [
  { pixels: LOVE_DOG },
];

export const MOOD_ANIMATIONS: Record<MoodType, DogFrame[]> = {
  neutral: NEUTRAL_FRAMES,
  happy: HAPPY_FRAMES,
  sad: SAD_FRAMES,
  excited: EXCITED_FRAMES,
  sleepy: SLEEPY_FRAMES,
  angry: ANGRY_FRAMES,
  surprised: SURPRISED_FRAMES,
  love: LOVE_FRAMES,
};

export const MOOD_CONFIG: Record<MoodType, {
  label: string;
  color: string;
  animation?: string;
}> = {
  happy: { label: '开心', color: '#22c55e', animation: 'animate-pixel-bounce' },
  neutral: { label: '普通', color: '#6b7280' },
  sad: { label: '难过', color: '#3b82f6' },
  excited: { label: '兴奋', color: '#f59e0b', animation: 'animate-pixel-bounce' },
  sleepy: { label: '困了', color: '#8b5cf6' },
  angry: { label: '生气', color: '#ef4444', animation: 'animate-pixel-shake' },
  surprised: { label: '惊讶', color: '#06b6d4' },
  love: { label: '爱心', color: '#ec4899', animation: 'animate-pixel-bounce' },
};
