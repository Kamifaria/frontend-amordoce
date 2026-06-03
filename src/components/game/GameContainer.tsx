'use client';

import React from 'react';

interface GameContainerProps {
  children: React.ReactNode;
}

export const GameContainer: React.FC<GameContainerProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-tr from-slate-950 via-[#120e24] to-purple-950 p-4">
      {/* 16:9 Aspect Ratio Game Board */}
      <div className="relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl border-4 border-pink-500/20 bg-black shadow-2xl shadow-pink-500/10">
        {children}
      </div>
    </div>
  );
};
