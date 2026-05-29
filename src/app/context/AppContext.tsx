import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'Korean' | 'English' | 'French';
type Gender = 'female' | 'male' | 'other' | '';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  profileName: string;
  setProfileName: (name: string) => void;
  isSeniorMode: boolean;
  setIsSeniorMode: (mode: boolean) => void;
  interests: string[];
  setInterests: (interests: string[]) => void;
  ageGroup: string;
  setAgeGroup: (age: string) => void;
  birthDate: string;
  setBirthDate: (date: string) => void;
  birthYear: string;
  setBirthYear: (year: string) => void;
  birthMonth: string;
  setBirthMonth: (month: string) => void;
  birthDay: string;
  setBirthDay: (day: string) => void;
  gender: Gender;
  setGender: (gender: Gender) => void;
  isOnboarded: boolean;
  setIsOnboarded: (val: boolean) => void;
  isCameraMicActive: boolean;
  setIsCameraMicActive: (active: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('Korean');
  const [profileName, setProfileName] = useState('관람객 328');
  const [isSeniorMode, setIsSeniorMode] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [ageGroup, setAgeGroup] = useState<string>('');
  const [birthDate, setBirthDate] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [birthDay, setBirthDay] = useState<string>('');
  const [gender, setGender] = useState<Gender>('');
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [isCameraMicActive, setIsCameraMicActive] = useState(false);

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        profileName,
        setProfileName,
        isSeniorMode,
        setIsSeniorMode,
        interests,
        setInterests,
        ageGroup,
        setAgeGroup,
        birthDate,
        setBirthDate,
        birthYear,
        setBirthYear,
        birthMonth,
        setBirthMonth,
        birthDay,
        setBirthDay,
        gender,
        setGender,
        isOnboarded,
        setIsOnboarded,
        isCameraMicActive,
        setIsCameraMicActive,
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
