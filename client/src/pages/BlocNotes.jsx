import React, { useState, useEffect, useContext } from 'react';
import SidebarLayout from '../layout/SidebarLayout';
import { Plus, Trash2, StickyNote } from 'lucide-react';
import axios from '../api/axios';
import ContexteAuth from '../context/ContexteAuth';

const BlocNotes = () => {
    const { jeton } = useContext(ContexteAuth);
    const [notes, setNotes] = useState([]);

    const couleurs = [
        "bg-yellow-100 border-yellow-200",
        "bg-blue-100 border-blue-200",
        "bg-green-100 border-green-200",
        "bg-pink-100 border-pink-200",
        "bg-purple-100 border-purple-200"
    ];

    // Configuration du header avec le token
    const config = { headers: { Authorization: `Bearer ${jeton}` } };

    // 1. Charger les notes depuis la DB
    useEffect(() => {
        const fetchNotes = async () => {
            if (!jeton) return;
            try {
                const res = await axios.get('/notes', config);
                setNotes(res.data);
            } catch (err) {
                console.error("Erreur chargement notes", err);
            }
        };
        fetchNotes();
    }, [jeton]);

    // 2. Ajouter une note
    const ajouterNote = async () => {
        try {
            const couleurAleatoire = couleurs[Math.floor(Math.random() * couleurs.length)];
            const res = await axios.post('/notes', { texte: "", couleur: couleurAleatoire }, config);
            setNotes([res.data, ...notes]);
        } catch (err) {
            console.error("Erreur création note", err);
        }
    };

    // 3. Gestion locale du texte (pour que ce soit fluide quand on tape)
    const handleTextChange = (id, newText) => {
        setNotes(notes.map(note => note._id === id ? { ...note, texte: newText } : note));
    };

    // 4. Sauvegarder en DB quand on quitte le champ (onBlur)
    const saveNoteText = async (id, texte) => {
        try {
            await axios.put(`/notes/${id}`, { texte }, config);
        } catch (err) {
            console.error("Erreur sauvegarde texte", err);
        }
    };

    // 5. Supprimer une note
    const supprimerNote = async (id) => {
        try {
            await axios.delete(`/notes/${id}`, config);
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            console.error("Erreur suppression", err);
        }
    };

    // 6. Changer la couleur
    const changerCouleur = async (id, newColor) => {
        try {
            // Mise à jour optimiste (Interface d'abord)
            setNotes(notes.map(note => note._id === id ? { ...note, couleur: newColor } : note));
            // Puis sauvegarde DB
            await axios.put(`/notes/${id}`, { couleur: newColor }, config);
        } catch (err) {
            console.error("Erreur changement couleur", err);
        }
    };

    return (
        <SidebarLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <StickyNote className="text-yellow-500" size={32} />
                        Bloc-notes 📝
                    </h1>
                    <p className="text-gray-500">Tes idées synchronisées dans le cloud.</p>
                </div>
                <button 
                    onClick={ajouterNote}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30">
                    <Plus size={20} />
                    Ajouter
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div 
                        key={note._id} 
                        className={`p-5 rounded-2xl shadow-sm border ${note.couleur} transition-all hover:shadow-md hover:-translate-y-1 group relative flex flex-col h-64`}
                    >
                        <textarea
                            className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-700 font-medium text-lg placeholder-gray-400/70 leading-relaxed"
                            placeholder="Écris quelque chose..."
                            value={note.texte}
                            onChange={(e) => handleTextChange(note._id, e.target.value)}
                            onBlur={(e) => saveNoteText(note._id, e.target.value)}
                        ></textarea>

                        <div className="flex justify-between items-center mt-4 pt-2 border-t border-black/5 opacity-80">
                            <span className="text-xs font-bold text-gray-500">
                                {new Date(note.updatedAt).toLocaleDateString()}
                            </span>
                            
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="flex gap-1">
                                    {couleurs.map((c, index) => (
                                        <button 
                                            key={index}
                                            onClick={() => changerCouleur(note._id, c)}
                                            className={`w-4 h-4 rounded-full border border-black/10 ${c.split(' ')[0]}`}
                                        />
                                    ))}
                                </div>
                                <button 
                                    onClick={() => supprimerNote(note._id)}
                                    className="text-red-400 hover:text-red-600 ml-2"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </SidebarLayout>
    );
};

export default BlocNotes;