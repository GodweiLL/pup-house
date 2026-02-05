'use client';

import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AffinityBarProps {
  value: number;
  max?: number;
}

export function AffinityBar({ value, max = 100 }: AffinityBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const hearts = Math.ceil(percentage / 20);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">亲密度</span>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Heart
            key={i}
            className={cn(
              'w-4 h-4 transition-all',
              i <= hearts
                ? 'fill-red-500 text-red-500'
                : 'text-muted-foreground/30'
            )}
          />
        ))}
      </div>
    </div>
  );
}
