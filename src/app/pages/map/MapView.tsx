import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Calendar, Compass, LocateFixed, MessageCircle, Minus, Navigation, Plus, Star, X } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { SharedMicWaveform } from '../../components/SharedMicWaveform';
import { VisitDetailSheet } from '../../components/diary/VisitDetailSheet';
import { nearbyPlaces, visitRecords, type VisitRecord } from '../../data/visitRecords';

type Point = { x: number; y: number };

const MIN_ZOOM = 0.75;
const MAX_ZOOM = 2.4;
const DEFAULT_ZOOM = 1;
const DETAIL_ZOOM = 1.35;
const userLocation = { x: 48, y: 58 };
const userHeading = 34;

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function distance(a: Point, b: Point) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function angle(a: Point, b: Point) {
  return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
}

function midpoint(a: Point, b: Point) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

export function MapView() {
  const [searchParams] = useSearchParams();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const pointersRef = useRef(new Map<number, Point>());
  const gestureRef = useRef<{ midpoint: Point; distance: number; angle: number } | null>(null);
  const [selectedPin, setSelectedPin] = useState<VisitRecord | null>(null);
  const [focusedRecordId, setFocusedRecordId] = useState<number | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [rotation, setRotation] = useState(0);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });

  const isDetailMap = zoom >= DETAIL_ZOOM;

  const focusCoordinate = (position: Point, nextZoom = Math.max(zoom, 1.18)) => {
    const rect = containerRef.current?.getBoundingClientRect();

    if (!rect) {
      return;
    }

    const targetX = (position.x / 100) * rect.width;
    const targetY = (position.y / 100) * rect.height;

    setZoom(clamp(nextZoom, MIN_ZOOM, MAX_ZOOM));
    setOffset({
      x: rect.width / 2 - targetX,
      y: rect.height / 2 - targetY,
    });
  };

  useEffect(() => {
    const requestedPlace = Number(searchParams.get('place'));
    const requestedFocus = Number(searchParams.get('focus'));
    const placeRecord = visitRecords.find((record) => record.id === requestedPlace);
    const focusRecord = visitRecords.find((record) => record.id === requestedFocus);

    if (placeRecord) {
      setSelectedPin(placeRecord);
      setFocusedRecordId(placeRecord.id);
      window.setTimeout(() => focusCoordinate(placeRecord.mapPos, 1.22), 0);
      return;
    }

    if (focusRecord) {
      setSelectedPin(null);
      setFocusedRecordId(focusRecord.id);
      window.setTimeout(() => focusCoordinate(focusRecord.mapPos, 1.22), 0);
    }
  }, [searchParams]);

  const focusUserLocation = () => {
    setFocusedRecordId(null);
    focusCoordinate(userLocation, Math.max(zoom, 1.05));
  };

  const updatePointerGesture = () => {
    const points = Array.from(pointersRef.current.values());

    if (points.length === 1) {
      const previous = gestureRef.current?.midpoint ?? points[0];
      const current = points[0];

      setOffset((value) => ({
        x: value.x + current.x - previous.x,
        y: value.y + current.y - previous.y,
      }));
      gestureRef.current = { midpoint: current, distance: 0, angle: 0 };
      return;
    }

    if (points.length >= 2) {
      const currentMidpoint = midpoint(points[0], points[1]);
      const currentDistance = distance(points[0], points[1]);
      const currentAngle = angle(points[0], points[1]);
      const previous = gestureRef.current;

      if (previous && previous.distance > 0) {
        const zoomRatio = currentDistance / previous.distance;

        setZoom((value) => clamp(value * zoomRatio, MIN_ZOOM, MAX_ZOOM));
        setRotation((value) => value + currentAngle - previous.angle);
        setOffset((value) => ({
          x: value.x + currentMidpoint.x - previous.midpoint.x,
          y: value.y + currentMidpoint.y - previous.midpoint.y,
        }));
      }

      gestureRef.current = { midpoint: currentMidpoint, distance: currentDistance, angle: currentAngle };
    }
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });

    const points = Array.from(pointersRef.current.values());
    if (points.length >= 2) {
      gestureRef.current = {
        midpoint: midpoint(points[0], points[1]),
        distance: distance(points[0], points[1]),
        angle: angle(points[0], points[1]),
      };
    } else {
      gestureRef.current = { midpoint: points[0], distance: 0, angle: 0 };
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) {
      return;
    }

    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    updatePointerGesture();
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    pointersRef.current.delete(event.pointerId);

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    const points = Array.from(pointersRef.current.values());
    if (points.length === 1) {
      gestureRef.current = { midpoint: points[0], distance: 0, angle: 0 };
    } else {
      gestureRef.current = null;
    }
  };

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    setZoom((value) => clamp(value + (event.deltaY > 0 ? -0.08 : 0.08), MIN_ZOOM, MAX_ZOOM));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 h-full w-full overflow-hidden bg-[#EFEFEF]"
    >
      <div
        ref={containerRef}
        className="absolute inset-0 touch-none overflow-hidden"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onWheel={handleWheel}
      >
        <div
          className="absolute inset-0 origin-center transition-[transform] duration-75"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) rotate(${rotation}deg) scale(${zoom})`,
          }}
        >
          <BaseMap isDetailMap={isDetailMap} />
          <UserLocationMarker heading={userHeading} />

          {isDetailMap ? (
            <DetailedStructureLayer focusedRecordId={focusedRecordId} onSelectPin={setSelectedPin} />
          ) : (
            <MarkerOverviewLayer focusedRecordId={focusedRecordId} selectedPin={selectedPin} onSelectPin={setSelectedPin} />
          )}
        </div>
      </div>

      <ZoomControl zoom={zoom} onZoomChange={setZoom} />

      <div className="absolute bottom-32 right-4 z-40 flex flex-col gap-2">
        <button
          type="button"
          onClick={() => setRotation(0)}
          className="relative flex h-11 w-11 items-center justify-center rounded-full border border-border bg-white/95 text-foreground shadow-md backdrop-blur"
          aria-label="나침반을 북쪽 기준으로 맞추기"
        >
          <Compass size={21} className="text-primary" style={{ transform: `rotate(${-rotation}deg)` }} />
          <span className="absolute top-1 text-[8px] font-black leading-none text-primary">N</span>
          <span className="absolute bottom-1 text-[8px] font-black leading-none text-muted-foreground">S</span>
        </button>
        <button
          type="button"
          onClick={focusUserLocation}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25"
          aria-label="현재 위치로 이동"
        >
          <LocateFixed size={20} />
        </button>
      </div>

      <ZoomStatusBadge
        isDetailMap={isDetailMap}
        zoom={zoom}
        onResetZoom={() => setZoom(DEFAULT_ZOOM)}
      />

      <AnimatePresence>
        {selectedPin && (
          <VisitDetailSheet
            record={selectedPin}
            onClose={() => setSelectedPin(null)}
            onOpenMap={(record) => {
              setFocusedRecordId(record.id);
              setSelectedPin(record);
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function BaseMap({ isDetailMap }: { isDetailMap: boolean }) {
  return (
    <>
      <div className="absolute left-0 top-0 h-[52%] w-full rounded-b-[40px] bg-[#E5EAD9] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.02)]" />
      <div className="absolute left-[18%] top-[22%] h-[12%] w-[14%] rounded-xl bg-[#CBE0DE]" />
      <div className="absolute left-1/2 top-[52%] h-[48%] w-[32px] -translate-x-1/2 bg-white shadow-sm" />
      <div className="absolute left-0 top-[52%] h-[14px] w-full -translate-y-1/2 bg-white shadow-sm" />
      <div className="absolute left-[8%] top-[66%] h-[10px] w-[84%] rotate-[-14deg] rounded-full bg-white/90 shadow-sm" />

      <svg viewBox="0 0 100 100" className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" style={{ zIndex: 1 }}>
        <polyline
          points={visitRecords.map((item) => `${item.mapPos.x},${item.mapPos.y}`).join(' ')}
          fill="none"
          stroke="var(--primary)"
          strokeDasharray="2,2"
          strokeWidth="0.8"
          className="opacity-70 drop-shadow-sm"
        />
      </svg>

      <div className={`absolute inset-0 transition-opacity duration-300 ${isDetailMap ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute left-[17%] top-[23%] h-[18%] w-[28%] rounded-[18px] border border-primary/20 bg-white/72 shadow-sm" />
        <div className="absolute left-[46%] top-[28%] h-[15%] w-[24%] rounded-[16px] border border-primary/20 bg-white/75 shadow-sm" />
        <div className="absolute left-[33%] top-[45%] h-[13%] w-[36%] rounded-[14px] border border-primary/20 bg-white/75 shadow-sm" />
        <div className="absolute left-[49%] top-[59%] h-[16%] w-[28%] rounded-[18px] border border-primary/20 bg-white/75 shadow-sm" />
        <div className="absolute left-[24%] top-[58%] h-[11%] w-[18%] rounded-[12px] border border-primary/20 bg-white/65 shadow-sm" />
        <span className="absolute left-[24%] top-[25%] text-[9px] font-bold text-primary">근정전 권역</span>
        <span className="absolute left-[49%] top-[31%] text-[9px] font-bold text-primary">전각</span>
        <span className="absolute left-[39%] top-[48%] text-[9px] font-bold text-primary">전시 동선</span>
        <span className="absolute left-[54%] top-[62%] text-[9px] font-bold text-primary">광장</span>
      </div>
    </>
  );
}

function UserLocationMarker({ heading }: { heading: number }) {
  return (
    <div
      className="absolute z-30 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      style={{ left: `${userLocation.x}%`, top: `${userLocation.y}%` }}
      aria-label="현재 사용자 위치와 보는 방향"
    >
      <span
        className="absolute h-20 w-20 origin-center bg-blue-500/18"
        style={{
          clipPath: 'polygon(50% 50%, 18% 0%, 82% 0%)',
          transform: `rotate(${heading + 30}deg)`,
        }}
      />
      <span className="absolute h-10 w-10 rounded-full bg-blue-500/18" />
      <span className="absolute h-6 w-6 rounded-full bg-blue-500/25" />
      <span
        className="relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-blue-500 text-white shadow-lg"
        style={{ transform: `rotate(${heading}deg)` }}
      >
        <Navigation size={14} fill="currentColor" />
      </span>
    </div>
  );
}

function ZoomStatusBadge({
  isDetailMap,
  zoom,
  onResetZoom,
}: {
  isDetailMap: boolean;
  zoom: number;
  onResetZoom: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onResetZoom}
      className="absolute right-4 top-16 z-40 rounded-full border border-border bg-white/92 px-3 py-2 text-left text-foreground shadow-sm backdrop-blur active:scale-[0.98]"
      aria-label="기본 확대 비율로 변경"
    >
      <span className="text-[11px] font-bold">
        {isDetailMap ? '상세 구조 지도' : '마커 보기'} · {Math.round(zoom * 100)}%
      </span>
    </button>
  );
}

function MarkerOverviewLayer({
  focusedRecordId,
  selectedPin,
  onSelectPin,
}: {
  focusedRecordId: number | null;
  selectedPin: VisitRecord | null;
  onSelectPin: (record: VisitRecord) => void;
}) {
  return (
    <>
      {nearbyPlaces.map((place) => (
        <div
          key={place.id}
          className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ top: `${place.mapPos.y}%`, left: `${place.mapPos.x}%` }}
        >
          <div className="h-2.5 w-2.5 rounded-full border-[1.5px] border-white bg-muted-foreground/30 shadow-sm" />
          <span className="mt-1 whitespace-nowrap rounded-sm bg-white/70 px-1.5 py-0.5 text-[10px] font-bold text-muted-foreground/90 shadow-sm backdrop-blur-sm">
            {place.title}
          </span>
        </div>
      ))}

      {visitRecords.map((item) => {
        const isSelected = selectedPin?.id === item.id;
        const isFocused = focusedRecordId === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.stopPropagation();
              onSelectPin(item);
            }}
            className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center transition-transform group ${
              isSelected || isFocused ? 'z-30 scale-110' : 'scale-100 hover:scale-105'
            }`}
            style={{ top: `${item.mapPos.y}%`, left: `${item.mapPos.x}%` }}
          >
            <div className="p-2">
              <div className="relative z-10 mb-1.5 whitespace-nowrap rounded-full border border-primary/20 bg-white px-2.5 py-1 text-center text-[11px] font-bold text-primary shadow-md transition-transform group-active:scale-95">
                {item.title}
              </div>
              <div className={`relative z-10 mx-auto h-14 w-14 overflow-hidden rounded-full border-[3px] shadow-[0_8px_16px_rgba(0,0,0,0.15)] transition-colors ${isSelected || isFocused ? 'border-primary ring-4 ring-primary/20' : 'border-white'}`}>
                <ImageWithFallback src={item.image} alt={item.title} className="h-full w-full object-cover" />
              </div>
              <div className={`relative z-0 mx-auto -mt-1 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[10px] border-l-transparent border-r-transparent transition-colors ${isSelected || isFocused ? 'border-t-primary' : 'border-t-white'}`} />
            </div>
          </button>
        );
      })}
    </>
  );
}

function DetailedStructureLayer({ focusedRecordId, onSelectPin }: { focusedRecordId: number | null; onSelectPin: (record: VisitRecord) => void }) {
  return (
    <>
      {visitRecords.map((item) => {
        const isFocused = focusedRecordId === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.stopPropagation();
              onSelectPin(item);
            }}
            className={`absolute z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border bg-white/92 px-2 py-1 text-[10px] font-bold shadow-sm backdrop-blur transition-transform ${
              isFocused ? 'scale-110 border-primary text-primary ring-4 ring-primary/15' : 'border-border text-foreground'
            }`}
            style={{ top: `${item.mapPos.y}%`, left: `${item.mapPos.x}%` }}
          >
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            {item.title}
          </button>
        );
      })}
    </>
  );
}

function ZoomControl({ zoom, onZoomChange }: { zoom: number; onZoomChange: (zoom: number) => void }) {
  return (
    <div className="absolute right-4 top-36 z-40 flex flex-col items-center gap-2 rounded-full border border-border bg-white/92 px-2 py-3 shadow-md backdrop-blur">
      <button
        type="button"
        onClick={() => onZoomChange(clamp(zoom + 0.12, MIN_ZOOM, MAX_ZOOM))}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground"
        aria-label="지도 확대"
      >
        <Plus size={15} />
      </button>
      <input
        type="range"
        min={MIN_ZOOM}
        max={MAX_ZOOM}
        step={0.05}
        value={zoom}
        onChange={(event) => onZoomChange(Number(event.target.value))}
        className="h-28 w-4 cursor-pointer accent-primary [direction:rtl] [writing-mode:vertical-lr]"
        aria-label="지도 확대 비율"
      />
      <button
        type="button"
        onClick={() => onZoomChange(clamp(zoom - 0.12, MIN_ZOOM, MAX_ZOOM))}
        className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-foreground"
        aria-label="지도 축소"
      >
        <Minus size={15} />
      </button>
    </div>
  );
}

function MapBottomSheet({ pin, onClose }: { pin: VisitRecord; onClose: () => void }) {
  const [rating, setRating] = useState(0);
  const [diaryNote, setDiaryNote] = useState('');

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px]" onClick={onClose} />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[70] flex max-h-[85vh] flex-col overflow-hidden rounded-t-[32px] bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.15)]"
      >
        <SharedMicWaveform placement="sheet" />
        <div className="absolute top-0 z-10 flex w-full justify-center pb-2 pt-4">
          <div className="h-1.5 w-12 rounded-full bg-border/80" />
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6 pt-10">
          <div className="relative mb-6 h-52 shrink-0 overflow-hidden rounded-[24px] border border-border/50 shadow-sm">
            <ImageWithFallback src={pin.image} alt={pin.title} className="h-full w-full object-cover" />
            <div className="absolute left-4 top-4 flex items-center rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-[13px] font-medium text-white backdrop-blur-md">
              <Calendar size={14} className="mr-2" />
              {pin.dateLabel} {pin.time}
            </div>
            <button onClick={onClose} className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-black/60" aria-label="상세 기록 닫기">
              <X size={20} />
            </button>
          </div>

          <h2 className="mb-2 text-[26px] font-bold text-foreground">{pin.title}</h2>
          <p className="mb-4 text-sm font-semibold text-muted-foreground">
            {pin.place} · 총 {pin.durationMinutes}분 · 질문 {pin.questionCount}회
          </p>

          <div className="mb-5 flex flex-wrap gap-2">
            {pin.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-primary/20 bg-accent/15 px-3 py-1 text-[13px] font-semibold text-primary">
                {tag}
              </span>
            ))}
          </div>

          <p className="mb-8 text-[16px] leading-[1.6] text-foreground/80">{pin.summary}</p>

          <div className="mb-8 rounded-[20px] border border-border bg-muted/40 p-5">
            <div className="mb-4 flex items-center space-x-2 text-[13px] font-bold text-primary">
              <MessageCircle size={16} />
              <span>해설 대화 내용</span>
            </div>
            <div className="space-y-3.5 text-[14.5px] font-medium leading-relaxed">
              {pin.dialogue.split('\n').map((line, index) => (
                <div key={index} className={`flex ${line.startsWith('Q:') ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-[18px] px-4 py-3 shadow-sm ${line.startsWith('Q:') ? 'rounded-br-sm bg-primary text-white' : 'rounded-bl-sm border border-border bg-white text-foreground'}`}>
                    {line.replace(/^[QA]:\s/, '')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12 rounded-[22px] border border-border bg-white p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-[17px] font-bold text-foreground">나의 감상</h3>
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
              <span className="text-sm font-semibold text-foreground">일기</span>
              <textarea
                value={diaryNote}
                onChange={(event) => setDiaryNote(event.target.value)}
                placeholder="이 장소에서 떠오른 생각을 자유롭게 적어보세요."
                className="mt-2 min-h-32 w-full resize-none rounded-[18px] border border-border bg-muted/30 px-4 py-3 text-[15px] leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:bg-white"
              />
            </label>
          </div>
        </div>
      </motion.div>
    </>
  );
}
