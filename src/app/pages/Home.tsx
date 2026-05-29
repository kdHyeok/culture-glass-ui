import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Accessibility, Camera, Globe, MessageCircle, Mic, Pause, Play, ScanLine, Square, Volume2, VolumeX, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

type ScanState = 'idle' | 'capturing' | 'scanning' | 'analyzing' | 'guide';

type GuideMessage = {
  role: 'user' | 'ai';
  text: string;
  isSpeaking?: boolean;
};

export function Home() {
  const { isSeniorMode, setIsSeniorMode, language, setLanguage } = useAppContext();
  const [scanState, setScanState] = useState<ScanState>('idle');

  const handleTrigger = () => {
    if (scanState === 'idle') {
      setScanState('capturing');
      window.setTimeout(() => setScanState('scanning'), 360);
      window.setTimeout(() => setScanState('analyzing'), 2100);
      window.setTimeout(() => setScanState('guide'), 4100);
    }
  };

  const closeGuide = () => {
    setScanState('idle');
  };

  if (isSeniorMode && scanState === 'guide') {
    return <SeniorGuideView onClose={closeGuide} />;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-black">
      <div
        className={`absolute inset-0 transition-all duration-500 ${
          scanState === 'guide' ? 'scale-105 blur-md' : scanState === 'capturing' ? 'scale-[1.012] blur-0' : 'scale-100 blur-0'
        }`}
      >
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1638964663550-e2123ac8900b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHeWVvbmdib2tndW5nJTIwcGFsYWNlfGVufDF8fHx8MTc3OTkzMzU4Nnww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Camera feed of Gyeongbokgung Palace"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="absolute left-0 right-0 top-12 z-20 flex items-center justify-between px-6">
        <div>
          {language === 'Korean' ? (
            <button
              type="button"
              onClick={() => setLanguage('English')}
              className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/80 hover:bg-white/20"
            >
              ENG
            </button>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 text-white backdrop-blur-md">
              <div className="flex items-center gap-2">
                <Globe size={16} />
                <span className="text-sm font-medium">{language === 'Korean' ? 'KOR' : language === 'English' ? 'ENG' : 'FRA'}</span>
              </div>
              <button
                type="button"
                onClick={() => setLanguage('English')}
                className={`rounded-full px-3 py-1 text-sm font-medium transition ${
                  language === 'English' ? 'bg-primary text-primary-foreground' : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                ENG
              </button>
            </div>
          )}
        </div>

        <button
          onClick={() => setIsSeniorMode(!isSeniorMode)}
          className={`flex items-center space-x-2 rounded-full border px-3 py-1.5 backdrop-blur-md transition-colors ${
            isSeniorMode ? 'border-primary bg-primary text-white' : 'border-white/20 bg-black/30 text-white'
          }`}
        >
          <Accessibility size={16} />
          <span className="text-sm font-medium">큰글씨</span>
        </button>
      </div>

      {scanState === 'idle' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <button type="button" onClick={handleTrigger} className="relative h-64 w-64 rounded-[30px] border-2 border-white/40 text-white transition-transform active:scale-[0.98]">
            <div className="absolute left-0 top-0 h-8 w-8 rounded-tl-[30px] border-l-4 border-t-4 border-white" />
            <div className="absolute right-0 top-0 h-8 w-8 rounded-tr-[30px] border-r-4 border-t-4 border-white" />
            <div className="absolute bottom-0 left-0 h-8 w-8 rounded-bl-[30px] border-b-4 border-l-4 border-white" />
            <div className="absolute bottom-0 right-0 h-8 w-8 rounded-br-[30px] border-b-4 border-r-4 border-white" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="rounded-full bg-black/20 px-3 py-1 text-sm font-medium tracking-wider text-white/70 backdrop-blur-sm">
                화면을 터치해주세요
              </span>
            </div>
          </button>
        </div>
      )}

      <AnimatePresence>
        {scanState === 'capturing' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.08 }}
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0.38 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
              className="absolute inset-0 bg-white"
            />
            <motion.div
              initial={{ scale: 0.96, opacity: 0.58 }}
              animate={{ scale: 1.04, opacity: 0 }}
              transition={{ duration: 0.34, ease: 'easeOut' }}
              className="absolute h-64 w-64 rounded-[30px] border-2 border-white/80 shadow-[0_0_22px_rgba(255,255,255,0.28)]"
            />
            <motion.div
              initial={{ scale: 0.96, opacity: 0.85 }}
              animate={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-white/80 text-primary shadow-lg"
            >
              <Camera size={25} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GlobalAnalysisOverlay handles analysis UI now via context */}

      <AnimatePresence>{scanState === 'guide' && !isSeniorMode && <GuideBottomSheet onClose={closeGuide} />}</AnimatePresence>
    </div>
  );
}



function GuideBottomSheet({ onClose }: { onClose: () => void }) {
  const [isMuted, setIsMuted] = useState(false);
  const [isTtsStopped, setIsTtsStopped] = useState(false);
  const [selectedGuideIndex, setSelectedGuideIndex] = useState<number | null>(0);
  const [question, setQuestion] = useState('');
  const { isCameraMicActive, setIsCameraMicActive } = useAppContext();
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [bufferingRole, setBufferingRole] = useState<'user' | 'ai' | null>(null);
  const [autoStep, setAutoStep] = useState(0);
  const replayStopTimerRef = useRef<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isTtsPaused = isMuted || isTtsStopped;
  const stoppedWaveHeights = ['28%', '44%', '64%', '38%', '76%', '52%', '32%', '58%', '72%', '46%', '30%', '68%', '54%', '40%', '78%', '48%', '34%', '60%'];
  const scriptedExchanges = [
    {
      question: '여기가 어떤 건물인지 설명해줘.',
      answer: '지금 보이는 전각은 조선 시대 왕의 즉위식과 국가 의례가 열리던 경복궁 근정전입니다. 궁궐의 중심을 상징하는 가장 중요한 공간이에요.',
    },
    {
      question: '지붕 위에 있는 작은 조각은 뭐야?',
      answer: '잡상이라고 부르는 장식입니다. 건물의 위엄을 보여주고, 나쁜 기운을 막는 상징적인 의미도 담고 있어요.',
    },
  ];
  const [guideMessages, setGuideMessages] = useState<GuideMessage[]>([
    {
      role: 'ai',
      text: '여기는 경복궁 근정전입니다. 어떤걸 알려드릴까요?',
      isSpeaking: true,
    },
  ]);

  const clearReplayStopTimer = () => {
    if (replayStopTimerRef.current) {
      window.clearTimeout(replayStopTimerRef.current);
      replayStopTimerRef.current = null;
    }
  };

  const scheduleReplayStop = (durationMs = 3000) => {
    clearReplayStopTimer();
    replayStopTimerRef.current = window.setTimeout(() => {
      setSelectedGuideIndex(null);
      setIsTtsStopped(true);
      replayStopTimerRef.current = null;
    }, durationMs);
  };

  useEffect(() => {
    const introTimer = window.setTimeout(() => {
      setSelectedGuideIndex(null);
      setIsTtsStopped(true);
      setIsIntroComplete(true);
    }, 2000);

    return () => window.clearTimeout(introTimer);
  }, []);

  useEffect(() => {
    return () => clearReplayStopTimer();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [guideMessages, bufferingRole]);

  useEffect(() => {
    if (!isIntroComplete || !isCameraMicActive || autoStep >= scriptedExchanges.length) {
      return undefined;
    }

    const exchange = scriptedExchanges[autoStep];
    let questionSent = false;

    setBufferingRole('user');
    setIsTtsStopped(true);
    setSelectedGuideIndex(null);

    const questionTimer = window.setTimeout(() => {
      questionSent = true;
      setGuideMessages((current) => [...current, { role: 'user', text: exchange.question }]);
      setBufferingRole('ai');
    }, 1000);

    const answerTimer = window.setTimeout(() => {
      setGuideMessages((current) => {
        const nextMessages = [...current, { role: 'ai' as const, text: exchange.answer, isSpeaking: true }];
        setSelectedGuideIndex(nextMessages.length - 1);
        return nextMessages;
      });
      setBufferingRole(null);
      setIsTtsStopped(false);
    }, 3000);

    const stopTimer = window.setTimeout(() => {
      setSelectedGuideIndex(null);
      setIsTtsStopped(true);
      setAutoStep((current) => current + 1);
    }, 6000);

    return () => {
      if (!questionSent) {
        // 질문이 아직 전송되지 않은 상태(사용자 버퍼링 중)에서 mic이 꺼지면 전부 취소하고 스텝 건너뜀
        window.clearTimeout(questionTimer);
        window.clearTimeout(answerTimer);
        window.clearTimeout(stopTimer);
        setBufferingRole(null);
        setAutoStep((current) => (current === autoStep ? current + 1 : current));
      }
      // 질문이 이미 전송됐으면(AI 답변 생성 중) mic 상태와 무관하게 답변/종료 타이머 계속 실행
    };
  }, [autoStep, isCameraMicActive, isIntroComplete]);

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed bottom-0 left-0 right-0 z-[60] flex h-[84%] flex-col overflow-hidden rounded-t-[30px] border-t border-border bg-background shadow-2xl"
    >
      <div className="flex shrink-0 justify-center pb-2 pt-3">
        <div className="h-1.5 w-12 rounded-full bg-border" />
      </div>

      <div className="flex shrink-0 items-start justify-between border-b border-border/50 bg-background px-6 pb-4 pt-2">
        <div>
          <span className="mb-1 block text-xs font-semibold tracking-wider text-primary">실시간 오디오 가이드</span>
          <h2 className="text-2xl font-medium text-foreground">경복궁 근정전</h2>
          <p className="mt-1 text-sm text-muted-foreground">Gyeongbokgung Geunjeongjeon</p>
        </div>
        <button onClick={onClose} className="rounded-full bg-muted p-2 text-foreground/70 hover:bg-muted/80" aria-label="해설 닫기">
          <X size={20} />
        </button>
      </div>

      <div className="shrink-0 border-b border-border/50 bg-background px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => {
              setIsMuted((value) => !value);
              setIsTtsStopped(false);
            }}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-colors ${
              isMuted ? 'border-border bg-muted text-muted-foreground' : 'border-primary/20 bg-primary/10 text-primary'
            }`}
            aria-label={isMuted ? '음성 재생' : '음소거'}
          >
            {isMuted ? <VolumeX size={23} /> : <Volume2 size={23} />}
          </button>

          <div className="flex h-12 min-w-0 flex-1 items-center justify-center space-x-1 rounded-full bg-muted/45 px-4">
            {isTtsPaused
              ? stoppedWaveHeights.map((height, index) => (
                  <div
                    key={`stopped-${index}`}
                    style={{ height }}
                    className="w-1.5 rounded-full bg-muted-foreground/35"
                  />
                ))
              : [...Array(18)].map((_, index) => (
                  <motion.div
                    key={`playing-${index}`}
                    animate={{ height: ['22%', `${38 + Math.random() * 58}%`, '22%'] }}
                    transition={{ repeat: Infinity, duration: 0.55 + Math.random(), ease: 'easeInOut' }}
                    className="w-1.5 rounded-full bg-primary"
                  />
                ))}
          </div>

          <button
            type="button"
            onClick={() => setIsTtsStopped((value) => !value)}
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${
              isTtsStopped ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
            }`}
            aria-label={isTtsStopped ? 'TTS 시작' : 'TTS 일시정지'}
          >
            {isTtsStopped ? <Play size={23} fill="currentColor" /> : <Pause size={23} fill="currentColor" />}
          </button>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-muted/20 px-6 py-5">
        <div className="space-y-4 pb-4">
          {guideMessages.map((message, index) => {
            const isUser = message.role === 'user';
            const isSelectedGuide = selectedGuideIndex === index;
            const isSpeakingNow = Boolean(isSelectedGuide && !isTtsPaused);
            const handleReplay = () => {
              if (isUser) return;
              clearReplayStopTimer();
              setSelectedGuideIndex(index);
              setIsMuted(false);
              setIsTtsStopped(false);
              scheduleReplayStop(3000);
            };

            return (
              <div key={index} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[82%] ${isUser ? 'text-right' : 'text-left'}`}>
                  <div className={`mb-1 flex items-center gap-1.5 text-[11px] font-semibold ${isUser ? 'justify-end text-primary' : 'text-muted-foreground'}`}>
                    {!isUser && isSpeakingNow && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                    <span>{isUser ? '나' : isSpeakingNow ? 'AI 해설 · 음성 재생 중' : 'AI 해설'}</span>
                  </div>
                  <div
                    role={isUser ? undefined : 'button'}
                    tabIndex={isUser ? undefined : 0}
                    onClick={handleReplay}
                    onKeyDown={(event) => {
                      if (!isUser && (event.key === 'Enter' || event.key === ' ')) {
                        handleReplay();
                      }
                    }}
                    className={`rounded-[20px] px-4 py-3 text-[15px] leading-relaxed shadow-sm ${
                      isUser
                        ? 'rounded-br-sm bg-primary text-primary-foreground'
                        : isSelectedGuide
                          ? 'cursor-pointer rounded-bl-sm border border-primary/25 bg-white text-[16px] font-semibold text-foreground shadow-md'
                          : 'cursor-pointer rounded-bl-sm border border-border bg-white text-foreground'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              </div>
            );
          })}
          {bufferingRole && (
            <div className={`flex ${bufferingRole === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[82%] ${bufferingRole === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`mb-1 text-[11px] font-semibold ${bufferingRole === 'user' ? 'text-primary' : 'text-muted-foreground'}`}>
                  {bufferingRole === 'user' ? '나' : 'AI 해설'}
                </div>
                <div
                  className={`flex h-11 items-center gap-1.5 rounded-[20px] px-4 shadow-sm ${
                    bufferingRole === 'user'
                      ? 'rounded-br-sm bg-primary'
                      : 'rounded-bl-sm border border-border bg-white'
                  }`}
                >
                  {[0, 1, 2].map((index) => (
                    <motion.span
                      key={index}
                      animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
                      transition={{ repeat: Infinity, duration: 0.75, delay: index * 0.14, ease: 'easeInOut' }}
                      className={`h-2 w-2 rounded-full ${bufferingRole === 'user' ? 'bg-primary-foreground' : 'bg-primary'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="shrink-0 border-t border-border/60 bg-background px-6 pb-8 pt-3">
        <div className="flex h-16 items-center rounded-full border border-border bg-white px-5 shadow-sm focus-within:border-primary">
          {isCameraMicActive ? (
            <>
              <Mic size={22} className="mr-3 text-primary" />
              <div className="flex min-w-0 flex-1 items-center justify-center space-x-1">
                {[...Array(22)].map((_, index) => (
                  <motion.div
                    key={index}
                    animate={{ height: ['8px', `${16 + Math.random() * 24}px`, '8px'] }}
                    transition={{ repeat: Infinity, duration: 0.48 + Math.random() * 0.45, ease: 'easeInOut' }}
                    className="w-1.5 rounded-full bg-primary"
                  />
                ))}
              </div>
            </>
          ) : (
            <>
              <MessageCircle size={20} className="mr-3 text-muted-foreground" />
              <input
                type="text"
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="궁금한 점을 물어보세요..."
                className="min-w-0 flex-1 border-none bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </>
          )}
          <button
            type="button"
            onClick={() => setIsCameraMicActive(!isCameraMicActive)}
            className={`ml-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors ${
              isCameraMicActive ? 'bg-muted text-muted-foreground' : 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
            }`}
            aria-label={isCameraMicActive ? '음성 질문 중지' : '음성으로 질문하기'}
          >
            {isCameraMicActive ? <Square size={22} fill="currentColor" /> : <Mic size={27} />}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SeniorGuideView({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-background">
      <div className="flex items-center justify-between border-b-2 border-border bg-white px-6 py-8">
        <h1 className="text-3xl font-bold text-foreground">경복궁 근정전</h1>
        <button onClick={onClose} className="rounded-full bg-muted p-4" aria-label="해설 닫기">
          <X size={32} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-white p-6">
        <p className="mb-8 text-2xl font-bold leading-[1.6] text-foreground">
          눈앞에 보이는 건물은 왕의 즉위식 등 큰 행사를 하던 <span className="text-primary">근정전</span>입니다.
        </p>
        <p className="mb-8 text-2xl font-bold leading-[1.6] text-foreground">
          '부지런하게 정치를 하라'는 뜻을 가졌습니다. 높은 돌기단 위에 지어져 왕의 위엄을 보여줍니다.
        </p>
      </div>

      <div className="flex items-center justify-between border-t-2 border-border bg-muted p-8 pb-12 pt-8">
        <button className="flex flex-col items-center justify-center p-4">
          <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border-2 border-border bg-white text-foreground shadow-md">
            <Volume2 size={40} />
          </div>
          <span className="text-xl font-bold">소리</span>
        </button>

        <button className="flex flex-col items-center justify-center p-4">
          <div className="mb-3 flex h-28 w-28 items-center justify-center rounded-full bg-primary text-white shadow-xl">
            <Pause size={56} fill="currentColor" />
          </div>
          <span className="text-xl font-bold text-primary">일시정지</span>
        </button>

        <button className="flex flex-col items-center justify-center p-4">
          <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-full border-2 border-border bg-white text-foreground shadow-md">
            <Mic size={40} />
          </div>
          <span className="text-xl font-bold">질문</span>
        </button>
      </div>
    </div>
  );
}
