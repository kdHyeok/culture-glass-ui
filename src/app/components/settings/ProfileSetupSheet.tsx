import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Compass, Globe, User, X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { BirthDateFields } from '../profile/BirthDateFields';

type ProfileSetupSheetProps = {
  open: boolean;
  onClose: () => void;
};

const languageOptions = [
  { value: 'Korean', label: '한국어' },
  { value: 'English', label: 'English' },
  { value: 'French', label: 'Français' },
] as const;

const genderOptions = [
  { value: 'female', label: '여성' },
  { value: 'male', label: '남성' },
  { value: 'other', label: '기타' },
] as const;
const interestOptions = ['건축', '역사', '왕실 문화', '예술 및 공예'];

export function ProfileSetupSheet({ open, onClose }: ProfileSetupSheetProps) {
  const {
    language,
    setLanguage,
    profileName,
    setProfileName,
    birthYear,
    setBirthYear,
    birthMonth,
    setBirthMonth,
    birthDay,
    setBirthDay,
    gender,
    setGender,
    interests,
    setInterests,
  } = useAppContext();

  const toggleInterest = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((item) => item !== interest));
      return;
    }

    setInterests([...interests, interest]);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 210 }}
            className="fixed bottom-0 left-0 right-0 z-[70] flex max-h-[86vh] flex-col overflow-hidden rounded-t-[32px] bg-background shadow-[0_-10px_40px_rgba(0,0,0,0.15)]"
          >
            <div className="flex shrink-0 justify-center pb-2 pt-4">
              <div className="h-1.5 w-12 rounded-full bg-border/80" />
            </div>

            <div className="flex shrink-0 items-start justify-between border-b border-border/60 px-6 pb-5 pt-2">
              <div>
                <p className="text-xs font-bold tracking-[0.18em] text-primary">PROFILE</p>
                <h2 className="mt-1 text-2xl font-bold text-foreground">프로필 설정</h2>
                <p className="mt-1 text-sm text-muted-foreground">초기 온보딩의 맞춤 설정과 공유됩니다.</p>
              </div>
              <button type="button" onClick={onClose} className="rounded-full bg-muted p-2 text-muted-foreground" aria-label="프로필 설정 닫기">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 pb-9">
              <ProfileSection icon={<User size={20} className="text-primary" />} title="이름">
                <input
                  type="text"
                  value={profileName}
                  onChange={(event) => setProfileName(event.target.value)}
                  placeholder="이름을 입력하세요"
                  className="h-12 w-full rounded-[18px] border border-border bg-white px-4 text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
                />
              </ProfileSection>

              <ProfileSection icon={<Globe size={20} className="text-primary" />} title="언어 선택">
                <div className="grid grid-cols-3 gap-3">
                  {languageOptions.map((option) => (
                    <SelectionButton key={option.value} selected={language === option.value} onClick={() => setLanguage(option.value)}>
                      {option.label}
                    </SelectionButton>
                  ))}
                </div>
              </ProfileSection>

              <ProfileSection icon={<User size={20} className="text-primary" />} title="생년월일">
                <BirthDateFields
                  year={birthYear}
                  month={birthMonth}
                  day={birthDay}
                  onYearChange={setBirthYear}
                  onMonthChange={setBirthMonth}
                  onDayChange={setBirthDay}
                />
              </ProfileSection>

              <ProfileSection icon={<User size={20} className="text-primary" />} title="성별">
                <div className="grid grid-cols-3 gap-3">
                  {genderOptions.map((option) => (
                    <SelectionButton key={option.value} selected={gender === option.value} onClick={() => setGender(option.value)}>
                      {option.label}
                    </SelectionButton>
                  ))}
                </div>
              </ProfileSection>

              <ProfileSection icon={<Compass size={20} className="text-primary" />} title="관심 분야">
                <div className="grid grid-cols-2 gap-3">
                  {interestOptions.map((interest) => (
                    <SelectionButton key={interest} selected={interests.includes(interest)} onClick={() => toggleInterest(interest)}>
                      {interest}
                    </SelectionButton>
                  ))}
                </div>
              </ProfileSection>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ProfileSection({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-7 last:mb-0">
      <div className="mb-4 flex items-center space-x-2 text-foreground">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function SelectionButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-12 items-center justify-center rounded-[18px] border text-sm font-semibold transition-colors ${
        selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-white text-foreground hover:bg-muted'
      }`}
    >
      {children}
    </button>
  );
}
