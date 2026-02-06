'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { MOOD_ANIMATIONS, MOOD_CONFIG, THINKING_FRAMES, type DogFrame } from './animations';
import type { MoodType } from '@/types';

interface PixelDogProps {
  mood: MoodType;
  size?: 'sm' | 'md' | 'lg';
  isThinking?: boolean;
  thinkingContent?: string;
}

const SIZE_CONFIG = {
  sm: { pixelSize: 6, canvasSize: 96 },
  md: { pixelSize: 8, canvasSize: 128 },
  lg: { pixelSize: 10, canvasSize: 160 },
};

export function PixelDog({ mood, size = 'md', isThinking, thinkingContent }: PixelDogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const thinkingRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const animationRef = useRef<number>(0);

  const config = SIZE_CONFIG[size];
  const moodConfig = MOOD_CONFIG[mood];
  const frames = isThinking ? THINKING_FRAMES : MOOD_ANIMATIONS[mood];

  const drawFrame = useCallback((ctx: CanvasRenderingContext2D, frame: DogFrame) => {
    const { pixelSize } = config;

    ctx.clearRect(0, 0, config.canvasSize, config.canvasSize);

    frame.pixels.forEach((row, y) => {
      row.forEach((color, x) => {
        if (color) {
          ctx.fillStyle = color;
          ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
      });
    });
  }, [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false;

    let lastTime = 0;
    const fps = isThinking ? 2 : 8;
    const frameInterval = 1000 / fps;

    const animate = (time: number) => {
      if (time - lastTime >= frameInterval) {
        const frame = frames[frameRef.current % frames.length];
        drawFrame(ctx, frame);
        frameRef.current++;
        lastTime = time;
      }
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frames, drawFrame, isThinking]);

  useEffect(() => {
    frameRef.current = 0;
  }, [isThinking]);

  useEffect(() => {
    if (thinkingRef.current && isThinking) {
      thinkingRef.current.scrollTop = thinkingRef.current.scrollHeight;
    }
  }, [thinkingContent, isThinking]);

  return (
    <div className="flex flex-col items-center w-full">
      <AnimatePresence>
        {isThinking && thinkingContent && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="w-full mb-3"
          >
            <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span className="text-sm font-medium text-indigo-500">
                  思考中...
                </span>
              </div>
              <div
                ref={thinkingRef}
                className="text-sm text-gray-600 leading-relaxed max-h-[150px] overflow-y-auto pr-2"
              >
                {thinkingContent}
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  className="inline-block w-1.5 h-4 bg-indigo-400 ml-1 align-middle rounded-full"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-indigo-100" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`relative ${isThinking ? '' : moodConfig.animation || ''}`}
        style={{ imageRendering: 'pixelated' }}
      >
        <canvas
          ref={canvasRef}
          width={config.canvasSize}
          height={config.canvasSize}
          className="rounded-2xl"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}
