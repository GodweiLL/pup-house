'use client';

import { Heart, Wifi, WifiOff } from 'lucide-react';
import { usePetStore } from '@/stores/petStore';
import { MOOD_CONFIG } from '@/components/PixelDog/animations';
import { cn } from '@/lib/utils';

export function StatusCard() {
  const { mood, affinity, isOnline } = usePetStore();
  const moodConfig = MOOD_CONFIG[mood];

  const hearts = Math.ceil((affinity / 100) * 5);

  return (
    <div className="flex items-center justify-between gap-4 p-3 rounded-xl bg-white border border-border">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-0.5">
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
