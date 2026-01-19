'use client';

import React from 'react';
import Header from '@/components/Header';
import { useTranslation } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { TrendingUp, Award, Users, ArrowLeft, Brain } from 'lucide-react';
import Link from 'next/link';

export default function GrowthTracker() {
    const { t, lang } = useTranslation();

    const stats = [
        { label: lang === 'JA' ? 'パターンの力' : 'Pattern Power', value: 85, color: 'bg-violet-500' },
        { label: lang === 'JA' ? '論理の力' : 'Logic Logic', value: 70, color: 'bg-emerald-500' },
        { label: lang === 'JA' ? '空間の力' : 'Spatial Sense', value: 45, color: 'bg-amber-500' },
        { label: lang === 'JA' ? 'スピード' : 'Speed', value: 92, color: 'bg-rose-500' },
    ];

    return (
        <main className="min-h-screen pt-24 pb-12 flex flex-col items-center">
            <Header />

            <div className="max-w-4xl w-full px-6">
                <div className="mb-8">
                    <Link href="/">
                        <button className="flex items-center gap-2 text-text-muted hover:text-white transition-colors font-bold">
                            <ArrowLeft size={20} />
                            {t.back}
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* User Profile Card */}
                    <div className="md:col-span-1 glass-card p-8 flex flex-col items-center">
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 p-1 mb-4">
                            <div className="w-full h-full rounded-full bg-bg-deep flex items-center justify-center">
                                <Brain size={40} className="text-white" />
                            </div>
                        </div>
                        <h2 className="text-2xl font-black mb-1">Little Genius</h2>
                        <p className="text-text-muted text-sm mb-6">Level 12 Explorer</p>

                        <div className="w-full space-y-3">
                            <div className="flex justify-between text-xs font-bold uppercase">
                                <span>XP Progress</span>
                                <span>75%</span>
                            </div>
                            <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '75%' }}
                                    className="h-full bg-violet-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Brain Stats Card */}
                    <div className="md:col-span-2 glass-card p-8">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <TrendingUp className="text-emerald-400" size={20} />
                            {t.growth}
                        </h3>

                        <div className="space-y-6">
                            {stats.map((stat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span>{stat.label}</span>
                                        <span className="text-white/60">{stat.value}%</span>
                                    </div>
                                    <div className="w-full h-3 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${stat.value}%` }}
                                            transition={{ duration: 1, delay: i * 0.1 }}
                                            className={`h-full ${stat.color} shadow-lg shadow-current/20`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Family Comparison Mockup */}
                <div className="glass-card p-8 border-violet-500/20">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Users className="text-amber-400" size={20} />
                        {lang === 'JA' ? 'かぞくのランキング' : 'Family Leaderboard'}
                    </h3>

                    <div className="space-y-4">
                        {[
                            { name: 'Little Genius (You)', score: 'Level 12', current: true },
                            { name: 'Papa', score: 'Level 8', current: false },
                            { name: 'Mama', score: 'Level 10', current: false },
                        ].sort((a, b) => parseInt(b.score.split(' ')[1]) - parseInt(a.score.split(' ')[1])).map((member, i) => (
                            <div
                                key={i}
                                className={`p-4 rounded-2xl border ${member.current
                                        ? 'bg-violet-500/10 border-violet-500'
                                        : 'bg-white/5 border-white/5'
                                    } flex justify-between items-center`}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <span className={`font-bold ${member.current ? 'text-white' : 'text-text-muted'}`}>
                                        {member.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award size={16} className={i === 0 ? 'text-gold' : 'text-text-muted'} />
                                    <span className="font-black text-lg">{member.score}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
