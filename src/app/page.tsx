'use client';

import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import { useTranslation } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { Play, TrendingUp, Grid3X3, ArrowRight } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();

  return (
    <main className="min-height-screen pt-24 px-6 pb-12 flex flex-col items-center">
      <Header />

      {/* Hero Section */}
      <section className="max-w-4xl w-full text-center mt-12 mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-block px-4 py-1.5 rounded-full glass border-white/5 text-violet-400 text-sm font-semibold mb-6"
        >
          ✨ {t.subtitle}
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight"
        >
          {t.welcome.split('!')[0]}
          <span className="text-violet-500">!</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-text-muted max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          {t.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link href="/puzzles">
            <button className="px-10 py-5 w-full sm:w-auto rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 hover:from-violet-500 hover:to-indigo-600 text-white font-bold text-lg flex items-center justify-center gap-3 shadow-xl shadow-violet-500/20 active:scale-95 transition-all">
              <Play size={20} fill="currentColor" />
              {t.start}
            </button>
          </Link>

          <Link href="/growth">
            <button className="px-10 py-5 w-full sm:w-auto rounded-2xl glass border-white/10 hover:border-white/20 text-white font-bold text-lg flex items-center justify-center gap-3 active:scale-95 transition-all">
              <TrendingUp size={20} className="text-emerald-400" />
              {t.growth}
            </button>
          </Link>
        </motion.div>
      </section>

      {/* Feature Preview Grid */}
      <section className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: Grid3X3, title: t.levels, color: 'text-violet-400' },
          { icon: TrendingUp, title: t.growth, color: 'text-emerald-400' },
          { icon: BrainCircuit, title: t.parentMode, color: 'text-amber-400' },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 + (i * 0.1) }}
            whileHover={{ y: -5 }}
            className="glass-card p-8 flex flex-col items-center text-center group cursor-pointer"
          >
            <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 border border-white/5 group-hover:border-white/20 transition-all`}>
              <feature.icon className={feature.color} size={32} />
            </div>
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <div className="mt-auto pt-4 flex items-center gap-2 text-sm text-text-muted hover:text-white transition-colors">
              Explore <ArrowRight size={14} />
            </div>
          </motion.div>
        ))}
      </section>

      {/* Background Decor */}
      <div className="fixed bottom-0 left-0 w-64 h-64 bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed top-20 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />
    </main>
  );
}

// Internal brain icon component
const BrainCircuit = ({ ...props }) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .52 8.205 4 4 0 0 0 6.003 2.9M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.52 8.205 4 4 0 0 1-6.003 2.9" />
    <path d="M9 13h4" />
    <path d="M12 10v6" />
    <path d="M12 8v1" />
    <path d="M12 15v1" />
  </svg>
);
