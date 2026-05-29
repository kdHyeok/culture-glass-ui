import React from 'react';
import { MapView } from './map/MapView';

export function MapPage() {
  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      <div className="pt-14 pb-4 px-6 bg-background/95 backdrop-blur-xl absolute top-0 left-0 right-0 z-30 border-b border-border/50">
        <div className="flex items-center">
          <div>
            <p className="text-sm font-semibold text-primary tracking-wider">MAP</p>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">지도</h1>
          </div>
        </div>
      </div>

      <div className="flex-1 pt-[116px] overflow-hidden relative">
        <MapView />
      </div>
    </div>
  );
}
