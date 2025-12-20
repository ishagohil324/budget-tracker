import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const themes = {
  purple: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  blue: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
  green: 'linear-gradient(135deg, #065f46 0%, #10b981 100%)',
  pink: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
  dark: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
  sunset: 'linear-gradient(135deg, #f97316 0%, #dc2626 100%)',
  ocean: 'linear-gradient(135deg, #0ea5e9 0%, #06b6d4 100%)',
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'purple';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    document.body.style.background = themes[currentTheme];
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
  };

  const value = {
    currentTheme,
    themes,
    changeTheme,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};