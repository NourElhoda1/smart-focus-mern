import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import login1 from "../assets/login1.png";
import ContexteAuth from "../context/ContexteAuth";
import { Eye, EyeOff } from "lucide-react"; 

function Connection() {
  const { seConnecter } = useContext(ContexteAuth);

  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    try {
      await seConnecter(email, motDePasse);
    } catch (err) {
      setErrors({ general: "Email ou mot de passe incorrect." });
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen font-poppins">
      
      {/* Partie Gauche */}
      <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-gray-50">
        <img 
            src={login1} 
            alt="Illustration productivité" 
            className="object-cover max-h-full" 
            onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop"}}
        />
      </div>

      {/* Partie Droite */}
      <div className="flex items-center justify-center w-full lg:w-1/2 bg-white p-6 sm:p-10">
        <div className="w-full max-w-md p-6">
          
          <h1 className="text-3xl mb-2 font-bold text-green-600">Bon retour ! 👋</h1>
          <p className="mb-8 text-gray-600 text-xl font-medium">
            "La clé du succès, c'est de commencer." <br/>
            <span className="text-green-500 text-base font-normal">Prêt à atteindre vos objectifs ?</span>
          </p>
          
          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="grid grid-cols-1 gap-5">
              
              
              <div>
                <label htmlFor="email" className="block font-medium text-lg text-gray-700">Adresse Email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block font-medium text-lg text-gray-700">Mot de passe</label>
                <div className="relative mt-2">
                    <input
                      id="password"
                      type={afficherMotDePasse ? "text" : "password"}
                      value={motDePasse}
                      onChange={(e) => setMotDePasse(e.target.value)}
                      className="block w-full pl-4 pr-12 py-3 text-gray-700 bg-white border rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                      required
                    />
                    <button
                        type="button"
                        onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                    >
                        {afficherMotDePasse ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                </div>
                {errors.motDePasse && <span className="text-red-500 text-sm mt-1">{errors.motDePasse}</span>}
              </div>
            </div>

            <div className="text-right">
              <Link to="/inscription" className="text-green-600 hover:text-green-800 transition-colors duration-300 text-sm font-semibold">
                Mot de passe oublié ?
              </Link>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className={`block w-full py-3.5 rounded-2xl text-white font-bold text-lg shadow-lg transform transition-all duration-300 hover:-translate-y-1
                  ${loading ? 'bg-green-400 cursor-wait' : 'bg-green-600 hover:bg-green-700 hover:shadow-green-500/40'}
                `}
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </div>

            {errors.general && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-center border border-red-200 mt-4 animate-pulse">
                {errors.general}
              </div>
            )}
          </form>

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Pas encore de compte ?{' '}
              <Link to="/inscription" className="text-green-600 hover:text-green-800 font-bold transition-colors duration-300 underline decoration-2 underline-offset-4">
                Créer un compte
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connection;