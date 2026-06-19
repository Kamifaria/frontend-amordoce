import React from 'react';
import { useGameStore } from '../../../store/useGameStore';
import { availableSheetMusic } from './pianoKeysData';

export const SheetMusicTab: React.FC = () => {
  const unlockedSheetMusic = useGameStore(state => state.unlockedSheetMusic);
  
  const unlockedMelodies = availableSheetMusic.filter(sm => unlockedSheetMusic.includes(sm.id));

  if (unlockedMelodies.length === 0) {
    return (
      <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200 text-center text-amber-800 my-4 max-w-lg mx-auto shadow-inner">
        <h3 className="text-lg font-serif italic mb-2">Sem partituras...</h3>
        <p className="text-sm">Você ainda não encontrou nenhuma partitura. Jogue minigames e explore para encontrar novas melodias!</p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 p-6 rounded-lg border-2 border-amber-200 my-4 max-w-2xl mx-auto shadow-inner">
      <h3 className="text-xl font-serif text-amber-900 border-b-2 border-amber-200 pb-2 mb-4">Minhas Partituras</h3>
      
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
        {unlockedMelodies.map(melody => (
          <div key={melody.id} className="bg-white p-4 rounded border border-amber-100 shadow-sm flex flex-col gap-2">
            <h4 className="font-serif font-bold text-amber-800 text-lg flex items-center gap-2">
              <span className="text-2xl">🎵</span> {melody.title}
            </h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {melody.notes.map((note, idx) => (
                <span key={idx} className="bg-amber-100 text-amber-900 px-3 py-1 rounded-full font-bold shadow-sm border border-amber-200">
                  {note.replace(/[0-9]/g, '')}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
