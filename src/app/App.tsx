import React, { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppProvider, useAppContext } from './context/AppContext';
import { SplashScreen } from './components/SplashScreen';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

function AppContent() {
  const { isSeniorMode } = useAppContext();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setShowSplash(false), 1800);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('senior-mode-enabled', isSeniorMode);

    return () => document.documentElement.classList.remove('senior-mode-enabled');
  }, [isSeniorMode]);

  return (
    <>
      {showSplash ? <SplashScreen /> : <RouterProvider router={router} />}
    </>
  );
}
