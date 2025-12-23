import { createContext, useState, useEffect } from 'react';
import axios from '../api/axios'; 
import { useNavigate } from 'react-router-dom';

const ContexteAuth = createContext();

export const FournisseurAuth = ({ children }) => {
    const [utilisateur, setUtilisateur] = useState(null);
    const [jeton, setJeton] = useState(localStorage.getItem('token') || null);
    const [chargement, setChargement] = useState(true);
    
    const naviguer = useNavigate();

    //! Vérifier si l'utilisateur est déjà connecté au chargement
    useEffect(() => {
        const verifierConnexion = async () => {
            if (jeton) {
                try {
                    const config = {
                        headers: { Authorization: `Bearer ${jeton}` }
                    };
                    const { data } = await axios.get('/utilisateur/profil', config);
                    
                    setUtilisateur(data);
                } catch (erreur) {
                    console.error("Session expirée ou invalide", erreur);
                    seDeconnecter();
                }
            }
            setChargement(false);
        };
        verifierConnexion();
    }, [jeton]);

    //! Fonction de Connexion
    const seConnecter = async (email, motDePasse) => {
        const { data } = await axios.post('/utilisateur/connexion', { email, motDePasse });
        
        localStorage.setItem('token', data.token); 
        setJeton(data.token);
        setUtilisateur(data);
        naviguer('/tableau-de-bord');
    };

    //! Fonction d'Inscription
    const sInscrire = async (nom, email, motDePasse) => {
        const { data } = await axios.post('/utilisateur/inscription', { nom, email, motDePasse });
        
        localStorage.setItem('token', data.token);
        setJeton(data.token);
        setUtilisateur(data);
        naviguer('/tableau-de-bord');
    };

    //! Fonction de Déconnexion
    const seDeconnecter = () => {
        localStorage.removeItem('token');
        setJeton(null);
        setUtilisateur(null);
        naviguer('/connexion'); 
    };

    return (
        <ContexteAuth.Provider value={{ 
            utilisateur, 
            jeton, 
            seConnecter, 
            sInscrire, 
            seDeconnecter, 
            chargement 
        }}>
            {children}
        </ContexteAuth.Provider>
    );
};

export default ContexteAuth;