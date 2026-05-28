import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router';
import { AppProvider } from './context/AppContext';
import { Onboarding } from './pages/Onboarding';
import { Home } from './pages/Home';
import { Diary } from './pages/Diary';
import { Settings } from './pages/Settings';
import { BottomNav } from './components/BottomNav';
import { useAppContext } from './context/AppContext';

function RootLayout() {
  const { isOnboarded } = useAppContext();

  if (!isOnboarded) {
    return <Onboarding />;
  }

  return (
    <div className="flex flex-col h-screen w-full bg-background text-foreground overflow-hidden relative">
      <div className="flex-1 overflow-hidden relative">
        <Outlet />
      </div>
      <BottomNav />
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: 'diary', Component: Diary },
      { path: 'settings', Component: Settings },
    ],
  },
]);
