'use client';

import React from 'react';
import { useTranslation } from '@/context/LanguageContext';
import { Languages, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const Header = () => {
    const { lang, setLang, t } = useTranslation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center bg-transparent backdrop-blur-sm border-b border-white/5">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
                    <BrainCircuit className="text-white" size={24} />
                </div>
                <div>
                    <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 tracking-tight">
                        {t.title}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setLang(lang === 'JA' ? 'EN' : 'JA')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full glass border-white/10 hover:border-violet-500/50 transition-colors"
                >
                    <Languages size={18} className="text-violet-400" />
                    <span className="text-sm font-semibold tracking-wide uppercase">
                        {lang === 'JA' ? 'English' : '日本語'}
                    </span>
                </motion.button>
            </div>
        </header>
    );
};

export default Header;
