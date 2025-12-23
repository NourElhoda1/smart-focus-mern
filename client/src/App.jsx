import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FournisseurAuth } from './context/ContexteAuth';

import Connection from '../src/pages/Connexion'; 
import Inscription from '../src/pages/Inscription';
import TableauDeBord from '../src/pages/TableauDeBord'; 
import Focus from '../src/pages/Focus';
import Taches from '../src/pages/Tache';

function App() {
    return (
        <BrowserRouter>
            <FournisseurAuth>
                <div>
                    <Routes>
                        <Route path="/" element={<Navigate to="/connexion" />} />
                        
                        <Route path="/connexion" element={<Connection />} />
                        <Route path="/inscription" element={<Inscription />} />
                        
                        
                        <Route path="/tableau-de-bord" element={<TableauDeBord />} /> 
                        <Route path="/focus" element={<Focus />} />
                        <Route path="/taches" element={<Taches />} />
                    </Routes>
                </div>
            </FournisseurAuth>
        </BrowserRouter>
    );
}

export default App;