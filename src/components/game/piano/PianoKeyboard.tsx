import React, { useEffect, useState, useCallback, useRef } from 'react';
import { pianoKeysData, availableSheetMusic } from './pianoKeysData';

const NOTE_FREQUENCIES: Record<string, number> = {
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63,
  'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00,
  'A#4': 466.16, 'B4': 493.88, 'C5': 523.25, 'C#5': 554.37, 'D5': 587.33,
  'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99
};

let audioCtx: AudioContext | null = null;

const playNoteAudio = (noteName: string) => {
  if (typeof window === 'undefined') return;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;

  if (!audioCtx) audioCtx = new AudioContextClass();
  if (audioCtx.state === 'suspended') audioCtx.resume();

  const freq = NOTE_FREQUENCIES[noteName];
  if (!freq) return;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  // Piano-like synth
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
  
  // Envelope
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.05); // Attack
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.5); // Decay/Release

  osc.connect(gain);
  gain.connect(audioCtx.destination);
  
  osc.start();
  osc.stop(audioCtx.currentTime + 1.5);
};

export const PianoKeyboard: React.FC<{ onSecretTrigger: () => void }> = ({ onSecretTrigger }) => {
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const playedSequence = useRef<string[]>([]);

  const playNote = useCallback((noteName: string) => {
    setActiveKeys((prev) => new Set(prev).add(noteName));
    playNoteAudio(noteName);

    // Track sequence for easter egg
    playedSequence.current.push(noteName);
    if (playedSequence.current.length > 20) {
      playedSequence.current.shift(); // Keep last 20 notes
    }

    // Check easter egg (e.g. Secret Melody)
    const secretMelody = availableSheetMusic.find(sm => sm.id === 'melody_secret');
    if (secretMelody) {
      const len = secretMelody.notes.length;
      if (playedSequence.current.length >= len) {
        const recent = playedSequence.current.slice(-len);
        if (recent.join(',') === secretMelody.notes.join(',')) {
          onSecretTrigger();
          playedSequence.current = []; // Reset after trigger
        }
      }
    }

    setTimeout(() => {
      setActiveKeys((prev) => {
        const next = new Set(prev);
        next.delete(noteName);
        return next;
      });
    }, 200);
  }, [onSecretTrigger]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return; // Prevent continuous trigger
      const keyData = pianoKeysData.find(k => k.keyboardBinding === e.key.toLowerCase());
      if (keyData) {
        playNote(keyData.note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playNote]);

  return (
    <div className="relative flex justify-start md:justify-center mt-10 mb-8 select-none overflow-x-auto pb-6 w-full max-w-[100vw] custom-scrollbar px-4">
      <div className="flex relative bg-zinc-900 p-4 rounded-b-xl rounded-t-sm shadow-2xl border-t-8 border-zinc-800 min-w-max">
        {pianoKeysData.filter(k => k.type === 'white').map((keyData, idx) => (
          <div
            key={keyData.note}
            onMouseDown={() => playNote(keyData.note)}
            onTouchStart={() => playNote(keyData.note)}
            className={`w-10 sm:w-12 h-32 sm:h-40 bg-white border border-gray-300 rounded-b-md shadow-sm mx-[1px] relative cursor-pointer active:bg-gray-200 transition-colors duration-75 flex flex-col justify-end pb-2 items-center text-[10px] sm:text-xs font-bold ${activeKeys.has(keyData.note) ? 'bg-gray-200 shadow-inner translate-y-1' : ''}`}
          >
            <span className="text-gray-400 mb-1">{keyData.keyboardBinding.toUpperCase()}</span>
            <span className="text-gray-800">{keyData.note.replace(/[0-9]/g, '')}</span>
          </div>
        ))}
        
        {/* Black keys (absolutely positioned over whites) */}
        <div className="absolute top-4 left-4 flex pointer-events-none">
          {pianoKeysData.filter(k => k.type === 'white').map((whiteKey, idx, arr) => {
            // Find if there's a black key that comes immediately after this white key
            const whiteIndexInAll = pianoKeysData.findIndex(k => k.note === whiteKey.note);
            const nextKey = pianoKeysData[whiteIndexInAll + 1];
            
            return (
              <div key={`spacer-${idx}`} className="w-[42px] sm:w-[50px] relative h-full flex justify-end">
                {nextKey && nextKey.type === 'black' && (
                  <div
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      playNote(nextKey.note);
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      playNote(nextKey.note);
                    }}
                    className={`absolute -right-2 sm:-right-3 top-0 w-5 sm:w-6 h-20 sm:h-24 bg-black border border-zinc-800 rounded-b shadow-lg z-10 cursor-pointer pointer-events-auto flex flex-col justify-end items-center pb-2 text-[8px] sm:text-[10px] text-white font-bold transition-transform duration-75 ${activeKeys.has(nextKey.note) ? 'bg-zinc-800 shadow-inner translate-y-1' : ''}`}
                  >
                    <span className="text-gray-400">{nextKey.keyboardBinding.toUpperCase()}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
