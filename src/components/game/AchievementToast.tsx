'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Trophy, X } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export const AchievementToast: React.FC = () => {
  const { achievementQueue, dismissAchievement } = useGameStore();

  const currentAchievement = achievementQueue[0];

  useEffect(() => {
    if (currentAchievement) {
      // Auto-dismiss achievement toast after 4.5 seconds
      const timer = setTimeout(() => {
        dismissAchievement();
      }, 4500);
      return () => clearTimeout(timer);
    }
  }, [currentAchievement, dismissAchievement]);

  return (
    <AnimatePresence>
      {currentAchievement && (
        <motion.div
          initial={{ opacity: 0, y: -80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-sm bg-[#141029]/95 border-2 border-pink-500/50 rounded-2xl p-4 shadow-[0_15px_30px_rgba(236,72,153,0.3)] backdrop-blur-md flex items-center justify-between gap-3 select-none pointer-events-auto"
        >
          {/* Badge Icon */}
          <div className="w-11 h-11 rounded-xl bg-pink-500/20 border border-pink-500/40 flex items-center justify-center text-2xl filter drop-shadow-[0_0_8px_rgba(236,72,153,0.5)] shrink-0">
            {currentAchievement.icon}
          </div>

          {/* Details */}
          <div className="flex-1 text-left min-w-0">
            <span className="text-[10px] font-black text-pink-400 uppercase tracking-widest flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5" /> Conquista Desbloqueada!
            </span>
            <h4 className="text-sm font-black text-white truncate mt-0.5">{currentAchievement.title}</h4>
            <p className="text-[10px] text-slate-300 truncate leading-tight font-medium mt-0.5">{currentAchievement.description}</p>
          </div>

          {/* Close button */}
          <button
            onClick={dismissAchievement}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
