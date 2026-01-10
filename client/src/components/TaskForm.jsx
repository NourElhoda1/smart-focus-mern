import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { DEFAULT_TIMES } from '../constants/constants';
import useTheme from '../hooks/useTheme'; 
const TaskForm = ({ task, onSubmit, onCancel }) => { 
  const { theme, colorTheme } = useTheme(); 
  
  const [formData, setFormData] = useState({
    name: '',
    priority: 'moyenne',
    estimated_time: DEFAULT_TIMES.ESTIMATED_TIME,
    state: 'à faire'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (task) {
      setFormData({
        name: task.name,
        priority: task.priority,
        estimated_time: Math.floor(task.estimated_time / 60),
        state: task.state
      });
    }
  }, [task]);

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Le nom de la tâche est obligatoire';
    }

    if (formData.estimated_time <= 0) {
      newErrors.estimated_time = 'Le temps estimé doit être positif';
    }

    if (formData.estimated_time > 1440) {
      newErrors.estimated_time = 'Le temps estimé ne peut pas dépasser 24 heures';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(errors).length > 0) {
      return;
    }

    const taskData = {
      name: formData.name,
      priority: formData.priority,
      estimated_time: parseInt(formData.estimated_time) * 60, 
      state: formData.state
    };

    onSubmit(taskData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '1rem',
      animation: 'fadeIn 0.3s ease-out'
    }}>
      {/* Formulaire */}
      <div style={{
        background: theme.cardBg,
        backdropFilter: 'blur(10px)',
        borderRadius: '20px',
        padding: '2rem',
        width: '100%',
        maxWidth: '500px',
        border: `1px solid ${theme.cardBorder}`,
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5)',
        animation: 'slideUp 0.3s ease-out'
      }}>
        {/* En-tête */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <h2 style={{
            fontSize: '1.8rem',
            fontWeight: '700',
            color: theme.text,
            margin: 0
          }}>
            {task ? '✏️ Modifier la tâche' : '➕ Nouvelle tâche'}
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: 'transparent',
              border: 'none',
              color: theme.text,
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulaire */}
        <div>
          {/* Nom de la tâche */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              color: theme.text
            }}>
              📝 Nom de la tâche <span style={{ color: '#ff4757' }}>*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Ex: Préparer la présentation"
              style={{
                width: '100%',
                padding: '0.9rem',
                background: theme.inputBg,
                border: errors.name
                  ? '2px solid #ff4757'
                  : `1px solid ${theme.inputBorder}`,
                borderRadius: '10px',
                color: theme.text,
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                if (!errors.name) {
                  e.currentTarget.style.border = `2px solid ${colorTheme.primary}`; 
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${colorTheme.primary}20`;
                }
              }}
              onBlur={(e) => {
                if (!errors.name) {
                  e.currentTarget.style.border = `1px solid ${theme.inputBorder}`;
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            />
            {errors.name && (
              <p style={{
                color: '#ff4757',
                fontSize: '0.85rem',
                marginTop: '0.3rem',
                marginBottom: 0
              }}>
                {errors.name}
              </p>
            )}
          </div>

          {/* Priorité */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              color: theme.text
            }}>
              🎯 Priorité
            </label>
            <select
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem',
                background: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                borderRadius: '10px',
                color: theme.text,
                fontSize: '1rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              <option value="haute" style={{ background: theme.cardBg }}>
                🔴 Haute - Urgent
              </option>
              <option value="moyenne" style={{ background: theme.cardBg }}>
                🟠 Moyenne - Normale
              </option>
              <option value="basse" style={{ background: theme.cardBg }}>
                🔵 Basse - Peut attendre
              </option>
            </select>
          </div>

          {/* Temps estimé */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              color: theme.text
            }}>
              ⏱️ Temps estimé (minutes)
            </label>
            <input
              type="number"
              value={formData.estimated_time}
              onChange={(e) => handleChange('estimated_time', parseInt(e.target.value) || 0)}
              min="1"
              max="1440"
              placeholder="Ex: 30"
              style={{
                width: '100%',
                padding: '0.9rem',
                background: theme.inputBg,
                border: errors.estimated_time
                  ? '2px solid #ff4757'
                  : `1px solid ${theme.inputBorder}`,
                borderRadius: '10px',
                color: theme.text,
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                if (!errors.estimated_time) {
                  e.currentTarget.style.border = `2px solid ${colorTheme.primary}`; 
                  e.currentTarget.style.boxShadow = `0 0 0 3px ${colorTheme.primary}20`;
                }
              }}
              onBlur={(e) => {
                if (!errors.estimated_time) {
                  e.currentTarget.style.border = `1px solid ${theme.inputBorder}`;
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            />
            {errors.estimated_time && (
              <p style={{
                color: '#ff4757',
                fontSize: '0.85rem',
                marginTop: '0.3rem',
                marginBottom: 0
              }}>
                {errors.estimated_time}
              </p>
            )}
            <p style={{
              color: theme.textSecondary,
              fontSize: '0.85rem',
              marginTop: '0.3rem',
              marginBottom: 0
            }}>
              💡 Conseils : 15-30 min pour petites tâches, 60-120 min pour grandes
            </p>
          </div>

          {/* État */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{
              display: 'block',
              marginBottom: '0.5rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              color: theme.text
            }}>
              📊 État
            </label>
            <select
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem',
                background: theme.inputBg,
                border: `1px solid ${theme.inputBorder}`,
                borderRadius: '10px',
                color: theme.text,
                fontSize: '1rem',
                cursor: 'pointer',
                outline: 'none'
              }}
            >
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

          {/* Boutons d'action */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'flex-end'
          }}>
            <button
              type="button"
              onClick={onCancel}
              style={{
                padding: '0.9rem 1.5rem',
                background: theme.btnBg,
                border: `1px solid ${theme.btnBorder}`,
                borderRadius: '10px',
                color: theme.text,
                fontSize: '1rem',
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
              Annuler
            </button>
            <button
              onClick={handleSubmit}
              style={{
                padding: '0.9rem 1.5rem',
                background: `linear-gradient(135deg, ${colorTheme.primary} 0%, ${colorTheme.hover} 100%)`, 
                border: 'none',
                borderRadius: '10px',
                color: '#fff',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${colorTheme.primary}66`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Save size={18} />
              {task ? 'Enregistrer' : 'Créer'}
            </button>
          </div>
        </div>
      </div>

      {/* Animations CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default TaskForm;