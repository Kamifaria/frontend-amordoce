'use client';

import React from 'react';
import { Heart, UserCheck } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface CharacterMeta {
  id: string;
  name: string;
  role: string;
  glowClass: string;
  barColor: string;
  avatarPlaceholder: string;
}

const CHARACTERS: CharacterMeta[] = [
  {
    id: 'castiel',
    name: 'Castiel',
    role: 'O Guitarrista Rebelde',
    glowClass: 'from-red-500/20 to-transparent',
    barColor: 'bg-red-500',
    avatarPlaceholder: '🎸',
  },
  {
    id: 'nathaniel',
    name: 'Nathaniel',
    role: 'O Representante de Turma',
    glowClass: 'from-amber-500/20 to-transparent',
    barColor: 'bg-amber-500',
    avatarPlaceholder: '📚',
  },
  {
    id: 'lysandre',
    name: 'Lysandre',
    role: 'O Cantor Vitoriano',
    glowClass: 'from-emerald-500/20 to-transparent',
    barColor: 'bg-emerald-500',
    avatarPlaceholder: '📜',
  },
  {
    id: 'kami',
    name: 'Kami',
    role: 'O Senpai Misterioso',
    glowClass: 'from-purple-500/20 to-transparent',
    barColor: 'bg-purple-500',
    avatarPlaceholder: '🐈',
  },
];

export const AffinityTracker: React.FC = () => {
  const { affinities } = useGameStore();

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-pink-300 mb-6 flex items-center gap-2">
        <Heart className="w-5 h-5 text-pink-500 fill-pink-500 animate-pulse" /> Status do Love-o-Meter (Afinidades)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {CHARACTERS.map((char) => {
          const score = affinities[char.id] ?? 0;
          // Clamp score between 0 and 100 for visual bar representation
          const percentage = Math.max(0, Math.min(100, score));

          return (
            <div
              key={char.id}
              className="relative bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/5 overflow-hidden flex flex-col items-center text-center group"
            >
              {/* Glow overlay */}
              <div className={`absolute inset-0 bg-gradient-to-b ${char.glowClass} opacity-40 group-hover:opacity-75 transition-opacity duration-300 pointer-events-none`} />

              {/* Character Avatar Icon representation */}
              <div className="w-16 h-16 rounded-full bg-slate-900/60 border border-white/10 flex items-center justify-center text-3xl mb-3 shadow-inner relative z-10">
                {char.avatarPlaceholder}
              </div>

              <div className="relative z-10 space-y-1 w-full">
                <h4 className="text-base font-extrabold text-white tracking-wide">{char.name}</h4>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">{char.role}</p>

                {/* Loveometer Bar Container */}
                <div className="mt-4 space-y-1.5">
                  <div className="flex justify-between items-center text-[11px] font-bold">
                    <span className="text-slate-400">Afinidade</span>
                    <span className="text-pink-400 flex items-center gap-0.5">
                      <Heart className="w-3 h-3 fill-pink-500 text-pink-500" /> {score}%
                    </span>
                  </div>

                  {/* Progress Bar background */}
                  <div className="w-full h-2.5 bg-slate-950/80 rounded-full overflow-hidden border border-white/5">
                    <div
                      className={`h-full ${char.barColor} rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
