import React, { useContext } from 'react';
import ContexteAuth from '../context/ContexteAuth';
import SidebarLayout from '../layout/SidebarLayout'; 
import { 
    Clock,
    CheckCircle,
    TrendingUp
 } from 'lucide-react';

const TableauDeBord = () => {
    const { utilisateur } = useContext(ContexteAuth);

    return (
        <SidebarLayout>
            
            {/* En-tête de la page */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Bonjour, <span className="text-green-600">{utilisateur?.nom}</span> 👋
                </h1>
                <p className="text-gray-500 mt-2">Voici un aperçu de ta productivité aujourd'hui.</p>
            </div>

            {/* Cartes Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Carte 1 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
                            <Clock size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Temps Focus</p>
                            <p className="text-2xl font-bold text-gray-800">0 min</p>
                        </div>
                    </div>
                </div>

                {/* Carte 2 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-green-50 text-green-600 rounded-xl">
                            <CheckCircle size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Tâches Finies</p>
                            <p className="text-2xl font-bold text-gray-800">0 / 0</p>
                        </div>
                    </div>
                </div>

                {/* Carte 3 */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                    <div className="flex items-center gap-4">
                        <div className="p-4 bg-purple-50 text-purple-600 rounded-xl">
                            <TrendingUp size={28} />
                        </div>
                        <div>
                            <p className="text-gray-500 text-sm font-medium">Productivité</p>
                            <p className="text-2xl font-bold text-gray-800">+0%</p>
                        </div>
                    </div>
                </div>
            </div>


            {/* Section vide */}
            <div className="bg-white rounded-3xl p-10 border border-gray-100 text-center shadow-sm">
                <div className="max-w-md mx-auto">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">Ta journée est vide pour l'instant</h3>
                    <p className="text-gray-500 mb-6">Ajoute des tâches pour commencer à suivre ta productivité.</p>
                    <button className="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30">
                        + Nouvelle Tâche
                    </button>
                </div>
            </div>

        </SidebarLayout>
    );
};

export default TableauDeBord;