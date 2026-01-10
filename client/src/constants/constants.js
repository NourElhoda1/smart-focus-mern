
export const PRIORITY_COLORS = {
  haute: '#ef4444',   // Rouge
  moyenne: '#f59e0b', // Orange
  basse: '#00a63e'    // Votre Vert
}

export const TASK_STATES = {
  TODO: 'à faire',
  IN_PROGRESS: 'en cours',
  COMPLETED: 'terminé'
};

// Niveaux de priorité
export const PRIORITY_LEVELS = {
  HIGH: 'haute',
  MEDIUM: 'moyenne',
  LOW: 'basse'
};

// Durées par défaut
export const DEFAULT_TIMES = {
  ESTIMATED_TIME: 30,
  EXTEND_SHORT: 15,
  EXTEND_LONG: 30,
  WARNING_THRESHOLD: 300
};

// Configuration du timer
export const TIMER_CONFIG = {
  UPDATE_INTERVAL: 1000,
  SAVE_INTERVAL: 5000
};

// Clés localStorage
export const STORAGE_KEYS = {
  TASKS: 'tasks',
  THEME: 'theme',
  NOTIFICATIONS_ENABLED: 'notificationsEnabled',
  AUTH_TOKEN: 'jeton',
  USER_DATA: 'utilisateur'
};

// Thèmes
export const THEMES = {
  light: {
    // VOS COULEURS EXACTES
    background: '#f1f1f1ff',   // Fond gris très clair
    sidebar: '#ffffff',      // Sidebar blanche
    cardBg: '#ffffff',       // Cartes blanches
    text: '#1e2939',         // Texte gris foncé/noir doux
    primary: '#00a63e',      // Votre Vert Focus
    
    textSecondary: '#64748b', // Gris moyen pour les sous-titres
    
    // Bordures et Survel
    cardBorder: '#e2e8f0',
    cardBgHover: '#f1f5f9',
    
    // Inputs
    inputBg: '#ffffff',
    inputBorder: '#cbd5e1',
    inputFocus: 'rgba(0, 166, 62, 0.2)', // Halo vert
    
    // Boutons
    btnBg: '#f3f4f6',
    btnBorder: '#e5e7eb',
    btnHover: '#e5e7eb',
    
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
    boxShadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
  },
  
  dark: {
    // L'OPPOSÉ DOUX (Mode Étude Nuit)
    background: '#0f172a',   // Fond très sombre (plus foncé que votre texte)
    sidebar: '#1e2939',      // Votre couleur text devient le fond des cartes
    cardBg: '#1e2939',       // Idem pour les cartes
    text: '#f9fafb',         // Votre fond clair devient le texte
    primary: '#00a63e',      // On garde le même vert (ou légèrement plus clair #22c55e si besoin)
    
    textSecondary: '#94a3b8',
    
    // Bordures et Survel
    cardBorder: '#334155',
    cardBgHover: '#334155',
    
    // Inputs
    inputBg: '#0f172a',
    inputBorder: '#334155',
    inputFocus: 'rgba(0, 166, 62, 0.3)',
    
    // Boutons
    btnBg: '#374151',
    btnBorder: '#4b5563',
    btnHover: '#4b5563',
    
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
    boxShadowHover: '0 10px 15px -3px rgba(0, 0, 0, 0.7)'
  }
};

// Messages
export const MESSAGES = {
  NO_TASKS: 'Aucune tâche pour le moment. Commencez par en créer une ! 🚀',
  NO_FILTERED_TASKS: '🔍 Aucune tâche ne correspond aux filtres',
  TASK_ADDED: 'Tâche créée avec succès',
  TASK_UPDATED: 'Tâche mise à jour',
  TASK_DELETED: 'Tâche supprimée',
  TASK_COMPLETED: 'Tâche terminée ! 🎉',
  TIME_WARNING_5MIN: 'Plus que 5 minutes !',
  TIME_WARNING_1MIN: 'Plus qu\'une minute !',
  TIME_EXPIRED: 'Temps écoulé !'
};

// Types de notifications
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
};

// Durée d'affichage des notifications
export const NOTIFICATION_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000
};

// Filtres par défaut
export const DEFAULT_FILTERS = {
  PRIORITY: 'toutes',
  STATE: 'tous',
  SEARCH: ''
};

// Configuration API (Adaptée pour Smart Focus)
export const API_CONFIG = {
  // Utilisation de import.meta.env pour Vite au lieu de process.env
  // Le port par défaut est 8000 selon votre server.js
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000/v1',
  
  // Endpoints correspondants à votre server.js
  ENDPOINTS: {
    TASKS: '/',            // Route montée sur /v1 dans server.js
    AUTH: '/utilisateur',  // Route montée sur /v1/utilisateur
    NOTES: '/notes',       // Route montée sur /v1/notes
    SESSIONS: '/'          // Sessions probablement gérées dans sessionRoute
  },
  TIMEOUT: 10000
};

export default {
  PRIORITY_COLORS,
  TASK_STATES,
  PRIORITY_LEVELS,
  DEFAULT_TIMES,
  TIMER_CONFIG,
  STORAGE_KEYS,
  THEMES,
  MESSAGES,
  NOTIFICATION_TYPES,
  NOTIFICATION_DURATION,
  DEFAULT_FILTERS,
  API_CONFIG
};