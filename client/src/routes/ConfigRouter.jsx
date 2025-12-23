import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from 'react-router-dom';
import ProtectedRouter from './ProtectedRouter';

import TableauDeBord from '../pages/TableauDeBord';

import Connexion from '../pages/Connexion';
import Inscription from '../pages/Inscription';

const ConfigRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route element={<ProtectedRouter />}>
                <Route path="/tableau-de-bord" element={<TableauDeBord />} />   
            </Route>
            
            <Route >
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/inscription" element={<Inscription />} />
            </Route>
        </Route>
    )
);

export default ConfigRouter;