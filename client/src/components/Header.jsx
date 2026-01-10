import React from 'react';
import { Plus, BarChart3 } from 'lucide-react';

const Header = ({ onNewTask, onToggleStats, showStats, theme }) => {
  return (
    <header style={{
      marginBottom: '2rem',
      animation: 'slideDown 0.5s ease-out'
    }}>
      {/* Titre principal */}
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '0.5rem'
        }}>
          📝 Gestionnaire de Tâches
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: theme.textSecondary,
          fontWeight: '500'
        }}>
          Organisez votre temps efficacement
        </p>
      </div>

      {/* Boutons d'action */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        {/* Bouton Nouvelle Tâche */}
        <button
          onClick={onNewTask}
          style={{
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            boxShadow: theme.boxShadow,
            transition: 'all 0.3s ease',
            transform: 'translateY(0)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = theme.boxShadowHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = theme.boxShadow;
          }}
        >
          <Plus size={20} />
          Nouvelle Tâche
        </button>

        {/* Bouton Statistiques */}
        {onToggleStats && (
          <button
            onClick={onToggleStats}
            style={{
              padding: '1rem 2rem',
              background: showStats
                ? 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
                : theme.btnBg,
              border: `1px solid ${theme.btnBorder}`,
              borderRadius: '12px',
              color: showStats ? '#fff' : theme.text,
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              boxShadow: theme.boxShadow,
              transition: 'all 0.3s ease',
              transform: 'translateY(0)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = theme.boxShadowHover;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = theme.boxShadow;
            }}
          >
            <BarChart3 size={20} />
            {showStats ? 'Masquer' : 'Voir'} Statistiques
          </button>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </header>
  );
};

export default Header;