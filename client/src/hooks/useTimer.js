import { useEffect } from 'react';

const useTimer = (tasks, onTimeUpdate) => {
  useEffect(() => {
    if (!tasks || tasks.length === 0) return;
    
    const interval = setInterval(() => {
      tasks.forEach(task => {
        if (task.is_running && task.time_remaining > 0) {
          const newTimeRemaining = Math.max(0, task.time_remaining - 1);
          const newTimeSpent = (task.time_spent || 0) + 1;
          
          if (onTimeUpdate) {
            onTimeUpdate(task.id, {
              time_remaining: newTimeRemaining,
              time_spent: newTimeSpent,
              is_running: newTimeRemaining > 0
            });
          }
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks, onTimeUpdate]);
};

export default useTimer;