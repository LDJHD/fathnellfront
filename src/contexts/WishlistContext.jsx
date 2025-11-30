import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { wishlistAPI } from '../services/api';

const WishlistContext = createContext();

export const useWishlistContext = () => {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error('useWishlistContext must be used within a WishlistProvider');
    }
    return context;
};

export const WishlistProvider = ({ children }) => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Charger la wishlist
    const loadWishlist = useCallback(async () => {
        try {
            setLoading(true);
            const response = await wishlistAPI.get();
            if (response.ok) {
                const data = await response.json();
                setWishlistItems(data.wishlist || []);
            }
        } catch (error) {
            console.error("Erreur lors du chargement de la wishlist:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Vérifier si un produit est dans la wishlist
    const isInWishlist = useCallback((produitId) => {
        return wishlistItems.some(item => item.produit_id === produitId);
    }, [wishlistItems]);

    // Ajouter un produit à la wishlist
    const addToWishlist = useCallback(async (produitId) => {
        try {
            const response = await wishlistAPI.ajouter(produitId);
            if (response.ok) {
                await loadWishlist();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erreur lors de l'ajout à la wishlist:", error);
            return false;
        }
    }, [loadWishlist]);

    // Retirer un produit de la wishlist
    const removeFromWishlist = useCallback(async (produitId) => {
        try {
            const response = await wishlistAPI.supprimer(produitId);
            if (response.ok) {
                await loadWishlist();
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erreur lors de la suppression de la wishlist:", error);
            return false;
        }
    }, [loadWishlist]);

    // Toggle (ajouter/retirer)
    const toggleWishlist = useCallback(async (produitId) => {
        if (isInWishlist(produitId)) {
            return await removeFromWishlist(produitId);
        } else {
            return await addToWishlist(produitId);
        }
    }, [isInWishlist, addToWishlist, removeFromWishlist]);

    useEffect(() => {
        loadWishlist();
    }, [loadWishlist]);

    const value = {
        wishlistItems,
        loading,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        loadWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};

