import React, { useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ContexteAuth from '../context/ContexteAuth';
import { 
    LayoutDashboard, 
    CheckSquare, 
    Settings, 
    Clock,
    LogOut, 
    Menu, 
    X, 
    User,
    ChevronRight 
} from 'lucide-react';

const SidebarLayout = ({ children }) => {
    const { utilisateur, seDeconnecter } = useContext(ContexteAuth);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const menuItems = [
        { path: '/tableau-de-bord', label: 'Tableau de bord', icon: LayoutDashboard },
        { path: '/taches', label: 'Mes Tâches', icon: CheckSquare },
        { path: '/focus', label: 'Focus', icon: Clock },
        { path: '/parametres', label: 'Paramètres', icon: Settings },
    ];

    const NavItem = ({ item }) => {
        const isActive = location.pathname === item.path;
        return (
            <Link
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                    ${isActive 
                        ? 'bg-green-600 text-white shadow-lg shadow-green-500/30' 
                        : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                    }`}
            >
                <item.icon size={20} className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-green-600'} />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight size={16} className="ml-auto opacity-75" />}
            </Link>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 flex font-poppins">
            
            {/* --- SIDEBAR DESKTOP --- */}
            <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-100 h-screen fixed left-0 top-0 z-20">
                {/* Logo */}
                <div className="p-8 pb-4">
                    <h1 className="text-2xl font-bold text-green-600 flex items-center gap-2">
                        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center text-white text-sm">SF</div>
                        Smart Focus
                    </h1>
                    <p className="text-xs text-gray-400 mt-1 ml-10">Productivité Master</p>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {menuItems.map((item) => (
                        <NavItem key={item.path} item={item} />
                    ))}
                </nav>

                {/* Profil & Déconnexion (Bas de page) */}
                <div className="p-4 border-t border-gray-100">
                    <div className="bg-gray-50 p-4 rounded-2xl flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                            {utilisateur?.nom?.charAt(0).toUpperCase() || <User size={20}/>}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-bold text-gray-800 truncate">{utilisateur?.nom}</p>
                            <p className="text-xs text-gray-500 truncate">{utilisateur?.email}</p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={seDeconnecter}
                        className="w-full flex items-center justify-center gap-2 text-red-500 hover:bg-red-50 py-2 rounded-lg transition-colors text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* --- SIDEBAR MOBILE (Overlay) --- */}
            {mobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    {/* Fond sombre */}
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>
                    
                    {/* Menu Glissant */}
                    <div className="absolute left-0 top-0 bottom-0 w-64 bg-white p-4 shadow-2xl flex flex-col">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-xl font-bold text-green-600">Smart Focus</h2>
                            <button onClick={() => setMobileMenuOpen(false)} className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
                                <X size={24} />
                            </button>
                        </div>
                        <nav className="flex-1 space-y-2">
                            {menuItems.map((item) => (
                                <NavItem key={item.path} item={item} />
                            ))}
                        </nav>
                        <button onClick={seDeconnecter} className="flex items-center gap-3 text-red-500 p-4 hover:bg-red-50 rounded-xl mt-auto">
                            <LogOut size={20} />
                            <span>Déconnexion</span>
                        </button>
                    </div>
                </div>
            )}

            {/* --- CONTENU PRINCIPAL --- */}
            <main className="flex-1 md:ml-72 transition-all duration-300">
                {/* Header Mobile */}
                <header className="md:hidden bg-white p-4 shadow-sm flex justify-between items-center sticky top-0 z-10">
                    <h1 className="font-bold text-green-600">Smart Focus</h1>
                    <button onClick={() => setMobileMenuOpen(true)} className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
                        <Menu size={24} />
                    </button>
                </header>

                {/* Zone de contenu dynamique (C'est là que tes pages s'affichent) */}
                <div className="p-6 md:p-10 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default SidebarLayout;