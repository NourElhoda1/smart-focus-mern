import React, { useState, useEffect } from 'react';
import SidebarLayout from '../layout/SidebarLayout';
import { Plus, Trash2, Save, StickyNote } from 'lucide-react';

const BlocNotes = () => {
    // Couleurs disponibles pour les notes
    const couleurs = [
        "bg-yellow-100 border-yellow-200", // Jaune Classique
        "bg-blue-100 border-blue-200",     // Bleu Doux
        "bg-green-100 border-green-200",   // Vert Nature
        "bg-pink-100 border-pink-200",     // Rose Pastel
        "bg-purple-100 border-purple-200"  // Violet Rêve
    ];

    // Charger les notes depuis le LocalStorage au démarrage
    const [notes, setNotes] = useState(() => {
        const saved = localStorage.getItem("sf_notes");
        return saved ? JSON.parse(saved) : [
            { id: 1, text: "Idée de projet : Une app de productivité...", date: new Date().toLocaleDateString(), color: "bg-yellow-100 border-yellow-200" }
        ];
    });

    // Sauvegarder à chaque changement
    useEffect(() => {
        localStorage.setItem("sf_notes", JSON.stringify(notes));
    }, [notes]);

    // Ajouter une nouvelle note vide
    const ajouterNote = () => {
        const nouvelleNote = {
            id: Date.now(),
            text: "",
            date: new Date().toLocaleDateString(),
            color: couleurs[Math.floor(Math.random() * couleurs.length)] // Couleur aléatoire
        };
        setNotes([nouvelleNote, ...notes]);
    };

    // Mettre à jour le texte d'une note
    const updateNote = (id, newText) => {
        setNotes(notes.map(note => note.id === id ? { ...note, text: newText } : note));
    };

    // Supprimer une note
    const supprimerNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    // Changer la couleur d'une note
    const changerCouleur = (id, newColor) => {
        setNotes(notes.map(note => note.id === id ? { ...note, color: newColor } : note));
    };

    return (
        <SidebarLayout>
            {/* En-tête */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                        <StickyNote className="text-yellow-500" size={32} />
                        Bloc-notes 📝
                    </h1>
                    <p className="text-gray-500">Capture tes idées rapidement.</p>
                </div>
                <button 
                    onClick={ajouterNote}
                    className="bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-green-700 transition-colors shadow-lg shadow-green-500/30">
                    <Plus size={20} />
                    Ajouter
                </button>
            </div>

            {/* Grille de Notes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {notes.map((note) => (
                    <div 
                        key={note.id} 
                        className={`p-5 rounded-2xl shadow-sm border ${note.color} transition-all hover:shadow-md hover:-translate-y-1 group relative flex flex-col h-64`}
                    >
                        {/* Zone de texte */}
                        <textarea
                            className="w-full h-full bg-transparent border-none outline-none resize-none text-gray-700 font-medium text-lg placeholder-gray-400/70 leading-relaxed"
                            placeholder="Écris quelque chose..."
                            value={note.text}
                            onChange={(e) => updateNote(note.id, e.target.value)}
                        ></textarea>

                        {/* Pied de la note (Date + Actions) */}
                        <div className="flex justify-between items-center mt-4 pt-2 border-t border-black/5 opacity-80">
                            <span className="text-xs font-bold text-gray-500">{note.date}</span>
                            
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {/* Palette de couleurs (au survol) */}
                                <div className="flex gap-1">
                                    {couleurs.map((c, index) => (
                                        <button 
                                            key={index}
                                            onClick={() => changerCouleur(note.id, c)}
                                            className={`w-4 h-4 rounded-full border border-black/10 ${c.split(' ')[0]}`}
                                        />
                                    ))}
                                </div>
                                
                                <button 
                                    onClick={() => supprimerNote(note.id)}
                                    className="text-red-400 hover:text-red-600 ml-2"
                                    title="Supprimer"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* État vide */}
                {notes.length === 0 && (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                        <StickyNote size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-gray-400 text-lg">C'est vide ici ! Ajoute une note pour commencer.</p>
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
};

export default BlocNotes;