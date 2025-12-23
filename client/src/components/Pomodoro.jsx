import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

const Pomodoro = () => {
    const [minutes, setMinutes] = useState(25);
    const [secondes, setSecondes] = useState(0);
    const [actif, setActif] = useState(false);
    const [mode, setMode] = useState('focus'); 

    useEffect(() => {
        let interval = null;

        if (actif) {
            interval = setInterval(() => {
                if (secondes === 0) {
                    if (minutes === 0) {
                        setActif(false); 
                    } else {
                        setMinutes(minutes - 1);
                        setSecondes(59);
                    }
                } else {
                    setSecondes(secondes - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [actif, minutes, secondes]);

    const toggleTimer = () => setActif(!actif);

    const resetTimer = () => {
        setActif(false);
        setMode('focus');
        setMinutes(25);
        setSecondes(0);
    };

    const changerMode = (nouveauMode) => {
        setActif(false);
        setMode(nouveauMode);
        if (nouveauMode === 'focus') setMinutes(25);
        else if (nouveauMode === 'pause') setMinutes(5);
        setSecondes(0);
    };

    const formatTemps = (temps) => (temps < 10 ? `0${temps}` : temps);

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/20 w-full max-w-md mx-auto">
            
            {/* Boutons de Mode */}
            <div className="flex gap-2 mb-8 bg-gray-100 p-1 rounded-full">
                <button 
                    onClick={() => changerMode('focus')}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'focus' ? 'bg-green-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Focus
                </button>
                <button 
                    onClick={() => changerMode('pause')}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${mode === 'pause' ? 'bg-blue-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    Pause
                </button>
            </div>

            {/* Gros Chiffres */}
            <div className="text-8xl font-bold text-gray-800 font-mono mb-8 tracking-tighter">
                {formatTemps(minutes)}:{formatTemps(secondes)}
            </div>

            {/* Contrôles */}
            <div className="flex items-center gap-4">
                <button 
                    onClick={toggleTimer}
                    className={`p-4 rounded-full text-white transition-all transform hover:scale-110 shadow-lg ${actif ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700'}`}
                >
                    {actif ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1"/>}
                </button>

                <button 
                    onClick={resetTimer}
                    className="p-4 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 transition-all hover:rotate-180"
                >
                    <RotateCcw size={24} />
                </button>
            </div>
        </div>
    );
};

export default Pomodoro;