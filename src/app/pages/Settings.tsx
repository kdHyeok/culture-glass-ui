import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Globe, User, Accessibility, ChevronRight } from 'lucide-react';

export function Settings() {
  const { language, setLanguage, isSeniorMode, setIsSeniorMode, ageGroup, setAgeGroup } = useAppContext();

  return (
    <div className="flex flex-col h-full bg-background overflow-y-auto pb-24">
      <div className="pt-16 pb-6 px-6 bg-white border-b border-border sticky top-0 z-10">
        <h1 className="text-2xl font-semibold text-foreground">설정</h1>
      </div>

      <div className="px-6 py-6 space-y-8">
        {/* Account / Profile */}
        <section>
          <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">프로필</h2>
          <div className="bg-white rounded-[20px] shadow-sm border border-border overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-base font-medium text-foreground">관람객</p>
                  <p className="text-xs text-muted-foreground">{ageGroup || '연령 미설정'}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section>
          <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">환경설정</h2>
          <div className="bg-white rounded-[20px] shadow-sm border border-border overflow-hidden">
            {/* Language */}
            <div className="px-5 py-4 flex items-center justify-between border-b border-border">
              <div className="flex items-center space-x-3">
                <Globe size={20} className="text-muted-foreground" />
                <span className="text-base font-medium text-foreground">음성 및 자막 언어</span>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-sm text-primary font-medium outline-none text-right"
              >
                <option value="Korean">한국어</option>
                <option value="English">English</option>
                <option value="French">Français</option>
              </select>
            </div>

            {/* Accessibility */}
            <div className="px-5 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Accessibility size={20} className="text-muted-foreground" />
                <div>
                  <span className="text-base font-medium text-foreground block">큰 글씨 모드 (시니어)</span>
                  <span className="text-xs text-muted-foreground">인터페이스가 단순해지고 글씨가 커집니다</span>
                </div>
              </div>
              
              <button 
                onClick={() => setIsSeniorMode(!isSeniorMode)}
                className={`w-12 h-6 rounded-full transition-colors relative ${isSeniorMode ? 'bg-primary' : 'bg-muted'}`}
              >
                <div className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all shadow-sm ${isSeniorMode ? 'left-6' : 'left-0.5'}`} />
              </button>
            </div>
          </div>
        </section>

        {/* Permissions */}
        <section>
          <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">권한 관리</h2>
          <div className="bg-white rounded-[20px] shadow-sm border border-border overflow-hidden">
            {['카메라 접근', '마이크 접근', '위치 정보'].map((perm, i) => (
              <div key={perm} className={`px-5 py-4 flex items-center justify-between ${i !== 2 ? 'border-b border-border' : ''}`}>
                <span className="text-base font-medium text-foreground">{perm}</span>
                <span className="text-sm text-primary font-medium">허용됨</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
