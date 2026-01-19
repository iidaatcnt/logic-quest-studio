'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, translations } from '@/lib/translations';

type LanguageContextType = {
    lang: Language;
    setLang: (lang: Language) => void;
    t: typeof translations.JA;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [lang, setLang] = useState<Language>('JA');

    // Load language preference from local storage
    useEffect(() => {
        const saved = localStorage.getItem('app-lang') as Language;
        if (saved) setLang(saved);
    }, []);

    const handleSetLang = (newLang: Language) => {
        setLang(newLang);
        localStorage.setItem('app-lang', newLang);
    };

    const value = {
        lang,
        setLang: handleSetLang,
        t: translations[lang],
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a LanguageProvider');
    }
    return context;
};
