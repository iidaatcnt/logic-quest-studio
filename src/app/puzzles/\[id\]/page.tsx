'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useTranslation } from '@/context/LanguageContext';
import { puzzles, PuzzleCategory } from '@/lib/puzzles';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Star, Zap, CircleSlash } from 'lucide-react';

const CATEGORY_ICONS = {
    pattern: Star,
    grid: Zap,
    path: CircleSlash,
    logic: Lock,
};

export default function LevelSelect() {
    const { t, lang } = useTranslation();
    const [filter, setFilter] = useState<PuzzleCategory | 'all'>('all');

    const filteredPuzzles = filter === 'all'
        ? puzzles
        : puzzles.filter(p => p.category === filter);

    return (
        <main className="min-h-screen pt-24 pb-20 bg-transparent">
            <Header />

            <div className="max-w-7xl mx-auto px-6">
                <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div>
                        <h2 className="text-4xl font-extrabold mb-2">{t.levels}</h2>
                        <p className="text-text-muted">
                            {lang === 'JA' ? '100のステージが君を待っている！' : '100 stages are waiting for you!'}
                        </p>
                    </div>

                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        {['all', 'pattern', 'grid', 'path', 'logic'].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat as any)}
                                className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${filter === cat
                                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                                        : 'glass border-white/5 text-text-muted hover:bg-white/5'
                                    }`}
                            >
                                {cat === 'all' ? (lang === 'JA' ? 'すべて' : 'All') : cat.toUpperCase()}
                            </button>
                        ))}
                    </div>
                </header>

                <motion.div
                    layout
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredPuzzles.slice(0, 36).map((puzzle, i) => {
                            const Icon = CATEGORY_ICONS[puzzle.category];
                            const isLocked = puzzle.id > 12;

                            return (
                                <Link
                                    key={puzzle.id}
                                    href={isLocked ? '#' : `/puzzles/${puzzle.id}`}
                                    className={isLocked ? 'cursor-not-allowed' : ''}
                                >
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3, delay: (i % 20) * 0.05 }}
                                        whileHover={!isLocked ? { y: -8, scale: 1.02 } : {}}
                                        className={`aspect-square relative flex flex-col items-center justify-center rounded-3xl border transition-colors ${isLocked
                                                ? 'bg-white/5 border-white/5 opacity-50'
                                                : 'glass-card border-white/10 hover:border-violet-500/50 cursor-pointer group'
                                            }`}
                                    >
                                        {isLocked ? (
                                            <Lock size={24} className="text-text-muted" />
                                        ) : (
                                            <>
                                                <div className="absolute top-4 right-4 opacity-30 group-hover:opacity-100 transition-opacity">
                                                    <Icon size={14} className="text-violet-400" />
                                                </div>
                                                <span className="text-4xl font-extrabold mb-1">{puzzle.id}</span>
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-violet-400/80">
                                                    {puzzle.category}
                                                </span>

                                                {/* Progress Indicator */}
                                                {i < 5 && (
                                                    <div className="absolute bottom-4 flex gap-1">
                                                        {[1, 2, 3].map(s => (
                                                            <div key={s} className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-500/50" />
                                                        ))}
                                                    </div>
                                                )}
                                            </>
                                        )}
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-16 text-center">
                    <p className="text-text-muted text-sm italic font-medium">
                        {lang === 'JA' ? 'さらにスクロールして全100問に挑戦しよう！' : 'Scroll for all 100 puzzles!'}
                    </p>
                </div>
            </div>
        </main>
    );
}
