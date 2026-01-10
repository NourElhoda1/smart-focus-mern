import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContexteAuth from '../context/ContexteAuth';
import useTheme from '../hooks/useTheme';
import { 
    LayoutDashboard, 
    CheckSquare, 
    Settings, 
    Clock,
    StickyNote,
    LogOut, 
    Menu, 
    X, 
    User,
    ChevronRight,
    Sun,
    Moon,
    Calendar
} from 'lucide-react';

const SidebarLayout = ({ children }) => {
    const { utilisateur, seDeconnecter } = useContext(ContexteAuth);
    const { theme, darkMode, toggleTheme, colorTheme } = useTheme(); 
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { path: '/tableau-de-bord', label: 'Tableau de bord', icon: LayoutDashboard },
        { path: '/agenda', label: 'Agenda', icon: Calendar },
        { path: '/taches', label: 'Mes Tâches', icon: CheckSquare },
        { path: '/focus', label: 'Focus', icon: Clock },
        { path: '/notes', label: 'Bloc-notes', icon: StickyNote },
        { path: '/parametres', label: 'Paramètres', icon: Settings },
    ];

    const NavItem = ({ item }) => {
        const isActive = location.pathname === item.path;
        return (
            <Link
                to={item.path}
                style={{ 
                    color: isActive ? '#fff' : theme.textSecondary,
                    backgroundColor: isActive ? colorTheme.primary : 'transparent',
                    boxShadow: isActive ? `0 4px 14px ${colorTheme.primary}30` : 'none'
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive ? 'text-white' : ''}`}
                onMouseEnter={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.backgroundColor = colorTheme.light; 
                        e.currentTarget.style.color = colorTheme.primary;
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = theme.textSecondary;
                    }
                }}
            >
                <item.icon 
                    size={20} 
                    style={{ color: isActive ? '#fff' : (darkMode ? theme.textSecondary : '#9ca3af') }}
                />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight size={16} className="ml-auto opacity-75" />}
            </Link>
        );
    };

    const mainContainerStyle = { 
        background: theme.background, 
        color: theme.text, 
        transition: 'background 0.3s ease, color 0.3s ease' 
    };
    
    const sidebarContainerStyle = { 
        background: theme.sidebar, 
        borderColor: theme.cardBorder, 
        transition: 'background 0.3s ease, border-color 0.3s ease' 
    };
    
    const cardStyle = { 
        background: darkMode ? theme.cardBg : '#f9fafb', 
        color: theme.text 
    };

    const ThemeSwitch = () => (
        <div 
            className="flex items-center justify-between px-4 py-3 mb-3 rounded-xl transition-colors cursor-pointer"
            style={{ background: darkMode ? 'rgba(255,255,255,0.05)' : '#f3f4f6' }}
            onClick={toggleTheme}
        >
            <div className="flex items-center gap-3">
                {darkMode 
                    ? <Moon size={18} className="text-purple-400" /> 
                    : <Sun size={18} className="text-orange-500" />
                }
                <span className="text-sm font-medium" style={{ color: theme.text }}>
                    {darkMode ? 'Mode Nuit' : 'Mode Jour'}
                </span>
            </div>
            
            <div 
                className="relative w-10 h-5 rounded-full transition-colors duration-300"
                style={{ backgroundColor: darkMode ? colorTheme.primary : '#d1d5db' }}
            >
                <div 
                    className={`absolute top-1 left-1 bg-white w-3 h-3 rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
                />
            </div>
        </div>
    );

    return (
        <div className="min-h-screen flex font-poppins" style={mainContainerStyle}>
            
            {/* --- SIDEBAR DESKTOP --- */}
            <aside 
                className="hidden md:flex flex-col w-80 border-r h-screen fixed left-0 top-0 z-20"
                style={sidebarContainerStyle}
            >
                {/* Logo */}
                <div className="p-8 pb-4">
                    <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: colorTheme.primary }}>
                        <div 
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm"
                            style={{ backgroundColor: colorTheme.primary }} 
                        >
                            SF
                        </div>
                        Smart Focus
                    </h1>
                    <p className="text-xs mt-1 ml-10" style={{ color: theme.textSecondary }}>Productivité Master</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <NavItem key={item.path} item={item} />
                    ))}
                </nav>

                {/* Profil & Déconnexion */}
                <div className="p-4 border-t" style={{ borderColor: theme.cardBorder }}>
                    
                    <div className="p-4 rounded-2xl flex items-center gap-3 mb-3" style={cardStyle}>
                        <div 
                            className="w-10 h-10 rounded-full flex items-center justify-center font-bold"
                            style={{ 
                                backgroundColor: colorTheme.light, 
                                color: colorTheme.primary 
                            }}
                        >
                            {utilisateur?.nom?.charAt(0).toUpperCase() || <User size={20}/>}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold truncate" style={{ color: theme.text }}>{utilisateur?.nom}</p>
                            <p className="text-xs truncate" style={{ color: theme.textSecondary }}>{utilisateur?.email}</p>
                        </div>
                    </div>
                    
                    <ThemeSwitch />

                    <button 
                        onClick={seDeconnecter}
                        className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* --- SIDEBAR MOBILE --- */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                    
                    <div 
                        className="absolute left-0 top-0 bottom-0 w-64 p-4 shadow-2xl flex flex-col"
                        style={sidebarContainerStyle}
                    >
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold" style={{ color: colorTheme.primary }}>Smart Focus</h2>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-lg" style={{ color: theme.textSecondary }}>
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="flex-1 space-y-2">
                            {menuItems.map((item) => (
                                <NavItem key={item.path} item={item} />
                            ))}
                        </nav>

                        <div className="mt-auto mb-3">
                            <ThemeSwitch />
                        </div>

                        <button onClick={seDeconnecter} className="flex items-center gap-3 text-red-500 p-4 hover:bg-red-50 rounded-xl">
                            <LogOut size={20} />
                            <span>Déconnexion</span>
                        </button>
                    </div>
                </div>
            )}

            {/* --- CONTENU PRINCIPAL --- */}
            <main className="flex-1 md:ml-72 transition-all duration-300">
                <header 
                    className="md:hidden p-4 shadow-sm flex justify-between items-center sticky top-0 z-10"
                    style={{ background: theme.sidebar }}
                >
                    <h1 className="font-bold" style={{ color: colorTheme.primary }}>Smart Focus</h1>
                    <button onClick={() => setMobileMenuOpen(true)} className="p-2 rounded-lg" style={{ color: theme.text }}>
                        <Menu size={24} />
                    </button>
                </header>

                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default SidebarLayout;