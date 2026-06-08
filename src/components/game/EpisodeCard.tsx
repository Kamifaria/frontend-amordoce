'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Play, RotateCcw, Image } from 'lucide-react';
import { EpisodeMetadata } from '@/mock/storyData';

interface EpisodeCardProps {
  episode: EpisodeMetadata;
  isUnlocked: boolean;
  isActive: boolean;
  unlockedCGsCount: number;
  onPlay: (id: number) => void;
}

export const EpisodeCard: React.FC<EpisodeCardProps> = ({
  episode,
  isUnlocked,
  isActive,
  unlockedCGsCount,
  onPlay,
}) => {
  return (
    <motion.div
      whileHover={isUnlocked ? { y: -6, scale: 1.02 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={`relative w-full rounded-3xl overflow-hidden border shadow-xl flex flex-col transition-all ${
        isActive 
          ? 'bg-gradient-to-b from-[#1b1736] to-[#0c0a1a] border-pink-500/40 shadow-pink-500/5' 
          : 'bg-[#120e24]/80 border-white/5 hover:border-pink-500/20'
      }`}
    >
      {/* Cover Image Area */}
      <div className="relative aspect-video w-full overflow-hidden select-none bg-slate-950">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={episode.coverImage}
          alt={episode.title}
          className={`w-full h-full object-cover transition-transform duration-[6s] hover:scale-110 ${
            !isUnlocked ? 'filter brightness-40 blur-xs grayscale' : 'filter brightness-90'
          }`}
        />

        {/* Top Badges (Episode Number & Unlocked CGs) */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
          <span className="px-3 py-1 bg-pink-600/90 text-[10px] font-black tracking-widest uppercase rounded-full shadow border border-white/10 text-white">
            Episódio {episode.number}
          </span>

          {isUnlocked && (
            <span className="px-2.5 py-1 bg-black/60 backdrop-blur-md text-[9px] font-extrabold tracking-wider rounded-full flex items-center gap-1 border border-white/10 text-pink-300">
              <Image size={10} className="text-pink-400 fill-pink-400/10" />
              🏆 CGs: {unlockedCGsCount}/{episode.cgCount}
            </span>
          )}
        </div>

        {/* Lock Overlay for Unlocked/Locked States */}
        {!isUnlocked && (
          <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-2 text-white">
            <div className="w-12 h-12 rounded-full bg-black/40 border border-white/10 flex items-center justify-center shadow-lg text-slate-400">
              <Lock size={20} className="text-slate-400 fill-slate-400/5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
              Bloqueado
            </span>
          </div>
        )}

        {/* Active Marker Overlay */}
        {isActive && isUnlocked && (
          <div className="absolute bottom-3 left-3 px-2.5 py-0.5 bg-green-500 text-white text-[9px] font-black uppercase tracking-widest rounded-md shadow border border-white/10">
            Ativo
          </div>
        )}
      </div>

      {/* Description Info area */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        <div className="flex flex-col gap-1.5 text-left">
          <h3 className={`text-base font-extrabold tracking-wide ${isActive ? 'text-pink-400' : 'text-slate-200'}`}>
            {episode.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            {episode.description}
          </p>
        </div>

        {/* Play Button Actions */}
        {isUnlocked ? (
          <button
            onClick={() => onPlay(episode.id)}
            className={`w-full py-3.5 rounded-2xl font-black uppercase tracking-wider text-xs shadow-md transition-all active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border ${
              isActive
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-white/10'
                : 'bg-white/5 hover:bg-white/10 text-slate-200 border-white/5 hover:border-pink-500/20'
            }`}
          >
            {isActive ? (
              <>
                <RotateCcw size={14} />
                Reiniciar
              </>
            ) : (
              <>
                <Play size={14} className="fill-current" />
                Jogar!
              </>
            )}
          </button>
        ) : (
          <button
            disabled
            className="w-full py-3.5 bg-slate-900/40 text-slate-600 border border-white/5 rounded-2xl font-black uppercase tracking-wider text-xs shadow-none cursor-not-allowed select-none"
          >
            Indisponível
          </button>
        )}
      </div>
    </motion.div>
  );
};
