'use client';

import React from 'react';
import { Heart } from 'lucide-react';

interface LoveOMeterProps {
  affinityScore: number; // Range: -100 to 100
  characterName: string;
}

export const LoveOMeter: React.FC<LoveOMeterProps> = ({ affinityScore, characterName }) => {
  // Normalize score from [-100, 100] to [0, 100] for progress bar percentage
  const percentage = Math.round(((affinityScore + 100) / 2));
  
  // Choose color theme based on relationship state
  const isPositive = affinityScore >= 0;
  const barColor = isPositive 
    ? 'from-pink-500 to-rose-400' 
    : 'from-blue-600 to-cyan-400';
  
  return (
    <div className="w-full bg-[#1b1736]/40 border border-slate-700/30 rounded-xl p-3 flex flex-col gap-2 backdrop-blur-sm shadow-md">
      <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider">
        <span className="text-slate-300">{characterName}</span>
        <span className={isPositive ? 'text-pink-400' : 'text-cyan-400'}>
          {affinityScore > 0 ? `+${affinityScore}` : affinityScore} LOM
        </span>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Heart Icon with breathing animation if affinity is high */}
        <Heart 
          size={18} 
          className={`shrink-0 transition-transform duration-300 ${
            affinityScore >= 50 ? 'animate-pulse text-pink-500 fill-pink-500' :
            isPositive ? 'text-rose-400 fill-rose-400/55' : 'text-cyan-400 fill-cyan-400/20'
          }`} 
        />
        
        {/* Progress Bar Container */}
        <div className="relative w-full h-3 rounded-full bg-[#0d0a1a] overflow-hidden border border-slate-900 shadow-inner">
          {/* Neutral Center Marker */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-slate-700/60 z-10" />
          
          {/* Progress Bar Fill */}
          <div 
            className={`h-full bg-gradient-to-r ${barColor} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};
