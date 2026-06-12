'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Play, CheckCircle2 } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface EpisodeData {
  id: number;
  title: string;
  description: string;
  bgGradient: string;
}

const EPISODES: EpisodeData[] = [
  {
    id: 1,
    title: 'Episódio 1: Um Novo Começo',
    description: 'Veronica chega à escola Sweet Amoris e conhece os rapazes. Descubra os segredos escondidos e aumente suas afinidades.',
    bgGradient: 'from-pink-500/30 to-purple-600/30',
  },
  {
    id: 2,
    title: 'Episódio 2: Rumores no Corredor',
    description: 'Após os eventos do primeiro dia, novos conflitos surgem entre Castiel e Nathaniel. De que lado você vai ficar?',
    bgGradient: 'from-purple-600/30 to-indigo-600/30',
  },
  {
    id: 3,
    title: 'Episódio 3: O Mistério de Remi',
    description: 'Uma leitura de tarô revela sentimentos ocultos. Remi tem uma proposta irrecusável para fazer à Veronica.',
    bgGradient: 'from-indigo-600/30 to-slate-800/30',
  },
];

export const EpisodeSelector: React.FC = () => {
  const { unlockedEpisodes, activeEpisodeId, selectEpisode, setView, playSound } = useGameStore();

  const handleStartEpisode = (id: number) => {
    playSound('click');
    selectEpisode(id);
    setView('episode');
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-pink-300 mb-6 flex items-center gap-2">
        <span>🎬</span> Selecione seu Episódio
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {EPISODES.map((ep) => {
          const isUnlocked = unlockedEpisodes.includes(ep.id);
          const isCurrent = activeEpisodeId === ep.id;

          return (
            <motion.div
              key={ep.id}
              className={`relative bg-white/5 backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between min-h-[260px] overflow-hidden ${
                isUnlocked 
                  ? 'border-pink-500/20 hover:border-pink-500/50 shadow-[0_10px_20px_rgba(236,72,153,0.05)]' 
                  : 'border-white/5 opacity-60'
              }`}
              whileHover={isUnlocked ? { y: -5, scale: 1.02 } : {}}
            >
              {/* Background Glow */}
              <div className={`absolute -right-16 -top-16 w-36 h-36 rounded-full blur-3xl pointer-events-none bg-gradient-to-br ${ep.bgGradient}`} />

              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-pink-400 uppercase tracking-widest bg-pink-500/10 px-2.5 py-1 rounded-full">
                    Episódio {ep.id}
                  </span>
                  
                  {!isUnlocked ? (
                    <Lock className="w-5 h-5 text-slate-500" />
                  ) : isCurrent ? (
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Atual
                    </span>
                  ) : null}
                </div>

                <h4 className="text-lg font-bold text-white mb-2 tracking-wide">{ep.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium line-clamp-4">{ep.description}</p>
              </div>

              <div className="mt-6">
                {isUnlocked ? (
                  <motion.button
                    onClick={() => handleStartEpisode(ep.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm cursor-pointer shadow-lg shadow-pink-500/20"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isCurrent ? 'Continuar Jogando' : 'Iniciar Episódio'}</span>
                  </motion.button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-slate-800/80 text-slate-500 font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm cursor-not-allowed border border-white/5"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Bloqueado</span>
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
