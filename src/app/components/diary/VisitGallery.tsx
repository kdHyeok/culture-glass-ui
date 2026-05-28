import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import type { VisitRecord } from '../../data/visitRecords';

interface VisitGalleryProps {
  recordsByDate: Record<string, VisitRecord[]>;
  onRecordSelect: (record: VisitRecord) => void;
}

export function VisitGallery({ recordsByDate, onRecordSelect }: VisitGalleryProps) {
  return (
    <section className="px-5 pr-11">
      {Object.entries(recordsByDate).map(([dateLabel, records]) => (
        <div key={dateLabel} className="mb-7">
          <div className="mb-3 flex items-center gap-2 text-muted-foreground">
            <Calendar size={15} className="text-primary" />
            <h2 className="text-sm font-bold text-foreground">{dateLabel}</h2>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {records.map((record, index) => (
              <motion.button
                key={record.id}
                type="button"
                onClick={() => onRecordSelect(record)}
                data-gallery-photo
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
                className="group relative aspect-square overflow-hidden rounded-[16px] border border-border bg-card text-left shadow-sm"
              >
                <ImageWithFallback src={record.image} alt={record.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/68 via-black/8 to-transparent" />
                <div className="absolute left-3 right-3 bottom-3 text-white">
                  <p className="text-[11px] font-semibold text-white/76">{record.time}</p>
                  <h3 className="mt-0.5 truncate text-[14px] font-bold leading-tight">{record.title}</h3>
                  <p className="mt-0.5 truncate text-[11px] font-medium text-white/68">{record.place}</p>
                </div>
                <div className="absolute right-2 top-2 rounded-full bg-white/92 px-2 py-1 text-[10px] font-bold text-foreground shadow-sm">
                  <MessageCircle size={10} className="mr-1 inline text-primary" />
                  {record.questionCount}
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
