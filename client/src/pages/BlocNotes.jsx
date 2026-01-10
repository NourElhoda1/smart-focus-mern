import React, { useState, useEffect, useContext } from 'react';
import SidebarLayout from '../layout/SidebarLayout';
import { Plus, Trash2, StickyNote } from 'lucide-react';
import axios from '../api/axios';
import ContexteAuth from '../context/ContexteAuth';
import useTheme from '../hooks/useTheme';

const BlocNotes = () => {
    const { jeton } = useContext(ContexteAuth);
    const { theme, darkMode, colorTheme } = useTheme();
    const [notes, setNotes] = useState([]);

    const couleurs = [
        "bg-yellow-100 border-yellow-200",
        "bg-blue-100 border-blue-200",
        "bg-green-100 border-green-200",
        "bg-pink-100 border-pink-200",
        "bg-purple-100 border-purple-200"
    ];

    const config = { headers: { Authorization: `Bearer ${jeton}` } };

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

    const ajouterNote = async () => {
        try {
            const couleurAleatoire = couleurs[Math.floor(Math.random() * couleurs.length)];
            const res = await axios.post('/notes', { texte: "", couleur: couleurAleatoire }, config);
            setNotes([res.data, ...notes]);
        } catch (err) {
            console.error("Erreur création note", err);
        }
    };

    const handleTextChange = (id, newText) => {
        setNotes(notes.map(note => note._id === id ? { ...note, texte: newText } : note));
    };

    const saveNoteText = async (id, texte) => {
        try {
            await axios.put(`/notes/${id}`, { texte }, config);
        } catch (err) {
            console.error("Erreur sauvegarde texte", err);
        }
    };

    const supprimerNote = async (id) => {
        try {
            await axios.delete(`/notes/${id}`, config);
            setNotes(notes.filter(note => note._id !== id));
        } catch (err) {
            console.error("Erreur suppression", err);
        }
    };

    const changerCouleur = async (id, newColor) => {
        try {
            setNotes(notes.map(note => note._id === id ? { ...note, couleur: newColor } : note));
            await axios.put(`/notes/${id}`, { couleur: newColor }, config);
        } catch (err) {
            console.error("Erreur changement couleur", err);
        }
    };

    return (
        <SidebarLayout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2" style={{ color: theme.text }}>
                        <StickyNote style={{ color: colorTheme.primary }} size={32} />
                        Bloc-notes 
                    </h1>
                    <p style={{ color: theme.textSecondary }}>
                        Tes idées synchronisées dans le cloud.
                    </p>
                </div>
                <button 
                    onClick={ajouterNote}
                    className="text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-colors shadow-lg"
                    style={{ 
                        backgroundColor: colorTheme.primary,
                        boxShadow: `0 4px 14px ${colorTheme.primary}30`
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = colorTheme.hover}
                    onMouseLeave={(e) => e.target.style.backgroundColor = colorTheme.primary}
                >
                    <Plus size={20} />
                    Nouvelle Note
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div 
                        key={note._id} 
                        className={`p-5 rounded-2xl shadow-sm border ${note.couleur} transition-all hover:shadow-md hover:-translate-y-1 group relative flex flex-col h-64`}
                        style={{ color: '#1f2937' }} 
                    >
                        <textarea
                            className="w-full h-full bg-transparent border-none outline-none resize-none font-medium text-lg placeholder-gray-500/50 leading-relaxed"
                            placeholder="Écris quelque chose..."
                            value={note.texte}
                            onChange={(e) => handleTextChange(note._id, e.target.value)}
                            onBlur={(e) => saveNoteText(note._id, e.target.value)}
                            style={{ color: '#1f2937' }}
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
                                            className={`w-4 h-4 rounded-full border border-black/10 ${c.split(' ')[0]} transition-transform hover:scale-125`}
                                        />
                                    ))}
                                </div>
                                <button 
                                    onClick={() => supprimerNote(note._id)}
                                    className="text-red-400 hover:text-red-600 ml-2 transition-colors"
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