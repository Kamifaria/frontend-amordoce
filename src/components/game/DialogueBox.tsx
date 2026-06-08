'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';

interface DialogueBoxProps {
  speakerName: string;
  text: string;
  onAdvance: () => void;
  isChoiceActive: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speakerName,
  text,
  onAdvance,
  isChoiceActive,
}) => {
  const [prevText, setPrevText] = useState(text);
  const [displayedText, setDisplayedText] = useState('');
  const textIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  
  const playSound = useGameStore((state) => state.playSound);

  // Synchronize text changes during the render phase
  if (text !== prevText) {
    setPrevText(text);
    setDisplayedText('');
  }

  const isTyping = displayedText.length < text.length;

  // Restart typewriter effect whenever dialogue text changes
  useEffect(() => {
    textIndexRef.current = 0;
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const speed = 22; // 22ms per character (slightly faster for smoother feel)

    timerRef.current = setInterval(() => {
      if (textIndexRef.current < text.length) {
        const nextChar = text.charAt(textIndexRef.current);
        setDisplayedText((prev) => prev + nextChar);
        textIndexRef.current += 1;
        
        // Play typewriter tick sound, skipping empty spaces
        if (nextChar !== ' ') {
          playSound('tick');
        }
      } else {
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text, playSound]);

  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid double triggers if click is registered at parent container

    if (isChoiceActive) {
      return;
    }

    if (isTyping) {
      // Skip typewriter effect, reveal text instantly
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayedText(text);
      playSound('click');
    } else {
      // Advance to next dialogue node
      onAdvance();
    }
  };

  // Check if narrator or system dialogue
  const isNarrator = !speakerName || speakerName.toLowerCase() === 'narrador' || speakerName.toLowerCase() === 'sistema';

  return (
    <div 
      onClick={handleBoxClick}
      className="absolute bottom-4 left-1/2 z-20 w-[95%] -translate-x-1/2 cursor-pointer select-none rounded-2xl border border-pink-500/35 bg-[#120e24]/85 p-5 shadow-[0_0_25px_rgba(219,39,119,0.15)] shadow-black/60 backdrop-blur-md transition-all hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(219,39,119,0.25)]"
    >
      {/* Speaker Tag */}
      {!isNarrator && (
        <div className="absolute -top-4 left-6 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 px-5 py-1 font-bold text-white text-xs shadow-[0_4px_12px_rgba(219,39,119,0.3)] border border-white/10 tracking-widest uppercase">
          {speakerName}
        </div>
      )}

      {/* Narrative/Speech Area */}
      <div className={`mt-1.5 min-h-[55px] text-slate-100 text-sm leading-relaxed ${isNarrator ? 'italic text-pink-200/90 font-medium' : ''}`}>
        {displayedText}
      </div>

      {/* Advance Indicator (Blinking Chevron) */}
      {!isTyping && !isChoiceActive && (
        <div className="absolute bottom-3.5 right-6 flex items-center gap-1.5 text-pink-400 font-bold text-[10px] uppercase tracking-widest animate-pulse">
          Avançar
          <ChevronRight size={14} className="animate-bounce" />
        </div>
      )}
    </div>
  );
};
