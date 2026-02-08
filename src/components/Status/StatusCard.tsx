'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Wifi, WifiOff } from 'lucide-react';
import { usePetStore } from '@/stores/petStore';
import { MOOD_CONFIG } from '@/components/PixelDog/animations';
import { cn } from '@/lib/utils';

function FloatingChange({ id, amount }: { id: number; amount: number }) {
  const removeAffinityChange = usePetStore((s) => s.removeAffinityChange);

  useEffect(() => {
    const timer = setTimeout(() => {
      removeAffinityChange(id);
    }, 1500);
    return () => clearTimeout(timer);
  }, [id, removeAffinityChange]);

  const isPositive = amount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 0, scale: 0.5 }}
      animate={{ opacity: 1, y: -20, scale: 1 }}
      exit={{ opacity: 0, y: -35, scale: 0.8 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'absolute -top-1 left-1/2 -translate-x-1/2 pointer-events-none',
        'text-sm font-bold',
        isPositive ? 'text-rose-500' : 'text-slate-400'
      )}
    >
      {isPositive ? `+${amount}` : amount}
    </motion.div>
  );
}

export function StatusCard() {
  const { mood, affinity, isOnline, affinityChanges } = usePetStore();
  const moodConfig = MOOD_CONFIG[mood];

  const hearts = Math.min(5, Math.floor(affinity / 20));

  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white border border-border">
      <div className="flex items-center gap-3">
        <div className="relative flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((i) => (
            <Heart
              key={i}
              className={cn(
                'w-4 h-4 transition-all',
                i <= hearts
                  ? 'fill-rose-400 text-rose-400'
                  : 'text-gray-200'
              )}
            />
          ))}
          <AnimatePresence>
            {affinityChanges.map((change) => (
              <FloatingChange key={change.id} id={change.id} amount={change.amount} />
            ))}
          </AnimatePresence>
        </div>
        <div className="h-4 w-px bg-border" />
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            backgroundColor: `${moodConfig.color}15`,
            color: moodConfig.color,
          }}
        >
          {moodConfig.label}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        {isOnline ? (
          <>
            <Wifi className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-xs text-emerald-500">在线</span>
          </>
        ) : (
          <>
            <WifiOff className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-xs text-gray-400">离线</span>
          </>
        )}
      </div>
    </div>
  );
}
