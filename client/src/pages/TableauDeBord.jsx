import React, { useContext, useEffect, useState } from 'react';
import ContexteAuth from '../context/ContexteAuth';
import SidebarLayout from '../layout/SidebarLayout';
import { Clock, CheckCircle, TrendingUp } from 'lucide-react';
import axios from '../api/axios';
import useTasks from '../hooks/useTasks';
import useEvents from '../hooks/useEvents';
import useTheme from '../hooks/useTheme';
import Statistics from '../components/Statistics';
import Calendrier from '../components/Calendrier';
import { calculateStatistics } from '../utils/helpers';

const TableauDeBord = () => {
    const { utilisateur, jeton } = useContext(ContexteAuth);
    const [sessionStats, setSessionStats] = useState({ totalMinutes: 0, nombreSessions: 0 });
    const { tasks } = useTasks(); 
    const { events } = useEvents();
    const { theme, darkMode, colorTheme } = useTheme(); 
    const taskStats = calculateStatistics(tasks);

    useEffect(() => {
        const fetchStats = async () => {
            if (!jeton) return;
            try {
                const config = { headers: { Authorization: `Bearer ${jeton}` } };
                const res = await axios.get('/session/stats', config);
                setSessionStats(res.data);
            } catch (err) {
                console.error("Erreur chargement stats sessions", err);
            }
        };
        fetchStats();
    }, [jeton]);

    const formatDuree = (totalMinutes) => {
        const h = Math.floor(totalMinutes / 60);
        const m = Math.round(totalMinutes % 60);
        if (h === 0) return `${m} min`;
        return `${h} h ${m < 10 ? '0' + m : m}`;
    };

    return (
        <SidebarLayout>
            <div style={{
                background: darkMode ? '#0f172a' : '#fff',
                minHeight: '100vh',
                paddingBottom: '2rem',
                transition: 'background 0.3s'
            }}>
                {/* En-tête Dashboard */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 
                            className="text-3xl font-bold"
                            style={{ color: theme.text }} 
                        >
                            Vue d'ensemble 
                        </h1>
                        <p style={{ color: theme.textSecondary }} className="mt-2">
                            Bon retour, <span 
                                className="font-semibold"
                                style={{ color: colorTheme.primary }}
                            >
                                {utilisateur?.nom}
                            </span>.
                        </p>
                    </div>
                </div>

                {/* Section Statistiques des Tâches (Intégrée sans bouton) */}
                <div className="mb-8 animate-fade-in-down">
                    <Statistics stats={taskStats} theme={theme} colorTheme={colorTheme} /> 
                </div>

                {/* 2ème Partie : Grille Calendrier & Statistiques */}
                <div className="flex flex-col">
                    <Calendrier tasks={tasks} events={events} theme={theme} colorTheme={colorTheme} /> 
                </div>
            </div>
            
            <style>{`
                .animate-fade-in-down {
                    animation: fadeInDown 0.5s ease-out;
                }
                @keyframes fadeInDown {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </SidebarLayout>
    );
};

export default TableauDeBord;