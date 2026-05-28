import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { TimeScrollScrubber } from '../components/diary/TimeScrollScrubber';
import { VisitDetailSheet } from '../components/diary/VisitDetailSheet';
import { VisitGallery } from '../components/diary/VisitGallery';
import { VisitSlideshow } from '../components/diary/VisitSlideshow';
import { visitRecords, type VisitRecord } from '../data/visitRecords';

export function Diary() {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const hideScrubberTimerRef = useRef<number | null>(null);
  const [activeTime, setActiveTime] = useState(visitRecords[0]?.time ?? '');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrubberVisible, setIsScrubberVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<VisitRecord | null>(null);

  const featuredRecords = useMemo(
    () =>
      [...visitRecords].sort((a, b) => {
        if (b.durationMinutes !== a.durationMinutes) {
          return b.durationMinutes - a.durationMinutes;
        }

        return b.questionCount - a.questionCount;
      }),
    [],
  );

  const recordsByDate = useMemo(() => {
    return visitRecords.reduce<Record<string, VisitRecord[]>>((groups, record) => {
      groups[record.dateLabel] = groups[record.dateLabel] ?? [];
      groups[record.dateLabel].push(record);
      return groups;
    }, {});
  }, []);

  const clearScrubberTimer = () => {
    if (hideScrubberTimerRef.current) {
      window.clearTimeout(hideScrubberTimerRef.current);
      hideScrubberTimerRef.current = null;
    }
  };

  const revealScrubber = (autoHide = true) => {
    clearScrubberTimer();
    setIsScrubberVisible(true);

    if (autoHide) {
      hideScrubberTimerRef.current = window.setTimeout(() => {
        setIsScrubberVisible(false);
      }, 900);
    }
  };

  const hideScrubberSoon = () => {
    clearScrubberTimer();
    hideScrubberTimerRef.current = window.setTimeout(() => {
      setIsScrubberVisible(false);
    }, 700);
  };

  useEffect(() => {
    return () => clearScrubberTimer();
  }, []);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const maxScroll = Math.max(target.scrollHeight - target.clientHeight, 1);
    const nextProgress = Math.min(Math.max(target.scrollTop / maxScroll, 0), 1);
    const index = Math.min(visitRecords.length - 1, Math.floor(nextProgress * visitRecords.length));

    setScrollProgress(nextProgress);
    setActiveTime(visitRecords[index]?.time ?? visitRecords[0]?.time ?? '');
    revealScrubber();
  };

  const openMapFocus = (record: VisitRecord) => {
    setSelectedRecord(null);
    navigate(`/map?focus=${record.id}`);
  };

  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-background text-foreground">
      <div className="absolute left-0 right-0 top-0 z-40 h-[108px] border-b border-border bg-background/95 px-5 pt-14 backdrop-blur-xl">
        <div className="flex items-center">
          <div>
            <p className="text-xs font-bold tracking-[0.18em] text-primary">DIARY</p>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">나의 관람기록</h1>
          </div>
        </div>
      </div>

      <div className="absolute left-0 right-0 top-[108px] z-30 bg-background pb-5 pt-4 shadow-[0_12px_24px_rgba(249,248,246,0.94)]">
        <VisitSlideshow records={featuredRecords} onRecordSelect={setSelectedRecord} />
      </div>

      <div
        ref={scrollRef}
        data-diary-scroll
        className="absolute inset-x-0 bottom-0 top-[386px] overflow-y-auto pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={handleScroll}
        onTouchStart={() => revealScrubber()}
        onWheel={() => revealScrubber()}
      >
        <VisitGallery recordsByDate={recordsByDate} onRecordSelect={setSelectedRecord} />
      </div>

      <TimeScrollScrubber
        activeTime={activeTime}
        records={visitRecords}
        scrollProgress={scrollProgress}
        scrollRef={scrollRef}
        visible={isScrubberVisible}
        onScrubStart={() => revealScrubber(false)}
        onScrubEnd={hideScrubberSoon}
      />

      <VisitDetailSheet record={selectedRecord} onClose={() => setSelectedRecord(null)} onOpenMap={openMapFocus} />
    </div>
  );
}
