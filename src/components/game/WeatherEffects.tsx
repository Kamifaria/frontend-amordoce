import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '@/store/useGameStore';

export const WeatherEffects: React.FC = () => {
  const { environment } = useGameStore();

  const raindrops = useMemo(() => {
    if (environment.weather !== 'rain') return [];
    return Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 1.5,
      duration: 0.6 + Math.random() * 0.3,
    }));
  }, [environment.weather]);

  const snowflakes = useMemo(() => {
    if (environment.weather !== 'snow') return [];
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 3,
      size: 4 + Math.random() * 6,
    }));
  }, [environment.weather]);

  if (environment.weather === 'clear') return null;

  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
      {environment.weather === 'rain' &&
        raindrops.map((drop) => (
          <motion.div
            key={`rain-${drop.id}`}
            className="absolute top-[-5%] w-[2px] h-[30px] bg-blue-300/40 rounded-full blur-[1px]"
            style={{ left: drop.left }}
            animate={{
              y: ['0vh', '105vh'],
              x: ['0px', '20px'],
            }}
            transition={{
              duration: drop.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: drop.delay,
            }}
          />
        ))}

      {environment.weather === 'snow' &&
        snowflakes.map((flake) => (
          <motion.div
            key={`snow-${flake.id}`}
            className="absolute top-[-5%] bg-white rounded-full blur-[1px]"
            style={{
              left: flake.left,
              width: flake.size,
              height: flake.size,
              opacity: 0.8,
            }}
            animate={{
              y: ['0vh', '105vh'],
              x: ['0px', `${Math.random() > 0.5 ? '' : '-'}${20 + Math.random() * 40}px`],
              rotate: [0, 360],
            }}
            transition={{
              duration: flake.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: flake.delay,
            }}
          />
        ))}
    </div>
  );
};
