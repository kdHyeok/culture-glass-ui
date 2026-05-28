import React from 'react';
import { createBrowserRouter, Outlet } from 'react-router';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Diary } from './pages/Diary';
import { MapPage } from './pages/MapPage';
import { Settings } from './pages/Settings';
import { ComponentLibrary } from './pages/ComponentLibrary';
import { BottomNav } from './components/BottomNav';
import { useAppContext } from './context/AppContext';

function RootLayout() {
  const { isOnboarded, isSeniorMode } = useAppContext();

  if (!isOnboarded) {
    return <Onboarding />;
  }

  return (
    <div className={`flex flex-col h-screen w-full bg-background text-foreground overflow-hidden relative ${isSeniorMode ? 'senior-mode' : ''}`}>
      <div className="flex-1 overflow-hidden relative">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export const router = createBrowserRouter(
  [
    {
      path: '/components',
      Component: ComponentLibrary,
    },
    {
      path: '/',
      Component: RootLayout,
      children: [
        { index: true, Component: Home },
        { path: 'map', Component: MapPage },
        { path: 'diary', Component: Diary },
        { path: 'settings', Component: Settings },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
