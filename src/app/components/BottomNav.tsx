import React from 'react';
import { NavLink, useLocation } from 'react-router';
import { Camera, Book, Settings } from 'lucide-react';
import { useAppContext } from '../context/AppContext';

export function BottomNav() {
  const location = useLocation();
  const { isSeniorMode } = useAppContext();

  // Hide bottom nav in senior mode if we want, or keep it simple
  if (isSeniorMode && location.pathname === '/') {
    return null; // Will have specialized UI in Home
  }

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-t border-border pb-6">
      <div className="flex justify-around items-center h-20 px-6">
        <NavItem to="/" icon={<Camera size={24} />} label="카메라" active={location.pathname === '/'} />
        <NavItem to="/diary" icon={<Book size={24} />} label="다이어리" active={location.pathname === '/diary'} />
        <NavItem to="/settings" icon={<Settings size={24} />} label="설정" active={location.pathname === '/settings'} />
      </div>
    </div>
  );
}

function NavItem({ to, icon, label, active }: { to: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <NavLink
      to={to}
      className={`flex flex-col items-center justify-center space-y-1 w-16 transition-colors ${
        active ? 'text-primary' : 'text-muted-foreground'
      }`}
    >
      <div className={`${active ? 'scale-110' : 'scale-100'} transition-transform`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </NavLink>
  );
}
