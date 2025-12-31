import React, { useContext } from 'react';
import { Play, Pause, RotateCcw, Square } from 'lucide-react';
import ContexteTimer from '../context/ContexteTimer';

const Pomodoro = () => {
    const { 
        minutes, secondes, actif, mode, 
        toggleTimer, resetTimer, changerMode, arreterEtSauvegarder,
        dureeInitiale, sessionSauvegardee 
    } = useContext(ContexteTimer);

    const formatTemps = (t) => (t < 10 ? `0${t}` : t);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 w-full max-w-md mx-auto">
            
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-full">
                <button onClick={() => changerMode('focus')} className={`px-6 py-2 rounded-full font-semibold transition-all ${mode === 'focus' ? 'bg-green-600 text-white shadow-md' : 'text-gray-500'}`}>Focus</button>
                <button onClick={() => changerMode('pause')} className={`px-6 py-2 rounded-full font-semibold transition-all ${mode === 'pause' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500'}`}>Pause</button>
            </div>

            <div className="text-8xl font-bold text-gray-800 font-mono mb-8 tracking-tighter">
                {formatTemps(minutes)}:{formatTemps(secondes)}
            </div>

            <div className="flex items-center gap-4">
                {/* PLAY / PAUSE */}
                <button 
                    onClick={toggleTimer} 
                    className={`p-4 rounded-full text-white shadow-lg transition-transform hover:scale-105 ${actif ? 'bg-amber-500' : 'bg-green-600'}`}
                >
                    {actif ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1"/>}
                </button>

                {/* BOUTON STOP (Rouge) : Pour sauvegarder les temps partiels */}
                {/* Condition : Mode Focus + Timer démarré + Pas fini + Pas encore sauvegardé */}
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
                    className="p-4 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 hover:rotate-180 transition-all"
                >
                    <RotateCcw size={24} />
                </button>
            </div>
            
            {/* Petit message explicatif */}
            {actif && mode === 'focus' && (
                <p className="mt-6 text-xs text-gray-400">
                    Complète 25 min pour valider une session 🏆 <br/>
                    (Mais chaque minute compte !)
                </p>
            )}
        </div>
    );
};

export default Pomodoro;