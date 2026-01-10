import { User, Lock, Save, Clock, Bell, Settings, Palette, Check } from 'lucide-react';
import { useState } from 'react';
import SidebarLayout from '../layout/SidebarLayout';
import useTheme from '../hooks/useTheme';

const Parametres = () => {
  const { theme, darkMode, selectedColor, changeColor, colorTheme, COLOR_THEMES } = useTheme();
  
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [confirmationMdp, setConfirmationMdp] = useState('');
  const [dureeFocus, setDureeFocus] = useState(25);
  const [notifications, setNotifications] = useState(true);
  const [message, setMessage] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    if (motDePasse && motDePasse !== confirmationMdp) {
      setMessage({ type: 'erreur', text: "Les mots de passe ne correspondent pas." });
      return;
    }

    setMessage({ type: 'succes', text: "Profil mis à jour avec succès ! 🎉" });
    setMotDePasse('');
    setConfirmationMdp('');
  };

  const inputStyle = {
    background: theme.inputBg,
    border: `1px solid ${theme.inputBorder}`,
    color: theme.text
  };

  return (
    <SidebarLayout>
      <div className="min-h-screen p-6" style={{ background: theme.background, color: theme.text }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: theme.text }}>
              <Settings className="text-gray-500" size={32} />
              Paramètres
            </h1>
            <p className="mt-2" style={{ color: theme.textSecondary }}>
              Personnalise ton expérience Smart Focus.
            </p>
          </div>

          {message && (
            <div className={`p-4 rounded-xl mb-6 text-center font-medium ${
              message.type === 'succes' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {message.text}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* COLONNE GAUCHE */}
            <div className="space-y-6">
              {/* Profil */}
              <div className="p-6 rounded-2xl shadow-sm border" style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: theme.text }}>
                  <User size={20} style={{ color: colorTheme.primary }}/>
                  Mon Profil
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                      Nom complet
                    </label>
                    <input 
                      type="text" 
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                      Email
                    </label>
                    <input 
                      type="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>

              {/* Sécurité */}
              <div className="p-6 rounded-2xl shadow-sm border" style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: theme.text }}>
                  <Lock size={20} className="text-red-500"/>
                  Sécurité
                </h2>
                <p className="text-xs mb-4" style={{ color: theme.textSecondary }}>
                  Laisse vide si tu ne veux pas changer de mot de passe.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                      Nouveau mot de passe
                    </label>
                    <input 
                      type="password" 
                      value={motDePasse}
                      onChange={(e) => setMotDePasse(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition"
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1" style={{ color: theme.textSecondary }}>
                      Confirmer mot de passe
                    </label>
                    <input 
                      type="password" 
                      value={confirmationMdp}
                      onChange={(e) => setConfirmationMdp(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 rounded-xl focus:outline-none focus:ring-2 transition"
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* COLONNE DROITE */}
            <div className="space-y-6">
              {/* Thème de Couleur */}
              <div className="p-6 rounded-2xl shadow-sm border" style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: theme.text }}>
                  <Palette size={20} style={{ color: colorTheme.primary }}/>
                  Thème de Couleur
                </h2>
                
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries(COLOR_THEMES).map(([key, ct]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => changeColor(key)}
                      className="relative group"
                    >
                      <div 
                        className="h-16 rounded-xl transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${ct.primary} 0%, ${ct.hover} 100%)`, 
                          transform: selectedColor === key ? 'scale(1.05)' : 'scale(1)',
                          boxShadow: selectedColor === key 
                            ? `0 0 0 4px ${ct.primary}40` 
                            : 'none'
                        }}
                        onMouseEnter={(e) => {
                          if (selectedColor !== key) {
                            e.currentTarget.style.transform = 'scale(1.05)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (selectedColor !== key) {
                            e.currentTarget.style.transform = 'scale(1)';
                          }
                        }}
                      >
                        {selectedColor === key && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Check className="text-white drop-shadow-lg" size={24} strokeWidth={3} />
                          </div>
                        )}
                      </div>
                      <p className="text-xs mt-2 font-medium text-center" style={{ color: theme.text }}>
                        {ct.name}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Préférences Pomodoro */}
              <div className="p-6 rounded-2xl shadow-sm border" style={{ background: theme.cardBg, borderColor: theme.cardBorder }}>
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2" style={{ color: theme.text }}>
                  <Clock size={20} style={{ color: colorTheme.primary }}/>
                  Préférences Pomodoro
                </h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: theme.textSecondary }}>
                      Durée de Focus par défaut (minutes)
                    </label>
                    <div className="flex items-center gap-4">
                      <input 
                        type="range" 
                        min="15" 
                        max="60" 
                        step="5"
                        value={dureeFocus}
                        onChange={(e) => setDureeFocus(e.target.value)}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{
                          background: `linear-gradient(to right, ${colorTheme.primary} 0%, ${colorTheme.primary} ${((dureeFocus - 15) / 45) * 100}%, ${theme.inputBg} ${((dureeFocus - 15) / 45) * 100}%, ${theme.inputBg} 100%)`
                        }}
                      />
                      <span className="font-bold text-lg w-12 text-center" style={{ color: colorTheme.primary }}>
                        {dureeFocus}
                      </span>
                    </div>
                    <p className="text-xs mt-2" style={{ color: theme.textSecondary }}>
                      Cela modifiera la durée initiale de ton minuteur.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: theme.cardBorder }}>
                    <div className="flex items-center gap-2" style={{ color: theme.text }}>
                      <Bell size={18} />
                      <span className="text-sm font-medium">Notifications sonores</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setNotifications(!notifications)}
                      className="relative w-12 h-6 rounded-full transition-colors duration-300"
                      style={{ backgroundColor: notifications ? colorTheme.primary : '#d1d5db' }}
                    >
                      <div 
                        className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                          notifications ? 'translate-x-6' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Bouton Sauvegarder */}
              <button 
                onClick={handleSubmit}
                className="w-full py-4 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 transform hover:-translate-y-1 text-white"
                style={{ backgroundColor: colorTheme.primary }}
                onMouseEnter={(e) => e.target.style.backgroundColor = colorTheme.hover}
                onMouseLeave={(e) => e.target.style.backgroundColor = colorTheme.primary}
              >
                <Save size={24} />
                Sauvegarder les modifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default Parametres;