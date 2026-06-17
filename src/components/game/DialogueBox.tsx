'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { useGameStore } from '@/store/useGameStore';
import { Choice } from '@/shared/types';

interface DialogueBoxProps {
  speakerName: string;
  text: string;
  onAdvance: () => void;
  isChoiceActive: boolean;
  choices?: Choice[];
  onSelectChoice?: (choice: Choice) => void;
  playerPA?: number;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  speakerName,
  text,
  onAdvance,
  isChoiceActive,
  choices,
  onSelectChoice,
  playerPA = 100,
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
      className="absolute bottom-0 md:bottom-4 left-1/2 z-20 w-full md:w-[95%] -translate-x-1/2 cursor-pointer select-none rounded-none rounded-t-2xl md:rounded-2xl border border-b-0 md:border-b border-pink-500/35 bg-[#120e24]/97 md:bg-[#120e24]/85 shadow-[0_0_25px_rgba(219,39,119,0.15)] shadow-black/60 backdrop-blur-md transition-all hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(219,39,119,0.25)] overflow-hidden flex flex-col"
      style={{ maxHeight: isChoiceActive ? '70dvh' : '38dvh' }}
    >
      {/* Speaker Tag */}
      {!isNarrator && (
        <div className="absolute -top-4 left-4 md:left-6 rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-600 px-4 md:px-5 py-1 font-bold text-white text-[10px] md:text-xs shadow-[0_4px_12px_rgba(219,39,119,0.3)] border border-white/10 tracking-widest uppercase z-30">
          {speakerName}
        </div>
      )}

      {/* Speech text area — scrolls only if very long */}
      <div className="overflow-y-auto px-5 pt-4 md:p-5 pb-2 mt-1 shrink-0">
        <div className={`min-h-[48px] md:min-h-[70px] text-slate-100 text-[14px] md:text-[17px] leading-relaxed ${isNarrator ? 'italic text-pink-200/90 font-medium' : ''}`}>
          {displayedText}
        </div>
      </div>

      {/* Choice Buttons — separate scrollable area so they are always accessible */}
      {isChoiceActive && !isTyping && choices && onSelectChoice && (
        <div className="overflow-y-auto flex-1 px-5 pb-safe-or-5 pb-5 pt-1 flex flex-col gap-2 pointer-events-auto border-t border-pink-500/15 mt-1">
          {choices.map((choice, index) => {
            const hasEnoughPA = playerPA >= choice.costPA;
            return (
              <button
                key={index}
                disabled={!hasEnoughPA}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectChoice(choice);
                }}
                className={`w-full text-left px-4 py-3 rounded-xl border text-xs md:text-sm font-semibold flex justify-between items-start gap-3 transition-all active:scale-[0.98] ${
                  hasEnoughPA
                    ? 'cursor-pointer border-pink-500/30 bg-white/5 hover:bg-pink-500/10 hover:border-pink-500/60 text-slate-100'
                    : 'cursor-not-allowed border-red-500/15 bg-red-950/10 text-slate-500'
                }`}
              >
                <span className="flex-1 leading-snug">{choice.text}</span>
                <span className="shrink-0 text-[10px] font-bold bg-pink-500/15 text-pink-300 px-2.5 py-1 rounded-full border border-pink-500/15 self-start">
                  {choice.costPA > 0 ? `${choice.costPA} PA` : 'Grátis'}
                </span>
              </button>
            );
          })}
          {/* Safe area spacer for notched phones */}
          <div className="h-2 shrink-0" />
        </div>
      )}

      {/* Advance Indicator (Blinking Chevron) */}
      {!isTyping && !isChoiceActive && (
        <div className="px-5 pb-3 flex justify-end items-center gap-1.5 text-pink-400 font-bold text-[9px] uppercase tracking-widest animate-pulse shrink-0">
          Avançar
          <ChevronRight size={12} className="animate-bounce" />
        </div>
      )}
    </div>
  );
};
