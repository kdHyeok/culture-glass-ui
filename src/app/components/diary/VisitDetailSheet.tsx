import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, MessageCircle, Star, X } from 'lucide-react';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { SharedMicWaveform } from '../SharedMicWaveform';
import { MiniVisitMap } from './MiniVisitMap';
import type { VisitRecord } from '../../data/visitRecords';

interface VisitDetailSheetProps {
  record: VisitRecord | null;
  onClose: () => void;
  onOpenMap: (record: VisitRecord) => void;
}

export function VisitDetailSheet({ record, onClose, onOpenMap }: VisitDetailSheetProps) {
  const [rating, setRating] = useState(0);
  const [diaryNote, setDiaryNote] = useState('');

  return (
    <AnimatePresence>
      {record && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 210 }}
            className="fixed bottom-0 left-0 right-0 z-[70] flex max-h-[86vh] flex-col overflow-hidden rounded-t-[32px] bg-card shadow-[0_-10px_40px_rgba(0,0,0,0.15)]"
          >
            <SharedMicWaveform placement="sheet" />
            <div className="absolute top-0 z-10 flex w-full justify-center pb-2 pt-4">
              <div className="h-1.5 w-12 rounded-full bg-border/80" />
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-7 pt-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="relative mb-6 h-52 overflow-hidden rounded-[24px] border border-border/50 shadow-sm">
                <ImageWithFallback src={record.image} alt={record.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/72 via-black/10 to-transparent" />
                <div className="absolute left-4 top-4 flex items-center rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[13px] font-medium text-white backdrop-blur-md">
                  <Calendar size={14} className="mr-2" />
                  {record.dateLabel} {record.time}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60"
                  aria-label="상세 기록 닫기"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <h2 className="text-[26px] font-bold leading-tight">{record.title}</h2>
                  <p className="mt-1 text-sm font-semibold text-white/82">
                    {record.place} · 총 {record.durationMinutes}분 · 질문 {record.questionCount}회
                  </p>
                </div>
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {record.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-primary/20 bg-accent/15 px-3 py-1 text-[13px] font-semibold text-primary">
                    {tag}
                  </span>
                ))}
              </div>

              <p className="mb-7 text-[16px] leading-[1.65] text-foreground/80">{record.summary}</p>

              <section className="mb-5 rounded-[22px] border border-border bg-muted/30 p-5">
                <div className="mb-4 flex items-center gap-2 text-[13px] font-bold text-primary">
                  <MessageCircle size={16} />
                  <span>해설 대화 내용</span>
                </div>
                <div className="space-y-3.5 text-[14.5px] font-medium leading-relaxed">
                  {record.dialogue.split('\n').map((line, index) => (
                    <div key={index} className={`flex ${line.startsWith('Q:') ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[85%] rounded-[18px] px-4 py-3 shadow-sm ${
                          line.startsWith('Q:') ? 'rounded-br-sm bg-primary text-primary-foreground' : 'rounded-bl-sm border border-border bg-card text-foreground'
                        }`}
                      >
                        {line.replace(/^[QA]:\s/, '')}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="mb-5 rounded-[22px] border border-border bg-card p-5 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-[17px] font-bold">나의 감상</h3>
                    <p className="mt-1 text-sm text-muted-foreground">별점과 일기를 자유롭게 남겨보세요.</p>
                  </div>
                  <div className="text-sm font-semibold text-primary">{rating > 0 ? `${rating}.0` : '미평가'}</div>
                </div>

                <div className="mb-5 flex items-center gap-2" aria-label="별점 선택">
                  {[1, 2, 3, 4, 5].map((value) => {
                    const selected = value <= rating;

                    return (
                      <button
                        key={value}
                        type="button"
                        onClick={() => setRating(value)}
                        className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors ${
                          selected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}
                        aria-label={`${value}점`}
                      >
                        <Star size={24} fill={selected ? 'currentColor' : 'none'} />
                      </button>
                    );
                  })}
                </div>

                <label className="block">
                  <span className="text-sm font-semibold">일기</span>
                  <textarea
                    value={diaryNote}
                    onChange={(event) => setDiaryNote(event.target.value)}
                    placeholder="이 장소에서 떠오른 생각을 자유롭게 적어보세요."
                    className="mt-2 min-h-32 w-full resize-none rounded-[18px] border border-border bg-muted/30 px-4 py-3 text-[15px] leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-white"
                  />
                </label>
              </section>

              <section>
                <h3 className="mb-3 text-[17px] font-bold">위치</h3>
                <MiniVisitMap record={record} onOpenMap={() => onOpenMap(record)} />
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
