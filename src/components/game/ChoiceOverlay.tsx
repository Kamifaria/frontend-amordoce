'use client';

import React from 'react';
import { Choice } from '../../shared/types';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

interface ChoiceOverlayProps {
  choices: Choice[];
  onSelectChoice: (choice: Choice) => void;
  playerPA: number;
}

export const ChoiceOverlay: React.FC<ChoiceOverlayProps> = ({
  choices,
  onSelectChoice,
  playerPA,
}) => {
  return (
    <div 
      className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/45 p-6 backdrop-blur-xs"
      onClick={(e) => e.stopPropagation()} // Stop propagation to prevent accidental page clicks
    >
      <div className="w-full max-w-md space-y-4">
        {choices.map((choice, index) => {
          const hasEnoughPA = playerPA >= choice.costPA;

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              disabled={!hasEnoughPA}
              onClick={() => onSelectChoice(choice)}
              className={`group flex w-full items-center justify-between rounded-xl border px-5 py-4 text-left transition-all ${
                hasEnoughPA
                  ? 'cursor-pointer border-pink-500/20 bg-[#120e24]/90 text-slate-100 hover:border-pink-500/70 hover:bg-gradient-to-r hover:from-purple-900/40 hover:to-pink-900/40 hover:shadow-lg hover:shadow-pink-500/10'
                  : 'cursor-not-allowed border-red-500/20 bg-red-950/20 text-slate-500'
              }`}
            >
              <span className="font-semibold text-sm leading-snug tracking-wide group-hover:text-pink-300">
                {choice.text}
              </span>
              
              <div className="ml-4 flex items-center shrink-0 gap-1.5 rounded-full bg-pink-500/10 px-3 py-1 font-bold text-xs text-pink-400 border border-pink-500/10">
                {choice.costPA > 0 ? (
                  <>
                    {!hasEnoughPA && <AlertCircle size={12} className="text-red-400" />}
                    <span>{choice.costPA} PA</span>
                  </>
                ) : (
                  <span>Grátis</span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
