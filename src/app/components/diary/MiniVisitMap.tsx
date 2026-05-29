import React from 'react';
import { MapPin } from 'lucide-react';
import type { VisitRecord } from '../../data/visitRecords';

interface MiniVisitMapProps {
  record: VisitRecord;
  onOpenMap: () => void;
}

export function MiniVisitMap({ record, onOpenMap }: MiniVisitMapProps) {
  return (
    <button
      type="button"
      onClick={onOpenMap}
      className="relative h-44 w-full overflow-hidden rounded-[22px] border border-border bg-[#EFEFEF] text-left shadow-sm"
      aria-label={`${record.title} 지도 위치로 이동`}
    >
      <div className="absolute left-0 top-0 h-[54%] w-full rounded-b-[28px] bg-[#E5EAD9]" />
      <div className="absolute left-[18%] top-[22%] h-[22%] w-[16%] rounded-xl bg-[#CBE0DE]" />
      <div className="absolute left-1/2 top-[52%] h-[48%] w-[24px] -translate-x-1/2 bg-white shadow-sm" />
      <div className="absolute left-0 top-[52%] h-[12px] w-full -translate-y-1/2 bg-white shadow-sm" />

      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none">
        <polyline
          points="25,30 45,35 57,48 61,63"
          fill="none"
          stroke="var(--primary)"
          strokeDasharray="2,2"
          strokeWidth="0.8"
          className="opacity-65"
        />
      </svg>

      <div
        className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{ left: `${record.mapPos.x}%`, top: `${record.mapPos.y}%` }}
      >
        <div className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-primary text-primary-foreground shadow-lg">
          <MapPin size={21} fill="currentColor" />
        </div>
        <div className="mt-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-primary shadow-sm">
          {record.title}
        </div>
      </div>

      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-[16px] border border-white/70 bg-white/92 px-3 py-2 shadow-sm backdrop-blur">
        <div>
          <p className="text-xs font-bold text-foreground">{record.place}</p>
          <p className="text-[11px] font-medium text-muted-foreground">탭해서 지도 탭의 해당 위치로 이동</p>
        </div>
        <MapPin size={18} className="text-primary" />
      </div>
    </button>
  );
}
