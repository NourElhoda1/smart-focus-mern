import React, { useState } from 'react';
import SidebarLayout from '../layout/SidebarLayout';
import Calendrier from '../components/Calendrier';
import useTasks from '../hooks/useTasks';
import useEvents from '../hooks/useEvents';
import useTheme from '../hooks/useTheme';
import { Calendar as CalendarIcon, X, Plus } from 'lucide-react';

const Agenda = () => {
    const { tasks } = useTasks();
    const { events, addEvent, deleteEvent } = useEvents(); 
    const { theme, darkMode, colorTheme } = useTheme();

    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    
    const [formData, setFormData] = useState({
        titre: '',
        heureDebut: '09:00',
        heureFin: '10:00',
        type: 'revision',
        couleur: colorTheme.primary
    });

    const handleAddClick = (date) => {
        setSelectedDate(date);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const start = new Date(selectedDate);
        const [hStart, mStart] = formData.heureDebut.split(':');
        start.setHours(hStart, mStart);

        const end = new Date(selectedDate);
        const [hEnd, mEnd] = formData.heureFin.split(':');
        end.setHours(hEnd, mEnd);

        await addEvent({
            titre: formData.titre,
            dateDebut: start,
            dateFin: end,
            type: formData.type,
            couleur: formData.couleur
        });

        setShowModal(false);
        setFormData({ ...formData, titre: '' });
    };

    const inputStyle = {
        background: theme.inputBg,
        borderColor: theme.inputBorder,
        color: theme.text
    };

    return (
        <SidebarLayout>
            <div className="max-w-6xl mx-auto h-full flex flex-col">
                <div className="mb-6 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: theme.text }}>
                            <CalendarIcon style={{ color: colorTheme.primary }} size={32} />
                            Mon Agenda
                        </h1>
                        <p className="mt-1" style={{ color: theme.textSecondary }}>
                            Planifie tes sessions de révision et examens.
                        </p>
                    </div>
                    <button 
                        onClick={() => handleAddClick(new Date())}
                        className="text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg transition-all"
                        style={{ 
                            backgroundColor: colorTheme.primary,
                            boxShadow: `0 4px 14px ${colorTheme.primary}30`
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = colorTheme.hover}
                        onMouseLeave={(e) => e.target.style.backgroundColor = colorTheme.primary}
                    >
                        <Plus size={20}/> Ajouter un événement
                    </button>
                </div>

                {/* Le Calendrier avec la fonction de suppression */}
                <Calendrier 
                    tasks={tasks} 
                    events={events}
                    theme={theme}
                    colorTheme={colorTheme}
                    onAddClick={handleAddClick}
                    onDeleteEvent={deleteEvent} 
                    onDateClick={(date, t, e) => {
                        console.log("Date:", date, "Tâches:", t, "Events:", e);
                    }}
                />

                {/* MODAL (identique) */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                        <div className="w-full max-w-md p-6 rounded-2xl shadow-2xl animate-scale-in" style={{ background: theme.cardBg }}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold" style={{ color: theme.text }}>
                                    Nouvel Événement
                                </h3>
                                <button onClick={() => setShowModal(false)} style={{ color: theme.textSecondary }}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                                        Titre
                                    </label>
                                    <input 
                                        type="text" 
                                        required
                                        placeholder="Ex: Cours de Maths"
                                        value={formData.titre}
                                        onChange={e => setFormData({...formData, titre: e.target.value})}
                                        className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2"
                                        style={inputStyle}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                                            Début
                                        </label>
                                        <input 
                                            type="time" 
                                            required
                                            value={formData.heureDebut}
                                            onChange={e => setFormData({...formData, heureDebut: e.target.value})}
                                            className="w-full p-3 rounded-xl border"
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                                            Fin
                                        </label>
                                        <input 
                                            type="time" 
                                            required
                                            value={formData.heureFin}
                                            onChange={e => setFormData({...formData, heureFin: e.target.value})}
                                            className="w-full p-3 rounded-xl border"
                                            style={inputStyle}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                                        Type & Couleur
                                    </label>
                                    <div className="flex gap-3 mt-2">
                                        {[
                                            { type: 'cours', color: '#3b82f6', label: 'Cours' },
                                            { type: 'examen', color: '#ef4444', label: 'Examen' },
                                            { type: 'revision', color: colorTheme.primary, label: 'Révision' },
                                            { type: 'autre', color: '#a855f7', label: 'Autre' }
                                        ].map((opt) => (
                                            <button
                                                key={opt.type}
                                                type="button"
                                                onClick={() => setFormData({...formData, type: opt.type, couleur: opt.color})}
                                                className={`flex-1 py-2 text-xs font-bold rounded-lg border-2 transition-all ${
                                                    formData.type === opt.type ? 'opacity-100 scale-105' : 'opacity-60 grayscale'
                                                }`}
                                                style={{ 
                                                    borderColor: opt.color, 
                                                    backgroundColor: formData.type === opt.type ? opt.color : 'transparent',
                                                    color: formData.type === opt.type ? '#fff' : opt.color
                                                }}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button 
                                    onClick={handleSubmit}
                                    className="w-full py-3 mt-4 text-white rounded-xl font-bold transition-colors"
                                    style={{ backgroundColor: colorTheme.primary }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = colorTheme.hover}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = colorTheme.primary}
                                >
                                    Enregistrer
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </SidebarLayout>
    );
};

export default Agenda;