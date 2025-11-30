import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import img12 from "../assets/img12.png";
import emptyIcon from "../assets/dropbox-logo-thin 1.svg";
import { Trash2 } from "lucide-react";
import { useWishlist } from "../hooks/useWishlist";
import { usePanier } from "../hooks/usePanier";
import { panierAPI } from "../services/api";

export default function ListeSouhait() {
  const navigate = useNavigate();
  const { wishlistItems, loading, removeFromWishlist, loadWishlist } = useWishlist();
  const { loadPanier } = usePanier();
  const [ajoutEnCours, setAjoutEnCours] = useState({});

  const hasProducts = wishlistItems.length > 0;

  // Fonction pour obtenir le texte du statut
  const getStockStatusText = (status) => {
    switch (status) {
      case 'disponible': return 'Disponible';
      case 'stock_limite': return 'Stock limité';
      case 'indisponible': return 'Indisponible';
      default: return status || 'Disponible';
    }
  };

  // Fonction pour obtenir la couleur du statut
  const getStockStatusColor = (status) => {
    switch (status) {
      case 'disponible': return 'text-green-600';
      case 'stock_limite': return 'text-orange-600';
      case 'indisponible': return 'text-red-600';
      default: return 'text-black';
    }
  };

  // Fonction pour obtenir le prix
  const getPrix = (item) => {
    if (item.en_promo && item.prix_promo) {
      return item.prix_promo;
    }
    return item.produit_prix;
  };

  // Fonction pour formater le prix
  const formatPrix = (prix) => {
    return prix?.toLocaleString() || '0';
  };

  // Retirer de la wishlist
  const handleRemove = async (produitId) => {
    await removeFromWishlist(produitId);
  };

  // Ajouter au panier depuis la wishlist
  const handleAcheter = async (item) => {
    setAjoutEnCours(prev => ({ ...prev, [item.produit_id]: true }));
    try {
      const response = await panierAPI.ajouter(item.produit_id, 1, false, null, null);
      if (response.ok) {
        // Retirer de la wishlist après ajout au panier
        await removeFromWishlist(item.produit_id);
        loadPanier(); // Recharger le contexte pour mettre à jour la Navbar
        alert("Produit ajouté au panier avec succès !");
      } else {
        const errorData = await response.json();
        alert(`Erreur: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error);
      alert("Erreur lors de l'ajout au panier");
    } finally {
      setAjoutEnCours(prev => ({ ...prev, [item.produit_id]: false }));
    }
  };

  // Naviguer vers la fiche produit
  const handleProduitClick = (produitId) => {
    navigate(`/produit/${produitId}`);
  };

  return (
    <div className="w-full flex flex-col items-center bg-white pb-20">

      {/* HEADER */}
      <div className="w-full h-8 px-16 py-1 bg-zinc-400 flex items-center">
        <div className="text-black text-base font-bold font-['Glacial_Indifference']">
          LISTE DE SOUHAITS
        </div>
      </div>

      {/* TITLE */}
      <div className="p-2 mt-20 text-center">
        <div className="text-black text-4xl font-bold font-['Glacial_Indifference'] underline leading-[52px]">
          Ma liste de souhaits:
        </div>
      </div>

      {/* CONTENT */}
      <div className="w-full max-w-[1204px] mt-10 flex flex-col gap-6 px-4 md:px-10">
        {loading ? (
          <div className="text-center py-8">
            <div className="text-black text-xl font-['Glacial_Indifference']">
              Chargement de votre liste de souhaits...
            </div>
          </div>
        ) : hasProducts ? (
          wishlistItems.map((item) => {
            const isAvailable = item.stock_status !== "indisponible";
            const prix = getPrix(item);
            const imageUrl = item.image_principale 
              ? `${import.meta.env.VITE_API_URL}/uploads/produits/${item.image_principale}` 
              : img12;

            return (
              <div
                key={item.item_id}
                className="w-full p-2 bg-white border-b border-neutral-700 
                          flex flex-row justify-between items-center gap-2"
              >
                {/* IMAGE */}
                <img
                  src={imageUrl}
                  alt={item.produit_nom}
                  className="w-24 h-20 rounded-sm object-cover cursor-pointer"
                  onClick={() => handleProduitClick(item.produit_id)}
                />

                {/* NAME + PRICE */}
                <div className="flex flex-col items-start flex-1 min-w-[150px]">
                  <div 
                    className="text-primary-base text-sm text-black md:text-lg font-['Glacial_Indifference'] cursor-pointer hover:underline"
                    onClick={() => handleProduitClick(item.produit_id)}
                  >
                    {item.produit_nom}
                  </div>
                  <div className="text-primary-base text-sm text-black md:text-lg font-['Glacial_Indifference']">
                    {item.en_promo ? (
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400 line-through text-sm">
                          {formatPrix(item.produit_prix)} xof
                        </span>
                        <span className="text-red-600 font-bold">
                          {formatPrix(item.prix_promo)} xof
                        </span>
                      </div>
                    ) : (
                      <span>{formatPrix(prix)} xof</span>
                    )}
                  </div>
                </div>

                {/* STATUS */}
                <div className={`text-primary-base text-xs md:text-lg font-['Glacial_Indifference'] font-semibold ${getStockStatusColor(item.stock_status)}`}>
                  {getStockStatusText(item.stock_status)}
                </div>

                {/* BUTTON */}
                <button
                  disabled={!isAvailable || ajoutEnCours[item.produit_id]}
                  onClick={() => handleAcheter(item)}
                  className={`px-3 md:px-6 py-1 md:py-2 rounded-sm font-['Glacial_Indifference'] font-bold 
                       text-xs md:text-base leading-6
                ${isAvailable && !ajoutEnCours[item.produit_id] 
                  ? "bg-black text-white hover:bg-gray-800" 
                  : "bg-zinc-400 text-white cursor-not-allowed"}`}
                >
                  {ajoutEnCours[item.produit_id] ? "Ajout..." : "Acheter"}
                </button>

                {/* TRASH ICON */}
                <div 
                  className="w-8 h-8 flex justify-center items-center cursor-pointer hover:scale-110 transition"
                  onClick={() => handleRemove(item.produit_id)}
                >
                  <Trash2 size={18} className="text-black" />
                </div>
              </div>
            );
          })
        ) : (
          // EMPTY
          <div className="flex flex-col items-center justify-center pt-20">
            <img
              src={emptyIcon}
              alt="empty wishlist"
              className="w-36 h-36 object-contain"
            />

            <div className="text-center mt-6 leading-10 font-['Glacial_Indifference']">
              <span className="text-black text-3xl font-normal">
                Aucun article n'a encore été ajouté à votre sélection.<br />
                Découvrez nos collections et trouvez vos coups de cœur
              </span>
              <span 
                className="text-red-600 text-3xl font-normal cursor-pointer hover:underline"
                onClick={() => navigate('/categorie')}
              > ici.</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
