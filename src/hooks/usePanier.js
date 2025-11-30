import { usePanierContext } from '../contexts/PanierContext';

// Hook de compatibilité qui utilise le contexte
export const usePanier = () => {
    return usePanierContext();
};

