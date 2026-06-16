'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ShieldAlert, ArrowLeft, ArrowRight } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';

export const CastielEscapeGame: React.FC = () => {
  const { endMinigame } = useGameStore();
  const [position, setPosition] = useState(1); // 0 = Left, 1 = Center, 2 = Right
  const [obstacles, setObstacles] = useState<{ id: number; pos: number; y: number }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);

  const moveLeft = useCallback(() => setPosition(p => Math.max(0, p - 1)), []);
  const moveRight = useCallback(() => setPosition(p => Math.min(2, p + 1)), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') moveLeft();
      if (e.key === 'ArrowRight') moveRight();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveLeft, moveRight]);

  useEffect(() => {
    if (!isPlaying) return;

    let obstacleId = 0;
    
    // Spawn obstacles
    const spawnInterval = setInterval(() => {
      setObstacles(prev => [
        ...prev,
        { id: obstacleId++, pos: Math.floor(Math.random() * 3), y: -20 }
      ]);
    }, 1000);

    // Game loop
    const gameLoop = setInterval(() => {
      setObstacles(prev => {
        const next = prev.map(o => ({ ...o, y: o.y + 10 })); // Move down
        
        // Collision check
        const collides = next.some(o => o.y > 80 && o.y < 100 && o.pos === position);
        if (collides) {
          setIsPlaying(false);
          clearInterval(spawnInterval);
          clearInterval(gameLoop);
          setTimeout(() => endMinigame(0), 1500);
          return next;
        }

        // Filter out passed obstacles and update score
        const remaining = next.filter(o => o.y < 120);
        if (next.length > remaining.length) {
          setScore(s => {
            const newScore = s + 10;
            if (newScore >= 100) {
              setIsPlaying(false);
              clearInterval(spawnInterval);
              clearInterval(gameLoop);
              setTimeout(() => endMinigame(100), 1500);
            }
            return newScore;
          });
        }
        
        return remaining;
      });
    }, 50);

    return () => {
      clearInterval(spawnInterval);
      clearInterval(gameLoop);
    };
  }, [isPlaying, position, endMinigame]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md p-4"
    >
      <div className="flex flex-col items-center mb-6 z-10">
        <ShieldAlert className="text-red-500 w-10 h-10 mb-2" />
        <h2 className="text-2xl font-bold text-white">Fuga do Corredor</h2>
        <p className="text-red-200 mt-2 text-center max-w-sm">
          {!isPlaying && score === 0 
            ? "Ajude Castiel a desviar dos professores! Toque nas laterais para mover."
            : score >= 100 
            ? "Fuga Sucesso!"
            : "Você foi pego!"}
        </p>
        
        {!isPlaying && score === 0 && (
          <button 
            onClick={() => setIsPlaying(true)}
            className="mt-6 px-8 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-500"
          >
            Iniciar Fuga
          </button>
        )}
      </div>

      <div className="relative w-full max-w-sm h-96 bg-[#1a1625] border-x-4 border-[#2a243a] overflow-hidden flex perspective-500">
        {/* Pista Dividida em 3 faixas */}
        <div className="flex-1 border-r border-white/5" onClick={moveLeft}></div>
        <div className="flex-1 border-r border-white/5"></div>
        <div className="flex-1" onClick={moveRight}></div>

        {/* Player (Castiel's proxy) */}
        <motion.div 
          className="absolute bottom-10 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.5)] z-20"
          style={{ width: '33.33%' }}
          animate={{ x: `${position * 100}%` }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          <span className="text-2xl">🏃</span>
        </motion.div>

        {/* Obstacles (Teachers) */}
        {obstacles.map(obs => (
          <div 
            key={obs.id}
            className="absolute w-16 h-16 bg-blue-600 rounded flex items-center justify-center z-10 opacity-80"
            style={{ 
              width: '33.33%',
              left: `${obs.pos * 33.33}%`,
              top: `${obs.y}%`
            }}
          >
            <span className="text-2xl">👨‍🏫</span>
          </div>
        ))}
      </div>

      {/* Mobile Controls (Visual guide) */}
      <div className="w-full max-w-sm flex justify-between mt-6 px-4 md:hidden">
        <button onClick={moveLeft} className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white active:bg-white/20">
          <ArrowLeft />
        </button>
        <button onClick={moveRight} className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white active:bg-white/20">
          <ArrowRight />
        </button>
      </div>

    </motion.div>
  );
};
