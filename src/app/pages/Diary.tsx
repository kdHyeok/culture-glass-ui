import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Map, List, MessageCircle, X, ChevronRight } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

interface DiaryItem {
  id: number;
  time: string;
  title: string;
  summary: string;
  dialogue: string;
  tags: string[];
  image: string;
  mapPos: { x: number; y: number };
}

const diaryData: DiaryItem[] = [
  {
    id: 1,
    time: '14:05',
    title: '경복궁 근정전',
    summary: '조선의 중심이 되는 전각으로, 왕의 즉위식 등 국가의 중대한 의식을 치르던 곳입니다. 지붕의 화려한 장식이 인상적이었습니다.',
    dialogue: "Q: 지붕 위의 동물들은 뭐야?\nA: 잡상이라고 부르는 장식 기와입니다. 나쁜 기운을 막아주는 수호신 역할을 하죠.",
    tags: ['건축', '왕실 문화'],
    image: 'https://images.unsplash.com/photo-1638964663550-e2123ac8900b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHeWVvbmdib2tndW5nJTIwcGFsYWNlfGVufDF8fHx8MTc3OTkzMzU4Nnww&ixlib=rb-4.1.0&q=80&w=400',
    mapPos: { x: 45, y: 35 }
  },
  {
    id: 2,
    time: '15:30',
    title: '경회루',
    summary: '국가 경사나 사신 접대를 위해 연회를 베풀던 누각입니다. 물 위에 떠 있는 듯한 아름다운 비례감이 돋보입니다.',
    dialogue: "Q: 여기서 어떤 연회를 했어?\nA: 주로 외국 사신을 환영하거나 가뭄에 기우제를 지낼 때 사용되었습니다.",
    tags: ['건축', '자연'],
    image: 'https://images.unsplash.com/photo-1625551900827-f04c5bc3d26a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLb3JlYW4lMjB0cmFkaXRpb25hbCUyMGFyY2hpdGVjdHVyZSUyMHJvb2Z8ZW58MXx8fHwxNzc5OTMzNTg2fDA&ixlib=rb-4.1.0&q=80&w=400',
    mapPos: { x: 25, y: 30 }
  },
  {
    id: 3,
    time: '17:10',
    title: '광화문 광장',
    summary: '과거 육조거리였던 서울의 중심 광장. 세종대왕과 이순신 장군의 동상이 서울의 역사를 대변하고 있습니다.',
    dialogue: "Q: 육조거리가 무슨 뜻이야?\nA: 조선시대 주요 관청인 이조, 호조, 예조, 병조, 형조, 공조가 있던 거리라는 뜻입니다.",
    tags: ['역사', '랜드마크'],
    image: 'https://images.unsplash.com/photo-1704942491152-a63de2499f47?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHd2FuZ2h3YW11biUyMHNxdWFyZXxlbnwxfHx8fDE3Nzk5MzM1ODZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    mapPos: { x: 50, y: 75 }
  }
];

const nearbyPlaces = [
  { id: 101, title: '국립고궁박물관', mapPos: { x: 30, y: 55 } },
  { id: 102, title: '대한민국역사박물관', mapPos: { x: 75, y: 65 } },
  { id: 103, title: '동십자각', mapPos: { x: 80, y: 35 } },
];

export function Diary() {
  const [viewMode, setViewMode] = useState<'timeline' | 'map'>('timeline');

  return (
    <div className="flex flex-col h-full bg-background overflow-hidden relative">
      {/* Header & Toggle */}
      <div className="pt-14 pb-4 px-6 bg-background/95 backdrop-blur-xl absolute top-0 left-0 right-0 z-30">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">나의 관람 기록</h1>
          <div className="flex items-center text-muted-foreground text-sm font-medium bg-white px-3.5 py-1.5 rounded-full border border-border shadow-sm">
            <Calendar size={14} className="mr-1.5 text-primary" />
            <span>5월 28일</span>
          </div>
        </div>
        
        {/* Segmented Control */}
        <div className="flex bg-muted/60 p-1.5 rounded-[16px] shadow-inner border border-border/50 relative">
          <button 
            onClick={() => setViewMode('timeline')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-[12px] text-[15px] font-semibold transition-all relative z-10 ${viewMode === 'timeline' ? 'text-primary' : 'text-muted-foreground hover:text-foreground/80'}`}
          >
            <List size={18} />
            <span>타임라인</span>
          </button>
          <button 
            onClick={() => setViewMode('map')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-[12px] text-[15px] font-semibold transition-all relative z-10 ${viewMode === 'map' ? 'text-primary' : 'text-muted-foreground hover:text-foreground/80'}`}
          >
            <Map size={18} />
            <span>지도</span>
          </button>
          
          {/* Animated Active Pill */}
          <div 
            className="absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-[12px] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out"
            style={{ 
              transform: viewMode === 'timeline' ? 'translateX(0)' : 'translateX(100%)',
              left: '6px'
            }}
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 pt-[156px] overflow-hidden relative">
        <AnimatePresence mode="wait">
          {viewMode === 'timeline' ? (
            <TimelineView key="timeline" />
          ) : (
            <MapView key="map" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function TimelineView() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="h-full overflow-y-auto pb-32 px-6 relative"
    >
      {/* Vertical Line */}
      <div className="absolute left-[44px] top-6 bottom-8 w-px bg-border/80" />

      <div className="space-y-8 relative">
        {diaryData.map((item, index) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex relative"
          >
            {/* Timeline dot & time */}
            <div className="flex flex-col items-center mr-5 z-10 w-12 shrink-0">
              <div className="text-xs font-semibold text-primary mb-2 bg-background py-1 whitespace-nowrap">
                {item.time}
              </div>
              <div className="w-3.5 h-3.5 rounded-full bg-primary ring-[5px] ring-background border border-primary/20 shadow-sm" />
            </div>

            {/* Card */}
            <div className="bg-white rounded-[24px] p-5 shadow-sm border border-border flex-1 mt-7 group cursor-pointer hover:shadow-md transition-shadow">
              <div className="flex items-start mb-4">
                <div className="w-20 h-20 rounded-2xl overflow-hidden mr-4 shrink-0 shadow-sm border border-border/50">
                  <ImageWithFallback 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-[17px] font-semibold text-foreground mb-2 leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-1 bg-accent/10 text-primary text-[11px] font-medium rounded-full border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <p className="text-[15px] text-foreground/75 leading-[1.6] line-clamp-3">
                {item.summary}
              </p>

              <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                <div className="text-xs text-muted-foreground flex items-center">
                  <MessageCircle size={14} className="mr-1.5" />
                  대화 기록 1건
                </div>
                <button className="text-primary text-sm font-semibold flex items-center hover:opacity-80 transition-opacity">
                  상세 기록 보기 <ChevronRight size={16} className="ml-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function MapView() {
  const [selectedPin, setSelectedPin] = useState<DiaryItem | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 w-full h-full bg-[#EFEFEF] overflow-hidden"
    >
      {/* Abstract Minimal Map Background (Kakao Map Style) */}
      <div className="absolute top-0 left-0 w-full h-[52%] bg-[#E5EAD9] rounded-b-[40px] shadow-[inset_0_-10px_20px_rgba(0,0,0,0.02)]" /> 
      <div className="absolute top-[22%] left-[18%] w-[14%] h-[12%] bg-[#CBE0DE] rounded-xl" />
      
      {/* Roads */}
      <div className="absolute top-[52%] left-1/2 w-[32px] h-[48%] bg-white -translate-x-1/2 shadow-sm" /> 
      <div className="absolute top-[52%] left-0 w-full h-[14px] bg-white -translate-y-1/2 shadow-sm" />

      {/* Movement Path SVG */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none" style={{ zIndex: 1 }}>
        <polyline
          points={diaryData.map(d => `${d.mapPos.x},${d.mapPos.y}`).join(' ')}
          fill="none"
          stroke="var(--primary)"
          strokeWidth="0.8"
          strokeDasharray="2,2"
          className="opacity-70 drop-shadow-sm"
        />
      </svg>

      {/* Nearby Attractions */}
      {nearbyPlaces.map(place => (
        <div 
          key={place.id}
          className="absolute z-10 flex flex-col items-center -translate-x-1/2 -translate-y-1/2"
          style={{ top: `${place.mapPos.y}%`, left: `${place.mapPos.x}%` }}
        >
          <div className="w-2.5 h-2.5 bg-muted-foreground/30 rounded-full border-[1.5px] border-white shadow-sm" />
          <span className="text-[10px] font-bold text-muted-foreground/90 mt-1 whitespace-nowrap bg-white/70 backdrop-blur-sm px-1.5 py-0.5 rounded-sm shadow-sm">
            {place.title}
          </span>
        </div>
      ))}

      {/* Pins */}
      {diaryData.map(item => {
        const isSelected = selectedPin?.id === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setSelectedPin(item)}
            className={`absolute z-20 flex flex-col items-center -translate-x-1/2 -translate-y-1/2 transition-transform cursor-pointer group ${isSelected ? 'scale-110 z-30' : 'scale-100 hover:scale-105'}`}
            style={{ top: `${item.mapPos.y}%`, left: `${item.mapPos.x}%` }}
          >
            <div className="p-2">
              <div className="text-[11px] font-bold text-primary bg-white px-2.5 py-1 rounded-full shadow-md mb-1.5 border border-primary/20 whitespace-nowrap group-active:scale-95 transition-transform text-center relative z-10">
                {item.title}
              </div>
              <div className={`w-14 h-14 mx-auto rounded-full border-[3px] shadow-[0_8px_16px_rgba(0,0,0,0.15)] overflow-hidden transition-colors relative z-10 ${isSelected ? 'border-primary ring-4 ring-primary/20' : 'border-white'}`}>
                <ImageWithFallback src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className={`mx-auto w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] -mt-1 relative z-0 transition-colors ${isSelected ? 'border-t-primary' : 'border-t-white'}`} />
            </div>
          </button>
        )
      })}

      {/* Map Overlay Bottom Sheet */}
      <AnimatePresence>
        {selectedPin && (
          <MapBottomSheet pin={selectedPin} onClose={() => setSelectedPin(null)} />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function MapBottomSheet({ pin, onClose }: { pin: DiaryItem, onClose: () => void }) {
  return (
    <>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-[60]"
        onClick={onClose}
      />
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.15)] z-[70] flex flex-col max-h-[85vh] overflow-hidden"
      >
        <div className="flex justify-center pt-4 pb-2 w-full absolute top-0 z-10">
          <div className="w-12 h-1.5 bg-border/80 rounded-full" />
        </div>

        <div className="overflow-y-auto flex-1 pb-6 pt-10 px-6">
          {/* Image Header */}
          <div className="relative h-52 rounded-[24px] overflow-hidden mb-6 shrink-0 shadow-sm border border-border/50">
            <ImageWithFallback src={pin.image} alt={pin.title} className="w-full h-full object-cover" />
            <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center text-white text-[13px] font-medium border border-white/20">
              <Calendar size={14} className="mr-2" />
              {pin.time}
            </div>
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 w-9 h-9 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-black/60 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <h2 className="text-[26px] font-bold text-foreground mb-3">{pin.title}</h2>
          
          <div className="flex flex-wrap gap-2 mb-5">
            {pin.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-accent/15 text-primary text-[13px] font-semibold rounded-full border border-primary/20">
                {tag}
              </span>
            ))}
          </div>

          <p className="text-foreground/80 text-[16px] leading-[1.6] mb-8">
            {pin.summary}
          </p>

          <div className="bg-muted/40 rounded-[20px] p-5 border border-border mb-8">
            <div className="flex items-center space-x-2 text-primary font-bold text-[13px] mb-4">
              <MessageCircle size={16} />
              <span>해설 대화 내용</span>
            </div>
            <div className="space-y-3.5 text-[14.5px] leading-relaxed font-medium">
              {pin.dialogue.split('\n').map((line, i) => (
                <div key={i} className={`flex ${line.startsWith('Q:') ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] rounded-[18px] px-4 py-3 shadow-sm ${line.startsWith('Q:') ? 'bg-primary text-white rounded-br-sm' : 'bg-white border border-border text-foreground rounded-bl-sm'}`}>
                    {line.replace(/^[QA]:\s/, '')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="w-full h-[60px] bg-primary text-primary-foreground rounded-[20px] font-bold text-[17px] flex items-center justify-center space-x-2 shadow-lg shadow-primary/25 transition-transform active:scale-[0.98] mb-12">
            <span>상세 기록 보기</span>
            <ChevronRight size={22} />
          </button>
        </div>
      </motion.div>
    </>
  );
}
