import { useContext } from 'react';
import { ContexteTheme } from '../context/ContexteTheme';

const useTheme = () => {
  const context = useContext(ContexteTheme);
  if (!context) {
    throw new Error('useTheme doit être utilisé dans FournisseurTheme');
  }
  return context;
};

export default useTheme;