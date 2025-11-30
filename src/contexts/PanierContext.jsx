import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { panierAPI } from '../services/api';

const PanierContext = createContext();

export const usePanierContext = () => {
    const context = useContext(PanierContext);
    if (!context) {
        throw new Error('usePanierContext must be used within a PanierProvider');
    }
    return context;
};

export const PanierProvider = ({ children }) => {
    const [panierItems, setPanierItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Charger le panier
    const loadPanier = useCallback(async () => {
        try {
            setLoading(true);
            const response = await panierAPI.get();
            if (response.ok) {
                const data = await response.json();
                const allItems = [
                    ...(data.panier?.articles_non_personnalises || []),
                    ...(data.panier?.articles_personnalises || [])
                ];
                setPanierItems(allItems);
            }
        } catch (error) {
            console.error("Erreur lors du chargement du panier:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    // Vérifier si un produit est dans le panier
    const isInPanier = useCallback((produitId) => {
        return panierItems.some(item => item.produit_id === produitId);
    }, [panierItems]);

    useEffect(() => {
        loadPanier();
    }, [loadPanier]);

    const value = {
        panierItems,
        loading,
        isInPanier,
        loadPanier
    };

    return (
        <PanierContext.Provider value={value}>
            {children}
        </PanierContext.Provider>
    );
};

