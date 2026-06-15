'use client';

import React, { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/useGameStore';

export const AudioController: React.FC = () => {
  const currentView = useGameStore((state) => state.currentView);
  const currentSpeaker = useGameStore((state) => state.currentSpeaker);
  const activeMinigame = useGameStore((state) => state.activeMinigame);
  const isMuted = useGameStore((state) => state.isMuted);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentSrcRef = useRef<string | null>(null);

  useEffect(() => {
    // Determine the desired track
    let desiredSrc: string | null = null;

    if (currentView === 'lobby') {
      desiredSrc = '/audio/Tema-lobby.mp3';
    } else if (currentView === 'episode' && currentSpeaker?.toLowerCase() === 'kami') {
      desiredSrc = '/audio/Tema-kami.mp3';
    }

    // Pause BGM if minigame is active or game is muted
    if (activeMinigame || isMuted) {
      desiredSrc = null;
    }

    // If we need to change tracks or stop
    if (desiredSrc !== currentSrcRef.current) {
      // Pause current
      if (audioRef.current) {
        audioRef.current.pause();
      }

      // Start new if exists
      if (desiredSrc) {
        const audio = new Audio(desiredSrc);
        audio.loop = true;
        audio.volume = 0.3; // BGM should be slightly quieter
        audio.play().catch(e => console.warn('BGM Auto-play prevented', e));
        audioRef.current = audio;
      } else {
        audioRef.current = null;
      }

      currentSrcRef.current = desiredSrc;
    } else if (audioRef.current && isMuted) {
       // if we are already playing but just got muted
       audioRef.current.pause();
       currentSrcRef.current = null;
    }
  }, [currentView, currentSpeaker, activeMinigame, isMuted]);

  return null; // This component has no UI
};
