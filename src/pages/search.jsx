import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PromoBadge from "../components/PromoBadge";
import heroImage from "../assets/hero-image.jpg";
import img12 from "../assets/img12.png";
import { produitsAPI } from "../services/api";
import { useWishlist } from "../hooks/useWishlist";

export default function Search() {
    const location = useLocation();
    const navigate = useNavigate();
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filtreActif, setFiltreActif] = useState('');
    const [openFilter, setOpenFilter] = useState(false);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [noResults, setNoResults] = useState(false);
    const { isInWishlist, toggleWishlist } = useWishlist();

    // Extraire le terme de recherche de l'URL
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const query = searchParams.get('q');
        setSearchTerm(query || '');
        
        if (query) {
            setOffset(0);
            setHasMore(true);
            setNoResults(false);
            searchProducts(query, true);
        } else {
            setProduits([]);
            setNoResults(false);
        }
    }, [location.search]);

    // Fonction de recherche
    const searchProducts = async (query, reset = false) => {
        if (!query || query.trim().length < 2) {
            setProduits([]);
            setNoResults(false);
            return;
        }

        try {
            setLoading(true);
            const currentOffset = reset ? 0 : offset;
            
            // Appel API pour rechercher les produits
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/produit/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    search: query.trim(),
                    limit: 12,
                    offset: currentOffset
                })
            });

            if (response.ok) {
                const data = await response.json();
                const nouveauxProduits = data.produits || [];
                
                // Supprimer les doublons basés sur l'ID du produit
                const produitsUniques = [];
                const seenIds = new Set();
                
                const allProduits = reset ? nouveauxProduits : [...produits, ...nouveauxProduits];
                
                allProduits.forEach(produit => {
                    if (!seenIds.has(produit.id)) {
                        seenIds.add(produit.id);
                        produitsUniques.push(produit);
                    }
                });
                
                setProduits(produitsUniques);
                
                if (reset) {
                    setOffset(nouveauxProduits.length);
                } else {
                    setOffset(prev => prev + nouveauxProduits.length);
                }
                
                setHasMore(data.pagination?.has_more || false);
                setNoResults(reset && nouveauxProduits.length === 0);
                
            } else {
                console.error("Erreur lors de la recherche");
                if (reset) {
                    setProduits([]);
                    setNoResults(true);
                }
            }
        } catch (error) {
            console.error("Erreur réseau:", error);
            if (reset) {
                setProduits([]);
                setNoResults(true);
            }
        } finally {
            setLoading(false);
        }
    };

    // Gérer le tri
    const handleSort = (type) => {
        setFiltreActif(type);
        setOpenFilter(false);
        
        let produitsTries = [...produits];
        if (type === 'prix_croissant') {
            produitsTries.sort((a, b) => {
                const prixA = a.en_promo ? a.prix_promo : a.prix;
                const prixB = b.en_promo ? b.prix_promo : b.prix;
                return prixA - prixB;
            });
        } else if (type === 'prix_decroissant') {
            produitsTries.sort((a, b) => {
                const prixA = a.en_promo ? a.prix_promo : a.prix;
                const prixB = b.en_promo ? b.prix_promo : b.prix;
                return prixB - prixA;
            });
        } else if (type === 'alphabetique') {
            produitsTries.sort((a, b) => a.nom.localeCompare(b.nom));
        } else if (type === 'pertinence') {
            // Remettre dans l'ordre original de pertinence
            if (searchTerm) {
                searchProducts(searchTerm, true);
                return;
            }
        }
        setProduits(produitsTries);
    };

    // Naviguer vers la fiche produit
    const handleProduitClick = (produitId) => {
        navigate(`/produit/${produitId}`);
    };

    // Charger plus de résultats
    const loadMore = () => {
        if (searchTerm && hasMore && !loading) {
            searchProducts(searchTerm, false);
        }
    };

    return (
        <div className="text-center w-full flex flex-col items-center bg-white">
            
            {/* ---------- HEADER ---------- */}
            <div className="w-full px-4 md:px-16 py-2 border-b-4 border-zinc-400 bg-white">
                <div className="text-black text-start text-sm md:text-base font-bold font-['Glacial_Indifference']">
                    {searchTerm ? `Recherche : "${searchTerm}"` : "Recherche"}
                </div>
            </div>

            {/* ---------- BANNIÈRE ---------- */}
            <div
                className="w-full h-[200px] md:h-[400px] bg-cover bg-center"
                style={{ backgroundImage: `url(${heroImage})` }}
            />

            {/* ---------- TEXTE ---------- */}
            <div className="w-full md:w-[1000px] px-8 md:px-10 py-10">
                <p className="text-black text-xl font-normal font-['Glacial_Indifference'] leading-relaxed md:leading-10">
                    {searchTerm 
                        ? `Résultats de recherche pour "${searchTerm}". Découvrez nos articles correspondant à votre recherche.`
                        : "Utilisez la barre de recherche ci-dessus pour trouver vos produits FathNell préférés."
                    }
                </p>
            </div>

            {/* ---------- STATISTIQUES DE RECHERCHE ---------- */}
            {searchTerm && (
                <div className="w-full px-4 md:px-60 mb-6">
                    <div className="text-gray-600 text-sm font-['Glacial_Indifference']">
                        {loading ? (
                            "Recherche en cours..."
                        ) : noResults ? (
                            "Aucun résultat trouvé"
                        ) : (
                            `${produits.length} produit${produits.length > 1 ? 's' : ''} trouvé${produits.length > 1 ? 's' : ''}`
                        )}
                    </div>
                </div>
            )}

            {/* ---------- PRODUITS + FILTRE ---------- */}
            {(produits.length > 0 || loading) && (
                <div className="w-full flex flex-col items-center gap-10 px-4 md:px-60 py-10">

                    {/* ------------ BOUTON FILTRE ------------ */}
                    <div className="w-full flex justify-end relative">
                        <button
                            onClick={() => setOpenFilter(!openFilter)}
                            className="flex items-center gap-2 border border-black bg-white rounded-full px-4 py-2"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-5 h-5"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="black"
                                fill="none"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M3 5h18M6 12h12M10 19h4"
                                />
                            </svg>
                            <span className="text-black bg-white text-lg font-normal font-['Glacial_Indifference']">
                                Trier
                            </span>
                        </button>

                        {/* ------------ MENU FILTRE ------------ */}
                        {openFilter && (
                            <div className="absolute top-14 right-0 bg-white border border-black rounded-md shadow p-3 w-48 flex flex-col gap-2 z-20">
                                <button 
                                    onClick={() => handleSort('pertinence')}
                                    className={`text-left bg-white hover:bg-gray-100 px-2 py-1 text-black font-['Glacial_Indifference'] ${filtreActif === 'pertinence' || !filtreActif ? 'bg-gray-100' : ''}`}
                                >
                                    Pertinence
                                </button>
                                <button 
                                    onClick={() => handleSort('alphabetique')}
                                    className={`text-left bg-white hover:bg-gray-100 px-2 py-1 text-black font-['Glacial_Indifference'] ${filtreActif === 'alphabetique' ? 'bg-gray-100' : ''}`}
                                >
                                    Nom A-Z
                                </button>
                                <button 
                                    onClick={() => handleSort('prix_croissant')}
                                    className={`text-left bg-white hover:bg-gray-100 px-2 py-1 text-black font-['Glacial_Indifference'] ${filtreActif === 'prix_croissant' ? 'bg-gray-100' : ''}`}
                                >
                                    Prix croissant
                                </button>
                                <button 
                                    onClick={() => handleSort('prix_decroissant')}
                                    className={`text-left bg-white hover:bg-gray-100 px-2 py-1 text-black font-['Glacial_Indifference'] ${filtreActif === 'prix_decroissant' ? 'bg-gray-100' : ''}`}
                                >
                                    Prix décroissant
                                </button>
                            </div>
                        )}
                    </div>

                    {/* ------------ GRID PRODUITS ------------ */}
                    {loading && produits.length === 0 ? (
                        <div className="text-center py-8">
                            <div className="text-black text-xl font-['Glacial_Indifference']">
                                Recherche en cours...
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-10 w-full">
                            {produits.map((produit) => (
                                <div 
                                    key={produit.id} 
                                    className="group relative bg-white overflow-hidden cursor-pointer"
                                    onClick={() => handleProduitClick(produit.id)}
                                >
                                    {/* Image + options */}
                                    <div className="relative overflow-hidden aspect-square md:aspect-auto md:h-72">

                                        {/* Badge promo */}
                                        <div className="absolute top-2 left-0 z-10">
                                            {produit.en_promo ? (
                                                <PromoBadge />
                                            ) : (
                                                <div className="invisible">
                                                    <PromoBadge />
                                                </div>
                                            )}
                                        </div>

                                        {/* Icône cœur */}
                                        <button 
                                            onClick={async (e) => {
                                                e.stopPropagation();
                                                await toggleWishlist(produit.id);
                                            }}
                                            className="absolute top-2 right-2 bg-white p-1 md:p-2 border border-black rounded-sm hover:scale-110 transition z-10"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill={isInWishlist(produit.id) ? "#ef4444" : "none"}
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke={isInWishlist(produit.id) ? "#ef4444" : "black"}
                                                className="w-4 h-4"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.74 0-3.255.986-4.062 2.437A4.687 4.687 0 008.188 3.75C5.6 3.75 3.5 5.765 3.5 8.25c0 7.22 8 11.25 8 11.25s8-4.03 8-11.25z"
                                                />
                                            </svg>
                                        </button>

                                        <img
                                            src={produit.image_principale 
                                                ? `${import.meta.env.VITE_API_URL}/uploads/produits/${produit.image_principale}` 
                                                : img12
                                            }
                                            alt={produit.nom}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-95 group-hover:brightness-90"
                                        />
                                    </div>

                                    {/* Infos produit */}
                                    <div className="mt-4 text-start">
                                        <h3 className="text-black text-lg leading-8 font-normal">{produit.nom}</h3>
                                        
                                        {/* Affichage catégorie */}
                                        {produit.categorie_nom && (
                                            <p className="text-gray-500 text-sm font-['Glacial_Indifference'] mt-1">
                                                {produit.categorie_nom}
                                            </p>
                                        )}
                                        
                                        <div className="mt-2">
                                            {produit.en_promo ? (
                                                <>
                                                    <span className="text-gray-400 line-through mr-2">{produit.prix?.toLocaleString()} xof</span>
                                                    <span className="text-red-600 font-bold">{produit.prix_promo?.toLocaleString()} xof</span>
                                                </>
                                            ) : (
                                                <span className="text-gray-900 font-bold">{produit.prix?.toLocaleString()} xof</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* ---------- MESSAGE AUCUN RÉSULTAT ---------- */}
            {noResults && searchTerm && (
                <div className="w-full px-4 md:px-60 py-20 text-center">
                    <div className="text-gray-500 text-lg font-['Glacial_Indifference'] mb-4">
                        😔 Aucun produit trouvé pour "{searchTerm}"
                    </div>
                    <div className="text-gray-400 text-base font-['Glacial_Indifference'] mb-8">
                        Essayez avec d'autres mots-clés ou parcourez nos catégories
                    </div>
                    <button 
                        onClick={() => navigate('/boutique')}
                        className="px-6 py-2 bg-black text-white text-base font-bold font-['Glacial_Indifference'] rounded-sm hover:bg-gray-800 transition"
                    >
                        Voir tous nos produits
                    </button>
                </div>
            )}

            {/* ---------------- BUTTON "VOIR PLUS" ---------------- */}
            {hasMore && !loading && produits.length > 0 && (
                <button 
                    onClick={loadMore}
                    className="px-6 py-2 mt-2 mb-6 bg-black text-white text-base font-bold font-['Glacial_Indifference'] rounded-sm"
                    disabled={loading}
                >
                    Voir plus
                </button>
            )}

            {/* Loading indicator pour "Voir plus" */}
            {loading && produits.length > 0 && (
                <div className="text-center py-4 mb-6">
                    <div className="text-gray-600 text-base font-['Glacial_Indifference']">
                        Chargement des résultats...
                    </div>
                </div>
            )}

        </div>
    );
}