'use client';

import React from 'react';
import { Play } from 'lucide-react';

interface HeroSectionProps {
  onPlayClick?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onPlayClick }) => {
  return (
    <div className="flex flex-col gap-6 max-w-xl text-white select-none">
      
      {/* Intro Subtitle badge */}
      <div className="inline-flex self-start items-center gap-1.5 px-3 py-1 bg-pink-500/25 border border-pink-400/30 rounded-full text-[10px] font-bold tracking-widest uppercase text-pink-300">
        ✨ Romance Virtual Oficial
      </div>

      {/* Main Title heading */}
      <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-tight bg-gradient-to-r from-white via-pink-100 to-pink-200 bg-clip-text text-transparent drop-shadow-md">
        Crie a sua própria aventura na escola Sweet Amoris...
      </h1>

      {/* Body text paragraph */}
      <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-medium max-w-lg">
        Conheça garotos incríveis, faça amizades, mude o rumo da história com suas escolhas e viva um romance escolar inesquecível!
      </p>

      {/* JOGAR CTA Button & Stats counter */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
        <button
          onClick={onPlayClick}
          className="w-full sm:w-auto px-10 py-5 bg-gradient-to-r from-[#e1376f] to-[#f43f5e] hover:from-[#f43f5e] hover:to-[#e1376f] text-white font-extrabold text-lg uppercase tracking-wider rounded-2xl shadow-[0_8px_30px_rgb(225,55,111,0.4)] hover:shadow-[0_8px_35px_rgb(225,55,111,0.6)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border-2 border-white/20 hover:border-white/50"
        >
          <Play className="fill-white animate-pulse" size={18} />
          JOGAR!
        </button>

        {/* Live Counters */}
        <div className="flex flex-col items-center sm:items-start text-xs font-bold tracking-wide select-none">
          <div className="text-pink-400 uppercase tracking-widest drop-shadow-sm">
            25.242.053 Inscritos
          </div>
          <div className="text-slate-400 mt-0.5">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-green-500 animate-ping mr-2.5" />
            1.448 apaixonadas online
          </div>
        </div>
      </div>
    </div>
  );
};
