'use client';

import { Badge } from '@/components/ui/badge';
import { MOOD_CONFIG } from '@/components/PixelDog/animations';
import type { MoodType } from '@/types';

interface MoodIndicatorProps {
  mood: MoodType;
}

export function MoodIndicator({ mood }: MoodIndicatorProps) {
  const config = MOOD_CONFIG[mood];

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-muted-foreground">心情</span>
      <Badge
        variant="secondary"
        className="px-2 py-0.5 text-xs"
        style={{ backgroundColor: `${config.color}20`, color: config.color }}
      >
        {config.label}
      </Badge>
    </div>
  );
}
