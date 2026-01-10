import { useState, useEffect, useCallback, useContext } from 'react';
import axios from '../api/axios';
import ContexteAuth from '../context/ContexteAuth';

const useEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { jeton } = useContext(ContexteAuth);

  const loadEvents = useCallback(async () => {
    if (!jeton) return;
    try {
      setLoading(true);
      const config = { headers: { Authorization: `Bearer ${jeton}` } };
      const res = await axios.get('/evenements', config); 
      setEvents(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger l'agenda");
    } finally {
      setLoading(false);
    }
  }, [jeton]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);


  const addEvent = useCallback(async (eventData) => {
    try {
      const config = { headers: { Authorization: `Bearer ${jeton}` } };
      const res = await axios.post('/evenements', eventData, config);
      setEvents(prev => [...prev, res.data].sort((a, b) => new Date(a.dateDebut) - new Date(b.dateDebut)));
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || err.message);
      return null;
    }
  }, [jeton]);

  const deleteEvent = useCallback(async (id) => {
    try {
      const config = { headers: { Authorization: `Bearer ${jeton}` } };
      await axios.delete(`/evenements/${id}`, config);
      setEvents(prev => prev.filter(e => e._id !== id));
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }, [jeton]);

  return {
    events,
    loading,
    error,
    addEvent,
    deleteEvent,
    refreshEvents: loadEvents
  };
};

export default useEvents;