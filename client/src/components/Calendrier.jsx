import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalIcon, Plus, Trash2 } from 'lucide-react';

const Calendrier = ({ tasks = [], events = [], theme, colorTheme, onDateClick, onAddClick, onDeleteEvent }) => {

  const [currentDate, setCurrentDate] = useState(new Date());
  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay(); 
  };
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  const monthName = currentDate.toLocaleString('fr-FR', { month: 'long', year: 'numeric' });
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const handleDeleteEvent = (e, eventId, eventTitle) => {
    e.stopPropagation();
    if (window.confirm(`Supprimer l'événement "${eventTitle}" ?`)) {
      onDeleteEvent(eventId);
    }
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`empty-${i}`} className="p-2 min-h-[100px] bg-gray-50/50 dark:bg-white/5 border border-transparent rounded-lg"></div>);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const currentDayDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), d);
    const dateString = currentDayDate.toDateString();
    
    const dailyTasks = tasks.filter(t => {
        if (!t.dateLimite) return false;
        const tDate = new Date(t.dateLimite);
        return tDate.toDateString() === dateString;
    });

    const dailyEvents = events.filter(e => {
        const eDate = new Date(e.dateDebut);
        return eDate.toDateString() === dateString;
    });

    const isToday = new Date().toDateString() === dateString;

    days.push(
      <div 
        key={d} 
        onClick={() => onDateClick && onDateClick(currentDayDate, dailyTasks, dailyEvents)}
        className={`
          relative p-2 min-h-[120px] border rounded-xl transition-all cursor-pointer group flex flex-col gap-1
          ${isToday ? 'bg-green-50/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'}
        `}
        style={{ borderColor: isToday ? colorTheme.primary : theme.cardBorder }}
      >
        {/* En-tête du jour */}
        <div className="flex justify-between items-start">
            <span className={`
              text-sm font-bold w-7 h-7 flex items-center justify-center rounded-full
              ${isToday ? 'text-white' : ''}
            `} style={{ 
              backgroundColor: isToday ? colorTheme.primary : 'transparent',
              color: !isToday ? theme.text : '#fff' 
            }}>
              {d}
            </span>
            
            {onAddClick && (
                <button 
                    onClick={(e) => { e.stopPropagation(); onAddClick(currentDayDate); }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full transition-opacity"
                    style={{ color: theme.textSecondary }}
                >
                    <Plus size={14} />
                </button>
            )}
        </div>

        {/* --- AFFICHAGE DES ÉLÉMENTS --- */}
        <div className="flex-1 flex flex-col gap-1 overflow-hidden mt-1">
            
            {/* LES ÉVÉNEMENTS */}
            {dailyEvents.slice(0, 3).map((event, i) => (
                <div 
                    key={`evt-${event._id || i}`}
                    className="relative text-xs px-2 py-1 rounded-md truncate font-medium shadow-sm group/event hover:pr-7 transition-all"
                    style={{ 
                        backgroundColor: event.couleur || colorTheme.primary, 
                        color: '#fff',
                        fontSize: '0.7rem'
                    }}
                    title={event.titre}
                >
                    <span className="block truncate">
                        {new Date(event.dateDebut).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {event.titre}
                    </span>
                    
                    {onDeleteEvent && (
                        <button
                            onClick={(e) => handleDeleteEvent(e, event._id, event.titre)}
                            className="absolute right-1 top-1/2 -translate-y-1/2 opacity-0 group-hover/event:opacity-100 p-0.5 hover:bg-red-600 rounded transition-opacity"
                            title="Supprimer"
                        >
                            <Trash2 size={12} />
                        </button>
                    )}
                </div>
            ))}

            {dailyEvents.length > 3 && (
                <div className="text-[10px] text-center" style={{ color: theme.textSecondary }}>
                    +{dailyEvents.length - 3} événement{dailyEvents.length - 3 > 1 ? 's' : ''}
                </div>
            )}

            {/* LES TÂCHES */}
            {dailyTasks.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-auto pt-1 border-t border-gray-100 dark:border-white/10">
                    {dailyTasks.slice(0, 5).map((task, i) => (
                        <div 
                            key={`task-${i}`}
                            className={`w-2 h-2 rounded-full ${task.priority === 'haute' ? 'bg-red-500' : 'bg-green-500'}`}
                            title={`Tâche : ${task.name}`}
                        />
                    ))}
                    {dailyTasks.length > 5 && <span className="text-[10px] text-gray-400">+{dailyTasks.length - 5}</span>}
                </div>
            )}
        </div>
      </div>
    );
  }

  const joursSemaine = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

  return (
    <div 
      className="p-6 rounded-2xl shadow-sm border"
      style={{ background: theme.cardBg, borderColor: theme.cardBorder }}
    >
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold capitalize flex items-center gap-2" style={{ color: theme.text }}>
          <CalIcon size={20} style={{ color: colorTheme.primary }}/>
          {monthName}
        </h3>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10" style={{ color: theme.text }}>
            <ChevronLeft size={20}/>
          </button>
          <button onClick={nextMonth} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10" style={{ color: theme.text }}>
            <ChevronRight size={20}/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {joursSemaine.map(j => (
          <div key={j} className="text-center text-sm font-medium py-2 opacity-70" style={{ color: theme.text }}>{j}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days}
      </div>
    </div>
  );
};

export default Calendrier;