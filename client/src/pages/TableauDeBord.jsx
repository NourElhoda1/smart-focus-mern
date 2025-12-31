import React, { useContext, useEffect, useState } from 'react';
import ContexteAuth from '../context/ContexteAuth';
import SidebarLayout from '../layout/SidebarLayout';
import { Clock, CheckCircle, TrendingUp } from 'lucide-react';
import axios from '../api/axios';

const TableauDeBord = () => {
    const { utilisateur, jeton } = useContext(ContexteAuth);
    const [stats, setStats] = useState({ totalMinutes: 0, nombreSessions: 0 });

    // Récupérer les stats au chargement
    useEffect(() => {
        const fetchStats = async () => {
            if (!jeton) return;
            try {
                const config = { headers: { Authorization: `Bearer ${jeton}` } };
                const res = await axios.get('/session/stats', config);
                setStats(res.data);
            } catch (err) {
                console.error("Erreur chargement stats", err);
            }
        };
        fetchStats();
    }, [jeton]);

    // Fonction pour convertir minutes en Heures h Minutes (ex: 125 min -> 2 h 05)
    const formatDuree = (totalMinutes) => {
        const h = Math.floor(totalMinutes / 60);
        const m = Math.round(totalMinutes % 60); // On arrondit
        if (h === 0) return `${m} min`;
        return `${h} h ${m < 10 ? '0' + m : m}`;
    };

    return (
        <SidebarLayout>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">Vue d'ensemble 📊</h1>
                <p className="text-gray-500 mt-2">Bon retour, <span className="text-green-600 font-semibold">{utilisateur?.nom}</span>.</p>
            </div>

            {/* Cartes Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* CARTE TEMPS FOCUS (DYNAMIQUE) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                            <Clock size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Temps Focus Total</p>
                            <p className="text-2xl font-bold text-gray-800">
                                {formatDuree(stats.totalMinutes)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CARTE SESSIONS */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-50 text-green-600 rounded-xl">
                            <CheckCircle size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Sessions Terminées</p>
                            <p className="text-2xl font-bold text-gray-800">{stats.nombreSessions}</p>
                        </div>
                    </div>
                </div>
                
                {/* CARTE PRODUCTIVITÉ (Exemple statique) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                            <TrendingUp size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Productivité</p>
                            <p className="text-2xl font-bold text-gray-800">Top 🚀</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-3xl p-10 border border-gray-100 text-center shadow-sm">
                <h3 className="text-lg font-semibold text-gray-700">Continue comme ça !</h3>
                <p className="text-gray-400 text-sm">Chaque minute compte pour atteindre tes objectifs.</p>
            </div>
        </SidebarLayout>
    );
};

export default TableauDeBord;