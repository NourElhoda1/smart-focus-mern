import React from 'react';
import SidebarLayout from '../layout/SidebarLayout';
import { Plus } from 'lucide-react';

const Taches = () => {
    return (
        <SidebarLayout>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Mes Tâches</h1>
                <button className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30">
                    <Plus size={20} />
                    Ajouter
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <p className="text-gray-500">Ta liste de tâches est vide pour le moment.</p>
                <p className="text-sm text-gray-400 mt-2">Connecte bientôt la base de données !</p>
            </div>
        </SidebarLayout>
    );
};

export default Taches;