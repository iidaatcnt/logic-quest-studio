'use client';

import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { useTranslation } from '@/context/LanguageContext';
import { puzzles } from '@/lib/puzzles';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, XCircle, Lightbulb, Trophy } from 'lucide-react';
import Link from 'next/link';
import { use } from 'react';

export default function PuzzleGame({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const puzzleId = parseInt(id);
  const puzzle = puzzles.find(p => p.id === puzzleId);
  const { t, lang } = useTranslation();
  
  const [gameState, setGameState] = useState<'playing' | 'success' | 'fail'>('playing');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  // Sample logic for Level 1: Pattern Recognition
  // Sequence: 2, 4, 6, ? (Answer is 8)
  const options = [7, 8, 9, 10];
  const correctAnswer = 8;

  const handleSelect = (option: number) => {
    if (gameState !== 'playing') return;
    setSelectedOption(option);
    
    if (option === correctAnswer) {
      setGameState('success');
    } else {
      setGameState('fail');
      setTimeout(() => {
        setGameState('playing');
        setSelectedOption(null);
      }, 1500);
    }
  };

  if (!puzzle) return <div>Puzzle not found</div>;

  return (
    <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
      <Header />
      
      <div className="max-w-4xl w-full px-6">
        <div className="mb-8 flex justify-between items-center">
          <Link href="/puzzles">
            <button className="flex items-center gap-2 text-text-muted hover:text-white transition-colors font-bold">
              <ArrowLeft size={20} />
              {t.back}
            </button>
          </Link>
          <div className="px-4 py-1 rounded-full glass border-white/5 text-sm font-bold text-violet-400">
            {puzzle.category.toUpperCase()}
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 md:p-12 text-center relative overflow-hidden"
        >
          {/* Success Overlay */}
          <AnimatePresence>
            {gameState === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0 z-10 bg-violet-600/90 backdrop-blur-md flex flex-col items-center justify-center p-6"
              >
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <Trophy size={80} className="text-amber-400 mb-6" />
                </motion.div>
                <h2 className="text-4xl font-black mb-4">
                  {lang === 'JA' ? 'すごいいいね！' : 'EXCELLENT!'}
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  {lang === 'JA' ? '君の才能が開花しているぞ！' : 'Your genius is blooming!'}
                </p>
                <Link href="/puzzles">
                  <button className="px-8 py-4 bg-white text-violet-600 rounded-2xl font-black text-lg shadow-xl active:scale-95 transition-all">
                    {lang === 'JA' ? 'つぎのパズルへ' : 'NEXT PUZZLE'}
                  </button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mb-10">
            <span className="text-text-muted font-bold text-sm tracking-widest uppercase mb-2 block">
              {lang === 'JA' ? `レベル ${puzzleId}` : `LEVEL ${puzzleId}`}
            </span>
            <h2 className="text-3xl font-black mb-4">
              {lang === 'JA' ? '空欄に入る数字は何かな？' : 'What number belongs in the gap?'}
            </h2>
            <div className="flex items-center justify-center gap-2 text-violet-400">
              <Lightbulb size={16} />
              <span className="text-sm font-medium">
                {lang === 'JA' ? 'ヒント：2つずつ増えているよ' : 'Hint: It increases by 2 each time.'}
              </span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-4 mb-16">
            {[2, 4, 6].map(num => (
              <div key={num} className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl md:text-4xl font-black shadow-inner">
                {num}
              </div>
            ))}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border-2 border-dashed border-violet-500/50 flex items-center justify-center text-4xl font-black text-violet-500 animate-pulse bg-violet-500/5">
              ?
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {options.map((opt) => (
              <motion.button
                key={opt}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleSelect(opt)}
                className={`py-6 rounded-2xl font-black text-2xl transition-all border-2 ${
                  selectedOption === opt
                    ? opt === correctAnswer 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                      : 'bg-rose-500/20 border-rose-500 text-rose-400'
                    : 'glass border-white/10 hover:border-white/30 text-white'
                }`}
              >
                {opt}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="mt-8 text-center text-text-muted text-sm font-medium">
          {lang === 'JA' ? 'お父さんお母さんに勝てるかな？' : 'Can you beat your parents?'}
        </div>
      </div>
    </main>
  );
}
