import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Bluetooth, CheckCircle2, Glasses, Headphones, X } from 'lucide-react';

type DeviceConnectionSheetProps = {
  open: boolean;
  connected: boolean;
  deviceName: string;
  onConnect: (deviceName: string) => void;
  onDisconnect: () => void;
  onClose: () => void;
};

const availableDevices = [
  {
    name: 'NRB-0100P',
    icon: <Glasses size={22} />,
  },
  {
    name: 'SM-O500',
    icon: <Glasses size={22} />,
  },
  {
    name: '누리벗의 Buds4 Pro',
    icon: <Headphones size={22} />,
  },
];

export function DeviceConnectionSheet({ open, connected, deviceName, onConnect, onDisconnect, onClose }: DeviceConnectionSheetProps) {
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
            className="fixed bottom-0 left-0 right-0 z-[70] flex max-h-[82vh] flex-col overflow-hidden rounded-t-[32px] bg-background shadow-[0_-10px_40px_rgba(0,0,0,0.15)]"
          >
            <div className="flex shrink-0 justify-center pb-2 pt-4">
              <div className="h-1.5 w-12 rounded-full bg-border/80" />
            </div>

            <div className="flex shrink-0 items-start justify-between border-b border-border/60 px-6 pb-5 pt-2">
              <div>
                <p className="text-xs font-bold tracking-[0.18em] text-primary">DEVICE</p>
                <h2 className="mt-1 text-2xl font-bold text-foreground">디바이스 연결</h2>
              </div>
              <button type="button" onClick={onClose} className="rounded-full bg-muted p-2 text-muted-foreground" aria-label="디바이스 연결 닫기">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 pb-9">
              <div className={`mb-5 rounded-[22px] border p-5 ${connected ? 'border-primary/25 bg-primary/8' : 'border-border bg-white'}`}>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${connected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                      {connected ? <CheckCircle2 size={22} /> : <Bluetooth size={22} />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-base font-bold text-foreground">{connected ? deviceName : '디바이스 없음'}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{connected ? '연결됨' : '안됨'}</p>
                    </div>
                  </div>
                  {connected && (
                    <button type="button" onClick={onDisconnect} className="shrink-0 rounded-full border border-border bg-white px-3 py-1.5 text-sm font-semibold text-muted-foreground">
                      연결 해제
                    </button>
                  )}
                </div>
              </div>

              <h3 className="mb-3 text-sm font-bold tracking-[0.14em] text-primary">검색된 디바이스</h3>
              <div className="space-y-3">
                {availableDevices.map((device) => {
                  const isCurrent = connected && device.name === deviceName;

                  return (
                    <button
                      key={device.name}
                      type="button"
                      onClick={() => onConnect(device.name)}
                      className={`flex w-full items-center justify-between gap-4 rounded-[20px] border px-4 py-4 text-left transition-colors active:bg-muted ${
                        isCurrent ? 'border-primary/30 bg-primary/8' : 'border-border bg-white'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground">{device.icon}</div>
                        <div className="min-w-0">
                          <p className="text-base font-semibold text-foreground">{device.name}</p>
                        </div>
                      </div>
                      <span className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-semibold ${isCurrent ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                        {isCurrent ? '연결됨' : '안됨'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
