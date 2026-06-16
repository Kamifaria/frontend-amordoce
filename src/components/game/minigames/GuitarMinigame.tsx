'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Heart } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';

interface Chord {
  id: string;
  x: number; // percentage 10-90
  stringIndex: number; // 0 to 3 (4 strings)
  label: string;
}

const SONG_DURATION = 35; // Reduzido para melhor ritmo
const AUDIO_SRC = '/audio/Harry Styles - As It Was (Official Video).mp3';
const STRING_COUNT = 4;

export const GuitarMinigame: React.FC = () => {
  const { endMinigame } = useGameStore();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SONG_DURATION);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [activeChords, setActiveChords] = useState<Chord[]>([]);
  const [vibratingStrings, setVibratingStrings] = useState<Record<number, boolean>>({});
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio(AUDIO_SRC);
    audioRef.current.volume = 0.5;
    
    // Play automatically
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Auto-play prevent default for audio', err);
      });
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  // Timer & Spawner
  useEffect(() => {
    if (gameState !== 'playing') return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('finished');
          if (audioRef.current) audioRef.current.pause();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const spawnInterval = setInterval(() => {
      const labels = ['C', 'G', 'D', 'Am', 'Em', 'F'];
      const newChord: Chord = {
        id: Math.random().toString(36).substring(2, 9),
        x: 15 + Math.random() * 70, // 15% to 85%
        stringIndex: Math.floor(Math.random() * STRING_COUNT),
        label: labels[Math.floor(Math.random() * labels.length)],
      };

      setActiveChords((prev) => {
        const next = [...prev, newChord];
        if (next.length > 5) return next.slice(next.length - 5);
        return next;
      });

      setTimeout(() => {
        setActiveChords((current) => current.filter((c) => c.id !== newChord.id));
      }, 2500);

    }, 1000); // Ligeiramente mais rápido

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
    };
  }, [gameState]);

  // Handle chord tap
  const handleTap = (id: string, stringIndex: number) => {
    if (gameState !== 'playing') return;
    
    // Remover o acorde tocado
    setActiveChords((prev) => prev.filter((c) => c.id !== id));
    
    // Aumentar pontuação
    setScore((s) => s + 10);

    // Ativar vibração na corda
    setVibratingStrings((prev) => ({ ...prev, [stringIndex]: true }));
    setTimeout(() => {
      setVibratingStrings((prev) => ({ ...prev, [stringIndex]: false }));
    }, 300); // Duração da vibração
  };

  const finishGame = () => {
    endMinigame(score);
  };

  return (
    <motion.div 
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 200, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute bottom-0 left-0 right-0 z-[100] h-64 md:h-72 bg-gradient-to-t from-black/95 to-black/80 backdrop-blur-md border-t-4 border-[#3b2d59] shadow-[0_-10px_40px_rgba(0,0,0,0.5)] flex flex-col"
    >
      {/* HUD Minimizado */}
      <div className="flex justify-between items-center px-6 py-2 bg-black/40 border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="text-pink-400 font-bold text-xl tracking-wider">Pontos: {score}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-300 text-sm font-bold">Tempo:</span>
          <span className={`text-xl font-black ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
            0{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* Play Area (Braço do Violão) */}
      <div className="flex-1 relative w-full h-full py-4 overflow-hidden touch-none select-none flex flex-col justify-evenly px-4 md:px-12 bg-[url('/img/wood-texture.png')] bg-cover bg-center">
        {/* Overlay escuro pro violão */}
        <div className="absolute inset-0 bg-[#2a1708]/80 mix-blend-multiply pointer-events-none" />

        {/* Cordas */}
        {Array.from({ length: STRING_COUNT }).map((_, i) => (
          <div key={i} className="relative w-full h-2 flex items-center z-0">
            {/* A linha visual da corda */}
            <motion.div 
              animate={
                vibratingStrings[i] 
                  ? { y: [0, -4, 4, -2, 2, 0], filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'] } 
                  : { y: 0, filter: 'blur(0px)' }
              }
              transition={{ duration: 0.3 }}
              className="w-full h-[3px] bg-gradient-to-b from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
            />
          </div>
        ))}

        {/* Acordes */}
        <AnimatePresence>
          {activeChords.map((chord) => {
            // Calcular posição Y exata com base no stringIndex
            // Como usamos justify-evenly, as cordas estão distribuídas.
            // A posição da corda i em um container com justify-evenly e STRING_COUNT cordas é algo próximo a:
            const topPercent = (100 / (STRING_COUNT + 1)) * (chord.stringIndex + 1);

            return (
              <motion.button
                key={chord.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => handleTap(chord.id, chord.stringIndex)}
                onTouchStart={(e) => {
                  e.preventDefault();
                  handleTap(chord.id, chord.stringIndex);
                }}
                className="absolute w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_15px_rgba(236,72,153,0.8)] flex items-center justify-center active:scale-90 transition-transform z-10 border-2 border-white/20"
                style={{
                  left: `${chord.x}%`,
                  top: `calc(${topPercent}% - 28px)`, // centralizar no eixo Y (28px = metade do h-14)
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-white font-black text-xl md:text-2xl drop-shadow-md">{chord.label}</span>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Finished Overlay */}
      {gameState === 'finished' && (
        <div className="absolute inset-0 z-20 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center border-t-4 border-pink-500">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center w-full"
          >
            <h2 className="text-3xl md:text-4xl font-black text-white mb-2 flex items-center gap-3">
              <Music className="text-pink-400" />
              Música Finalizada!
            </h2>
            
            <div className="bg-white/10 border border-white/20 rounded-xl p-4 my-4 flex items-center gap-6">
              <div className="text-slate-300 text-lg uppercase tracking-widest font-bold">Pontuação</div>
              <div className="text-pink-400 font-black text-5xl drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                {score}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={finishGame}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 px-8 rounded-xl shadow-lg shadow-pink-500/20 text-lg tracking-wide uppercase mt-2"
            >
              Continuar História
            </motion.button>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};
