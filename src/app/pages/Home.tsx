import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, Globe, Accessibility, ScanLine, X, Play, Pause, RotateCcw, Volume2, MessageCircle } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type ScanState = 'idle' | 'scanning' | 'analyzing' | 'guide';

export function Home() {
  const { isSeniorMode, setIsSeniorMode, language } = useAppContext();
  const [scanState, setScanState] = useState<ScanState>('idle');
  
  const handleTrigger = () => {
    if (scanState === 'idle') {
      setScanState('scanning');
      setTimeout(() => setScanState('analyzing'), 1500);
      setTimeout(() => setScanState('guide'), 3500);
    }
  };

  const closeGuide = () => {
    setScanState('idle');
  };

  if (isSeniorMode && scanState === 'guide') {
    return <SeniorGuideView onClose={closeGuide} />;
  }

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Fake Camera Feed Background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${scanState === 'guide' ? 'blur-md scale-105' : 'blur-0 scale-100'}`}>
        <ImageWithFallback 
          src="https://images.unsplash.com/photo-1638964663550-e2123ac8900b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHeWVvbmdib2tndW5nJTIwcGFsYWNlfGVufDF8fHx8MTc3OTkzMzU4Nnww&ixlib=rb-4.1.0&q=80&w=1080" 
          alt="Camera feed of Gyeongbokgung Palace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Top Bar Actions */}
      <div className="absolute top-12 left-0 right-0 px-6 flex justify-between items-center z-20">
        <div className="bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center space-x-2 text-white border border-white/20">
          <Globe size={16} />
          <span className="text-sm font-medium">{language === 'Korean' ? 'KOR' : language === 'English' ? 'ENG' : 'FRA'}</span>
        </div>
        
        <button 
          onClick={() => setIsSeniorMode(!isSeniorMode)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-full border backdrop-blur-md transition-colors ${
            isSeniorMode 
              ? 'bg-primary text-white border-primary' 
              : 'bg-black/30 text-white border-white/20'
          }`}
        >
          <Accessibility size={16} />
          <span className="text-sm font-medium">큰 글씨</span>
        </button>
      </div>

      {/* Viewfinder Overlay */}
      {scanState === 'idle' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-64 h-64 border-2 border-white/40 rounded-[30px] relative">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-[30px]" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-[30px]" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-[30px]" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-[30px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white/60 font-medium tracking-wider text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm">대상을 화면에 담아주세요</span>
            </div>
          </div>
        </div>
      )}

      {/* Scanning state */}
      {scanState === 'scanning' && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="w-64 h-64 border-2 border-white/20 rounded-[30px] overflow-hidden relative">
            <motion.div 
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_15px_rgba(91,140,122,0.8)] z-20"
            />
            <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px]" />
          </div>
        </div>
      )}

      {/* Analyzing state */}
      {scanState === 'analyzing' && (
        <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <ScanLine className="text-primary w-12 h-12 mb-4 animate-pulse" />
            <p className="text-white text-lg font-medium tracking-wide">문화유산 분석 중...</p>
            <p className="text-white/70 text-sm mt-2">가이드 스크립트를 생성하고 있습니다.</p>
          </div>
        </div>
      )}

      {/* Bottom Controls (Idle) */}
      <AnimatePresence>
        {scanState === 'idle' && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="absolute bottom-32 left-0 right-0 flex flex-col items-center z-20"
          >
            <button 
              onClick={handleTrigger}
              className="w-[72px] h-[72px] bg-primary rounded-full flex items-center justify-center text-white shadow-lg shadow-primary/30 active:scale-95 transition-transform"
            >
              <Mic size={32} />
            </button>
            <div className="mt-6 flex space-x-1 items-end h-8">
              {/* Fake Voice Visualizer */}
              {[...Array(7)].map((_, i) => (
                <motion.div 
                  key={i}
                  animate={{ height: ['8px', `${12 + Math.random() * 20}px`, '8px'] }}
                  transition={{ repeat: Infinity, duration: 1 + Math.random(), ease: "easeInOut" }}
                  className="w-1.5 bg-white/50 rounded-full"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Guide Bottom Sheet */}
      <AnimatePresence>
        {scanState === 'guide' && !isSeniorMode && (
          <GuideBottomSheet onClose={closeGuide} />
        )}
      </AnimatePresence>
    </div>
  );
}

function GuideBottomSheet({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 h-[65%] bg-background rounded-t-[30px] shadow-2xl z-[60] flex flex-col border-t border-border"
    >
      <div className="flex justify-center pt-3 pb-2">
        <div className="w-12 h-1.5 bg-border rounded-full" />
      </div>

      <div className="px-6 pt-2 pb-4 flex justify-between items-start border-b border-border/50">
        <div>
          <span className="text-primary text-xs font-semibold tracking-wider mb-1 block">실시간 오디오 가이드</span>
          <h2 className="text-2xl font-medium text-foreground">경복궁 근정전</h2>
          <p className="text-muted-foreground text-sm mt-1">Gyeongbokgung Geunjeongjeon</p>
        </div>
        <button onClick={onClose} className="p-2 bg-muted rounded-full text-foreground/70 hover:bg-muted/80">
          <X size={20} />
        </button>
      </div>

      {/* Audio Visualizer & Controls */}
      <div className="px-6 py-6 flex flex-col items-center border-b border-border/50">
        <div className="flex items-center justify-center space-x-1 h-12 w-full mb-6">
          {[...Array(20)].map((_, i) => (
            <motion.div 
              key={i}
              animate={{ height: ['20%', `${40 + Math.random() * 60}%`, '20%'] }}
              transition={{ repeat: Infinity, duration: 0.5 + Math.random(), ease: "easeInOut" }}
              className="w-1.5 bg-primary rounded-full"
            />
          ))}
        </div>

        <div className="flex items-center justify-center space-x-8">
          <button className="text-foreground/70 hover:text-foreground">
            <RotateCcw size={28} />
          </button>
          <button className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white shadow-md shadow-primary/20">
            <Pause size={32} fill="currentColor" />
          </button>
          <button className="text-foreground/70 hover:text-foreground">
            <Volume2 size={28} />
          </button>
        </div>
      </div>

      {/* Transcription */}
      <div className="flex-1 overflow-y-auto px-6 py-6 relative">
        <div className="space-y-4 pb-20">
          <p className="text-lg leading-relaxed text-foreground/40 font-medium">
            눈앞에 보이는 거대한 전각은 조선 시대 국왕의 즉위식이나 대조회 등 국가의 중대한 의식을 치르던 '근정전'입니다.
          </p>
          <p className="text-lg leading-relaxed text-foreground font-medium">
            '근정(勤政)'이란 '부지런하게 정치를 하라'는 의미를 담고 있습니다. 2단으로 조성된 월대 위에 세워져 있어 왕의 위엄을 한껏 높여주는 구조를 띠고 있죠.
          </p>
          <p className="text-lg leading-relaxed text-foreground/40 font-medium">
            지붕을 보시면 십자 모양으로 화려하게 장식된 디테일과, 잡상이라 불리는 동물 조각상들이 나쁜 기운을 막아주고 있습니다.
          </p>
        </div>

        {/* Q&A Input */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className="bg-white border border-border rounded-full h-14 px-5 flex items-center shadow-sm">
            <MessageCircle size={20} className="text-muted-foreground mr-3" />
            <input 
              type="text" 
              placeholder="궁금한 점을 물어보세요..." 
              className="flex-1 bg-transparent border-none outline-none text-foreground text-sm"
              readOnly
            />
            <button className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Mic size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SeniorGuideView({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-background z-[100] flex flex-col">
      <div className="px-6 py-8 flex justify-between items-center border-b-2 border-border bg-white">
        <h1 className="text-3xl font-bold text-foreground">경복궁 근정전</h1>
        <button onClick={onClose} className="p-4 bg-muted rounded-full">
          <X size={32} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 bg-white">
        <p className="text-2xl leading-[1.6] font-bold text-foreground mb-8">
          눈앞에 보이는 건물은 왕의 즉위식 등 큰 행사를 하던 <span className="text-primary">근정전</span>입니다.
        </p>
        <p className="text-2xl leading-[1.6] font-bold text-foreground mb-8">
          '부지런하게 정치를 하라'는 뜻을 가졌습니다. 높은 돌기단 위에 지어져 왕의 위엄을 보여줍니다.
        </p>
      </div>

      <div className="bg-muted p-8 border-t-2 border-border flex justify-between items-center pb-12 pt-8">
        <button className="flex flex-col items-center justify-center p-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-foreground mb-3 shadow-md border-2 border-border">
            <RotateCcw size={40} />
          </div>
          <span className="text-xl font-bold">15초 전</span>
        </button>
        
        <button className="flex flex-col items-center justify-center p-4">
          <div className="w-28 h-28 bg-primary rounded-full flex items-center justify-center text-white mb-3 shadow-xl">
            <Pause size={56} fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-primary">일시정지</span>
        </button>

        <button className="flex flex-col items-center justify-center p-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-foreground mb-3 shadow-md border-2 border-border">
            <Volume2 size={40} />
          </div>
          <span className="text-xl font-bold">소리 큼</span>
        </button>
      </div>
    </div>
  );
}
