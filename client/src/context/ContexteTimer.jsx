import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import ContexteAuth from './ContexteAuth';

const ContexteTimer = createContext();

export const FournisseurTimer = ({ children }) => {

    const { jeton, utilisateur } = useContext(ContexteAuth); 
    const [dureeInitiale, setDureeInitiale] = useState(25);
    const [minutes, setMinutes] = useState(25);
    const [secondes, setSecondes] = useState(0);
    const [actif, setActif] = useState(false);
    const [mode, setMode] = useState('focus');
    const [sessionSauvegardee, setSessionSauvegardee] = useState(false);

    useEffect(() => {
        if (utilisateur && utilisateur.preferences) {
            const dureePreferee = utilisateur.preferences.dureeSessionParDefaut;
            
            setDureeInitiale(dureePreferee);
            if (!actif && mode === 'focus' && !sessionSauvegardee) {
                setMinutes(dureePreferee);
                setSecondes(0);
            }
        }
    }, [utilisateur, actif, mode, sessionSauvegardee]); 

    useEffect(() => {
        let interval = null;

        if (actif) {
            interval = setInterval(() => {
                if (secondes === 0) {
                    if (minutes === 0) {
                        setActif(false);
                        if (mode === 'focus' && !sessionSauvegardee) {
                            sauvegarderSession(dureeInitiale);
                        }
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
    }, [actif, minutes, secondes, mode, sessionSauvegardee, dureeInitiale]);

    const sauvegarderSession = async (dureeReelle) => {
        if (!jeton) return;
        
        const dureePrecise = parseFloat(dureeReelle.toFixed(2));

        try {
            const config = { headers: { Authorization: `Bearer ${jeton}` } };
            
            await axios.post('/session/sauvegarder', { 
                dureeEnMinutes: dureePrecise
            }, config);
            
            console.log(`Session de ${dureePrecise} min sauvegardée !`);
            setSessionSauvegardee(true);
            
            // Notification
            const audio = new Audio('https://actions.google.com/sounds/v1/cartoon/cartoon_boing.ogg');
            audio.play().catch(e => console.log("Audio bloqué"));

            alert(dureePrecise >= dureeInitiale 
                ? "Session Complète Validée ! 🏆" 
                : "Session Interrompue Enregistrée. 👍");

        } catch (error) {
            console.error("Erreur sauvegarde session", error);
        }
    };

    const arreterEtSauvegarder = () => {
        setActif(false);
        if (mode === 'focus' && !sessionSauvegardee) {
            const tempsRestant = minutes + (secondes / 60);
            const tempsEcoule = dureeInitiale - tempsRestant;

            if (tempsEcoule > 0) {
                const confirmation = window.confirm(`Sauvegarder ${tempsEcoule.toFixed(1)} minutes ?`);
                if (confirmation) {
                    sauvegarderSession(tempsEcoule);
                }
            }
        }
    };

    const resetTimer = () => {
        setActif(false);
        setSessionSauvegardee(false);
        const temps = mode === 'focus' ? dureeInitiale : 5;
        setMinutes(temps);
        setSecondes(0);
    };

    const changerMode = (nouveauMode) => {
        setActif(false);
        setMode(nouveauMode);
        setSessionSauvegardee(false);
        const temps = nouveauMode === 'focus' ? dureeInitiale : 5;
        
        setMinutes(temps);
        setSecondes(0);
    };

    const toggleTimer = () => setActif(!actif);

    return (
        <ContexteTimer.Provider value={{
            minutes, secondes, actif, mode,
            toggleTimer, resetTimer, changerMode, arreterEtSauvegarder,
            dureeInitiale, sessionSauvegardee
        }}>
            {children}
        </ContexteTimer.Provider>
    );
};

export default ContexteTimer;