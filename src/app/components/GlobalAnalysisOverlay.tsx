import React from 'react';
import { motion } from 'motion/react';
import { ScanLine } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function GlobalAnalysisOverlay() {
  const { isAnalyzing } = useAppContext();

  if (!isAnalyzing) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[90] overflow-hidden bg-black/42 backdrop-blur-sm">
      <div className="absolute inset-0 bg-primary/10" />

      <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/10 text-primary backdrop-blur-md">
          <ScanLine className="h-8 w-8 animate-pulse" />
        </div>
        <p className="text-lg font-semibold tracking-wide text-white">문화유산 분석 중...</p>
        <p className="mt-2 text-sm text-white/72">화면 전체에서 형태와 문양을 스캔하고 있습니다.</p>
        <div className="mt-5 flex items-center gap-1.5">
          {[0, 1, 2].map((index) => (
            <motion.span
              key={index}
              animate={{ opacity: [0.25, 1, 0.25], y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 0.9, delay: index * 0.16, ease: 'easeInOut' }}
              className="h-2.5 w-2.5 rounded-full bg-primary"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
