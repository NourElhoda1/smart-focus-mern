import React, { useContext } from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';
import ContexteTimer from '../context/ContexteTimer';
import useTheme from '../hooks/useTheme'; 
const Pomodoro = () => {
    const { 
        minutes, secondes, actif, mode, 
        toggleTimer, resetTimer, changerMode, arreterEtSauvegarder,
        dureeInitiale, sessionSauvegardee 
    } = useContext(ContexteTimer);

    const { theme, darkMode, colorTheme } = useTheme(); 
    const formatTemps = (t) => (t < 10 ? `0${t}` : t);

    return (
        <div 
            className="flex flex-col items-center justify-center p-8 backdrop-blur-md rounded-3xl shadow-xl border w-full max-w-md mx-auto"
            style={{ 
                background: `${theme.cardBg}cc`, 
                borderColor: theme.cardBorder 
            }}
        >
            
            <div className="flex gap-2 mb-8 p-1 rounded-full" style={{ background: theme.inputBg }}>
                <button 
                    onClick={() => changerMode('focus')} 
                    className="px-6 py-2 rounded-full font-semibold transition-all"
                    style={{
                        background: mode === 'focus' ? colorTheme.primary : 'transparent',
                        color: mode === 'focus' ? '#fff' : theme.textSecondary,
                        boxShadow: mode === 'focus' ? `0 2px 8px ${colorTheme.primary}40` : 'none'
                    }}
                >
                    Focus
                </button>
                <button 
                    onClick={() => changerMode('pause')} 
                    className="px-6 py-2 rounded-full font-semibold transition-all"
                    style={{
                        background: mode === 'pause' ? '#3b82f6' : 'transparent',
                        color: mode === 'pause' ? '#fff' : theme.textSecondary,
                        boxShadow: mode === 'pause' ? '0 2px 8px rgba(59, 130, 246, 0.4)' : 'none'
                    }}
                >
                    Pause
                </button>
            </div>

            <div className="text-8xl font-bold font-mono mb-8 tracking-tighter" style={{ color: theme.text }}>
                {formatTemps(minutes)}:{formatTemps(secondes)}
            </div>

            <div className="flex items-center gap-4">
                {/* PLAY / PAUSE */}
                <button 
                    onClick={toggleTimer} 
                    className="p-4 rounded-full text-white shadow-lg transition-transform hover:scale-105"
                    style={{ 
                        background: actif ? '#f59e0b' : colorTheme.primary 
                    }}
                >
                    {actif ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1"/>}
                </button>

                {/* BOUTON STOP */}
                {(mode === 'focus' && (minutes < dureeInitiale || secondes < 59) && !sessionSauvegardee && (minutes !== 0 || secondes !== 0)) && (
                    <button 
                        onClick={arreterEtSauvegarder}
                        className="p-4 rounded-full bg-red-500 text-white hover:bg-red-600 shadow-lg transition-transform hover:scale-105"
                        title="Arrêter et Sauvegarder (Temps partiel)"
                    >
                        <Square size={24} fill="currentColor" />
                    </button>
                )}

                {/* RESET */}
                <button 
                    onClick={resetTimer} 
                    className="p-4 rounded-full hover:rotate-180 transition-all"
                    style={{ 
                        background: theme.inputBg, 
                        color: theme.textSecondary 
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = theme.btnHover}
                    onMouseLeave={(e) => e.currentTarget.style.background = theme.inputBg}
                >
                    <RotateCcw size={24} />
                </button>
            </div>
            
            {actif && mode === 'focus' && (
                <p className="mt-6 text-xs" style={{ color: theme.textSecondary }}>
                    Complète 25 min pour valider une session 🏆 <br/>
                    (Mais chaque minute compte !)
                </p>
            )}
        </div>
    );
};

export default Pomodoro;