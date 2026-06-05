'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';

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
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const textIndexRef = useRef(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Restart typewriter effect whenever dialogue text changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsTyping(true);
    setDisplayedText('');
    textIndexRef.current = 0;
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    const speed = 25; // 25ms per character

    timerRef.current = setInterval(() => {
      if (textIndexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(textIndexRef.current));
        textIndexRef.current += 1;
      } else {
        setIsTyping(false);
        if (timerRef.current) clearInterval(timerRef.current);
      }
    }, speed);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [text]);

  const handleBoxClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid double triggers if click is registered at parent container

    if (isChoiceActive) {
      // Ignore click-to-advance if decision overlay is active
      return;
    }

    if (isTyping) {
      // Skip typewriter effect, reveal text instantly
      if (timerRef.current) clearInterval(timerRef.current);
      setDisplayedText(text);
      setIsTyping(false);
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
      className="absolute bottom-4 left-1/2 z-20 w-[95%] -translate-x-1/2 cursor-pointer select-none rounded-xl border border-pink-500/30 bg-[#120e24]/85 p-5 shadow-lg shadow-black/60 backdrop-blur-md transition-all hover:border-pink-500/50"
    >
      {/* Speaker Tag */}
      {!isNarrator && (
        <div className="absolute -top-4 left-6 rounded-lg bg-gradient-to-r from-pink-500 to-purple-600 px-4 py-1 font-bold text-white text-sm shadow-md tracking-wider">
          {speakerName}
        </div>
      )}

      {/* Narrative/Speech Area */}
      <div className={`mt-1 min-h-[60px] text-slate-100 text-base leading-relaxed ${isNarrator ? 'italic text-pink-200/90 font-medium' : ''}`}>
        {displayedText}
      </div>

      {/* Advance Indicator (Blinking Chevron) */}
      {!isTyping && !isChoiceActive && (
        <div className="absolute bottom-3 right-4 flex items-center gap-1 text-pink-400 font-semibold text-xs uppercase tracking-widest blink-arrow">
          Avançar
          <ChevronRight size={16} />
        </div>
      )}
    </div>
  );
};
