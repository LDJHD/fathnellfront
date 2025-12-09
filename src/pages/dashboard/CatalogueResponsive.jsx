import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { produitsAPI, collectionsAPI } from "../../services/api";
import logo from "../../assets/logo.png";

export default function CatalogueResponsive() {
  const navigate = useNavigate();

  // États pour les données
  const [produits, setProduits] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour les filtres
  const [selectedCollection, setSelectedCollection] = useState("");
  const [selectedStockStatus, setSelectedStockStatus] = useState("");
  const [showCollectionDropdown, setShowCollectionDropdown] = useState(false);
  const [showStockDropdown, setShowStockDropdown] = useState(false);

  // Charger les données initiales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Charger les collections
        const collectionsResponse = await collectionsAPI.getAll();
        if (collectionsResponse.ok) {
          const collectionsData = await collectionsResponse.json();
          setCollections(collectionsData.collections || []);
        }

        // Charger les produits
        await loadProduits();
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Charger les produits avec filtres
  const loadProduits = async (filters = {}) => {
    try {
      const queryParams = {};
      if (selectedCollection) queryParams.collection_id = selectedCollection;
      if (selectedStockStatus) queryParams.stock_status = selectedStockStatus;

      // Fusionner avec les filtres passés en paramètre
      Object.assign(queryParams, filters);

      const response = await produitsAPI.getAll(queryParams);
      if (response.ok) {
        const data = await response.json();
        setProduits(data.produits || []);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des produits:", error);
      setProduits([]);
    }
  };

  // Appliquer les filtres
  useEffect(() => {
    if (!loading) {
      loadProduits();
    }
  }, [selectedCollection, selectedStockStatus]);

  // Gestionnaires d'événements
  const handleCollectionFilter = (collectionId) => {
    setSelectedCollection(collectionId);
    setShowCollectionDropdown(false);
  };

  const handleStockFilter = (stockStatus) => {
    setSelectedStockStatus(stockStatus);
    setShowStockDropdown(false);
  };

  const handleAddArticle = () => {
    navigate("/dashboard/ajouter-article");
  };

  const handleEditProduit = (produitId) => {
    navigate(`/dashboard/modifier-article/${produitId}`);
  };

  const handleDeleteProduit = async (produitId, produitNom) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer l'article "${produitNom}" ? Cette action est irréversible.`)) {
      try {
        const response = await produitsAPI.delete(produitId);
        if (response.ok) {
          // Recharger la liste des produits
          await loadProduits();
          alert("Article supprimé avec succès");
        } else {
          const errorData = await response.json();
          alert(`Erreur lors de la suppression: ${errorData.message}`);
        }
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        alert("Erreur lors de la suppression de l'article");
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('fr-FR').format(price) + ' XOF';
  };

  const getStockStatusText = (status) => {
    switch (status) {
      case 'disponible': return 'Disponible';
      case 'stock_limite': return 'Stock limité';
      case 'indisponible': return 'Indisponible';
      case 'sur_commande': return 'Sur commande';
      default: return status;
    }
  };

  const getStockStatusColor = (status) => {
    switch (status) {
      case 'disponible': return 'text-green-600';
      case 'stock_limite': return 'text-orange-600';
      case 'indisponible': return 'text-red-600';
      case 'sur_commande': return 'text-blue-600';
      default: return 'text-black';
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 p-4 flex flex-col gap-6 font-['Glacial_Indifference']">

      {/* HEADER */}
      <div className="w-full px-6 py-3 bg-white border-b-4 border-zinc-400 flex justify-between items-center">
        <div className="text-black text-xl md:text-3xl font-bold">Gestion du catalogue</div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white rounded-full border flex items-center justify-center">
            <img src={logo} className="w-8 h-8 rounded-full" />
          </div>
          <div>
            <div className="text-black text-sm font-bold leading-5">Fathnelle DJIHOUESSI</div>
            <div className="text-black text-sm leading-5">Admin</div>
          </div>
        </div>
      </div>

      {/* BOUTON AJOUT */}
      <button
        onClick={handleAddArticle}
        className="w-full md:w-auto px-6 py-2 bg-black text-white font-bold rounded-sm hover:bg-gray-800 transition-colors"
      >
        Ajouter un article
      </button>

      {/* FILTRES */}
      <div className="text-black text-lg">Filtrer par :</div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* Filtre Catégories - Placeholder pour l'instant */}
        <div className="px-4 py-1 bg-neutral-200 rounded flex items-center justify-between cursor-pointer w-full md:w-60 opacity-50">
          <span className="text-black text-base">Catégories d'articles</span>
          <div className="w-3 h-3 bg-zinc-400 border border-black" />
        </div>

        {/* Filtre Collection */}
        <div className="relative w-full md:w-52">
          <div
            onClick={() => setShowCollectionDropdown(!showCollectionDropdown)}
            className="px-4 py-1 bg-neutral-200 rounded flex items-center justify-between cursor-pointer"
          >
            <span className="text-black text-base">
              {selectedCollection
                ? collections.find(c => c.id == selectedCollection)?.nom || 'Collection'
                : 'Collection'
              }
            </span>
            <svg
              className="w-3 h-3 inline-block"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="#000"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {showCollectionDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 text-black bg-white border border-gray-300 rounded shadow-lg z-10">
              <div
                onClick={() => handleCollectionFilter("")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                Toutes les collections
              </div>
              {collections.map(collection => (
                <div
                  key={collection.id}
                  onClick={() => handleCollectionFilter(collection.id)}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {collection.nom}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Filtre État du stock */}
        <div className="relative w-full md:w-48">
          <div
            onClick={() => setShowStockDropdown(!showStockDropdown)}
            className="px-4 py-1 bg-neutral-200 rounded flex items-center justify-between cursor-pointer"
          >
            <span className="text-black text-base">
              {selectedStockStatus
                ? getStockStatusText(selectedStockStatus)
                : 'État du stock'
              }
            </span>
            <svg
              className="w-3 h-3 inline-block"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M6 9l6 6 6-6"
                stroke="#000"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {showStockDropdown && (
            <div className="absolute top-full left-0 right-0 mt-1 text-black bg-white border border-gray-300 rounded shadow-lg z-10">
              <div
                onClick={() => handleStockFilter("")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                Tous les états
              </div>
              <div
                onClick={() => handleStockFilter("disponible")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                Disponible
              </div>
              <div
                onClick={() => handleStockFilter("stock_limite")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                Stock limité
              </div>
              <div
                onClick={() => handleStockFilter("indisponible")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                Indisponible
              </div>
              <div
                onClick={() => handleStockFilter("sur_commande")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                Sur commande
              </div>
            </div>
          )}
        </div>
      </div>

      {/* LIGNES PRODUITS */}
      <div className="flex flex-col gap-2">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-lg">Chargement...</div>
          </div>
        ) : produits.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-lg text-gray-500">Aucun produit trouvé</div>
          </div>
        ) : (
          produits.map((produit) => (
            <div
              key={produit.id}
              className="
                w-full bg-white px-4 py-3 border rounded 
                flex flex-col gap-3 
                sm:grid sm:grid-cols-9 sm:gap-4 sm:items-center
              "
            >
              {/* IMAGE */}
              <img
                className="w-14 h-14 rounded mx-auto sm:mx-0 object-cover"
                src={produit.image_principale
                  ? `${import.meta.env.VITE_API_URL}/uploads/produits/${produit.image_principale}`
                  : "https://placehold.co/50x50"
                }
                alt={produit.nom}
                onError={(e) => {
                  e.target.src = "https://placehold.co/50x50";
                }}
              />

              {/* NOM */}
              <div className="text-center sm:text-left text-black text-lg leading-6 sm:leading-8">
                {produit.nom}
              </div>

              {/* ANCIEN PRIX */}
              <div className="text-center text-black text-base line-through leading-5 sm:leading-6">
                {produit.en_promo && produit.prix ? formatPrice(produit.prix) : '-'}
              </div>

              {/* PRIX ACTUEL */}
              <div className={`text-center text-lg font-bold leading-6 sm:leading-8 ${produit.en_promo ? 'text-red-600' : 'text-black'
                }`}>
                {formatPrice(produit.en_promo && produit.prix_promo ? produit.prix_promo : produit.prix)}
              </div>

              {/* EN PROMO */}
              <div className="flex sm:block items-center justify-center gap-2">
                {produit.en_promo ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                  >
                    <rect x="0" y="0" width="20" height="20" fill="#16A34A" />
                    <path
                      d="M5 10.5 L8 13.5 L15 6"
                      stroke="white"
                      strokeWidth="2.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : (
                  <div className="w-5 h-5 border-2 border-gray-400 rounded"></div>
                )}
                <span className="text-black text-lg leading-6 sm:hidden">
                  {produit.en_promo ? 'Oui' : 'Non'}
                </span>
              </div>
              <div className="hidden sm:block text-center text-black text-lg leading-8">
                {produit.en_promo ? 'Oui' : 'Non'}
              </div>

              {/* STOCK */}
              <div className={`text-center text-lg leading-8 ${getStockStatusColor(produit.stock_status)}`}>
                {getStockStatusText(produit.stock_status)}
              </div>

              {/* PERSONNALISATION */}
              <div className="text-center text-black text-lg leading-8">
                {produit.personnalisable ? 'Oui' : 'Non'}
              </div>

              {/* ACTIONS */}
              <div className="flex justify-center items-center gap-4">
                {/* Edit */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cursor-pointer hover:stroke-blue-600 transition-colors"
                  onClick={() => handleEditProduit(produit.id)}
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>

                {/* Delete */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="cursor-pointer hover:stroke-red-600 transition-colors"
                  onClick={() => handleDeleteProduit(produit.id, produit.nom)}
                >
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6l-1 14H6L5 6" />
                  <path d="M10 11v6" />
                  <path d="M14 11v6" />
                  <path d="M9 6V4h6v2" />
                </svg>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fermer les dropdowns quand on clique ailleurs */}
      {(showCollectionDropdown || showStockDropdown) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowCollectionDropdown(false);
            setShowStockDropdown(false);
          }}
        />
      )}
    </div>
  );
}
