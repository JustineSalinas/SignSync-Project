import React, { createContext, useContext, useState } from 'react';

export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇺🇸', short: 'EN' },
  { code: 'tl', label: 'Tagalog', flag: '🇵🇭', short: 'TL' },
  { code: 'hil', label: 'Hiligaynon', flag: '🌺', short: 'HIL' },
];

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(LANGUAGES[0]); // Default: English

  return (
    <LanguageContext.Provider value={{ language, setLanguage, LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
}
