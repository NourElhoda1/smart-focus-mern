import React from 'react';
import { BarChart3, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { formatTime } from '../utils/helpers';

const Statistics = ({ stats, theme }) => {
  const maxByState = Math.max(...Object.values(stats.byState), 1);
  const maxByPriority = Math.max(...Object.values(stats.byPriority), 1);

  return (
    <div style={{
      background: theme.cardBg,
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2rem',
      border: `1px solid ${theme.cardBorder}`,
      boxShadow: theme.boxShadow,
      animation: 'slideIn 0.5s ease-out'
    }}>
      {/* Titre */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '2rem'
      }}>
        <BarChart3 size={28} style={{ color: '#667eea' }} />
        <h2 style={{
          fontSize: '1.8rem',
          fontWeight: '700',
          color: theme.text,
          margin: 0
        }}>
          Statistiques
        </h2>
      </div>

      {/* Cartes métriques */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        {/* Total tâches */}
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '1.5rem',
          borderRadius: '15px',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
        }}>
          <div style={{
            fontSize: '0.85rem',
            opacity: 0.9,
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            TOTAL
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '0.3rem'
          }}>
            {stats.total}
          </div>
          <div style={{
            fontSize: '0.85rem',
            opacity: 0.9
          }}>
            Tâche{stats.total > 1 ? 's' : ''}
          </div>
        </div>

        {/* Tâches terminées */}
        <div style={{
          background: 'linear-gradient(135deg, #2ed573 0%, #1abc9c 100%)',
          padding: '1.5rem',
          borderRadius: '15px',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(46, 213, 115, 0.3)'
        }}>
          <div style={{
            fontSize: '0.85rem',
            opacity: 0.9,
            marginBottom: '0.5rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <CheckCircle size={16} />
            TERMINÉES
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '0.3rem'
          }}>
            {stats.byState.terminé}
          </div>
          <div style={{
            fontSize: '0.85rem',
            opacity: 0.9
          }}>
            {stats.total > 0 ? ((stats.byState.terminé / stats.total) * 100).toFixed(0) : 0}% du total
          </div>
        </div>

        {/* En cours */}
        <div style={{
          background: 'linear-gradient(135deg, #ffa502 0%, #ff6348 100%)',
          padding: '1.5rem',
          borderRadius: '15px',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(255, 165, 2, 0.3)'
        }}>
          <div style={{
            fontSize: '0.85rem',
            opacity: 0.9,
            marginBottom: '0.5rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <Clock size={16} />
            EN COURS
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '0.3rem'
          }}>
            {stats.byState['en cours']}
          </div>
          <div style={{
            fontSize: '0.85rem',
            opacity: 0.9
          }}>
            À suivre
          </div>
        </div>

        {/* Progression globale */}
        <div style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          padding: '1.5rem',
          borderRadius: '15px',
          color: '#fff',
          boxShadow: '0 4px 15px rgba(250, 112, 154, 0.3)'
        }}>
          <div style={{
            fontSize: '0.85rem',
            opacity: 0.9,
            marginBottom: '0.5rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem'
          }}>
            <TrendingUp size={16} />
            PROGRESSION
          </div>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '800',
            marginBottom: '0.3rem'
          }}>
            {stats.progress.toFixed(0)}%
          </div>
          <div style={{
            fontSize: '0.85rem',
            opacity: 0.9
          }}>
            Temps utilisé
          </div>
        </div>
      </div>

      {/* Graphiques */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem'
      }}>
        {/* Graphique par état */}
        <div>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: theme.text,
            marginBottom: '1rem'
          }}>
            📊 Répartition par État
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {/* À faire */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.3rem',
                fontSize: '0.9rem',
                color: theme.text
              }}>
                <span>⭕ À faire</span>
                <span style={{ fontWeight: '600' }}>{stats.byState['à faire']}</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(stats.byState['à faire'] / maxByState) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #a0aec0 0%, #718096 100%)',
                  borderRadius: '10px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* En cours */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.3rem',
                fontSize: '0.9rem',
                color: theme.text
              }}>
                <span>🔄 En cours</span>
                <span style={{ fontWeight: '600' }}>{stats.byState['en cours']}</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(stats.byState['en cours'] / maxByState) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ffa502 0%, #ff6348 100%)',
                  borderRadius: '10px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* Terminé */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.3rem',
                fontSize: '0.9rem',
                color: theme.text
              }}>
                <span>✅ Terminé</span>
                <span style={{ fontWeight: '600' }}>{stats.byState.terminé}</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(stats.byState.terminé / maxByState) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #2ed573 0%, #1abc9c 100%)',
                  borderRadius: '10px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* Graphique par priorité */}
        <div>
          <h3 style={{
            fontSize: '1.1rem',
            fontWeight: '600',
            color: theme.text,
            marginBottom: '1rem'
          }}>
            🎯 Répartition par Priorité
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {/* Haute */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.3rem',
                fontSize: '0.9rem',
                color: theme.text
              }}>
                <span>🔴 Haute</span>
                <span style={{ fontWeight: '600' }}>{stats.byPriority.haute}</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(stats.byPriority.haute / maxByPriority) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ff4757 0%, #ff6348 100%)',
                  borderRadius: '10px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* Moyenne */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.3rem',
                fontSize: '0.9rem',
                color: theme.text
              }}>
                <span>🟠 Moyenne</span>
                <span style={{ fontWeight: '600' }}>{stats.byPriority.moyenne}</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(stats.byPriority.moyenne / maxByPriority) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #ffa502 0%, #ff9500 100%)',
                  borderRadius: '10px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>

            {/* Basse */}
            <div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.3rem',
                fontSize: '0.9rem',
                color: theme.text
              }}>
                <span>🔵 Basse</span>
                <span style={{ fontWeight: '600' }}>{stats.byPriority.basse}</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(0, 0, 0, 0.2)',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(stats.byPriority.basse / maxByPriority) * 100}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #1e90ff 0%, #4fc3f7 100%)',
                  borderRadius: '10px',
                  transition: 'width 0.5s ease'
                }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Temps global */}
      <div style={{
        marginTop: '2rem',
        padding: '1.5rem',
        background: '#f1f1f1ff',
        borderRadius: '15px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1.5rem'
      }}>
        <div>
          <div style={{
            fontSize: '0.85rem',
            color: theme.textSecondary,
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            ⏰ TEMPS TOTAL PASSÉ
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: theme.text
          }}>
            {formatTime(stats.totalTimeSpent)}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '0.85rem',
            color: theme.textSecondary,
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            📅 TEMPS ESTIMÉ
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: theme.text
          }}>
            {formatTime(stats.totalTimeEstimated)}
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '0.85rem',
            color: theme.textSecondary,
            marginBottom: '0.5rem',
            fontWeight: '600'
          }}>
            📊 EFFICACITÉ
          </div>
          <div style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: stats.totalTimeSpent <= stats.totalTimeEstimated ? '#2ed573' : '#ff4757'
          }}>
            {stats.totalTimeEstimated > 0 
              ? ((stats.totalTimeSpent / stats.totalTimeEstimated) * 100).toFixed(0)
              : 0}%
          </div>
        </div>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Statistics;