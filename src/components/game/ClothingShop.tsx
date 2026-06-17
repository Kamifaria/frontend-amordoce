'use client';

import React from 'react';
import { X, ShoppingBag, Coins, Check } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { motion } from 'framer-motion';

interface ShopItem {
  id: string;
  name: string;
  category: 'Cabelos' | 'Blusas' | 'Saias/Calças';
  preview: string;
  price: number;
}

const SHOP_ITEMS: ShopItem[] = [
  { id: 'short-black-grunge', name: 'Curto Preto Grunge', category: 'Cabelos', preview: '🖤', price: 30 },
  { id: 'punk-braids', name: 'Tranças Punk', category: 'Cabelos', preview: '💈', price: 40 },
  { id: 'leather-spikes', name: 'Couro com Spikes', category: 'Blusas', preview: '🧥', price: 50 },
  { id: 'band-tshirt', name: 'Camiseta de Banda', category: 'Blusas', preview: '👕', price: 30 },
  { id: 'ripped-jeans', name: 'Calça Rasgada', category: 'Saias/Calças', preview: '👖', price: 45 },
  { id: 'shorts-fishnet', name: 'Shorts & Arruda', category: 'Saias/Calças', preview: '🩳', price: 35 },
];

export const ClothingShop: React.FC = () => {
  const { playerGold, unlockedItems, buyOutfit, changeLocation, playSound } = useGameStore();

  const handleBuy = (item: ShopItem) => {
    const success = buyOutfit(item.id, item.price);
    if (success) {
      playSound('connected');
    }
  };

  const handleClose = () => {
    playSound('click');
    changeLocation('school');
  };

  return (
    <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-md p-4 md:p-6 select-none">
      <div className="relative w-full max-w-3xl rounded-2xl border border-pink-500/35 bg-[#120e24]/90 p-6 md:p-8 shadow-[0_0_50px_rgba(219,39,119,0.25)] text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-pink-500 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/5 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/20 border border-pink-500/35 flex items-center justify-center text-pink-400">
              <ShoppingBag size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Loja de Roupas Góticas
              </h2>
              <p className="text-xs text-slate-400">Compre roupas exclusivas para a Veronica usando seu Gold</p>
            </div>
          </div>

          {/* Gold Balance */}
          <div className="flex items-center gap-2 bg-[#1b1736]/60 border border-amber-500/25 px-4 py-1.5 rounded-full text-amber-400 text-xs font-bold shadow-md">
            <Coins size={14} className="fill-amber-400/20 text-amber-400" />
            <span>Seu Saldo: <span className="text-white text-sm font-extrabold">${playerGold}</span></span>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 overflow-y-auto pr-1 flex-1">
          {SHOP_ITEMS.map((item) => {
            const isOwned = unlockedItems.includes(item.id);
            const canAfford = playerGold >= item.price;

            return (
              <div
                key={item.id}
                className={`border rounded-2xl p-4 flex flex-col justify-between items-center text-center transition-all bg-[#1b1736]/40 min-h-[170px] ${
                  isOwned
                    ? 'border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]'
                    : 'border-white/5 hover:border-pink-500/30'
                }`}
              >
                <div className="w-full flex justify-between items-start mb-2">
                  <span className="text-[8px] font-extrabold uppercase bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/15">
                    {item.category}
                  </span>
                  {isOwned && (
                    <span className="text-[8px] font-extrabold uppercase bg-emerald-500/15 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/15 flex items-center gap-0.5">
                      <Check size={8} /> Adquirido
                    </span>
                  )}
                </div>

                <span className="text-4xl filter drop-shadow-[0_4px_6px_rgba(0,0,0,0.3)] my-2">
                  {item.preview}
                </span>

                <div className="w-full mt-2">
                  <h4 className="text-xs font-bold text-slate-100 truncate max-w-full">
                    {item.name}
                  </h4>

                  {/* Buy / Owned Button */}
                  {isOwned ? (
                    <button
                      disabled
                      className="w-full mt-3 py-1.5 rounded-xl border border-emerald-500/20 bg-emerald-950/20 text-emerald-400 text-[10px] font-bold cursor-not-allowed uppercase"
                    >
                      Já Comprado
                    </button>
                  ) : (
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={!canAfford}
                      className={`w-full mt-3 py-1.5 rounded-xl text-[10px] font-bold uppercase transition-all flex items-center justify-center gap-1 border ${
                        canAfford
                          ? 'bg-pink-500/15 text-pink-300 border-pink-500/30 hover:bg-pink-500/30 cursor-pointer active:scale-95'
                          : 'bg-red-950/10 text-slate-500 border-red-500/10 cursor-not-allowed'
                      }`}
                    >
                      <Coins size={10} className="fill-amber-400/10" />
                      Comprar por ${item.price}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <p className="text-[9px] text-slate-500 font-semibold leading-relaxed mt-6 border-t border-white/5 pt-4">
          💡 Ganhe Gold completando os minijogos (Guitarra, Pintura, Tarô, Swipe) e use-o para comprar roupas! Os itens comprados ficam liberados no Closet do Lobby para mudar o visual da Veronica.
        </p>
      </div>
    </div>
  );
};
