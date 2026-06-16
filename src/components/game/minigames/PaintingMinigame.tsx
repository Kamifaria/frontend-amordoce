'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, Check, Eraser, PenLine, Wand2, Sun, Heart } from 'lucide-react';
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

interface Point { x: number; y: number }
interface Stroke { points: Point[]; color: string; size: number }

export const PaintingMinigame: React.FC = () => {
  const { endMinigame, savePainting } = useGameStore();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  
  // Para detecção de formas
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [currentStroke, setCurrentStroke] = useState<Stroke | null>(null);
  const [recognizedShape, setRecognizedShape] = useState<'sun' | 'heart' | null>(null);
  const [showMagicFeedback, setShowMagicFeedback] = useState(false);

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

  const getCanvasPoint = (e: React.PointerEvent<HTMLCanvasElement>): Point | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (recognizedShape) return; // Bloquear desenho se a magia já aconteceu
    
    const pt = getCanvasPoint(e);
    if (!pt) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(pt.x, pt.y);
    ctx.lineTo(pt.x, pt.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    setIsDrawing(true);
    setCurrentStroke({ points: [pt], color, size: brushSize });
    
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || recognizedShape) return;
    
    const pt = getCanvasPoint(e);
    if (!pt) return;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(pt.x, pt.y);
    ctx.stroke();

    if (currentStroke) {
      currentStroke.points.push(pt);
    }
  };

  const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.getContext('2d')?.closePath();
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    }

    if (currentStroke && currentStroke.points.length > 0) {
      setStrokes((prev) => [...prev, currentStroke]);
    }
    setCurrentStroke(null);
  };

  const identifyShape = () => {
    if (strokes.length === 0) return;

    // Heurística de Cores (Magical AI)
    let hasRedPink = false;
    let hasYellowOrange = false;

    strokes.forEach(s => {
      if (s.color === '#ef4444' || s.color === '#ec4899') hasRedPink = true;
      if (s.color === '#eab308' || s.color === '#f97316') hasYellowOrange = true;
    });

    let detected: 'sun' | 'heart' = 'heart'; // default
    if (hasYellowOrange && !hasRedPink) detected = 'sun';
    else if (hasRedPink && !hasYellowOrange) detected = 'heart';
    else {
      // Se não der pela cor, fazemos 50/50 ou escolhemos com base no total de pontos
      const totalPoints = strokes.reduce((acc, s) => acc + s.points.length, 0);
      detected = totalPoints % 2 === 0 ? 'sun' : 'heart';
    }

    setRecognizedShape(detected);
    setShowMagicFeedback(true);
    drawPerfectShape(detected);

    setTimeout(() => {
      setShowMagicFeedback(false);
    }, 3000);
  };

  const drawPerfectShape = (shape: 'sun' | 'heart') => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpar e preencher de branco
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);

    if (shape === 'heart') {
      // Desenhar coração perfeito
      ctx.beginPath();
      ctx.moveTo(0, 30);
      ctx.bezierCurveTo(0, -60, -100, -60, -100, 0);
      ctx.bezierCurveTo(-100, 70, 0, 130, 0, 180);
      ctx.bezierCurveTo(0, 130, 100, 70, 100, 0);
      ctx.bezierCurveTo(100, -60, 0, -60, 0, 30);
      ctx.fillStyle = '#ef4444';
      ctx.fill();
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#991b1b';
      ctx.stroke();
    } else {
      // Desenhar Sol perfeito
      ctx.beginPath();
      ctx.arc(0, 0, 80, 0, Math.PI * 2);
      ctx.fillStyle = '#eab308';
      ctx.fill();
      ctx.lineWidth = 6;
      ctx.strokeStyle = '#ca8a04';
      ctx.stroke();

      // Raios do Sol
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.rotate(Math.PI / 4);
        ctx.moveTo(0, 100);
        ctx.lineTo(0, 150);
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.stroke();
      }
    }

    ctx.restore();
  };

  const finishGame = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL('image/png');
      savePainting(dataUrl);
    }
    // Sucesso!
    endMinigame(100);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md overflow-hidden"
    >
      <div className="relative w-full h-full max-w-5xl md:max-h-[90vh] md:rounded-3xl border-[#1e1a3a] md:border-4 bg-gradient-to-br from-[#1b1736] to-[#0a0715] flex flex-col md:flex-row overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
        
        {/* Left Side: Canvas Area (O Cavalete Imersivo) */}
        <div className="flex-1 flex flex-col p-4 md:p-8 items-center justify-center relative bg-[url('/img/wood-texture.png')] bg-cover bg-center">
          
          <div className="absolute inset-0 bg-[#3a2212]/80 mix-blend-multiply pointer-events-none" />

          {/* Header on mobile */}
          <div className="md:hidden flex justify-between items-center w-full mb-4 z-10">
            <h2 className="text-white font-black text-xl flex items-center gap-2 drop-shadow-md">
              <Palette className="text-pink-400" /> Tela Viva
            </h2>
            <button
              onClick={finishGame}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-2 px-4 rounded-xl text-sm shadow-lg shadow-pink-500/30"
            >
              Salvar
            </button>
          </div>

          {/* O Cavalete em si */}
          <div className="relative shadow-[0_30px_60px_rgba(0,0,0,0.7)] border-[12px] border-[#5c3a21] rounded-lg bg-[#faedcd] p-0 z-10 w-full max-w-[500px] aspect-square flex items-center justify-center overflow-hidden">
            
            {/* Detalhes de madeira do cavalete (suportes) */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-4 h-14 bg-[#4a2e1b] z-[-1]" />
            <div className="absolute -bottom-16 left-[10%] w-6 h-20 bg-[#4a2e1b] z-[-1] origin-top rotate-12" />
            <div className="absolute -bottom-16 right-[10%] w-6 h-20 bg-[#4a2e1b] z-[-1] origin-top -rotate-12" />

            <canvas
              ref={canvasRef}
              width={800}
              height={800}
              className="w-full h-full bg-white cursor-crosshair touch-none"
              onPointerDown={startDrawing}
              onPointerMove={draw}
              onPointerUp={stopDrawing}
              onPointerOut={stopDrawing}
              onPointerCancel={stopDrawing}
            />

            {/* Animação Mágica Overlay */}
            <AnimatePresence>
              {showMagicFeedback && recognizedShape && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-sm pointer-events-none"
                >
                  <div className="bg-gradient-to-br from-pink-500 to-purple-600 text-white font-black text-3xl px-8 py-4 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.8)] flex items-center gap-3">
                    <Wand2 className="animate-spin-slow" />
                    Perfeito!
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side: Tools Palette */}
        <div className="w-full md:w-80 bg-[#120e24] p-6 flex flex-col gap-6 border-t md:border-t-0 md:border-l border-pink-500/20 overflow-y-auto relative z-10 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
          
          <div className="hidden md:flex flex-col mb-2">
            <h2 className="text-white font-black text-2xl flex items-center gap-2 drop-shadow-md">
              <Palette className="text-pink-400" /> Tela Viva
            </h2>
            <span className="text-sm font-medium text-slate-400 mt-1">
              Desenhe um Coração ou Sol. A inteligência mágica vai aperfeiçoá-lo.
            </span>
          </div>

          {/* Action Mágica */}
          <button 
            onClick={identifyShape}
            disabled={strokes.length === 0 || recognizedShape !== null}
            className={`w-full py-4 px-4 rounded-xl flex items-center justify-center gap-2 font-bold transition-all shadow-lg ${
              strokes.length > 0 && !recognizedShape
                ? 'bg-gradient-to-r from-amber-400 to-pink-500 text-white shadow-pink-500/40 hover:scale-105 animate-pulse' 
                : 'bg-white/5 text-slate-500 cursor-not-allowed'
            }`}
          >
            <Wand2 size={20} />
            Identificar Desenho
          </button>

          {/* Tools */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-pink-500/70 uppercase tracking-widest">Acessórios</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setColor('#000000')}
                className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-xl transition-all border ${color !== '#ffffff' ? 'bg-[#1a1630] border-pink-500 text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 'bg-[#1a1630]/50 border-white/5 text-slate-400 hover:bg-[#1a1630]'}`}
              >
                <PenLine size={20} />
                <span className="text-xs font-bold">Pincel</span>
              </button>
              <button 
                onClick={() => setColor('#ffffff')}
                className={`flex-1 flex flex-col items-center gap-2 py-3 rounded-xl transition-all border ${color === '#ffffff' ? 'bg-[#1a1630] border-white text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]' : 'bg-[#1a1630]/50 border-white/5 text-slate-400 hover:bg-[#1a1630]'}`}
              >
                <Eraser size={20} />
                <span className="text-xs font-bold">Borracha</span>
              </button>
            </div>
          </div>

          {/* Colors */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-pink-500/70 uppercase tracking-widest">Paleta de Tintas</h3>
            <div className="grid grid-cols-4 gap-3 bg-[#1a1630] p-4 rounded-2xl border border-white/5">
              {COLORS.filter(c => c !== '#ffffff').map(c => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`aspect-square rounded-full transition-transform border-4 shadow-lg ${color === c ? 'border-white scale-125 z-10' : 'border-transparent hover:scale-110 opacity-80 hover:opacity-100'}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          {/* Brush Size */}
          <div className="space-y-3 bg-[#1a1630] p-4 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-[10px] font-bold text-pink-500/70 uppercase tracking-widest">Espessura do Pincel</h3>
            </div>
            <input 
              type="range" 
              min="2" 
              max="50" 
              value={brushSize} 
              onChange={(e) => setBrushSize(parseInt(e.target.value))}
              className="w-full accent-pink-500 h-2 bg-[#0a0715] rounded-lg appearance-none cursor-pointer"
            />
            
            {/* Preview da ponta do pincel */}
            <div className="h-16 mt-4 flex items-center justify-center">
              <div 
                className="rounded-full transition-all shadow-inner"
                style={{ 
                  backgroundColor: color === '#ffffff' ? '#e2e8f0' : color, 
                  width: `${brushSize}px`, 
                  height: `${brushSize}px`,
                  boxShadow: color === '#ffffff' ? 'inset 0 2px 4px rgba(0,0,0,0.1)' : '0 4px 10px rgba(0,0,0,0.5)'
                }}
              />
            </div>
          </div>

          <button
            onClick={finishGame}
            className="hidden md:flex mt-auto bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black py-4 px-6 rounded-xl items-center justify-center gap-2 hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg shadow-pink-900/50 active:scale-95 border border-pink-400/50"
          >
            <Check size={20} /> Mostrar a Arte para Kami
          </button>
          
        </div>
      </div>
    </motion.div>
  );
};
