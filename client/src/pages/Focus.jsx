import React, { useState, useEffect } from 'react';
import SidebarLayout from '../layout/SidebarLayout';
import Pomodoro from '../components/Pomodoro'; 
import MusicPlayer from '../components/MusicPlayer';
import useTheme from '../hooks/useTheme';

const Focus = () => {
    const [citation, setCitation] = useState("");
    const { theme, darkMode } = useTheme();

    useEffect(() => {
        const citations = [
            "Concentre-toi sur l'étape présente, pas sur l'escalier entier.",
            "La qualité de votre travail dépend de la qualité de votre concentration.",
            "Un moment de patience peut préserver de grands malheurs.",
            "Respire. Concentre-toi. Exécute."
        ];
        setCitation(citations[Math.floor(Math.random() * citations.length)]);
    }, []);

    return (
        <SidebarLayout>
            <div 
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2673&auto=format&fit=crop')",
                    backgroundSize: 'cover',
                    opacity: darkMode ? 0.2 : 0.4
                }}
            ></div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
                <h2 
                    className="text-3xl font-bold mb-2 transition-colors"
                    style={{ color: theme.text }}
                >
                    Mode Focus
                </h2>
                <p 
                    className="italic mb-10 transition-colors"
                    style={{ color: theme.textSecondary }}
                >
                    "{citation}"
                </p>
                
                <Pomodoro />
            </div>
            
            <MusicPlayer />
        </SidebarLayout>
    );
};

export default Focus;