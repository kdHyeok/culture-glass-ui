import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import appLogo from '../../assets/app-logo.png';

export function SocialLogin() {
  const { setIsLoggedIn } = useAppContext();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-lg"
      >
        <div className="flex flex-col items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[20px] bg-white shadow-md">
            <img src={appLogo} alt="누리벗" className="h-14 w-14 object-contain" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-foreground">누리벗</h1>
          <p className="mt-2 text-sm text-muted-foreground">당신의 문화유산 탐방을 돕는 친절한 동반자입니다</p>
        </div>

        <div className="mt-8 space-y-4">
          <button
            type="button"
            onClick={() => setIsLoggedIn(true)}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#F7E600] px-4 py-3 text-sm font-semibold shadow-sm"
          >
            <span>카카오로 계속하기</span>
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={() => setIsLoggedIn(true)}
            className="flex w-full items-center justify-center gap-3 rounded-lg bg-white border px-4 py-3 text-sm font-semibold shadow-sm"
          >
            <span>Google로 계속하기</span>
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          계속 진행하시면 이용약관에 동의하게 됩니다.
        </div>
      </motion.div>
    </div>
  );
}
