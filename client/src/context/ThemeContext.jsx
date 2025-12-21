import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const themes = {
  dark: {
    name: 'Dark Professional',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 50%, #446ba0ff 100%)',
    primary: '#334155',
  },
  greenAccent: {
    name: 'Dark Green Accent',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #064e3b 100%)',
    primary: '#10b981',
  },
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    localStorage.setItem('theme', currentTheme);
    // FIX: Access the gradient property!
    document.body.style.background = themes[currentTheme].gradient;
    document.body.style.minHeight = '100vh';
  }, [currentTheme]);

  const changeTheme = (themeName) => {
    setCurrentTheme(themeName);
  };

  const value = {
    currentTheme,
    themes,
    changeTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};