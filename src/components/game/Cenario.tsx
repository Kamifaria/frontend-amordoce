'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CenarioProps {
  backgroundUrl: string;
}

const getBackgroundSrc = (url: string): string => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('/')) {
    return url;
  }
  const map: Record<string, string> = {
    'corredor': '/images/backgrounds/corridor.png',
    'sala_de_aula': '/images/backgrounds/classroom.png',
    'patio': '/images/backgrounds/courtyard.png',
    'sala_de_artes': '/images/backgrounds/art_room.png',
    'remi_encounter': '/images/backgrounds/remi_encounter.png',
  };
  return map[url.toLowerCase()] || `/images/backgrounds/${url}.png`;
};

export const Cenario: React.FC<CenarioProps> = ({ backgroundUrl }) => {
  const bgSrc = getBackgroundSrc(backgroundUrl);

  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-slate-900">
      <AnimatePresence mode="popLayout">
        {bgSrc && (
          <motion.div
            key={bgSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${bgSrc})` }}
          />
        )}
      </AnimatePresence>
      {/* Subtle overlay gradients for improved text legibility and atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#120e24]/75 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
};
