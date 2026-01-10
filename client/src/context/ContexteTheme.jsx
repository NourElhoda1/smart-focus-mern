import React, { createContext, useState, useEffect } from 'react';

const COLOR_THEMES = {
  nature: {
    name: 'Nature',
    primary: '#16a34a',
    hover: '#15803d',
    light: '#dcfce7',
  },
  ocean: {
    name: 'Océan',
    primary: '#2563eb',
    hover: '#1d4ed8',
    light: '#dbeafe',
  },
  sunset: {
    name: 'Coucher de Soleil',
    primary: '#ea580c',
    hover: '#c2410c',
    light: '#ffedd5',
  },
  royal: {
    name: 'Royal',
    primary: '#9333ea',
    hover: '#7e22ce',
    light: '#f3e8ff',
  },
  berry: {
    name: 'Baies',
    primary: '#db2777',
    hover: '#be185d',
    light: '#fce7f3',
  },
  slate: {
    name: 'Ardoise',
    primary: '#475569',
    hover: '#334155',
    light: '#e2e8f0',
  }
};

const THEMES = {
  light: {
    background: '#ffffff',
    text: '#1f2937',
    textSecondary: '#6b7280',
    cardBg: '#ffffff',
    cardBorder: '#e5e7eb',
    inputBg: '#f9fafb',
    inputBorder: '#d1d5db',
    sidebar: '#f9fafb'
  },
  dark: {
    background: '#111827',
    text: '#f9fafb',
    textSecondary: '#9ca3af',
    cardBg: '#1f2937',
    cardBorder: '#374151',
    inputBg: '#374151',
    inputBorder: '#4b5563',
    sidebar: '#1f2937'
  }
};

export const ContexteTheme = createContext();

export const FournisseurTheme = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedColor, setSelectedColor] = useState('nature');

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    const savedColor = localStorage.getItem('colorTheme') || 'nature';
    setDarkMode(savedTheme);
    setSelectedColor(savedColor);
    
    document.body.style.backgroundColor = savedTheme ? THEMES.dark.background : THEMES.light.background;
    document.body.setAttribute('data-color', savedColor);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    const theme = darkMode ? THEMES.dark : THEMES.light;
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.text;
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('colorTheme', selectedColor);
    document.body.setAttribute('data-color', selectedColor);
  }, [selectedColor]);

  const toggleTheme = () => setDarkMode(prev => !prev);
  const changeColor = (color) => setSelectedColor(color);

  const theme = darkMode ? THEMES.dark : THEMES.light;
  const colorTheme = COLOR_THEMES[selectedColor];

  return (
    <ContexteTheme.Provider value={{ 
      darkMode, 
      toggleTheme, 
      theme, 
      selectedColor, 
      changeColor, 
      colorTheme,
      COLOR_THEMES 
    }}>
      {children}
    </ContexteTheme.Provider>
  );
};

export default ContexteTheme;