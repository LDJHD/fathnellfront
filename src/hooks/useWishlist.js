import { useWishlistContext } from '../contexts/WishlistContext';

// Hook de compatibilité qui utilise le contexte
export const useWishlist = () => {
    return useWishlistContext();
};

