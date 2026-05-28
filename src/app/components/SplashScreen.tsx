import React from 'react';
import { motion } from 'motion/react';
import appLogo from '../../assets/app-logo.png';

type SplashScreenProps = {
  contained?: boolean;
};

export function SplashScreen({ contained = false }: SplashScreenProps) {
  return (
    <div
      className={`z-[200] flex items-center justify-center overflow-hidden bg-[#F9F8F6] ${
        contained ? 'absolute inset-0' : 'fixed inset-0'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(91,140,122,0.14),transparent_58%)]" />
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative flex flex-col items-center px-8 text-center"
      >
        <div className="relative flex h-40 w-40 items-center justify-center rounded-[36px] bg-white/70 shadow-[0_18px_60px_rgba(44,82,69,0.16)] ring-1 ring-primary/10 backdrop-blur">
          <img src={appLogo} alt="Culture Glass" className="h-32 w-32 object-contain" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.55, ease: 'easeOut' }}
          className="mt-7"
        >
          <p className="text-sm font-semibold tracking-[0.22em] text-primary">CULTURE GLASS</p>
          <h1 className="mt-3 text-2xl font-semibold text-foreground">문화유산을 듣는 순간</h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="mt-8 h-1.5 w-28 overflow-hidden rounded-full bg-primary/15"
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
            className="h-full w-14 rounded-full bg-primary"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
