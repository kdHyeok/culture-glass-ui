import React from 'react';
import { motion } from 'motion/react';
import { useAppContext } from '../context/AppContext';

type SharedMicWaveformProps = {
  placement?: 'nav' | 'sheet';
};

const idleHeights = ['10px', '18px', '26px', '14px', '30px', '20px', '12px'];

export function SharedMicWaveform({ placement = 'nav' }: SharedMicWaveformProps) {
  const { isCameraMicActive } = useAppContext();
  const isSheet = placement === 'sheet';

  return (
    <div className={isSheet ? 'pointer-events-none absolute bottom-5 right-5 z-20' : 'pointer-events-none absolute bottom-[116px] left-0 right-0 flex justify-center'}>
      <div
        className={`flex items-end rounded-full shadow-sm backdrop-blur-md ${
          isSheet
            ? `h-9 space-x-1 px-3 py-2 ${isCameraMicActive ? 'bg-primary/20' : 'bg-foreground/10'}`
            : `h-10 space-x-1.5 px-5 py-2 ${isCameraMicActive ? 'bg-primary/25' : 'bg-foreground/10'}`
        }`}
      >
        {isCameraMicActive
          ? [...Array(7)].map((_, index) => (
              <motion.div
                key={`shared-listening-${placement}-${index}`}
                animate={{ height: ['8px', `${14 + Math.random() * (isSheet ? 16 : 22)}px`, '8px'] }}
                transition={{ repeat: Infinity, duration: 0.55 + Math.random() * 0.5, ease: 'easeInOut' }}
                className={`${isSheet ? 'w-1' : 'w-1.5'} rounded-full bg-primary`}
              />
            ))
          : idleHeights.map((height, index) => (
              <div
                key={`shared-idle-${placement}-${index}`}
                style={{ height: isSheet ? `calc(${height} * 0.78)` : height }}
                className={`${isSheet ? 'w-1' : 'w-1.5'} rounded-full bg-muted-foreground/35`}
              />
            ))}
      </div>
    </div>
  );
}
