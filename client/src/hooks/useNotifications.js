import { useState, useEffect, useCallback } from 'react';
import { NOTIFICATION_DURATION, STORAGE_KEYS, MESSAGES, DEFAULT_TIMES } from '../constants/constants';
import { loadFromLocalStorage, saveToLocalStorage } from '../utils/helpers';

const useNotifications = (tasks) => {
  const [notifications, setNotifications] = useState([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    const savedEnabled = loadFromLocalStorage(STORAGE_KEYS.NOTIFICATIONS_ENABLED, true);
    setEnabled(savedEnabled);
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    saveToLocalStorage(STORAGE_KEYS.NOTIFICATIONS_ENABLED, enabled);
  }, [enabled]);

  const addNotification = useCallback((message, type = 'info', taskName = '') => {
    const id = Date.now();
    const notification = { id, message, type, taskName, timestamp: new Date().toISOString() };

    setNotifications(prev => [notification, ...prev].slice(0, 5));

    setTimeout(() => {
      removeNotification(id);
    }, NOTIFICATION_DURATION.MEDIUM);

    if (enabled && 'Notification' in window && Notification.permission === 'granted') {
      new Notification('Smart Focus', {
        body: `${taskName ? taskName + ' : ' : ''}${message}`,
      });
    }
  }, [enabled]);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const toggleNotifications = useCallback(() => {
    setEnabled(prev => !prev);
  }, []);

  // Surveillance des alertes
  useEffect(() => {
    if (!tasks) return;
    const checkAlerts = () => {
      tasks.forEach(task => {
        if (!task.is_running) return;
        if (task.time_remaining === DEFAULT_TIMES.WARNING_THRESHOLD) {
          addNotification(MESSAGES.TIME_WARNING_5MIN, 'warning', task.name);
        }
        if (task.time_remaining === 60) {
          addNotification(MESSAGES.TIME_WARNING_1MIN, 'error', task.name);
        }
        if (task.time_remaining === 0) {
          addNotification(MESSAGES.TIME_EXPIRED, 'error', task.name);
        }
      });
    };
    const interval = setInterval(checkAlerts, 1000);
    return () => clearInterval(interval);
  }, [tasks, addNotification]);

  return { notifications, enabled, addNotification, removeNotification, toggleNotifications };
};

export default useNotifications;