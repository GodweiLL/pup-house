'use client';

import { Wifi, WifiOff } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { usePetStore } from '@/stores/petStore';
import { AffinityBar } from './AffinityBar';
import { MoodIndicator } from './MoodIndicator';
import { cn } from '@/lib/utils';

export function StatusCard() {
  const { mood, affinity, isOnline } = usePetStore();

  return (
    <Card className="p-3 bg-card/50 border-border">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <AffinityBar value={affinity} />

        <MoodIndicator mood={mood} />

        <div className="flex items-center gap-1.5">
          {isOnline ? (
            <>
              <Wifi className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-500">在线</span>
            </>
          ) : (
            <>
              <WifiOff className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">离线</span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
