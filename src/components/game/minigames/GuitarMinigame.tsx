'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, X, Heart, Star } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';

interface Chord {
  id: string;
  x: number; // percentage 10-90
  y: number; // percentage 20-80
  label: string;
}

const SONG_DURATION = 90; // 1:30 minutos
const AUDIO_SRC = '/audio/Harry Styles - As It Was (Official Video).mp3';

export const GuitarMinigame: React.FC = () => {
  const { endMinigame } = useGameStore();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(SONG_DURATION);
  const [gameState, setGameState] = useState<'playing' | 'finished'>('playing');
  const [activeChords, setActiveChords] = useState<Chord[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioRef.current = new Audio(AUDIO_SRC);
    audioRef.current.volume = 0.5;
    
    // Play automatically
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('Auto-play prevent default for audio, user interaction might be needed', err);
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

    // Timer countdown
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

    // Spawner: Every 1.5 seconds, spawn a new chord
    const spawnInterval = setInterval(() => {
      const labels = ['C', 'G', 'D', 'Am', 'Em', 'F'];
      const newChord: Chord = {
        id: Math.random().toString(36).substring(2, 9),
        x: 10 + Math.random() * 80, // 10% to 90%
        y: 20 + Math.random() * 60, // 20% to 80%
        label: labels[Math.floor(Math.random() * labels.length)],
      };

      setActiveChords((prev) => {
        // Keep max 5 chords on screen at a time
        const next = [...prev, newChord];
        if (next.length > 5) return next.slice(next.length - 5);
        return next;
      });

      // Automatically remove this chord after 2.5 seconds if not clicked (miss)
      setTimeout(() => {
        setActiveChords((current) => current.filter((c) => c.id !== newChord.id));
      }, 2500);

    }, 1200);

    return () => {
      clearInterval(timerInterval);
      clearInterval(spawnInterval);
    };
  }, [gameState]);

  // Handle chord tap
  const handleTap = (id: string) => {
    if (gameState !== 'playing') return;
    
    // Remove the chord that was tapped
    setActiveChords((prev) => prev.filter((c) => c.id !== id));
    
    // Increase score
    setScore((s) => s + 10);
  };

  const finishGame = () => {
    endMinigame(score);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden"
    >
      <div className="relative w-full h-full max-w-lg md:max-h-[90vh] md:rounded-3xl border-[#1e1a3a] md:border-4 bg-gradient-to-b from-[#120e24] to-[#0a0715] flex flex-col overflow-hidden shadow-2xl">
        
        {/* HUD */}
        <div className="flex justify-between items-center p-6 z-10 bg-black/40 border-b border-white/10 shrink-0">
          <div className="flex flex-col">
            <span className="text-white font-black text-3xl tracking-wider">{score} pts</span>
            <span className="text-sm font-bold text-pink-400">Toque nos Acordes!</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-slate-300 text-sm font-bold">Tempo</span>
            <span className={`text-2xl font-black ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
              0{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        {/* Play Area */}
        <div className="flex-1 relative w-full h-full p-4 overflow-hidden touch-none select-none">
          {/* Background Decor */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Music size={200} />
          </div>

          <AnimatePresence>
            {activeChords.map((chord) => (
              <motion.button
                key={chord.id}
                initial={{ scale: 0, opacity: 0, rotate: -30 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                exit={{ scale: 0, opacity: 0, rotate: 30 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={() => handleTap(chord.id)}
                onTouchStart={(e) => {
                  e.preventDefault(); // prevent double tap zoom/click
                  handleTap(chord.id);
                }}
                className="absolute w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 shadow-[0_0_20px_rgba(236,72,153,0.6)] flex items-center justify-center active:scale-90 transition-transform z-10"
                style={{
                  left: `${chord.x}%`,
                  top: `${chord.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                <div className="flex flex-col items-center">
                  <Heart size={24} className="text-white fill-white mb-1 opacity-50" />
                  <span className="text-white font-bold text-2xl drop-shadow-md">{chord.label}</span>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>

        {/* Finished Overlay */}
        {gameState === 'finished' && (
          <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center"
            >
              <Music size={64} className="text-pink-400 mb-4" />
              <h2 className="text-4xl font-black text-white mb-2">Música Finalizada!</h2>
              <p className="text-slate-300 mb-8 font-medium text-lg">O Harry curtiu o seu estilo!</p>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 w-full max-w-xs mb-10 shadow-lg">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-slate-400 text-lg uppercase tracking-widest font-bold">Sua Pontuação</span>
                  <span className="text-pink-400 font-black text-6xl drop-shadow-[0_0_15px_rgba(236,72,153,0.5)]">
                    {score}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={finishGame}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-4 px-10 rounded-2xl shadow-lg shadow-pink-500/20 text-lg tracking-wide uppercase"
              >
                Continuar História
              </motion.button>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
