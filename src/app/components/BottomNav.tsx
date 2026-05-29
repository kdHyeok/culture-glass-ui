import React from 'react';
import { NavLink, useLocation } from 'react-router';
import { Book, Camera, Map, Mic, Settings, Square } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SharedMicWaveform } from './SharedMicWaveform';

const navItems = [
  { to: '/map', label: '지도', icon: <Map size={24} /> },
  { to: '/', label: '카메라', icon: <Camera size={24} /> },
  { to: '/diary', label: '기록', icon: <Book size={24} /> },
  { to: '/settings', label: '설정', icon: <Settings size={24} /> },
];

export function BottomNav() {
  const location = useLocation();
  const { isSeniorMode, isCameraMicActive, setIsCameraMicActive } = useAppContext();

  const toggleCameraMic = () => {
    setIsCameraMicActive(!isCameraMicActive);
  };

  return (
    <div className={`absolute bottom-0 left-0 right-0 z-40 overflow-visible border-t border-border bg-white/85 pb-6 backdrop-blur-md ${isSeniorMode ? 'senior-nav' : ''}`}>
      <SharedMicWaveform />
      <div className={`grid grid-cols-5 items-end px-4 ${isSeniorMode ? 'h-24' : 'h-20'}`}>
        <NavItem {...navItems[0]} active={location.pathname === navItems[0].to} />
        <NavItem {...navItems[1]} active={location.pathname === navItems[1].to} />
        <CameraMicButton listening={isCameraMicActive} onToggle={toggleCameraMic} />
        <NavItem {...navItems[2]} active={location.pathname === navItems[2].to} />
        <NavItem {...navItems[3]} active={location.pathname === navItems[3].to} />
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <NavLink
      to={to}
      className={`flex w-16 flex-col items-center justify-center gap-1 justify-self-center transition-colors ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform`}>{icon}</div>
      <span className="text-[10px] font-medium senior-nav-label">{label}</span>
    </NavLink>
  );
}

function CameraMicButton({ listening, onToggle }: { listening: boolean; onToggle: () => void }) {
  return (
    <div className="relative z-10 flex flex-col items-center justify-end justify-self-center">
      <button
        type="button"
        onClick={onToggle}
        className={`relative -mt-4 flex h-[76px] w-[76px] items-center justify-center rounded-full border-[6px] border-white transition-transform active:scale-95 ${
          listening ? 'bg-muted text-muted-foreground shadow-lg' : 'bg-primary text-primary-foreground shadow-xl shadow-primary/30'
        }`}
        aria-label={listening ? '카메라 마이크 정지' : '카메라 마이크 시작'}
      >
        {listening ? <Square size={27} fill="currentColor" /> : <Mic size={34} />}
      </button>
      <span className={`relative mt-1 text-[10px] font-medium senior-nav-label ${listening ? 'text-muted-foreground' : 'text-primary'}`}>
        {listening ? '정지' : '질문'}
      </span>
    </div>
  );
}
