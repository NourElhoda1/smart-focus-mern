import React from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchBar = ({
  searchQuery,
  onSearchChange,
  filterPriority,
  onPriorityChange,
  filterState,
  onStateChange,
  showFilters,
  onToggleFilters,
  hasActiveFilters,
  onClearFilters,
  filteredCount,
  totalCount,
  theme
}) => {
  return (
    <div style={{
      background: theme.cardBg,
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '1.5rem',
      marginBottom: '2rem',
      border: `1px solid ${theme.cardBorder}`,
      animation: 'fadeIn 0.5s ease-out'
    }}>
      {/* Ligne 1 : Recherche + Bouton filtres */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        marginBottom: showFilters ? '1.5rem' : '0',
        flexWrap: 'wrap'
      }}>
        {/* Barre de recherche */}
        <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
          <Search
            size={20}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: theme.textSecondary
            }}
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="🔍 Rechercher une tâche par nom..."
            style={{
              width: '100%',
              padding: '0.9rem 1rem 0.9rem 3rem',
              background: theme.inputBg,
              border: searchQuery
                ? `2px solid #667eea`
                : `1px solid ${theme.inputBorder}`,
              borderRadius: '12px',
              color: theme.text,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              outline: 'none'
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = '2px solid #667eea';
              e.currentTarget.style.boxShadow = `0 0 0 3px ${theme.inputFocus}`;
            }}
            onBlur={(e) => {
              if (!searchQuery) {
                e.currentTarget.style.border = `1px solid ${theme.inputBorder}`;
              }
              e.currentTarget.style.boxShadow = 'none';
            }}
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.2)',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: theme.text,
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Bouton toggle filtres */}
        <button
          onClick={onToggleFilters}
          style={{
            padding: '0.9rem 1.5rem',
            background: showFilters
              ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              : theme.btnBg,
            border: `1px solid ${theme.btnBorder}`,
            borderRadius: '12px',
            color: showFilters ? '#fff' : theme.text,
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            if (!showFilters) {
              e.currentTarget.style.background = theme.btnHover;
            }
          }}
          onMouseLeave={(e) => {
            if (!showFilters) {
              e.currentTarget.style.background = theme.btnBg;
            }
          }}
        >
          <Filter size={18} />
          Filtres
          {hasActiveFilters && (
            <span style={{
              background: '#ff4757',
              borderRadius: '50%',
              width: '8px',
              height: '8px',
              display: 'inline-block',
              animation: 'pulse 2s infinite'
            }} />
          )}
        </button>
      </div>

      {/* Ligne 2 : Filtres détaillés */}
      {showFilters && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          padding: '1.5rem',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '12px',
          animation: 'slideDown 0.3s ease-out'
        }}>
          {/* Filtre par priorité */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: theme.textSecondary
            }}>
              🎯 Priorité
            </label>
            <select
              value={filterPriority}
              onChange={(e) => onPriorityChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem',
                background: theme.inputBg,
                border: filterPriority !== 'toutes'
                  ? '2px solid #667eea'
                  : `1px solid ${theme.inputBorder}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '0.95rem',
                cursor: 'pointer',
                fontWeight: filterPriority !== 'toutes' ? '600' : '400',
                outline: 'none'
              }}
            >
              <option value="toutes" style={{ background: theme.cardBg }}>
                Toutes les priorités
              </option>
              <option value="haute" style={{ background: theme.cardBg }}>
                🔴 Haute
              </option>
              <option value="moyenne" style={{ background: theme.cardBg }}>
                🟠 Moyenne
              </option>
              <option value="basse" style={{ background: theme.cardBg }}>
                🔵 Basse
              </option>
            </select>
          </div>

          {/* Filtre par état */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.9rem',
              fontWeight: '500',
              color: theme.textSecondary
            }}>
              📊 État
            </label>
            <select
              value={filterState}
              onChange={(e) => onStateChange(e.target.value)}
              style={{
                width: '100%',
                padding: '0.7rem',
                background: theme.inputBg,
                border: filterState !== 'tous'
                  ? '2px solid #667eea'
                  : `1px solid ${theme.inputBorder}`,
                borderRadius: '8px',
                color: theme.text,
                fontSize: '0.95rem',
                cursor: 'pointer',
                fontWeight: filterState !== 'tous' ? '600' : '400',
                outline: 'none'
              }}
            >
              <option value="tous" style={{ background: theme.cardBg }}>
                Tous les états
              </option>
              <option value="à faire" style={{ background: theme.cardBg }}>
                ⭕ À faire
              </option>
              <option value="en cours" style={{ background: theme.cardBg }}>
                🔄 En cours
              </option>
              <option value="terminé" style={{ background: theme.cardBg }}>
                ✅ Terminé
              </option>
            </select>
          </div>

          {/* Bouton réinitialiser */}
          <div style={{
            display: 'flex',
            alignItems: 'flex-end'
          }}>
            <button
              onClick={onClearFilters}
              disabled={!hasActiveFilters}
              style={{
                width: '100%',
                padding: '0.7rem',
                background: hasActiveFilters
                  ? 'rgba(255, 71, 87, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                color: hasActiveFilters ? '#ff4757' : '#666',
                fontSize: '0.9rem',
                fontWeight: '600',
                cursor: hasActiveFilters ? 'pointer' : 'not-allowed',
                opacity: hasActiveFilters ? 1 : 0.5,
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.3rem'
              }}
              onMouseEnter={(e) => {
                if (hasActiveFilters) {
                  e.currentTarget.style.background = 'rgba(255, 71, 87, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (hasActiveFilters) {
                  e.currentTarget.style.background = 'rgba(255, 71, 87, 0.2)';
                }
              }}
            >
              <X size={14} />
              Réinitialiser
            </button>
          </div>
        </div>
      )}

      {/* Ligne 3 : Résumé des résultats */}
      <div style={{
        marginTop: '1rem',
        padding: '0.8rem 1rem',
        background: 'rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.9rem',
        flexWrap: 'wrap',
        gap: '0.5rem'
      }}>
        <div>
          <strong style={{ color: theme.text }}>
            {filteredCount !== undefined ? filteredCount : totalCount}
          </strong>
          <span style={{ color: theme.textSecondary }}>
            {' '}tâche{(filteredCount || totalCount) > 1 ? 's' : ''}
            {hasActiveFilters && ' (filtrée' + ((filteredCount || 0) > 1 ? 's' : '') + ')'}
          </span>
        </div>

        {hasActiveFilters && (
          <div style={{
            display: 'flex',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            {searchQuery && (
              <span style={{
                padding: '0.3rem 0.8rem',
                background: 'rgba(102, 126, 234, 0.3)',
                borderRadius: '20px',
                fontSize: '0.85rem',
                color: theme.text
              }}>
                "{searchQuery}"
              </span>
            )}
            {filterPriority !== 'toutes' && (
              <span style={{
                padding: '0.3rem 0.8rem',
                background: 'rgba(102, 126, 234, 0.3)',
                borderRadius: '20px',
                fontSize: '0.85rem',
                textTransform: 'capitalize',
                color: theme.text
              }}>
                {filterPriority}
              </span>
            )}
            {filterState !== 'tous' && (
              <span style={{
                padding: '0.3rem 0.8rem',
                background: 'rgba(102, 126, 234, 0.3)',
                borderRadius: '20px',
                fontSize: '0.85rem',
                textTransform: 'capitalize',
                color: theme.text
              }}>
                {filterState}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default SearchBar;