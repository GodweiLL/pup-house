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
  md: { pixelSize: 10, canvasSize: 160 },
  lg: { pixelSize: 14, canvasSize: 224 },
};

export function PixelDog({ mood, size = 'md', isThinking, thinkingContent }: PixelDogProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    const fps = isThinking ? 3 : 8;
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

  return (
    <div className="relative flex flex-col items-center">
      <AnimatePresence>
        {isThinking && thinkingContent && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="absolute -top-4 left-1/2 -translate-x-1/2 -translate-y-full z-10 w-64"
          >
            <div className="relative">
              <div className="p-3 rounded-2xl bg-violet-950/80 border border-violet-500/30 backdrop-blur-sm shadow-lg shadow-violet-500/10">
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Sparkles className="w-3 h-3 text-violet-400" />
                  <span className="text-[10px] font-medium text-violet-400 uppercase tracking-wider">
                    思考中
                  </span>
                </div>
                <p className="text-xs text-violet-200/90 leading-relaxed max-h-20 overflow-y-auto">
                  {thinkingContent}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                    className="inline-block w-1 h-3 bg-violet-400 ml-0.5 align-middle"
                  />
                </p>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-violet-950/80" />
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
          className="rounded-lg"
          style={{ imageRendering: 'pixelated' }}
        />
      </div>
    </div>
  );
}
