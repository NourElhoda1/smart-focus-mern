import React, { useState, useContext, useEffect } from 'react';
import SidebarLayout from '../layout/SidebarLayout';
import ContexteAuth from '../context/ContexteAuth';
import { User, Lock, Save, Clock, Bell, Settings } from 'lucide-react';

const Parametres = () => {
    const { utilisateur, mettreAJourUser } = useContext(ContexteAuth);
    
    // États pour le formulaire
    const [nom, setNom] = useState('');
    const [email, setEmail] = useState('');
    const [motDePasse, setMotDePasse] = useState('');
    const [confirmationMdp, setConfirmationMdp] = useState('');
    const [dureeFocus, setDureeFocus] = useState(25);
    
    const [message, setMessage] = useState(null); // Pour le feedback (Succès/Erreur)

    // Charger les données actuelles au montage
    useEffect(() => {
        if (utilisateur) {
            setNom(utilisateur.nom || '');
            setEmail(utilisateur.email || '');
            // On va chercher la pref dans l'objet preferences s'il existe
            setDureeFocus(utilisateur.preferences?.dureeSessionParDefaut || 25);
        }
    }, [utilisateur]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage(null);

        // Validation mot de passe
        if (motDePasse && motDePasse !== confirmationMdp) {
            setMessage({ type: 'erreur', text: "Les mots de passe ne correspondent pas." });
            return;
        }

        // Préparer l'objet à envoyer
        const donneesAEnvoyer = {
            nom,
            email,
            preferences: {
                dureeSessionParDefaut: Number(dureeFocus)
            }
        };

        // On n'ajoute le mot de passe que s'il a été rempli
        if (motDePasse) {
            donneesAEnvoyer.motDePasse = motDePasse;
        }

        const resultat = await mettreAJourUser(donneesAEnvoyer);

        if (resultat.succes) {
            setMessage({ type: 'succes', text: "Profil mis à jour avec succès ! 🎉" });
            setMotDePasse(''); // Reset champs MDP
            setConfirmationMdp('');
        } else {
            setMessage({ type: 'erreur', text: resultat.message });
        }
    };

    return (
        <SidebarLayout>
            <div className="max-w-4xl mx-auto">
                {/* En-tête */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <Settings className="text-gray-600" size={32} />
                        Paramètres ⚙️
                    </h1>
                    <p className="text-gray-500 mt-2">Personnalise ton expérience Smart Focus.</p>
                </div>

                {/* Message de Feedback */}
                {message && (
                    <div className={`p-4 rounded-xl mb-6 text-center font-medium animate-in fade-in slide-in-from-top-2 ${
                        message.type === 'succes' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    {/* COLONNE GAUCHE : PROFIL */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <User size={20} className="text-blue-500"/>
                                Mon Profil
                            </h2>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nom complet</label>
                                    <input 
                                        type="text" 
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input 
                                        type="email" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Lock size={20} className="text-red-500"/>
                                Sécurité
                            </h2>
                            <p className="text-xs text-gray-400 mb-4">Laisse vide si tu ne veux pas changer de mot de passe.</p>
                            
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nouveau mot de passe</label>
                                    <input 
                                        type="password" 
                                        value={motDePasse}
                                        onChange={(e) => setMotDePasse(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirmer mot de passe</label>
                                    <input 
                                        type="password" 
                                        value={confirmationMdp}
                                        onChange={(e) => setConfirmationMdp(e.target.value)}
                                        placeholder="••••••••"
                                        className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLONNE DROITE : PRÉFÉRENCES */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <Clock size={20} className="text-green-500"/>
                                Préférences Pomodoro
                            </h2>
                            
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Durée de Focus par défaut (minutes)
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <input 
                                            type="range" 
                                            min="15" 
                                            max="60" 
                                            step="5"
                                            value={dureeFocus}
                                            onChange={(e) => setDureeFocus(e.target.value)}
                                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                                        />
                                        <span className="font-bold text-green-600 text-lg w-12 text-center">
                                            {dureeFocus}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-400 mt-2">
                                        Cela modifiera la durée initiale de ton minuteur la prochaine fois que tu lanceras l'application.
                                    </p>
                                </div>

                                {/* Option fictive pour l'exemple IHM */}
                                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Bell size={18} />
                                        <span className="text-sm font-medium">Notifications sonores</span>
                                    </div>
                                    <div className="relative inline-block w-12 mr-2 align-middle select-none transition duration-200 ease-in">
                                        <input type="checkbox" defaultChecked className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer checked:right-0 checked:border-green-500"/>
                                        <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"></label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* BOUTON SAUVEGARDER */}
                        <div className="sticky bottom-6">
                            <button 
                                type="submit"
                                className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl hover:shadow-2xl flex items-center justify-center gap-3 transform hover:-translate-y-1"
                            >
                                <Save size={24} />
                                Sauvegarder les modifications
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </SidebarLayout>
    );
};

export default Parametres;