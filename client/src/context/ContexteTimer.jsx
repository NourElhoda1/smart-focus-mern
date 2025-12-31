import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from '../api/axios';
import ContexteAuth from './ContexteAuth';

const ContexteTimer = createContext();

export const FournisseurTimer = ({ children }) => {
    const { jeton, utilisateur } = useContext(ContexteAuth); // On récupère l'utilisateur
    
    // États du Timer
    const [dureeInitiale, setDureeInitiale] = useState(25);
    const [minutes, setMinutes] = useState(25);
    const [secondes, setSecondes] = useState(0);
    const [actif, setActif] = useState(false);
    const [mode, setMode] = useState('focus');
    const [sessionSauvegardee, setSessionSauvegardee] = useState(false);

    // --- NOUVEAU : Synchronisation avec les Paramètres Utilisateur ---
    useEffect(() => {
        // Si l'utilisateur est chargé et a une préférence de durée
        if (utilisateur && utilisateur.preferences) {
            const dureePreferee = utilisateur.preferences.dureeSessionParDefaut;
            
            // On met à jour la variable de référence
            setDureeInitiale(dureePreferee);

            // Si le timer est à l'arrêt et qu'on est en mode Focus,
            // on met à jour l'affichage immédiatement (ex: passage de 25 à 45 min)
            if (!actif && mode === 'focus' && !sessionSauvegardee) {
                setMinutes(dureePreferee);
                setSecondes(0);
            }
        }
    }, [utilisateur, actif, mode, sessionSauvegardee]); 
    // ^ Se déclenche à chaque fois que 'utilisateur' change (donc après sauvegarde des paramètres)


    // --- Logique du Compte à rebours ---
    useEffect(() => {
        let interval = null;

        if (actif) {
            interval = setInterval(() => {
                if (secondes === 0) {
                    if (minutes === 0) {
                        setActif(false);
                        // Fin normale
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

    // --- Sauvegarde ---
    const sauvegarderSession = async (dureeReelle) => {
        if (!jeton) return;
        
        // On accepte n'importe quelle durée (même décimale)
        // Mais pour une session "terminée" valide, on compare à la durée prévue
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
        // On utilise la nouvelle durée initiale (qui vient des préférences)
        const temps = mode === 'focus' ? dureeInitiale : 5;
        setMinutes(temps);
        setSecondes(0);
    };

    const changerMode = (nouveauMode) => {
        setActif(false);
        setMode(nouveauMode);
        setSessionSauvegardee(false);
        
        // Si on passe en Focus, on prend la durée des préférences (dureeInitiale)
        // Si on passe en Pause, on met 5 min en dur (ou tu pourrais ajouter une pref pour la pause aussi !)
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