import React, { useState } from 'react';
// 1. We import new icons for the new categories
import { Music, Disc, X, Headphones, CloudRain, Coffee, Zap, Wind } from 'lucide-react';

const MusicPlayer = () => {
    const [isOpen, setIsOpen] = useState(false);
    // Default: Lofi Girl
    const [currentPlaylist, setCurrentPlaylist] = useState("0vvXsWCC9xrXsKd4FyS8kM"); 

    // 2. Expanded List of Spotify Playlists
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
            
            {/* LE LECTEUR (Caché par défaut) */}
            {isOpen && (
                <div className="bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 w-100 mb-4 animate-in slide-in-from-bottom-5 duration-300">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-gray-700 flex items-center gap-2">
                            <Music size={18} className="text-green-600"/>
                            Ambiance
                        </h3>
                        <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
                            <X size={18} />
                        </button>
                    </div>

                    {/* Choix des Playlists */}
                    <div className="flex gap-2 overflow-x-auto pb-3 mb-2 scrollbar-hide">
                        {playlists.map((playlist) => (
                            <button
                                key={playlist.id}
                                onClick={() => setCurrentPlaylist(playlist.id)}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all border
                                    ${currentPlaylist === playlist.id 
                                        ? 'bg-green-600 text-white border-green-600 shadow-md' 
                                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'}
                                `}
                            >
                                <playlist.icon size={12} />
                                {playlist.name}
                            </button>
                        ))}
                    </div>
 
                    {/* Widget Spotify (Iframe) */}
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
                className={`p-4 rounded-full shadow-lg transition-all transform hover:scale-105 flex items-center gap-2 font-semibold border-2
                    ${isOpen ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-green-600 border-green-50'}
                `}
            >
                {isOpen ? <X size={24} /> : <Headphones size={24} />}
                {!isOpen && <span className="pr-2 hidden md:inline">Musique</span>}
            </button>
        </div>
    );
};

export default MusicPlayer;