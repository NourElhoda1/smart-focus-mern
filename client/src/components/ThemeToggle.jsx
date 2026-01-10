import React from 'react';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle = ({ darkMode, onToggle, theme }) => {
  return (
    <button
      onClick={onToggle}
      aria-label={`Basculer vers le mode ${darkMode ? 'clair' : 'sombre'}`}
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: darkMode
          ? 'linear-gradient(135deg, #ffa502 0%, #ff6348 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: theme.boxShadow,
        transition: 'all 0.3s ease',
        zIndex: 1000,
        transform: 'scale(1)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = theme.boxShadowHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = theme.boxShadow;
      }}
      title={darkMode ? 'Passer en mode clair' : 'Passer en mode sombre'}
    >
      {darkMode ? <Sun size={24} /> : <Moon size={24} />}
    </button>
  );
};

export default ThemeToggle;