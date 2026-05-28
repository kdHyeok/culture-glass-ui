import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'Korean' | 'English' | 'French';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  isSeniorMode: boolean;
  setIsSeniorMode: (mode: boolean) => void;
  interests: string[];
  setInterests: (interests: string[]) => void;
  ageGroup: string;
  setAgeGroup: (age: string) => void;
  isOnboarded: boolean;
  setIsOnboarded: (val: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('Korean');
  const [isSeniorMode, setIsSeniorMode] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [isOnboarded, setIsOnboarded] = useState(false);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isSeniorMode,
        setIsSeniorMode,
        interests,
        setInterests,
        ageGroup,
        setAgeGroup,
        isOnboarded,
        setIsOnboarded,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
