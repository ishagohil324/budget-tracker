import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

const themes = {
  dark: {
    name: 'Dark Professional',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #2b2e44ff 50%, #1c0d5bff 100%)',
    primary: '#222f41ff',
  },
  greenAccent: {
    name: 'Dark Green Accent',
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #064e3b 100%)',
    primary: '#10b981',
  },
  pinkberry: {
    name: 'pink berry ',
    gradient: 'linear-gradient(135deg, #1f071fff 0%, #180e19ff 50%, #4a0634ff 100%)',
    primary: '#b91070',
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