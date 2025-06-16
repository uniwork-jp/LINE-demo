import { useContext } from 'react';
import { GlobalContext, type GlobalContextType } from '../contexts/GlobalContext';

export const useGlobalContext = (): GlobalContextType => {
  const value = useContext(GlobalContext);

  if (!value) {
    throw new Error('useGlobalContext must be used within a GlobalContextProvider');
  }

  return value;
};