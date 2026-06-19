import React, { useState, useEffect } from 'react';
import { PianoKeyboard } from './PianoKeyboard';
import { SheetMusicTab } from './SheetMusicTab';
import { useGameStore } from '../../../store/useGameStore';
import { availableSheetMusic } from './pianoKeysData';

interface VeronicaPianoProps {
  onClose: () => void;
}

export const VeronicaPiano: React.FC<VeronicaPianoProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'keyboard' | 'sheetMusic'>('keyboard');
  const [showSecretDialog, setShowSecretDialog] = useState(false);
  const [showOrientationWarning, setShowOrientationWarning] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState<string | null>('melody_demi');
  
  // Expose unlock function for testing the UI
  const unlockSheetMusic = useGameStore(state => state.unlockSheetMusic);
  const setIsPianoActive = useGameStore(state => state.setIsPianoActive);

  useEffect(() => {
    setIsPianoActive(true);
    
    const checkOrientation = () => {
      if (window.innerWidth < 768 && window.innerHeight > window.innerWidth) {
        setShowOrientationWarning(true);
      } else {
        setShowOrientationWarning(false);
      }
    };
    
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    
    return () => {
      setIsPianoActive(false);
      window.removeEventListener('resize', checkOrientation);
    };
  }, [setIsPianoActive]);

  const handleSecretTrigger = () => {
    setShowSecretDialog(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-0 md:p-4">
      {showOrientationWarning && (
        <div className="absolute inset-0 z-[60] bg-zinc-900 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-20 h-20 mb-6 relative animate-bounce">
            <div className="w-12 h-20 border-4 border-white rounded-xl absolute top-0 left-1/2 -translate-x-1/2 rotate-90 transition-transform duration-1000"></div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Vire o seu celular!</h2>
          <p className="text-zinc-400 max-w-xs">
            Para ter o teclado completo do piano e a melhor experiência, use o celular na horizontal.
          </p>
          <button 
            onClick={() => setShowOrientationWarning(false)}
            className="mt-8 px-6 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold"
          >
            Continuar mesmo assim
          </button>
        </div>
      )}
      
      <div className="bg-zinc-800 md:rounded-xl shadow-2xl w-full h-[100dvh] md:h-auto md:max-w-4xl overflow-hidden border border-zinc-700 flex flex-col relative">
        
        {/* Header */}
        <div className="bg-zinc-900 p-4 border-b border-zinc-700 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-white font-serif">O Piano da Veronica</h2>
            
            <div className="flex bg-zinc-800 rounded-lg p-1 gap-1">
              <button 
                onClick={() => setActiveTab('keyboard')}
                className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === 'keyboard' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Teclado
              </button>
              <button 
                onClick={() => setActiveTab('sheetMusic')}
                className={`px-4 py-1 rounded-md text-sm font-medium transition-colors ${activeTab === 'sheetMusic' ? 'bg-amber-600 text-white' : 'text-gray-400 hover:text-white'}`}
              >
                Partituras
              </button>
            </div>
          </div>
          
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 bg-zinc-800 min-h-[400px] flex flex-col">
          {activeTab === 'keyboard' ? (
            <div className="flex-1 flex flex-col relative">
              <div className="flex justify-between items-start mb-2 px-2">
                <p className="text-indigo-200 text-xs md:text-sm max-w-md">
                  Descubra segredos através das notas musicais!
                  <span className="block md:hidden mt-1 text-[10px] text-amber-500/70">Arraste para os lados para ver as teclas</span>
                </p>
                <select 
                  className="bg-zinc-900 border border-zinc-700 text-amber-400 text-xs rounded p-1 outline-none"
                  value={selectedSongId || ''}
                  onChange={(e) => setSelectedSongId(e.target.value || null)}
                >
                  <option value="">(Tocar livremente)</option>
                  {availableSheetMusic.map(sm => (
                    <option key={sm.id} value={sm.id}>{sm.title}</option>
                  ))}
                </select>
              </div>
              
              <PianoKeyboard onSecretTrigger={handleSecretTrigger} selectedSongId={selectedSongId} />
              
              <div className="mt-auto flex justify-center">
                {/* For testing only - unlock a melody */}
                <button 
                  onClick={() => unlockSheetMusic('melody_veronica_theme')}
                  className="text-xs text-zinc-500 hover:text-zinc-400 border border-zinc-600 px-2 py-1 rounded transition-colors"
                >
                  [Dev] Desbloquear Tema da Veronica
                </button>
                <button 
                  onClick={() => unlockSheetMusic('melody_secret')}
                  className="text-xs text-zinc-500 hover:text-zinc-400 border border-zinc-600 px-2 py-1 rounded transition-colors ml-2"
                >
                  [Dev] Desbloquear Melodia Secreta
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">
              <SheetMusicTab />
            </div>
          )}
        </div>

        {/* Secret Easter Egg Dialog */}
        {showSecretDialog && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-50 p-6 backdrop-blur-sm">
            <div className="bg-amber-100 rounded-lg p-6 max-w-md w-full border-2 border-amber-300 shadow-2xl animate-fade-in-up">
              <h3 className="text-2xl font-serif text-amber-900 mb-2 flex items-center gap-2">
                <span>✨</span> Uma lembrança antiga...
              </h3>
              <p className="text-amber-800 mb-6 italic border-l-4 border-amber-400 pl-4 py-2">
                &quot;Você tocou a melodia secreta! Veronica sorri nostálgica, lembrando de um momento especial do passado.&quot;
              </p>
              <button 
                onClick={() => setShowSecretDialog(false)}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white py-2 rounded font-bold transition-colors shadow-md"
              >
                Voltar a tocar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
