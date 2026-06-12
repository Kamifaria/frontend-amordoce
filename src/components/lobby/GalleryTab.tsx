'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Eye, Sparkles } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

interface CGItem {
  id: string;
  episodeId: number;
  title: string;
  description: string;
  imageUrl: string;
}

const CG_GALLERY: CGItem[] = [
  {
    id: 'fight_cg',
    episodeId: 1,
    title: 'Conflito de Gigantes',
    description: 'Castiel e Nathaniel discutem no corredor por causa do grêmio e da justificativa rasgada.',
    imageUrl: '/images/cgs/fight_cg.png',
  },
  {
    id: 'remi_encounter',
    episodeId: 1,
    title: 'A Leitura do Destino',
    description: 'Remi lê as cartas de tarô para Veronica e revela sentimentos misteriosos.',
    imageUrl: '/images/cgs/remi_encounter.png',
  },
];

export const GalleryTab: React.FC = () => {
  const { unlockedCGs, playSound } = useGameStore();
  const [activeCG, setActiveCG] = useState<CGItem | null>(null);

  const handleOpenCG = (cg: CGItem) => {
    playSound('click');
    setActiveCG(cg);
  };

  return (
    <div className="w-full">
      <h3 className="text-xl font-bold text-pink-300 mb-6 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-yellow-300" /> Galeria de Lembranças (CGs)
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {CG_GALLERY.map((cg) => {
          const isUnlocked = unlockedCGs.includes(cg.id);

          return (
            <div key={cg.id} className="flex flex-col gap-2.5">
              <motion.div
                onClick={() => isUnlocked && handleOpenCG(cg)}
                className={`relative aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border ${
                  isUnlocked 
                    ? 'border-pink-500/25 hover:border-pink-500 cursor-pointer shadow-lg hover:shadow-pink-500/10' 
                    : 'border-white/5 cursor-not-allowed'
                }`}
                whileHover={isUnlocked ? { scale: 1.02 } : {}}
              >
                {isUnlocked ? (
                  <>
                    <img 
                      src={cg.imageUrl} 
                      alt={cg.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback in case actual image is not present
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    {/* Fallback stylized gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-pink-500/40 via-purple-600/20 to-[#120e2e]/90 flex items-center justify-center text-4xl">
                      🖼️
                    </div>

                    <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-xs">
                      <Eye className="w-8 h-8 text-white filter drop-shadow-md" />
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 bg-[#0d0921]/80 flex flex-col items-center justify-center gap-3 text-slate-500">
                    <Lock className="w-8 h-8" />
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Bloqueado</span>
                  </div>
                )}
              </motion.div>

              <div className="px-2">
                <span className="text-[10px] text-pink-400 font-extrabold uppercase tracking-wider bg-pink-500/10 px-2 py-0.5 rounded">
                  Episódio {cg.episodeId}
                </span>
                <h4 className="text-sm font-bold text-white mt-1.5">{cg.title}</h4>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-0.5 truncate">{cg.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Expanded CG modal */}
      <AnimatePresence>
        {activeCG && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 md:p-8 select-none"
            onClick={() => setActiveCG(null)}
          >
            <div className="max-w-4xl w-full flex flex-col gap-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img 
                  src={activeCG.imageUrl} 
                  alt={activeCG.title} 
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                {/* Fallback image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-600/40 via-purple-700/25 to-[#0b081e] flex flex-col items-center justify-center gap-4">
                  <span className="text-7xl">🖼️</span>
                  <span className="text-lg font-bold text-pink-300 tracking-wide">{activeCG.title}</span>
                </div>
              </div>

              <div className="text-left bg-white/5 backdrop-blur-md rounded-2xl p-5 border border-white/10">
                <h4 className="text-lg font-bold text-white mb-1">{activeCG.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">{activeCG.description}</p>
              </div>

              <button
                onClick={() => { playSound('click'); setActiveCG(null); }}
                className="self-center mt-2 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              >
                Voltar à Galeria
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
