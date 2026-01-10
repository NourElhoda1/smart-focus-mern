// ========================================
// FONCTIONS UTILITAIRES
// ========================================
// Fichier : src/utils/helpers.js

import { PRIORITY_COLORS, DEFAULT_TIMES, STORAGE_KEYS } from '../constants/constants';

/**
 * Formate le temps en secondes vers format "Xh Ym Zs"
 */
export const formatTime = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hrs > 0 ? hrs + 'h ' : ''}${mins}m ${secs}s`;
};

/**
 * Obtient la couleur d'une priorité
 */
export const getPriorityColor = (priority) => {
  return PRIORITY_COLORS[priority] || PRIORITY_COLORS.moyenne;
};

/**
 * Calcule le pourcentage de progression d'une tâche
 */
export const calculateProgress = (timeSpent, estimated_time) => {
  if (estimated_time === 0) return 0;
  return Math.min((timeSpent / estimated_time) * 100, 100);
};

/**
 * Vérifie si une tâche est en alerte (temps presque écoulé)
 */
export const isTaskInWarning = (timeRemaining) => {
  return timeRemaining > 0 && timeRemaining <= DEFAULT_TIMES.WARNING_THRESHOLD;
};

/**
 * Génère un ID unique
 */
export const generateUniqueId = () => {
  return Date.now() + Math.random().toString(36).substr(2, 9);
};

/**
 * Sauvegarde dans localStorage
 */
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error('Erreur lors de la sauvegarde:', error);
    return false;
  }
};

/**
 * Charge depuis localStorage
 */
export const loadFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Erreur lors du chargement:', error);
    return defaultValue;
  }
};

/**
 * Valide les données d'une tâche
 */
export const validateTaskData = (taskData) => {
  const errors = [];
  
  if (!taskData.name || taskData.name.trim() === '') {
    errors.push('Le nom de la tâche est obligatoire');
  }
  
  if (taskData.estimated_time <= 0) {
    errors.push('Le temps estimé doit être positif');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Trie les tâches par priorité et état
 */
export const sortTasks = (tasks) => {
  const priorityOrder = { haute: 0, moyenne: 1, basse: 2 };
  const stateOrder = { 'en cours': 0, 'à faire': 1, 'terminé': 2 };
  
  return [...tasks].sort((a, b) => {
    // D'abord par état
    const stateCompare = stateOrder[a.state] - stateOrder[b.state];
    if (stateCompare !== 0) return stateCompare;
    
    // Puis par priorité
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

/**
 * Filtre les tâches selon les critères
 */
export const filterTasks = (tasks, filters) => {
  let result = [...tasks];
  
  // Filtre par recherche
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    result = result.filter(task =>
      task.name.toLowerCase().includes(filters.searchQuery.toLowerCase())
    );
  }
  
  // Filtre par priorité
  if (filters.priority && filters.priority !== 'toutes') {
    result = result.filter(task => task.priority === filters.priority);
  }
  
  // Filtre par état
  if (filters.state && filters.state !== 'tous') {
    result = result.filter(task => task.state === filters.state);
  }
  
  return result;
};

/**
 * Calcule les statistiques globales
 */
export const calculateStatistics = (tasks) => {
  const total = tasks.length;
  
  const byState = {
    'à faire': tasks.filter(t => t.state === 'à faire').length,
    'en cours': tasks.filter(t => t.state === 'en cours').length,
    'terminé': tasks.filter(t => t.state === 'terminé').length
  };
  
  const byPriority = {
    haute: tasks.filter(t => t.priority === 'haute').length,
    moyenne: tasks.filter(t => t.priority === 'moyenne').length,
    basse: tasks.filter(t => t.priority === 'basse').length
  };
  
  const totalTimeSpent = tasks.reduce((sum, task) => sum + task.time_spent, 0);
  const totalTimeEstimated = tasks.reduce((sum, task) => sum + task.estimated_time, 0);
  
  const progress = totalTimeEstimated > 0
    ? (totalTimeSpent / totalTimeEstimated) * 100
    : 0;
  
  return {
    total,
    byState,
    byPriority,
    totalTimeSpent,
    totalTimeEstimated,
    progress
  };
};

/**
 * Formatte une date en format lisible
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

/**
 * Exporte les tâches en JSON
 */
export const exportTasksToJSON = (tasks) => {
  const dataStr = JSON.stringify(tasks, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `tasks-${Date.now()}.json`;
  link.click();
};

/**
 * Importe des tâches depuis JSON
 */
export const importTasksFromJSON = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const tasks = JSON.parse(e.target.result);
        resolve(tasks);
      } catch (error) {
        reject(new Error('Fichier JSON invalide'));
      }
    };
    reader.onerror = () => reject(new Error('Erreur de lecture du fichier'));
    reader.readAsText(file);
  });
};

export default {
  formatTime,
  getPriorityColor,
  calculateProgress,
  isTaskInWarning,
  generateUniqueId,
  saveToLocalStorage,
  loadFromLocalStorage,
  validateTaskData,
  sortTasks,
  filterTasks,
  calculateStatistics,
  formatDate,
  exportTasksToJSON,
  importTasksFromJSON
};
