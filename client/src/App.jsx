import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FournisseurAuth } from './context/ContexteAuth';
import { FournisseurTimer } from './context/ContexteTimer';

import Connection from '../src/pages/Connexion'; 
import Inscription from '../src/pages/Inscription';
import TableauDeBord from '../src/pages/TableauDeBord'; 
import Focus from '../src/pages/Focus';
import Taches from '../src/pages/Tache';
import BlocNotes from './pages/BlocNotes';
import Parametres from './pages/Parametres';

function App() {
    return (
        <BrowserRouter>
            <FournisseurAuth>
                <FournisseurTimer>
                <div>
                    <Routes>
                        <Route path="/" element={<Navigate to="/connexion" />} />
                        
                        <Route path="/connexion" element={<Connection />} />
                        <Route path="/inscription" element={<Inscription />} />
                        
                        
                        <Route path="/tableau-de-bord" element={<TableauDeBord />} /> 
                        <Route path="/focus" element={<Focus />} />
                        <Route path="/taches" element={<Taches />} />
                        <Route path="/notes" element={<BlocNotes />} />
                        <Route path="/parametres" element={<Parametres />} />
                    </Routes>
                </div>
                </FournisseurTimer>
            </FournisseurAuth>
        </BrowserRouter>
    );
}

export default App;