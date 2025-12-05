import React, { useState, useEffect } from "react";
import PromoBadge from "../components/PromoBadge";
import { useParams } from "react-router-dom";
import heroImage from "../assets/hero-image.jpg";
import img12 from "../assets/img12.png";
import { produitsAPI, categoriesAPI } from "../services/api";
import { useWishlist } from "../hooks/useWishlist";

export default function Categorie() {
    const { categoryName } = useParams(); // Récupère la catégorie depuis l'URL
    const [openFilter, setOpenFilter] = useState(false);
    const [produits, setProduits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filtreActif, setFiltreActif] = useState('');
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [categories, setCategories] = useState([]); // Catégories de la BDD
    const { isInWishlist, toggleWishlist } = useWishlist(); // Hook pour la wishlist


    // Charger les catégories depuis la BDD
    const fetchCategories = async () => {
        try {
            const response = await categoriesAPI.getAll();
            if (response.ok) {
                const data = await response.json();
                setCategories(data.categories || []);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des catégories:", error);
        }
    };

    // Mapper les URLs vers les vraies catégories de la BDD
    const findCategoryByUrlName = (urlName) => {
        if (!urlName || !categories.length) return null;
        
        // Normaliser le nom de l'URL (décoder les espaces encodés, convertir en minuscules)
        const normalizedUrlName = decodeURIComponent(urlName).toLowerCase().trim();
        
        // Chercher directement dans les catégories de la BDD par correspondance exacte ou partielle
        // On cherche d'abord une correspondance exacte (insensible à la casse)
        let foundCategory = categories.find(cat => 
            cat.nom?.toLowerCase().trim() === normalizedUrlName
        );
        
        // Si pas trouvé, chercher une correspondance partielle
        if (!foundCategory) {
            foundCategory = categories.find(cat => {
                const catNom = cat.nom?.toLowerCase().trim() || '';
                // Vérifier si le nom de catégorie contient le nom de l'URL ou vice versa
                return catNom.includes(normalizedUrlName) || normalizedUrlName.includes(catNom);
            });
        }
        
        return foundCategory || null;
    };

    // Fonction pour obtenir les informations de la catégorie actuelle depuis la BDD
    const getCurrentCategory = () => {
        if (categoryName) {
            // Utiliser la catégorie de la BDD
            const dbCategory = findCategoryByUrlName(categoryName);
            if (dbCategory) {
                return {
                    title: dbCategory.nom,
                    description: dbCategory.description || "Découvrez notre sélection de produits de qualité."
                };
            }
        }
        
        // Catégorie par défaut si aucune n'est spécifiée
        return {
            title: "Tous nos Produits",
            description: "Découvrez toute notre collection FathNell, où chaque article est conçu avec passion et savoir-faire pour vous offrir le meilleur de la maroquinerie et des accessoires de mode."
        };
    };

    // Charger les produits
    const fetchProduits = async (reset = false) => {
        try {
            setLoading(true);
            const currentOffset = reset ? 0 : offset;
            const filters = {
                limit: 8,
                offset: currentOffset
            };

            // Filtrer par catégorie si spécifié dans l'URL
            if (categoryName) {
                const dbCategory = findCategoryByUrlName(categoryName);
                if (dbCategory) {
                    // Utiliser l'ID de catégorie pour filtrer les produits
                    filters.categorie_id = dbCategory.id;
                } else {
                    // Si la catégorie n'est pas trouvée, ne pas charger de produits
                    setProduits([]);
                    setLoading(false);
                    setHasMore(false);
                    return;
                }
            }

            // Appliquer le filtre de tri
            if (filtreActif === 'prix_croissant') {
                // Le tri sera fait côté serveur si implémenté
            } else if (filtreActif === 'prix_decroissant') {
                // Le tri sera fait côté serveur si implémenté
            }

            const response = await produitsAPI.getAll(filters);
            
            if (response.ok) {
                const data = await response.json();
                const nouveauxProduits = data.produits || [];
                
                if (reset) {
                    setProduits(nouveauxProduits);
                    setOffset(8);
                } else {
                    setProduits(prev => [...prev, ...nouveauxProduits]);
                    setOffset(prev => prev + 8);
                }
                
                setHasMore(data.pagination?.has_more || false);
            } else {
                console.error("Erreur lors de la récupération des produits");
            }
        } catch (error) {
            console.error("Erreur réseau:", error);
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
        }
        setProduits(produitsTries);
    };

    // Naviguer vers la fiche produit
    const handleProduitClick = (produitId) => {
        window.location.href = `/produit/${produitId}`;
    };

    // Charger les catégories au montage
    useEffect(() => {
        fetchCategories();
    }, []);

    // Recharger les produits quand la catégorie change ou quand les catégories sont chargées
    useEffect(() => {
        if (categories.length > 0) {
            setOffset(0);
            setHasMore(true);
            setLoading(true);
            setFiltreActif(''); // Réinitialiser le filtre de tri
            fetchProduits(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryName, categories]);

    return (
        <div className="text-center w-full flex flex-col items-center bg-white">

            {/* ---------- HEADER ---------- */}
            <div className="w-full px-4 md:px-16 py-2 border-b-4 border-zinc-400 bg-white">
                <div className="text-black text-start text-sm md:text-base font-bold font-['Glacial_Indifference']">
                    {getCurrentCategory().title}
                </div>
            </div>

            {/* ---------- BANNIÈRE ---------- */}
            <div
                className="w-full h-[200px] md:h-[700px] bg-cover bg-center"
                style={{ 
                    backgroundImage: `url(${
                        categoryName && categories.length > 0 
                            ? (() => {
                                const dbCategory = findCategoryByUrlName(categoryName);
                                return dbCategory?.banniere_url 
                                    ? `http://localhost:3000${dbCategory.banniere_url}`
                                    : heroImage;
                            })()
                            : heroImage
                    })` 
                }}
            />
            {/* ---------- nom collection ---------- */}
            {/* si collection
                <div className="w-full px-4 md:px-5 py-10">

                <h1 className="text-black  text-center font-bold mt-2 font-['Glacial_Indifference'] leading-relaxed md:leading-10">
                Nom de collection
                </h1>
                </div> */}

            {/* ---------- TEXTE ---------- description categorie*/}
            <div className="w-full md:w-[1000px] px-8 md:px-10 py-10">

                <p className="text-black text-xl font-normal font-['Glacial_Indifference'] leading-relaxed md:leading-10">
                    {getCurrentCategory().description}
                </p>
            </div>

            {/* ---------- PRODUITS + FILTRE ---------- */}
            <div className="w-full  flex flex-col items-center gap-10 px-4 md:px-60  py-10">

                {/* ------------ BOUTON FILTRE ------------ */}
                <div className="w-full flex justify-end relative">

                    <button
                        onClick={() => setOpenFilter(!openFilter)}
                        className="flex items-center gap-2 border border-black bg-white rounded-full px-4 py-2"
                    >
                        {/* SVG FILTRE */}
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
                            Filtre
                        </span>
                    </button>

                    {/* ------------ MENU FILTRE ------------ */}
                    {openFilter && (
                        <div className="absolute top-14 right-0 bg-white border border-black rounded-md shadow p-3 w-40 flex flex-col gap-2 z-20">
                            <button 
                                onClick={() => handleSort('prix_croissant')}
                                className="text-left bg-white hover:bg-gray-100 px-2 py-1 text-black font-['Glacial_Indifference']"
                            >
                                Prix croissant
                            </button>
                            <button 
                                onClick={() => handleSort('prix_decroissant')}
                                className="text-left bg-white hover:bg-gray-100 px-2 py-1 text-black font-['Glacial_Indifference']"
                            >
                                Prix décroissant
                            </button>
                        </div>
                    )}

                </div>

                {/* ------------ GRID PRODUITS ------------ */}
                {loading ? (
                    <div className="text-center py-8">
                        <div className="text-black text-xl font-['Glacial_Indifference']">
                            Chargement des produits...
                        </div>
                    </div>
                ) : produits.length === 0 ? (
                    <div className="text-center py-8">
                        <div className="text-black text-xl font-['Glacial_Indifference']">
                            Aucun produit disponible dans cette catégorie
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

                                    {/* Badge promo - ou espace réservé pour maintenir l'alignement */}
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

            {/* ---------------- BUTTON "VOIR PLUS" ---------------- */}
            {hasMore && !loading && (
                <button 
                    onClick={() => fetchProduits()}
                    className="px-6 py-2 mt-2 mb-6 bg-black text-white text-base font-bold font-['Glacial_Indifference'] rounded-sm"
                >
                    Voir plus
                </button>
            )}

        </div>
    );
}
