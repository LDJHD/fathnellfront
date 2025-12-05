const API_URL = import.meta.env.VITE_API_URL;

// Utilitaire pour les requêtes avec token
const fetchWithAuth = async (url, options = {}) => {
    const token = localStorage.getItem("token");
    const headers = {
        "Content-Type": "application/json",
        ...options.headers
    };
    
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    
    return fetch(`${API_URL}${url}`, {
        ...options,
        headers
    });
};

// Utilitaire pour les requêtes avec session
const fetchWithSession = async (url, options = {}) => {
    let sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem("session_id", sessionId);
    }
    
    const body = typeof options.body === 'string' ? 
        JSON.parse(options.body) : options.body || {};
    
    body.session_id = sessionId;
    
    return fetch(`${API_URL}${url}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers
        },
        body: JSON.stringify(body)
    });
};

// Collections
export const collectionsAPI = {
    getAll: () => fetchWithAuth('/api/v1/collection/listall'),
    getById: (id) => fetchWithAuth('/api/v1/collection/detailById', {
        method: 'POST',
        body: JSON.stringify({ id })
    }),
    create: (formData) => {
        const token = localStorage.getItem("token");
        return fetch(`${API_URL}/api/v1/collection/create`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData // FormData pour les images
        });
    },
    update: (id, formData) => {
        const token = localStorage.getItem("token");
        formData.append('id', id);
        return fetch(`${API_URL}/api/v1/collection/update`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
    },
    delete: (id) => fetchWithAuth('/api/v1/collection/delete', {
        method: 'POST',
        body: JSON.stringify({ id })
    })
};

// Produits
export const produitsAPI = {
    getAll: (filters = {}) => {
        const params = new URLSearchParams(filters);
        return fetch(`${API_URL}/api/v1/produit/listall?${params}`);
    },
    getById: (id) => fetch(`${API_URL}/api/v1/produit/detailById`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }),
    create: (formData) => {
        const token = localStorage.getItem("token");
        return fetch(`${API_URL}/api/v1/produit/create`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
    },
    update: (id, formData) => {
        const token = localStorage.getItem("token");
        formData.append('id', id);
        return fetch(`${API_URL}/api/v1/produit/updateProduit`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
    },
    delete: (id) => fetchWithAuth('/api/v1/produit/delete', {
        method: 'POST',
        body: JSON.stringify({ id })
    })
};

// Panier
export const panierAPI = {
    get: () => {
        const sessionId = localStorage.getItem("session_id");
        return fetchWithSession('/api/v1/panier/get', {
            method: 'POST',
            body: { session_id: sessionId }
        });
    },
    ajouter: (produit_id, quantite = 1, personnalise = false, couleur_id = null, taille_id = null, texte_personnalisation = null) => {
        return fetchWithSession('/api/v1/panier/ajouter', {
            method: 'POST',
            body: { produit_id, quantite, personnalise, couleur_id, taille_id, texte_personnalisation }
        });
    },
    modifierQuantite: (item_id, quantite) => {
        return fetchWithSession('/api/v1/panier/modifier-quantite', {
            method: 'POST',
            body: { item_id, quantite }
        });
    },
    supprimerItem: (item_id) => {
        return fetchWithSession('/api/v1/panier/supprimer-item', {
            method: 'POST',
            body: { item_id }
        });
    }
};

// Commandes
export const commandesAPI = {
    creer: () => {
        return fetchWithSession('/api/v1/commande/creer', {
            method: 'POST',
            body: {}
        });
    },
    getAll: (filters = {}) => fetchWithAuth('/api/v1/commande/listall', {
        method: 'POST',
        body: JSON.stringify(filters)
    }),
    getById: (id) => fetchWithAuth('/api/v1/commande/detailById', {
        method: 'POST',
        body: JSON.stringify({ id })
    })
};

// Couleurs
export const couleursAPI = {
    getAll: () => fetch(`${API_URL}/api/v1/couleur/listall`),
    create: (nom, code_hex) => fetchWithAuth('/api/v1/couleur/create', {
        method: 'POST',
        body: JSON.stringify({ nom, code_hex })
    })
};

// Tailles
export const taillesAPI = {
    getAll: (type = null) => {
        const params = type ? `?type=${type}` : '';
        return fetch(`${API_URL}/api/v1/taille/listall${params}`);
    },
    create: (nom, type) => fetchWithAuth('/api/v1/taille/create', {
        method: 'POST',
        body: JSON.stringify({ nom, type })
    })
};

// Catégories
export const categoriesAPI = {
    getAll: () => fetch(`${API_URL}/api/v1/categorie/listall`),
    getPrincipales: () => fetch(`${API_URL}/api/v1/categorie/principales`),
    getById: (id) => fetch(`${API_URL}/api/v1/categorie/detailById`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }),
    create: (formData) => {
        const token = localStorage.getItem("token");
        return fetch(`${API_URL}/api/v1/categorie/create`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData // FormData pour les bannières
        });
    },
    update: (formData) => {
        const token = localStorage.getItem("token");
        return fetch(`${API_URL}/api/v1/categorie/update`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` },
            body: formData // FormData pour les bannières
        });
    },
    delete: (id) => fetchWithAuth('/api/v1/categorie/delete', {
        method: 'POST',
        body: JSON.stringify({ id })
    }),
    getSousCategories: (parent_id) => fetch(`${API_URL}/api/v1/categorie/sous-categories`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parent_id })
    })
};

// Wishlist
export const wishlistAPI = {
    get: () => {
        const sessionId = localStorage.getItem("session_id");
        return fetchWithSession('/api/v1/wishlist/get', {
            method: 'POST',
            body: { session_id: sessionId }
        });
    },
    ajouter: (produit_id) => {
        return fetchWithSession('/api/v1/wishlist/ajouter', {
            method: 'POST',
            body: { produit_id }
        });
    },
    supprimer: (produit_id) => {
        return fetchWithSession('/api/v1/wishlist/supprimer', {
            method: 'POST',
            body: { produit_id }
        });
    },
    check: (produit_id) => {
        return fetchWithSession('/api/v1/wishlist/check', {
            method: 'POST',
            body: { produit_id }
        });
    }
};

// Contact & Newsletter
export const contactAPI = {
    subscribeNewsletter: (email) => {
        return fetch(`${API_URL}/api/v1/contact/newsletter/subscribe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email })
        });
    },
    sendContactForm: (data) => {
        return fetch(`${API_URL}/api/v1/contact/send`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }
};

// Authentification
export const authAPI = {
    register: (data) => {
        return fetch(`${API_URL}/api/v1/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    },
    login: (email, password) => {
        return fetch(`${API_URL}/api/v1/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
    }
};