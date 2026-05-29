import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Clock3, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { VisitRecord } from '../../data/visitRecords';

interface VisitSlideshowProps {
  records: VisitRecord[];
  onRecordSelect: (record: VisitRecord) => void;
  intervalMs?: number;
}

export function VisitSlideshow({ records, onRecordSelect, intervalMs = 3600 }: VisitSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (records.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setCurrentIndex((index) => (index + 1) % records.length);
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [intervalMs, records.length]);

  useEffect(() => {
    if (currentIndex > records.length - 1) {
      setCurrentIndex(0);
    }
  }, [currentIndex, records.length]);

  const activeRecord = records[currentIndex];

  if (!activeRecord) {
    return null;
  }

  return (
    <section className="px-5">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold text-foreground">많이 머문 장소</h2>
        <span className="text-xs font-medium text-muted-foreground">관람 시간 · 질문 수 기준</span>
      </div>

      <button
        type="button"
        onClick={() => onRecordSelect(activeRecord)}
        data-visit-slideshow
        className="relative h-[224px] w-full overflow-hidden rounded-[24px] border border-border bg-card text-left shadow-sm"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeRecord.id}
            initial={{ opacity: 0, x: 36 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -36 }}
            transition={{ duration: 0.42, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <ImageWithFallback src={activeRecord.image} alt={activeRecord.title} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/18 to-transparent" />
            <div className="absolute left-4 right-4 bottom-4 text-white">
              <div className="mb-2 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/92 px-3 py-1 text-[11px] font-bold text-foreground shadow-sm">
                  <Clock3 size={12} />
                  총 {activeRecord.durationMinutes}분
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-primary-foreground shadow-sm">
                  <MessageCircle size={12} />
                  질문 {activeRecord.questionCount}회
                </span>
              </div>
              <h3 data-visit-slideshow-title className="text-[22px] font-bold leading-tight">{activeRecord.title}</h3>
              <p className="mt-1 text-sm font-medium text-white/82">
                {activeRecord.place} · {activeRecord.time}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute right-4 top-4 flex gap-1.5">
          {records.map((record, index) => (
            <span
              key={record.id}
              className={`h-1.5 rounded-full transition-all duration-300 ${index === currentIndex ? 'w-5 bg-primary' : 'w-1.5 bg-white/70'}`}
            />
          ))}
        </div>
      </button>
    </section>
  );
}
