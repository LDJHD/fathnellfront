import React, { useState, useEffect } from "react";
import img1 from "../assets/65f8ff8a1014094833e98a7cf52ab37016b10f78.jpg";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { produitsAPI, panierAPI } from "../services/api";
import { useParams } from "react-router-dom";
import { WhatsAppProductLink } from "../components/WhatsAppButton";
import { useWishlist } from "../hooks/useWishlist";
import { usePanier } from "../hooks/usePanier";

export default function FicheProduit() {
  const { id } = useParams();
  const [produit, setProduit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);
  const [selectedCouleur, setSelectedCouleur] = useState(null);
  const [selectedTaille, setSelectedTaille] = useState(null);
  const [personaliser, setPersonnaliser] = useState(false);
  const [ajoutEnCours, setAjoutEnCours] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { loadPanier } = usePanier();

  // Charger le produit
  const fetchProduit = async () => {
    try {
      const response = await produitsAPI.getById(id);
      if (response.ok) {
        const data = await response.json();
        setProduit(data.produit);
      } else {
        console.error("Erreur lors de la récupération du produit");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    } finally {
      setLoading(false);
    }
  };

  // Ajouter au panier
  const handleAjouterAuPanier = async () => {
    if (!produit) return;

    // Validation pour les articles personnalisables
    if (personaliser && produit.personnalisable) {
      if (!selectedCouleur && !selectedTaille) {
        alert("Veuillez sélectionner au moins une couleur ou une taille pour la personnalisation.");
        return;
      }
    }

    setAjoutEnCours(true);

    try {
      const response = await panierAPI.ajouter(
        produit.id,
        1, // quantité
        personaliser,
        selectedCouleur,
        selectedTaille
      );

      if (response.ok) {
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
      setAjoutEnCours(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchProduit();
    }
  }, [id]);

  const next = () => {
    if (produit?.images?.length > 0) {
      setImageIndex((prev) => (prev + 1) % produit.images.length);
    }
  };

  const prev = () => {
    if (produit?.images?.length > 0) {
      setImageIndex((prev) => (prev - 1 + produit.images.length) % produit.images.length);
    }
  };

  if (loading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl font-['Glacial_Indifference']">
          Chargement...
        </div>
      </div>
    );
  }

  if (!produit) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <div className="text-black text-xl font-['Glacial_Indifference']">
          Produit non trouvé
        </div>
      </div>
    );
  }

  const images = produit.images?.length > 0 
    ? produit.images.map(img => `${import.meta.env.VITE_API_URL}/uploads/produits/${img.image_url}`)
    : [img1];

  const prix = produit.en_promo ? produit.prix_promo : produit.prix;

  return (
    <div className="w-full bg-white font-[Glacial_Indifference] text-black flex flex-col items-center">
      {/* HEADER */}
      <div className="w-full h-8 px-4 md:px-16 py-1 border-b-[5px] border-zinc-400 flex items-center bg-white">
        <p className="text-black text-base font-bold leading-6">
          Boutique › {produit.categorie?.nom} › {produit.nom}
        </p>
      </div>

      {/* CONTENU PRINCIPAL */}
      <div className="w-full max-w-[1440px] px-4 md:px-16 mt-6 grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* SLIDER */}
        <div className="relative w-full h-[350px] md:h-[450px] lg:h-[500px] rounded-sm overflow-hidden">
          {/* Icône cœur wishlist */}
          <button
            onClick={async () => await toggleWishlist(produit.id)}
            className="absolute top-4 right-4 bg-white p-3 border border-black rounded-sm hover:scale-110 transition z-10"
            aria-label={isInWishlist(produit.id) ? "Retirer de la liste de souhaits" : "Ajouter à la liste de souhaits"}
          >
            <Heart 
              size={24} 
              fill={isInWishlist(produit.id) ? "#ef4444" : "none"}
              stroke={isInWishlist(produit.id) ? "#ef4444" : "black"}
              strokeWidth={1.5}
            />
          </button>
          
          <img 
            src={images[imageIndex]} 
            className="w-full h-full object-cover duration-300" 
            alt={produit.nom}
          />

          {images.length > 1 && (
            <>
              {/* Bouton gauche */}
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow"
              >
                <ChevronLeft className="w-6 h-6 text-black" />
              </button>

              {/* Bouton droite */}
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow"
              >
                <ChevronRight className="w-6 h-6 text-black" />
              </button>
            </>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-normal leading-10">{produit.nom}</h1>
            {produit.personnalisable && (
              <span className="text-base leading-6">( Personnalisable )</span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {produit.en_promo ? (
              <>
                <span className="text-gray-400 line-through text-2xl">
                  {produit.prix?.toLocaleString()} xof
                </span>
                <p className="text-3xl font-bold leading-10 text-red-600">
                  {produit.prix_promo?.toLocaleString()} xof
                </p>
              </>
            ) : (
              <p className="text-3xl font-bold leading-10">
                {produit.prix?.toLocaleString()} xof
              </p>
            )}
          </div>

          <p className="text-base leading-6 text-black/80">
            {produit.description || "Description du produit..."}
          </p>

          {/* COULEURS */}
          {produit.couleurs && produit.couleurs.length > 0 && (
            <div className="mt-4">
              <p className="text-base leading-6 mb-2">Couleurs disponibles :</p>
              <div className="flex gap-3 flex-wrap">
                {produit.couleurs.map((couleur) => (
                  <div
                    key={couleur.id}
                    className={`w-8 h-8 rounded-full border-2 cursor-pointer ${
                      selectedCouleur === couleur.id ? 'border-black border-4' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: couleur.code_hex }}
                    onClick={() => setSelectedCouleur(selectedCouleur === couleur.id ? null : couleur.id)}
                    title={couleur.nom}
                  />
                ))}
              </div>
            </div>
          )}

          {/* TAILLES */}
          {produit.tailles && produit.tailles.length > 0 && (
            <div className="mt-4">
              <p className="text-base leading-6 mb-2">
                {produit.tailles[0]?.type === 'pointure' ? 'Pointures' :
                 produit.tailles[0]?.type === 'dimension' ? 'Tailles (cm)' : 'Tailles'} :
              </p>
              <div className="flex gap-3 flex-wrap">
                {produit.tailles.map((taille) => (
                  <button
                    key={taille.id}
                    className={`px-4 py-2 border rounded-full text-base ${
                      selectedTaille === taille.id 
                        ? 'bg-black text-white border-black' 
                        : 'bg-white border-black text-black'
                    }`}
                    onClick={() => setSelectedTaille(selectedTaille === taille.id ? null : taille.id)}
                  >
                    {taille.nom}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* CHECKBOX PERSONNALISATION */}
          {produit.personnalisable && (
            <label className="flex items-center gap-3 mt-4 cursor-pointer">
              <input 
                type="checkbox" 
                className="w-5 h-5 border bg-white border-black"
                checked={personaliser}
                onChange={(e) => setPersonnaliser(e.target.checked)}
              />
              <span className="text-base leading-6">
                Je veux personnaliser avant d'ajouter au panier
              </span>
            </label>
          )}

          {/* BOUTONS */}
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <button 
              onClick={handleAjouterAuPanier}
              disabled={ajoutEnCours}
              className={`px-6 py-2 text-base font-bold rounded-sm w-fit ${
                ajoutEnCours
                  ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  : 'bg-black text-white hover:bg-gray-800'
              }`}
            >
              {ajoutEnCours ? "AJOUT EN COURS..." : "AJOUTER AU PANIER"}
            </button>

            <WhatsAppProductLink 
              productName={produit.nom}
              className="px-6 py-2 text-base font-bold rounded-sm border-2 border-green-500 text-green-600 hover:bg-green-500 hover:text-white transition-colors w-fit"
            >
              POSER UNE QUESTION
            </WhatsAppProductLink>
          </div>
        </div>
      </div>
    </div>
  );
}
