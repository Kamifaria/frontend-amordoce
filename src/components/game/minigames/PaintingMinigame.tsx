'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Check, Eraser, PenLine } from 'lucide-react';
import { useGameStore } from '../../../store/useGameStore';

const COLORS = [
  '#000000', // Black
  '#ffffff', // White (Eraser)
  '#ef4444', // Red
  '#f97316', // Orange
  '#eab308', // Yellow
  '#22c55e', // Green
  '#3b82f6', // Blue
  '#a855f7', // Purple
  '#ec4899', // Pink
];

export const PaintingMinigame: React.FC = () => {
  const { endMinigame, savePainting } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);

  useEffect(() => {
    // Initialize canvas with a white background
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    
    // Draw a dot immediately for taps
    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
    
    // Prevent scrolling on touch devices
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.closePath();
      }
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }
  };

  const finishGame = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      savePainting(dataUrl);
    }
    // End game and give 100 points (always success for free drawing)
    endMinigame(100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden"
    >
      <div className="relative w-full h-full max-w-4xl md:max-h-[90vh] md:rounded-3xl border-[#1e1a3a] md:border-4 bg-[#110e1a] flex flex-col md:flex-row overflow-hidden shadow-2xl">
        
        {/* Left Side: Canvas Area */}
        <div className="flex-1 flex flex-col p-6 items-center justify-center relative bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')] bg-[#2a221a]">
          {/* Header on mobile */}
          <div className="md:hidden flex justify-between items-center w-full mb-4">
            <h2 className="text-white font-black text-xl flex items-center gap-2">
              <Palette className="text-pink-400" /> Cavalete Livre
            </h2>
            <button
              onClick={finishGame}
              className="bg-pink-600 text-white font-bold py-2 px-4 rounded-xl text-sm"
            >
              Salvar
            </button>
          </div>

          <div className="relative shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-8 border-[#d4a373] rounded-lg bg-[#faedcd] p-2">
            <canvas
              ref={canvasRef}
              width={600}
              height={600}
              className="bg-white rounded cursor-crosshair max-w-full aspect-square touch-none"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerOut={stopDrawing}
              onPointerCancel={stopDrawing}
              style={{ width: '100%', height: 'auto', maxWidth: '500px' }}
            />
          </div>
        </div>

        {/* Right Side: Tools Palette */}
        <div className="w-full md:w-72 bg-[#1a1625] p-6 flex flex-col gap-6 border-t md:border-t-0 md:border-l border-white/5 overflow-y-auto">
          
          <div className="hidden md:flex flex-col mb-4">
            <h2 className="text-white font-black text-2xl flex items-center gap-2">
              <Palette className="text-pink-400" /> Cavalete
            </h2>
            <span className="text-sm font-medium text-slate-400">Pinte livremente. A Kami está observando sua arte!</span>
          </div>

          {/* Tools */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Ferramentas</h3>
            <div className="flex gap-3">
              <button 
                onClick={() => setColor('#000000')}
                className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-xl transition-all ${color !== '#ffffff' ? 'bg-pink-600 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                <PenLine size={20} />
                <span className="text-xs font-bold">Pincel</span>
              </button>
              <button 
                onClick={() => setColor('#ffffff')}
                className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-xl transition-all ${color === '#ffffff' ? 'bg-slate-200 text-slate-900' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
              >
                <Eraser size={20} />
                <span className="text-xs font-bold">Borracha</span>
              </button>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cores</h3>
            <div className="grid grid-cols-5 gap-2">
              {COLORS.filter(c => c !== '#ffffff').map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`aspect-square rounded-full shadow-inner transition-transform border-2 ${color === c ? 'border-white scale-110' : 'border-transparent hover:scale-105'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Brush Size */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Espessura</h3>
              <span className="text-xs font-bold text-slate-300 bg-white/10 px-2 py-0.5 rounded">{brushSize}px</span>
            </div>
            <input 
              type="range" 
              min="1" 
              max="40" 
              value={brushSize} 
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full accent-pink-500 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
            />
            
            {/* Preview */}
            <div className="h-16 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center overflow-hidden">
              <div 
                className="rounded-full transition-all"
                style={{ 
                  backgroundColor: color, 
                  width: `${brushSize}px`, 
                  height: `${brushSize}px`,
                  border: color === '#ffffff' ? '1px solid #ccc' : 'none'
                }}
              />
            </div>
          </div>

          <button
            onClick={finishGame}
            className="hidden md:flex mt-auto bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black py-4 px-6 rounded-xl items-center justify-center gap-2 hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg shadow-pink-900/50 active:scale-95"
          >
            <Check size={20} /> Salvar e Mostrar a Kami
          </button>
          
        </div>
      </div>
    </motion.div>
  );
};
