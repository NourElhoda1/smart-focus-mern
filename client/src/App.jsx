import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FournisseurAuth } from './context/ContexteAuth';
import { FournisseurTimer } from './context/ContexteTimer';
import { FournisseurTheme } from './context/ContexteTheme';
import ProtectedRoute from './routes/ProtectedRoute';

import Connection from '../src/pages/Connexion'; 
import Inscription from '../src/pages/Inscription';
import TableauDeBord from '../src/pages/TableauDeBord'; 
import Focus from '../src/pages/Focus';
import Taches from '../src/pages/Tache';
import Agenda from './pages/Agenda';
import BlocNotes from './pages/BlocNotes';
import Parametres from './pages/Parametres';

function App() {
    return (
        <BrowserRouter>
            <FournisseurAuth>
                <FournisseurTimer>
                    <FournisseurTheme>
                        <div>
                            <Routes>
                                <Route path="/" element={<Navigate to="/connexion" />} />
                                <Route path="/connexion" element={<Connection />} />
                                <Route path="/inscription" element={<Inscription />} />
                                <Route 
                                    path="/tableau-de-bord" 
                                    element={
                                        <ProtectedRoute>
                                            <TableauDeBord />
                                        </ProtectedRoute>
                                    } 
                                />
                                
                                <Route 
                                    path="/focus" 
                                    element={
                                        <ProtectedRoute>
                                            <Focus />
                                        </ProtectedRoute>
                                    } 
                                />
                                
                                <Route 
                                    path="/taches" 
                                    element={
                                        <ProtectedRoute>
                                            <Taches />
                                        </ProtectedRoute>
                                    } 
                                />
                                
                                <Route 
                                    path="/agenda" 
                                    element={
                                        <ProtectedRoute>
                                            <Agenda />
                                        </ProtectedRoute>
                                    } 
                                />
                                
                                <Route 
                                    path="/notes" 
                                    element={
                                        <ProtectedRoute>
                                            <BlocNotes />
                                        </ProtectedRoute>
                                    } 
                                />
                                
                                <Route 
                                    path="/parametres" 
                                    element={
                                        <ProtectedRoute>
                                            <Parametres />
                                        </ProtectedRoute>
                                    } 
                                />

                                <Route path="*" element={<Navigate to="/connexion" />} />
                            </Routes>
                        </div>
                    </FournisseurTheme>
                </FournisseurTimer>
            </FournisseurAuth>
        </BrowserRouter>
    );
}

export default App;