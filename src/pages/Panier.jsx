import React, { useState, useEffect } from "react";
import img12 from "../assets/img12.png";
import { Trash2 } from "lucide-react";
import { panierAPI, commandesAPI } from "../services/api";
import { CONFIG, generateWhatsAppURL } from "../config/config";
import { usePanier } from "../hooks/usePanier";

export default function Panier() {
  const [panier, setPanier] = useState({
    articles_non_personnalises: [],
    articles_personnalises: [],
    total_non_personnalises: 0
  });
  const [loading, setLoading] = useState(true);
  const { loadPanier } = usePanier(); // Utiliser le contexte pour recharger

  // Charger le panier
  const fetchPanier = async () => {
    try {
      const response = await panierAPI.get();
      if (response.ok) {
        const data = await response.json();
        setPanier(data.panier || {
          articles_non_personnalises: [],
          articles_personnalises: [],
          total_non_personnalises: 0
        });
      } else {
        console.error("Erreur lors de la récupération du panier");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    } finally {
      setLoading(false);
    }
  };

  // Modifier quantité
  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      const response = await panierAPI.modifierQuantite(itemId, newQuantity);
      if (response.ok) {
        fetchPanier(); // Recharger le panier local
        loadPanier(); // Recharger le contexte pour mettre à jour la Navbar
      }
    } catch (error) {
      console.error("Erreur lors de la modification de la quantité:", error);
    }
  };

  // Supprimer item
  const handleRemoveItem = async (itemId) => {
    try {
      const response = await panierAPI.supprimerItem(itemId);
      if (response.ok) {
        fetchPanier(); // Recharger le panier local
        loadPanier(); // Recharger le contexte pour mettre à jour la Navbar
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  // Finaliser la commande
  const handleFinaliserCommande = async () => {
    try {
      const response = await commandesAPI.creer();
      if (response.ok) {
        const data = await response.json();
        console.log("📦 Données de la commande reçues:", data);
        console.log("📦 Articles dans la commande:", data.commande?.articles);
        
        alert(`Commande créée avec succès ! Numéro: ${data.commande.numero_commande}`);
        
        // Récupérer les articles de la commande
        const articles = data.commande?.articles || [];
        console.log("📦 Articles extraits:", articles);
        console.log("📦 Nombre d'articles:", articles.length);
        
        // Si pas d'articles dans la réponse, utiliser les articles du panier actuel
        let articlesPourMessage = articles;
        if (articles.length === 0) {
          console.log("⚠️ Aucun article dans la réponse, utilisation du panier actuel");
          articlesPourMessage = [
            ...nonCustom.map(item => ({
              produit_nom: item.produit_nom,
              quantite: item.quantite,
              prix_unitaire: item.prix_unitaire,
              prix_total: item.prix_unitaire * item.quantite,
              personnalise: false,
              couleur: item.couleur_nom || null,
              taille: item.taille_nom || null,
              taille_type: item.taille_type || null
            })),
            ...custom.map(item => ({
              produit_nom: item.produit_nom,
              quantite: item.quantite,
              prix_unitaire: 0,
              prix_total: 0,
              personnalise: true,
              couleur: item.couleur_nom || null,
              taille: item.taille_nom || null,
              taille_type: item.taille_type || null
            }))
          ];
        }
        
        console.log("📦 Articles pour le message:", articlesPourMessage);
        
        // Vérifier s'il y a des articles personnalisés
        const hasCustomItems = articlesPourMessage.some(article => article.personnalise) || custom.length > 0;
        
        // Générer le message WhatsApp approprié avec les détails des articles
        const message = hasCustomItems 
          ? CONFIG.WHATSAPP.MESSAGES.CUSTOM_ORDER(data.commande.numero_commande, articlesPourMessage)
          : CONFIG.WHATSAPP.MESSAGES.ORDER(data.commande.numero_commande, data.commande.montant_total.toLocaleString(), articlesPourMessage);
        
        console.log("📱 Message WhatsApp généré:", message);
        
        // Générer l'URL WhatsApp
        const whatsappUrl = generateWhatsAppURL(message);
        
        if (whatsappUrl !== "#") {
          window.open(whatsappUrl, '_blank');
        } else {
          alert("⚠️ Configuration WhatsApp manquante. Contactez l'administrateur.");
        }
        
        fetchPanier(); // Recharger (panier sera vide)
        loadPanier(); // Recharger le contexte pour mettre à jour la Navbar
      } else {
        const errorData = await response.json();
        alert(`Erreur: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de la finalisation:", error);
      alert("Erreur lors de la finalisation de la commande");
    }
  };

  useEffect(() => {
    fetchPanier();
  }, []);

  const nonCustom = panier.articles_non_personnalises || [];
  const custom = panier.articles_personnalises || [];

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

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl font-['Glacial_Indifference']">
          Chargement du panier...
        </div>
      </div>
    );
  }

  return (
    <div>
        <div className="w-full h-10 bg-zinc-400 flex items-center px-4 md:px-16">
        <h1 className="font-bold font-\[Glacial_Indifference] text-black text-xl md:text-lg">MON PANIER</h1>
      </div>
    
    <div className="w-full min-h-screen bg-white font-[Glacial_Indifference] text-black px-4 md:px-60 py-6 flex flex-col items-center pb-20">

      {/* HEADER */}
      

      {/* TITRE ARTICLES NON PERSONNALISÉS */}
      <div className="self-start p-2 px-10 mt-6">
        <h2 className="text-black text-2xl md:text-3xl underline leading-8 md:leading-10">Articles non personnalisés :</h2>
      </div>

      {/* LISTE DES ARTICLES NON PERSONNALISÉS */}
      <div className="w-full overflow-x-auto mt-4">
        <div className="flex flex-col gap-3 px-10">
          {nonCustom.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucun article non personnalisé dans votre panier
            </div>
          ) : (
            nonCustom.map((item) => (
              <div
                key={item.id}
                className="flex min-w-[600px] w-full p-2 bg-white border-b border-neutral-700 flex-row justify-between items-center gap-2"
              >
                <img 
                  src={item.image_principale ? `${import.meta.env.VITE_API_URL}/uploads/produits/${item.image_principale}` : img12} 
                  className="w-24 md:w-36 h-24 md:h-24 rounded-sm object-cover flex-shrink-0" 
                />

                <div className="flex flex-col justify-center flex-1 min-w-[100px] text-center md:text-left">
                  <p className="text-primary-base text-lg leading-6 md:leading-8">{item.produit_nom}</p>
                  <p className="text-primary-base text-lg leading-6 md:leading-8">{item.prix_unitaire.toLocaleString()} xof</p>
                  {item.stock_status && (
                    <p className={`text-sm font-semibold ${getStockStatusColor(item.stock_status)}`}>
                      {getStockStatusText(item.stock_status)}
                    </p>
                  )}
                  {item.couleur_nom && (
                    <p className="text-sm text-gray-600">Couleur: {item.couleur_nom}</p>
                  )}
                  {item.taille_nom && (
                    <p className="text-sm text-gray-600">Taille: {item.taille_nom}</p>
                  )}
                </div>

                {/* Quantité */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantite - 1)}
                    className="w-10 h-10 border border-black bg-white text-black flex items-center justify-center text-lg"
                  >
                    -
                  </button>
                  <div className="w-10 h-10 border border-black flex bg-white text-black items-center justify-center text-lg">
                    {String(item.quantite).padStart(2, "0")}
                  </div>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantite + 1)}
                    className="w-10 h-10 border border-black bg-white text-black flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Modifier */}
                <button className="px-4 sm:px-6 py-2 bg-black text-white font-bold text-base rounded-sm">
                  Modifier
                </button>

                {/* Trash */}
                <div 
                  className="w-8 h-8 flex justify-center items-center cursor-pointer"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 size={20} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TITRE ARTICLES PERSONNALISÉS */}
      <div className="self-start p-2 px-10 mt-10">
        <h2 className="text-black text-2xl md:text-3xl underline leading-8 md:leading-10">Articles personnalisés :</h2>
      </div>

      {/* LISTE DES ARTICLES PERSONNALISÉS */}
      <div className="w-full overflow-x-auto mt-4">
        <div className="flex flex-col px-10 gap-3">
          {custom.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Aucun article personnalisé dans votre panier
            </div>
          ) : (
            custom.map((item) => (
              <div
                key={item.id}
                className="flex min-w-[600px] w-full p-2 bg-white border-b border-neutral-700 flex-row justify-between items-center gap-2"
              >
                <img 
                  src={item.image_principale ? `${import.meta.env.VITE_API_URL}/uploads/produits/${item.image_principale}` : img12} 
                  className="w-24 md:w-36 h-24 md:h-24 rounded-sm object-cover flex-shrink-0" 
                />

                <div className="flex flex-col justify-center flex-1 min-w-[100px] text-center md:text-left">
                  <p className="text-primary-base text-lg leading-6 md:leading-8">{item.produit_nom}</p>
                  <p className="text-primary-base text-lg leading-6 md:leading-8">Prix à définir</p>
                  {item.stock_status && (
                    <p className={`text-sm font-semibold ${getStockStatusColor(item.stock_status)}`}>
                      {getStockStatusText(item.stock_status)}
                    </p>
                  )}
                  {item.couleur_nom && (
                    <p className="text-sm text-gray-600">Couleur: {item.couleur_nom}</p>
                  )}
                  {item.taille_nom && (
                    <p className="text-sm text-gray-600">Taille: {item.taille_nom}</p>
                  )}
                </div>

                {/* Quantité */}
                <div className="flex items-center gap-2 sm:gap-4">
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantite - 1)}
                    className="w-10 h-10 border bg-white text-black border-black flex items-center justify-center text-lg"
                  >
                    -
                  </button>
                  <div className="w-10 h-10 border bg-white text-black border-black flex items-center justify-center text-lg">
                    {String(item.quantite).padStart(2, "0")}
                  </div>
                  <button 
                    onClick={() => handleQuantityChange(item.id, item.quantite + 1)}
                    className="w-10 h-10 border bg-white text-black border-black flex items-center justify-center text-lg"
                  >
                    +
                  </button>
                </div>

                {/* Prix à définir */}
                <button className="px-4 sm:px-6 py-2 border border-red-600 bg-white text-red-600 font-bold text-base rounded-sm">
                  Prix à définir
                </button>

                {/* Trash */}
                <div 
                  className="w-8 h-8 flex justify-center items-center cursor-pointer"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 size={20} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* TOTAL */}
      <div className="mt-16 p-6 bg-neutral-200 rounded-sm flex flex-col items-end gap-4 sm:gap-8 w-full max-w-[1204px]">
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2 sm:gap-4">
          <p className="text-2xl sm:text-3xl">Total (sans les articles personnalisés) :</p>
          <p className="text-2xl sm:text-3xl text-red-600 font-bold">
            {panier.total_non_personnalises?.toLocaleString()} xof
          </p>
        </div>

        <button 
          onClick={handleFinaliserCommande}
          disabled={nonCustom.length === 0 && custom.length === 0}
          className={`px-6 py-2 font-bold text-base rounded-sm ${
            nonCustom.length === 0 && custom.length === 0
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          Finaliser ma commande via WhatsApp
        </button>
      </div>
    </div>
    </div>
  );
}
