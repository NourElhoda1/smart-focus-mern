import React from 'react';
import { Play, Pause, Edit2, Trash2, CheckCircle2, Circle, AlertCircle } from 'lucide-react';
import { formatTime, getPriorityColor, isTaskInWarning } from '../utils/helpers';
import { DEFAULT_TIMES } from '../constants/constants';
import useTheme from '../hooks/useTheme';

const TaskCard = ({
  task,
  onToggleTimer,
  onExtendTime,
  onChangeState,
  onEdit,
  onDelete,
}) => {
  const { theme, colorTheme } = useTheme(); 
  
  const priorityColor = getPriorityColor(task.priority);
  const isWarning = isTaskInWarning(task.time_remaining);
  const progress = task.estimated_time > 0
    ? Math.min((task.time_spent / task.estimated_time) * 100, 100)
    : 0;

  const getStateIcon = () => {
    switch (task.state) {
      case 'terminé':
        return <CheckCircle2 size={20} style={{ color: '#2ed573' }} />;
      case 'en cours':
        return <AlertCircle size={20} style={{ color: '#ffa502' }} />;
      default:
        return <Circle size={20} style={{ color: theme.textSecondary }} />;
    }
  };

  return (
    <div
      style={{
        background: theme.cardBg,
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '1.8rem',
        marginBottom: '1.5rem',
        border: `1px solid ${theme.cardBorder}`,
        borderLeft: `5px solid ${priorityColor}`,
        boxShadow: theme.boxShadow,
        transition: 'all 0.3s ease',
        animation: 'slideIn 0.5s ease-out',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = theme.boxShadowHover;
        e.currentTarget.style.background = theme.cardBgHover;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = theme.boxShadow;
        e.currentTarget.style.background = theme.cardBg;
      }}
    >
      {/* Badge priorité haute */}
      {task.priority === 'haute' && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(255, 71, 87, 0.2)',
          border: '1px solid rgba(255, 71, 87, 0.3)',
          borderRadius: '20px',
          padding: '0.3rem 0.8rem',
          fontSize: '0.75rem',
          fontWeight: '700',
          color: '#ff4757',
          animation: 'pulse 2s infinite'
        }}>
          🔴 URGENT
        </div>
      )}

      {/* En-tête */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '1rem',
        gap: '1rem'
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            {getStateIcon()}
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '700',
              color: theme.text,
              margin: 0
            }}>
              {task.name}
            </h3>
          </div>
          <div style={{
            fontSize: '0.85rem',
            color: theme.textSecondary,
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            Priorité : <span style={{ color: priorityColor }}>{task.priority}</span>
          </div>
        </div>

        {/* Boutons Éditer et Supprimer */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => onEdit(task)}
            style={{
              padding: '0.6rem',
              background: theme.btnBg,
              border: `1px solid ${theme.btnBorder}`,
              borderRadius: '8px',
              color: theme.text,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = theme.btnHover;
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.btnBg;
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Éditer"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            style={{
              padding: '0.6rem',
              background: theme.warningBg,
              border: `1px solid ${theme.warningBorder}`,
              borderRadius: '8px',
              color: theme.warningText,
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 71, 87, 0.3)';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = theme.warningBg;
              e.currentTarget.style.transform = 'scale(1)';
            }}
            title="Supprimer"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      {/* Timer et infos temps */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem',
        padding: '1rem',
        background: isWarning ? theme.warningBg : 'rgba(0, 0, 0, 0.2)',
        borderRadius: '12px',
        border: isWarning ? `1px solid ${theme.warningBorder}` : 'none'
      }}>
        {/* Temps restant */}
        <div>
          <div style={{
            fontSize: '0.75rem',
            color: theme.textSecondary,
            marginBottom: '0.3rem',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            ⏱️ Restant
          </div>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: isWarning ? theme.warningText : theme.text
          }}>
            {formatTime(task.time_remaining || 0)}
          </div>
        </div>

        {/* Temps passé */}
        <div>
          <div style={{
            fontSize: '0.75rem',
            color: theme.textSecondary,
            marginBottom: '0.3rem',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            ⏰ Passé
          </div>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: theme.text
          }}>
            {formatTime(task.time_spent || 0)}
          </div>
        </div>

        {/* Temps estimé */}
        <div>
          <div style={{
            fontSize: '0.75rem',
            color: theme.textSecondary,
            marginBottom: '0.3rem',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            📅 Estimé
          </div>
          <div style={{
            fontSize: '1.2rem',
            fontWeight: '700',
            color: theme.text
          }}>
            {formatTime(task.estimated_time || 0)}
          </div>
        </div>
      </div>

      {/* Barre de progression */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '0.5rem'
        }}>
          <span style={{
            fontSize: '0.85rem',
            color: theme.textSecondary,
            fontWeight: '600'
          }}>
            Progression
          </span>
          <span style={{
            fontSize: '0.85rem',
            fontWeight: '700',
            color: theme.text
          }}>
            {isNaN(progress) ? '0' : progress.toFixed(0)}%
          </span>
        </div>
        <div style={{
          width: '100%',
          height: '8px',
          background: 'rgba(0, 0, 0, 0.3)',
          borderRadius: '10px',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${isNaN(progress) ? 0 : progress}%`,
            height: '100%',
            background: task.state === 'terminé'
              ? 'linear-gradient(90deg, #2ed573 0%, #1abc9c 100%)'
              : `linear-gradient(90deg, ${colorTheme.primary} 0%, ${colorTheme.hover} 100%)`, 
            borderRadius: '10px',
            transition: 'width 0.3s ease'
          }} />
        </div>
      </div>

      {/* Contrôles Timer */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1rem',
        flexWrap: 'wrap'
      }}>
        {/* Bouton Play/Pause */}
        <button
          onClick={() => onToggleTimer(task.id)}
          disabled={task.state === 'terminé'}
          style={{
            flex: 1,
            minWidth: '120px',
            padding: '0.8rem',
            background: task.is_running
              ? 'linear-gradient(135deg, #ffa502 0%, #ff6348 100%)'
              : `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.hover} 100%)`,
            border: 'none',
            borderRadius: '10px',
            color: '#fff',
            fontSize: '0.95rem',
            fontWeight: '600',
            cursor: task.state === 'terminé' ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            opacity: task.state === 'terminé' ? 0.5 : 1,
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (task.state !== 'terminé') {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {task.is_running ? <Pause size={18} /> : <Play size={18} />}
          {task.is_running ? 'Pause' : 'Démarrer'}
        </button>

        {/* Bouton +15min */}
        <button
          onClick={() => onExtendTime(task.id, DEFAULT_TIMES.EXTEND_SHORT)}
          style={{
            padding: '0.8rem 1rem',
            background: theme.btnBg,
            border: `1px solid ${theme.btnBorder}`,
            borderRadius: '10px',
            color: theme.text,
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.btnHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.btnBg;
          }}
        >
          +15min
        </button>

        {/* Bouton +30min */}
        <button
          onClick={() => onExtendTime(task.id, DEFAULT_TIMES.EXTEND_LONG)}
          style={{
            padding: '0.8rem 1rem',
            background: theme.btnBg,
            border: `1px solid ${theme.btnBorder}`,
            borderRadius: '10px',
            color: theme.text,
            fontSize: '0.9rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = theme.btnHover;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = theme.btnBg;
          }}
        >
          +30min
        </button>
      </div>

      {/* Changement d'état */}
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => onChangeState(task.id, 'à faire')}
          disabled={task.state === 'à faire'}
          style={{
            flex: 1,
            minWidth: '100px',
            padding: '0.7rem',
            background: task.state === 'à faire' 
              ? 'rgba(160, 174, 192, 0.3)'
              : theme.btnBg,
            border: task.state === 'à faire'
              ? '2px solid #a0aec0'
              : `1px solid ${theme.btnBorder}`,
            borderRadius: '8px',
            color: theme.text,
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: task.state === 'à faire' ? 'default' : 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (task.state !== 'à faire') {
              e.currentTarget.style.background = theme.btnHover;
            }
          }}
          onMouseLeave={(e) => {
            if (task.state !== 'à faire') {
              e.currentTarget.style.background = theme.btnBg;
            }
          }}
        >
          ⭕ À faire
        </button>

        <button
          onClick={() => onChangeState(task.id, 'en cours')}
          disabled={task.state === 'en cours'}
          style={{
            flex: 1,
            minWidth: '100px',
            padding: '0.7rem',
            background: task.state === 'en cours'
              ? 'rgba(255, 165, 2, 0.3)'
              : theme.btnBg,
            border: task.state === 'en cours'
              ? '2px solid #ffa502'
              : `1px solid ${theme.btnBorder}`,
            borderRadius: '8px',
            color: theme.text,
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: task.state === 'en cours' ? 'default' : 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (task.state !== 'en cours') {
              e.currentTarget.style.background = theme.btnHover;
            }
          }}
          onMouseLeave={(e) => {
            if (task.state !== 'en cours') {
              e.currentTarget.style.background = theme.btnBg;
            }
          }}
        >
          🔄 En cours
        </button>

        <button
          onClick={() => onChangeState(task.id, 'terminé')}
          disabled={task.state === 'terminé'}
          style={{
            flex: 1,
            minWidth: '100px',
            padding: '0.7rem',
            background: task.state === 'terminé'
              ? 'rgba(46, 213, 115, 0.3)'
              : theme.btnBg,
            border: task.state === 'terminé'
              ? '2px solid #2ed573'
              : `1px solid ${theme.btnBorder}`,
            borderRadius: '8px',
            color: theme.text,
            fontSize: '0.85rem',
            fontWeight: '600',
            cursor: task.state === 'terminé' ? 'default' : 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            if (task.state !== 'terminé') {
              e.currentTarget.style.background = theme.btnHover;
            }
          }}
          onMouseLeave={(e) => {
            if (task.state !== 'terminé') {
              e.currentTarget.style.background = theme.btnBg;
            }
          }}
        >
          ✅ Terminé
        </button>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
      `}</style>
    </div>
  );
};

export default TaskCard;