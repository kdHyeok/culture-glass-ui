import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Globe, User, Accessibility, Bluetooth, Camera, ChevronRight, MapPin, Mic } from 'lucide-react';
import { DeviceConnectionSheet } from '../components/settings/DeviceConnectionSheet';
import { ProfileSetupSheet } from '../components/settings/ProfileSetupSheet';

type PermissionStatus = 'allowed' | 'partial' | 'denied';

const permissionStatusLabels: Record<PermissionStatus, string> = {
  allowed: '허용됨',
  partial: '일부 허용',
  denied: '허용 안함',
};

export function Settings() {
  const { language, setLanguage, profileName, isSeniorMode, setIsSeniorMode, birthYear, birthMonth, birthDay, gender } = useAppContext();
  const [isProfileSheetOpen, setIsProfileSheetOpen] = useState(false);
  const [isDeviceSheetOpen, setIsDeviceSheetOpen] = useState(false);
  const [connectedDeviceName, setConnectedDeviceName] = useState('');
  const [permissions, setPermissions] = useState<Record<string, PermissionStatus>>({
    camera: 'allowed',
    microphone: 'allowed',
    location: 'partial',
    bluetooth: 'denied',
  });

  const permissionItems = [
    { id: 'camera', label: '카메라 접근', icon: <Camera size={20} className="text-muted-foreground" /> },
    { id: 'microphone', label: '마이크 접근', icon: <Mic size={20} className="text-muted-foreground" /> },
    { id: 'location', label: '위치 정보', icon: <MapPin size={20} className="text-muted-foreground" /> },
    { id: 'bluetooth', label: '블루투스 접근', icon: <Bluetooth size={20} className="text-muted-foreground" /> },
  ];
  const genderLabel = gender === 'female' ? '여성' : gender === 'male' ? '남성' : gender === 'other' ? '기타' : '';
  const birthDateLabel = birthYear && birthMonth && birthDay ? `${birthYear}.${birthMonth}.${birthDay}` : '생년월일 미설정';
  const profileSummary = [birthDateLabel, genderLabel].filter(Boolean).join(' · ');
  const isDeviceConnected = Boolean(connectedDeviceName);

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
            <button
              type="button"
              onClick={() => setIsProfileSheetOpen(true)}
              className="flex w-full items-center justify-between border-b border-border px-5 py-4 text-left transition-colors active:bg-muted"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground">
                  <User size={20} />
                </div>
                <div>
                  <p className="text-base font-medium text-foreground">{profileName}</p>
                  <p className="text-xs text-muted-foreground">{profileSummary}</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </button>
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
            <div className="px-5 py-4 flex items-center justify-between border-b border-border">
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

            <button
              type="button"
              onClick={() => setIsDeviceSheetOpen(true)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors active:bg-muted"
            >
              <div className="flex min-w-0 items-center space-x-3">
                <Bluetooth size={20} className="text-muted-foreground" />
                <div className="min-w-0">
                  <span className="block text-base font-medium text-foreground">디바이스 연결</span>
                  <span className="block truncate text-xs text-muted-foreground">{isDeviceConnected ? connectedDeviceName : '디바이스 없음'}</span>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${isDeviceConnected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                  {isDeviceConnected ? '연결됨' : '안됨'}
                </span>
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            </button>
          </div>
        </section>

        {/* Permissions */}
        <section>
          <h2 className="text-sm font-semibold text-primary mb-3 uppercase tracking-wider">권한 관리</h2>
          <div className="bg-white rounded-[20px] shadow-sm border border-border overflow-hidden">
            {permissionItems.map((permission, index) => (
              <div key={permission.id} className={`px-5 py-4 flex items-center justify-between gap-4 ${index !== permissionItems.length - 1 ? 'border-b border-border' : ''}`}>
                <div className="flex min-w-0 items-center space-x-3">
                  {permission.icon}
                  <span className="text-base font-medium text-foreground">{permission.label}</span>
                </div>
                <select
                  value={permissions[permission.id]}
                  onChange={(event) =>
                    setPermissions((current) => ({
                      ...current,
                      [permission.id]: event.target.value as PermissionStatus,
                    }))
                  }
                  className="min-w-[104px] rounded-full border border-border bg-muted/40 px-3 py-1.5 text-right text-sm font-semibold text-primary outline-none focus:border-primary focus:bg-white"
                  aria-label={`${permission.label} 권한 상태`}
                >
                  {Object.entries(permissionStatusLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </section>
      </div>
      <ProfileSetupSheet open={isProfileSheetOpen} onClose={() => setIsProfileSheetOpen(false)} />
      <DeviceConnectionSheet
        open={isDeviceSheetOpen}
        connected={isDeviceConnected}
        deviceName={connectedDeviceName}
        onConnect={(deviceName) => setConnectedDeviceName(deviceName)}
        onDisconnect={() => setConnectedDeviceName('')}
        onClose={() => setIsDeviceSheetOpen(false)}
      />
    </div>
  );
}
