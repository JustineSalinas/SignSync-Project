import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);
  const toggleDark = () => setIsDark((prev) => !prev);

  useEffect(() => {
    if (isDark) {
      document.body.style.background = '#0a0a0f';
      document.body.style.color = '#e4e0f8';
    } else {
      document.body.style.background = '#f5f3ff';
      document.body.style.color = '#1a1030';
    }
    document.body.style.fontFamily = "'Inter', system-ui, -apple-system, sans-serif";
    document.body.style.transition = 'background 0.3s, color 0.3s';
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  );
}
