import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import ContexteAuth from '../context/ContexteAuth';

const ProtectedRoute = ({ children }) => {
  const { utilisateur, jeton } = useContext(ContexteAuth);

  if (!jeton || !utilisateur) {
    return <Navigate to="/connexion" replace />;
  }
  
  return children;
};

export default ProtectedRoute;