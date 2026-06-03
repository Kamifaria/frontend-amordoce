'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CenarioProps {
  backgroundUrl: string;
}

export const Cenario: React.FC<CenarioProps> = ({ backgroundUrl }) => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full bg-slate-900">
      <AnimatePresence mode="popLayout">
        {backgroundUrl && (
          <motion.div
            key={backgroundUrl}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="absolute inset-0 h-full w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundUrl})` }}
          />
        )}
      </AnimatePresence>
      {/* Subtle overlay gradients for improved text legibility and atmosphere */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#120e24]/70 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
};
