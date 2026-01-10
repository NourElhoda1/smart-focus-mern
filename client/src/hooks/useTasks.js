import { useState, useEffect, useCallback, useContext } from 'react';
import axios from '../api/axios';
import ContexteAuth from '../context/ContexteAuth';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jeton } = useContext(ContexteAuth);

  const mapDbToUi = (t) => ({
    id: t._id, 
    name: t.titre,
    priority: t.estUrgent ? 'haute' : (t.estImportant ? 'moyenne' : 'basse'),
    estimated_time: (t.tempsEstime || 0) * 60,
    time_spent: 0, 
    time_remaining: (t.tempsEstime || 0) * 60,
    state: mapStatusDbToUi(t.statut),
    is_running: false
  });

  const mapUiToDb = (taskData) => ({
    titre: taskData.name,
    tempsEstime: Math.floor(taskData.estimated_time / 60),
    statut: mapStatusUiToDb(taskData.state),
    estUrgent: taskData.priority === 'haute',
    estImportant: taskData.priority === 'moyenne' || taskData.priority === 'haute'
  });

  const mapStatusDbToUi = (status) => {
    const map = { 'a_faire': 'à faire', 'en_cours': 'en cours', 'termine': 'terminé' };
    return map[status] || 'à faire';
  };

  const mapStatusUiToDb = (state) => {
    const map = { 'à faire': 'a_faire', 'en cours': 'en_cours', 'terminé': 'termine' };
    return map[state] || 'a_faire';
  };

  const loadTasks = useCallback(async () => {
    if (!jeton) return;
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${jeton}` } };
      
      const res = await axios.get('/taches', config); 
      
      let taskArray = [];
      if (res.data && res.data.donnees && Array.isArray(res.data.donnees.docs)) {
          taskArray = res.data.donnees.docs;
      } else if (res.data && Array.isArray(res.data.donnees)) {
          taskArray = res.data.donnees;
      }

      const adaptedTasks = taskArray.map(mapDbToUi);
      setTasks(adaptedTasks);
      setError(null);
    } catch (err) {
      console.error("Erreur chargement tâches:", err);
      setError("Impossible de charger les tâches");
    } finally {
      setLoading(false);
    }
  }, [jeton]);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);


  const addTask = useCallback(async (taskData) => {
    try {
      const config = { headers: { Authorization: `Bearer ${jeton}` } };
      const mongoTask = mapUiToDb(taskData);
      const res = await axios.post('/tache', mongoTask, config);
      const serverData = res.data.donnees || res.data;
      const newTask = mapDbToUi(serverData);
      
      setTasks(prev => [newTask, ...prev]);
      return newTask;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return null;
    }
  }, [jeton]);

  const updateTask = useCallback(async (id, updates) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));

    if (updates.time_remaining !== undefined || updates.is_running !== undefined) {
      return true;
    }
    return true; 
  }, [jeton]);

  const saveTaskFull = async (id, taskData) => {
      try {
        const config = { headers: { Authorization: `Bearer ${jeton}` } };
        const mongoTask = mapUiToDb(taskData);
        
        const res = await axios.put(`/tache/${id}`, mongoTask, config);
        
        const serverData = res.data.donnees || res.data;
        const updatedTask = mapDbToUi(serverData);
        
        setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
        return true;
      } catch (err) {
          setError("Erreur de sauvegarde");
          return false;
      }
  };

  const deleteTask = useCallback(async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${jeton}` } };
      await axios.delete(`/tache/${id}`, config);
      setTasks(prev => prev.filter(t => t.id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [jeton]);

  const changeState = useCallback(async (id, newState) => {
    try {
      const config = { headers: { Authorization: `Bearer ${jeton}` } };
      const dbStatus = mapStatusUiToDb(newState);
      
      const res = await axios.put(`/tache/${id}`, { statut: dbStatus }, config);
      
      const serverData = res.data.donnees || res.data;
      const updatedTask = mapDbToUi(serverData);
      
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [jeton]);

  const toggleTimer = useCallback((id) => {
    setTasks(prev => prev.map(task =>
      task.id === id
        ? { ...task, is_running: !task.is_running }
        : task
    ));
  }, []);

  const extendTime = useCallback((id, minutes) => {
    const seconds = minutes * 60;
    setTasks(prev => prev.map(task =>
      task.id === id
        ? {
            ...task,
            estimated_time: task.estimated_time + seconds,
            time_remaining: task.time_remaining + seconds
          }
        : task
    ));
  }, []);

  return {
    tasks,
    loading,
    error,
    addTask,
    saveTaskFull,
    updateTask,
    deleteTask,
    toggleTimer,
    extendTime,
    changeState,
    refreshTasks: loadTasks
  };
};

export default useTasks;