'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, RefreshCw, ArrowRight, Smartphone, Trophy } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { mockStory } from '@/mock/storyData';

interface EpisodeFinishedOverlayProps {
  onRestart: () => void;
  onOpenPhone: () => void;
}

export const EpisodeFinishedOverlay: React.FC<EpisodeFinishedOverlayProps> = ({
  onRestart,
  onOpenPhone
}) => {
  const { affinities, advance, initStory } = useGameStore();

  const characterNames: Record<string, string> = {
    nathaniel: 'Nathaniel',
    castiel: 'Castiel',
    remi: 'Remi',
    harry: 'Harry',
    maggie: 'Maggie',
    lysandre: 'Lysandre',
    kami: 'Kami'
  };

  const getRelationshipStatus = (score: number) => {
    if (score >= 50) return { label: 'Crush! ❤️', color: 'text-pink-400' };
    if (score >= 20) return { label: 'Próximos 😊', color: 'text-rose-400' };
    if (score >= 0) return { label: 'Amistoso 🤝', color: 'text-emerald-400' };
    return { label: 'Frio ❄️', color: 'text-cyan-400' };
  };

  const handleStartEpisode2 = () => {
    // Navigate to ep2_start
    initStory(mockStory, 'ep2_start', 100, 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 bg-[#0b0818]/90 backdrop-blur-md z-40 flex flex-col items-center justify-center p-6 select-none overflow-y-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', duration: 0.5 }}
        className="w-full max-w-lg bg-[#141029]/80 border border-purple-500/25 rounded-3xl p-6 shadow-2xl flex flex-col gap-6"
      >
        {/* Title Badge */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-pink-300">
            <Trophy size={14} className="text-pink-400" />
            <span>Episódio 1 Concluído!</span>
          </div>
          <h2 className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 via-rose-300 to-purple-400 bg-clip-text text-transparent tracking-wide">
            Fim do Primeiro Capítulo
          </h2>
          <p className="text-slate-400 text-xs mt-1">
            Seu primeiro dia em Sweet Amoris foi inesquecível! Veja como ficaram suas afinidades com os personagens:
          </p>
        </div>

        {/* Affinity Grid */}
        <div className="grid grid-cols-1 gap-2.5 max-h-[260px] overflow-y-auto pr-1">
          {Object.entries(characterNames).map(([id, name]) => {
            const score = affinities[id] ?? 0;
            const percentage = Math.round((score + 100) / 2);
            const status = getRelationshipStatus(score);
            const isPositive = score >= 0;

            return (
              <div 
                key={id} 
                className="bg-[#1b1638]/40 border border-slate-700/20 rounded-xl p-3 flex flex-col gap-1.5 hover:bg-[#201a42]/50 transition-colors"
              >
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-200 capitalize">{name}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-semibold ${status.color}`}>
                      {status.label}
                    </span>
                    <span className={isPositive ? 'text-pink-400' : 'text-cyan-400'}>
                      {score > 0 ? `+${score}` : score} LOM
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Heart 
                    size={12} 
                    className={`${
                      score >= 50 ? 'animate-pulse text-pink-500 fill-pink-500' :
                      isPositive ? 'text-rose-400 fill-rose-400/50' : 'text-cyan-400 fill-cyan-400/20'
                    }`} 
                  />
                  <div className="relative w-full h-2 rounded-full bg-[#090715] overflow-hidden border border-slate-900 shadow-inner">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-slate-700/40 z-10" />
                    <div 
                      className={`h-full bg-gradient-to-r ${
                        isPositive ? 'from-pink-500 to-rose-400' : 'from-blue-600 to-cyan-400'
                      } rounded-full transition-all duration-500`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 pt-2">
          <button
            onClick={handleStartEpisode2}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold text-sm tracking-wide shadow-lg hover:shadow-pink-500/20 active:scale-[0.98] transition-all cursor-pointer"
          >
            <span>Iniciar Episódio 2</span>
            <ArrowRight size={16} />
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onRestart}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1d173d] hover:bg-[#251e4d] text-purple-200 border border-purple-500/20 font-bold text-xs tracking-wide transition-all cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Jogar de Novo</span>
            </button>

            <button
              onClick={onOpenPhone}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#1d173d] hover:bg-[#251e4d] text-pink-200 border border-pink-500/20 font-bold text-xs tracking-wide transition-all cursor-pointer"
            >
              <Smartphone size={14} />
              <span>Ver SweetChat</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
