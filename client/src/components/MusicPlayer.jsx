import React, { useState } from 'react';
import { Music, Disc, X, Headphones, CloudRain, Coffee, Zap, Wind } from 'lucide-react';
import useTheme from '../hooks/useTheme'; 

const MusicPlayer = () => {
    const { theme, darkMode, colorTheme } = useTheme(); 
    const [isOpen, setIsOpen] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState("0vvXsWCC9xrXsKd4FyS8kM");

    const playlists = [
        { id: "0vvXsWCC9xrXsKd4FyS8kM", name: "Lofi Girl", icon: Headphones },
        { id: "37i9dQZF1DX4sWSpwq3LiO", name: "Piano Calme", icon: Music },
        { id: "37i9dQZF1DWZeKCadgRdKQ", name: "Deep Focus", icon: Disc },
        { id: "37i9dQZF1DX8Uebhn9wzrS", name: "Chill Lofi", icon: Disc },
        { id: "37i9dQZF1DX8ymr6UES7vc", name: "Pluie (Rain)", icon: CloudRain },
        { id: "37i9dQZF1DX9uKNf5jGX6m", name: "Bruit Blanc", icon: Wind },
        { id: "37i9dQZF1DXdLEN7aqioXM", name: "Synthwave", icon: Zap },
    ];

    return (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
            
            {/* LE LECTEUR */}
            {isOpen && (
                <div 
                    className="p-4 rounded-2xl shadow-2xl border w-100 mb-4 animate-in slide-in-from-bottom-5 duration-300"
                    style={{ 
                        background: theme.cardBg, 
                        borderColor: theme.cardBorder 
                    }}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold flex items-center gap-2" style={{ color: theme.text }}>
                            <Music size={18} style={{ color: colorTheme.primary }}/> 
                            Ambiance
                        </h3>
                        <button 
                            onClick={() => setIsOpen(false)} 
                            style={{ color: theme.textSecondary }}
                            className="hover:opacity-70 transition-opacity"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Choix des Playlists */}
                    <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-hide">
                        {playlists.map((playlist) => (
                            <button
                                key={playlist.id}
                                onClick={() => setCurrentPlaylist(playlist.id)}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border"
                                style={{
                                    background: currentPlaylist === playlist.id 
                                        ? colorTheme.primary 
                                        : theme.inputBg,
                                    color: currentPlaylist === playlist.id 
                                        ? '#fff' 
                                        : theme.text,
                                    borderColor: currentPlaylist === playlist.id 
                                        ? colorTheme.primary 
                                        : theme.inputBorder,
                                    boxShadow: currentPlaylist === playlist.id 
                                        ? `0 2px 8px ${colorTheme.primary}40` 
                                        : 'none'
                                }}
                            >
                                <playlist.icon size={12} />
                                {playlist.name}
                            </button>
                        ))}
                    </div>
 
                    {/* Widget Spotify */}
                    <div className="rounded-xl overflow-hidden shadow-inner bg-black">
                        <iframe 
                            style={{ borderRadius: '12px' }} 
                            src={`https://open.spotify.com/embed/playlist/${currentPlaylist}?utm_source=generator&theme=0`}
                            width="100%" 
                            height="177" 
                            frameBorder="0" 
                            allowFullScreen="" 
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                            loading="lazy"
                            title="Spotify Player"
                        ></iframe>
                    </div>
                </div>
            )}

            {/* BOUTON FLOTTANT */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 font-semibold border-2"
                style={{
                    background: isOpen ? theme.cardBg : colorTheme.light,
                    color: isOpen ? theme.text : colorTheme.primary,
                    borderColor: isOpen ? theme.cardBorder : colorTheme.primary
                }}
            >
                {isOpen ? <X size={24} /> : <Headphones size={24} />}
                {!isOpen && <span className="pr-2 hidden md:inline">Musique</span>}
            </button>
        </div>
    );
};

export default MusicPlayer;