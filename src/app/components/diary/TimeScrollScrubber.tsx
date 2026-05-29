import React, { useRef, useState } from 'react';
import type { VisitRecord } from '../../data/visitRecords';

interface TimeScrollScrubberProps {
  activeTime: string;
  records: VisitRecord[];
  scrollProgress: number;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  visible: boolean;
  onScrubStart: () => void;
  onScrubEnd: () => void;
}

export function TimeScrollScrubber({
  activeTime,
  records,
  scrollProgress,
  scrollRef,
  visible,
  onScrubStart,
  onScrubEnd,
}: TimeScrollScrubberProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isActive = visible || isDragging;

  const seekToClientY = (clientY: number, behavior: ScrollBehavior) => {
    const track = trackRef.current;
    const scrollContainer = scrollRef.current;

    if (!track || !scrollContainer) {
      return;
    }

    const rect = track.getBoundingClientRect();
    const nextProgress = Math.min(Math.max((clientY - rect.top) / rect.height, 0), 1);
    const maxScroll = Math.max(scrollContainer.scrollHeight - scrollContainer.clientHeight, 0);

    scrollContainer.scrollTo({
      top: maxScroll * nextProgress,
      behavior,
    });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    onScrubStart();
    event.currentTarget.setPointerCapture(event.pointerId);
    seekToClientY(event.clientY, 'smooth');
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) {
      return;
    }

    seekToClientY(event.clientY, 'auto');
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    onScrubEnd();

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      data-time-scrubber
      className={`pointer-events-none absolute bottom-32 right-1 top-[386px] z-30 flex w-12 justify-center transition-opacity duration-200 ${
        isActive ? 'opacity-100' : 'opacity-10'
      }`}
      aria-hidden={records.length === 0}
    >
      <div
        ref={trackRef}
        className="pointer-events-auto relative h-full w-9 cursor-pointer touch-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
      >
        <div className="absolute left-1/2 top-0 h-full w-1 -translate-x-1/2 rounded-full bg-primary/18" />
        <div
          className="absolute left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center transition-[top] duration-150"
          style={{ top: `${scrollProgress * 100}%` }}
        >
          <div
            data-time-scrubber-label
            className={`mr-2 rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold text-primary-foreground shadow-lg transition-all duration-200 ${
              isActive ? 'translate-x-0 scale-100 opacity-100' : 'translate-x-2 scale-95 opacity-0'
            }`}
          >
            {activeTime}
          </div>
          <div className="h-9 w-2.5 rounded-full bg-primary shadow-[0_4px_12px_rgba(91,140,122,0.38)]" />
        </div>
      </div>
    </div>
  );
}
