import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { ChevronRight, Globe, User, Compass } from 'lucide-react';
import { motion } from 'motion/react';
import { BirthDateFields } from '../components/profile/BirthDateFields';

export function Onboarding() {
  const { 
    language, setLanguage, 
    birthYear, setBirthYear,
    birthMonth, setBirthMonth,
    birthDay, setBirthDay,
    gender, setGender,
    interests, setInterests,
    setIsOnboarded 
  } = useAppContext();

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter(i => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background px-6 pt-16 pb-8 overflow-y-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1"
      >
        <h1 className="text-3xl font-medium text-foreground mb-2 leading-tight">
          맞춤형 가이드를 위해<br/>몇 가지를 알려주세요.
        </h1>
        <p className="text-muted-foreground mb-10 text-base">
          최적의 국가유산 해설을 제공해 드립니다.
        </p>

        <div className="space-y-8">
          {/* Language Selection */}
          <section>
            <div className="flex items-center space-x-2 mb-4 text-foreground">
              <Globe size={20} className="text-primary" />
              <h2 className="text-lg font-medium">언어 선택</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {['Korean', 'English', 'French'].map((lang) => (
                <SelectionCard 
                  key={lang}
                  label={lang === 'Korean' ? '한국어' : lang === 'English' ? 'English' : 'Français'}
                  selected={language === lang}
                  onClick={() => setLanguage(lang as any)}
                />
              ))}
            </div>
          </section>

          {/* Birth Date */}
          <section>
            <div className="flex items-center space-x-2 mb-4 text-foreground">
              <User size={20} className="text-primary" />
              <h2 className="text-lg font-medium">생년월일</h2>
            </div>
            <BirthDateFields
              year={birthYear}
              month={birthMonth}
              day={birthDay}
              onYearChange={setBirthYear}
              onMonthChange={setBirthMonth}
              onDayChange={setBirthDay}
            />
          </section>

          {/* Gender */}
          <section>
            <div className="flex items-center space-x-2 mb-4 text-foreground">
              <User size={20} className="text-primary" />
              <h2 className="text-lg font-medium">성별</h2>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: 'female', label: '여성' },
                { value: 'male', label: '남성' },
                { value: 'other', label: '기타' },
              ].map((option) => (
                <SelectionCard
                  key={option.value}
                  label={option.label}
                  selected={gender === option.value}
                  onClick={() => setGender(option.value as any)}
                />
              ))}
            </div>
          </section>

          {/* Interests */}
          <section>
            <div className="flex items-center space-x-2 mb-4 text-foreground">
              <Compass size={20} className="text-primary" />
              <h2 className="text-lg font-medium">관심 분야 (다중 선택)</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['건축', '역사', '왕실 문화', '예술 및 공예'].map((interest) => (
                <SelectionCard 
                  key={interest}
                  label={interest}
                  selected={interests.includes(interest)}
                  onClick={() => handleInterestToggle(interest)}
                />
              ))}
            </div>
          </section>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12"
      >
        <button 
          onClick={() => setIsOnboarded(true)}
          className="w-full h-14 bg-primary text-primary-foreground rounded-[20px] font-medium text-lg flex items-center justify-center space-x-2 shadow-lg shadow-primary/20 transition-transform active:scale-95"
        >
          <span>탐험 시작하기</span>
          <ChevronRight size={20} />
        </button>
      </motion.div>
    </div>
  );
}

function SelectionCard({ label, selected, onClick }: { label: string; selected: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`h-12 rounded-[20px] flex items-center justify-center text-sm transition-all duration-200 border ${
        selected 
          ? 'bg-primary text-primary-foreground border-primary' 
          : 'bg-white text-foreground border-border hover:bg-muted'
      }`}
    >
      {label}
    </button>
  );
}
