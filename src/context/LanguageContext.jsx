import React, { createContext, useContext, useState, useMemo } from 'react';
import { translations } from './translations';

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸', short: 'EN' },
  { code: 'tl', label: 'Tagalog', flag: '🇵🇭', short: 'TL' },
  { code: 'hil', label: 'Hiligaynon', flag: '🇵🇭', short: 'HIL' },
];

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(LANGUAGES[0]); // Default: English

  // Memoize the translation function so it doesn't cause unnecessary re-renders
  const t = useMemo(() => {
    return (key) => {
      const langMap = translations[language.code] || translations.en;
      return langMap[key] || translations.en[key] || key;
    };
  }, [language.code]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, LANGUAGES, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
