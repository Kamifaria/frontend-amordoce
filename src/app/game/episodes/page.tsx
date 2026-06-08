'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, BookOpen, AlertTriangle } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { mockEpisodes } from '@/mock/storyData';
import { EpisodeCard } from '@/components/game/EpisodeCard';

export default function EpisodesPage() {
  const router = useRouter();
  const {
    unlockedEpisodes,
    activeEpisodeId,
    unlockedCGs,
    selectEpisode,
    fetchCurrentGameState,
  } = useGameStore();

  const [selectedEpId, setSelectedEpId] = useState<number | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    fetchCurrentGameState();
  }, [fetchCurrentGameState]);

  const handlePlayClick = (episodeId: number) => {
    setSelectedEpId(episodeId);
    setShowConfirmModal(true);
  };

  const handleConfirmSelect = () => {
    if (selectedEpId !== null) {
      selectEpisode(selectedEpId);
      setShowConfirmModal(false);
      router.push('/game');
    }
  };

  return (
    <div 
      className="min-h-screen w-screen flex flex-col bg-[#090714] text-slate-100 overflow-x-hidden font-sans relative"
      style={{
        backgroundImage: `linear-gradient(rgba(9, 7, 20, 0.7), rgba(9, 7, 20, 0.85)), url('https://www.amordoce.com/image/index/disconnected/s1/crush.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Header Area */}
      <header className="w-full bg-[#120e24]/85 border-b border-white/10 backdrop-blur-md sticky top-0 z-30 select-none">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => router.push('/game')}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} />
            Voltar ao Jogo
          </button>

          <div className="flex items-center gap-2 text-pink-400">
            <BookOpen size={18} />
            <span className="text-sm font-extrabold uppercase tracking-widest text-slate-200">
              Episódios Sweet Amoris
            </span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 z-10 flex flex-col gap-8">
        
        {/* Title Hook */}
        <div className="text-center md:text-left flex flex-col gap-2 max-w-2xl">
          <h1 className="text-3xl font-black tracking-tight leading-tight bg-gradient-to-r from-slate-100 via-pink-100 to-pink-300 bg-clip-text text-transparent drop-shadow-md">
            Escolha sua Jornada Escolar
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-semibold">
            Selecione um episódio desbloqueado para iniciar ou reiniciar. Cada escolha tomada altera suas afinidades (Love-o-Meter), diálogos de chat e ilustrações finais desbloqueadas!
          </p>
        </div>

        {/* Catalog Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2"
        >
          {mockEpisodes.map((ep) => {
            const isUnlocked = unlockedEpisodes.includes(ep.id);
            const isActive = activeEpisodeId === ep.id;
            
            // Count CGs unlocked for this episode key prefix (e.g. ep1_ )
            const countUnlocked = unlockedCGs.filter(cg => cg.startsWith(`ep${ep.id}_`)).length;

            return (
              <EpisodeCard
                key={ep.id}
                episode={ep}
                isUnlocked={isUnlocked}
                isActive={isActive}
                unlockedCGsCount={countUnlocked}
                onPlay={handlePlayClick}
              />
            );
          })}
        </motion.div>
      </main>

      {/* Confirmation Warning Modal Dialog overlay */}
      <AnimatePresence>
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/60 backdrop-blur-xs select-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#16122d] border border-white/10 rounded-[28px] p-6 shadow-2xl flex flex-col gap-5 text-center relative"
            >
              {/* Alert icon header */}
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto text-amber-400">
                <AlertTriangle size={20} />
              </div>

              <div className="flex flex-col gap-2 text-left">
                <h3 className="text-lg font-black tracking-wide text-slate-100 text-center">
                  Tem certeza disso?
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-semibold text-center mt-1">
                  Mudar ou reiniciar o episódio atual irá **resetar todo o seu progresso de diálogos e PA** ativo para o estado inicial deste episódio! Suas ilustrações salvas (CGs) e relacionamentos anteriores não serão apagados.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-1">
                <button
                  onClick={() => setShowConfirmModal(false)}
                  className="flex-1 py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hover:text-white transition-all cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmSelect}
                  className="flex-1 py-3 px-4 bg-pink-500 hover:bg-pink-600 border border-pink-400/20 rounded-xl font-black text-xs uppercase tracking-wider text-white transition-all cursor-pointer"
                >
                  Confirmar e Jogar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
