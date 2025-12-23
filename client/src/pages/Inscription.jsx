import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ContexteAuth from '../context/ContexteAuth';
import registerImage from '../assets/login1.png'; 
import { Eye, EyeOff } from 'lucide-react';

const Inscription = () => {
    const { sInscrire } = useContext(ContexteAuth);
    
    const [formData, setFormData] = useState({ nom: '', email: '', motDePasse: '' });
    const [afficherMotDePasse, setAfficherMotDePasse] = useState(false);
    const [erreur, setErreur] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErreur('');
        setLoading(true);
        try {
            await sInscrire(formData.nom, formData.email, formData.motDePasse);
        } catch (err) {
            setErreur("Cet email est peut-être déjà pris ou invalide.");
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen font-poppins">
            
            {/* CÔTÉ GAUCHE : IMAGE */}
            <div className="hidden lg:flex items-center justify-center w-full lg:w-1/2 bg-gray-50">
                <img 
                    src={registerImage} 
                    alt="Illustration Inscription" 
                    className="object-cover w-full h-full max-h-screen" 
                    onError={(e) => {e.target.src = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop"}}
                />
            </div>

            {/* CÔTÉ DROIT : FORMULAIRE */}
            <div className="flex items-center justify-center w-full lg:w-1/2 bg-white p-6 sm:p-10">
                <div className="w-full max-w-md">
                    <h1 className="text-3xl mb-3 font-bold text-green-600">Rejoignez l'aventure 🚀</h1>
                    <p className="mb-8 text-gray-600 text-lg font-medium italic">
                        "La meilleure façon de prédire l'avenir est de le créer." <br/>
                        <span className="text-green-500 text-base font-normal not-italic mt-1 block">
                            Commencez à bâtir vos rêves dès aujourd'hui.
                        </span>
                    </p>

                    {erreur && (
                        <div className="bg-red-50 text-red-500 border border-red-200 p-3 rounded-md mb-6 text-sm text-center animate-pulse">
                            {erreur}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        <div>
                            <label htmlFor="nom" className="block font-medium text-lg text-gray-700">Nom complet</label>
                            <input
                                id="nom"
                                name="nom"
                                type="text"
                                placeholder="Votre Prénom et Nom"
                                value={formData.nom}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-medium text-lg text-gray-700">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="exemple@etudiant.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="block w-full px-4 py-3 mt-2 text-gray-700 bg-white border rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                                required
                            />
                        </div>
                        
                        <div>
                            <label htmlFor="motDePasse" className="block font-medium text-lg text-gray-700">Mot de passe</label>
                            <div className="relative mt-2">
                                <input
                                    id="motDePasse"
                                    name="motDePasse"
                                    type={afficherMotDePasse ? "text" : "password"}
                                    placeholder="Choisis un mot de passe fort"
                                    value={formData.motDePasse}
                                    onChange={handleChange}
                                    className="block w-full pl-4 pr-12 py-3 text-gray-700 bg-white border rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setAfficherMotDePasse(!afficherMotDePasse)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-600 transition-colors"
                                >
                                    {afficherMotDePasse ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end mt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className={`block w-full bg-green-600 mt-4 py-3.5 rounded-2xl text-white font-bold text-lg shadow-lg hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1
                                    ${loading ? 'opacity-70 cursor-wait' : ''}
                                `}
                            >
                                {loading ? "Création du compte..." : "S'inscrire gratuitement"}
                            </button>
                        </div>
                    </form>

                    <div className="text-center mt-8">
                        <p className="text-gray-600">
                            Déjà un compte ?{' '}
                            <Link to="/connexion" className="text-green-600 hover:text-green-800 font-bold transition-colors duration-300 underline decoration-2 underline-offset-4">
                                Se connecter
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Inscription;