import React, { useState, useEffect } from "react";
import { collectionsAPI } from "../../services/api";
import { useParams } from "react-router-dom";

/* ----------------------- MODAL SUCCÈS ----------------------- */
function SuccessModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[453px] bg-white rounded-lg px-6 pt-2 pb-6 flex flex-col items-center gap-6 shadow-lg relative">

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute right-4 top-3 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M2 2L10 10M10 2L2 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Check icon */}
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 24 24" stroke="white" strokeWidth="3" fill="none">
            <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="text-center text-black text-lg leading-8 font-['Glacial_Indifference']">
          Collection modifiée avec succès ! <br />
          Les modifications sont maintenant visibles.
        </div>
      </div>
    </div>
  );
}

/* ----------------------- MODAL ERREUR ----------------------- */
function ErrorModal({ onClose, message = "Une erreur s'est produite." }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[453px] bg-white rounded-lg px-6 pt-2 pb-6 flex flex-col items-center gap-6 shadow-lg relative">

        {/* Bouton fermer */}
        <button
          onClick={onClose}
          className="absolute right-4 top-3 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M2 2L10 10M10 2L2 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        {/* Icône erreur */}
        <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 24 24" stroke="white" strokeWidth="3" fill="none">
            <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
          </svg>
        </div>

        <div className="text-center text-black text-lg leading-8 font-['Glacial_Indifference']">
          {message}
        </div>
      </div>
    </div>
  );
}

/* ----------------------- PAGE PRINCIPALE ----------------------- */
export default function ModifierCollection() {
  const { id } = useParams();
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Charger les données de la collection
  useEffect(() => {
    const loadCollection = async () => {
      try {
        const response = await collectionsAPI.getById(id);
        if (response.ok) {
          const data = await response.json();
          const collection = data.collection;
          
          setNom(collection.nom || "");
          setDescription(collection.description || "");
          setCurrentImage(collection.image || "");
        } else {
          setErrorMessage("Collection non trouvée");
          setShowError(true);
        }
      } catch (error) {
        console.error("Erreur:", error);
        setErrorMessage("Erreur lors du chargement de la collection");
        setShowError(true);
      } finally {
        setLoadingData(false);
      }
    };

    if (id) {
      loadCollection();
    }
  }, [id]);

  const handleUpdate = async () => {
    if (!nom || !description) {
      setErrorMessage("Veuillez remplir tous les champs obligatoires.");
      setShowError(true);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('description', description);
      
      // Ajouter la nouvelle image seulement si elle a été sélectionnée
      if (image) {
        formData.append('image', image);
      }

      const response = await collectionsAPI.update(id, formData);
      
      if (response.ok) {
        setShowSuccess(true);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erreur lors de la modification de la collection.");
        setShowError(true);
      }
    } catch (error) {
      console.error("Erreur:", error);
      setErrorMessage("Erreur de connexion. Veuillez réessayer.");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-black text-xl font-['Glacial_Indifference']">
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-10 flex flex-col items-center font-['Glacial_Indifference']">

      {/* HEADER */}
      <div className="w-full h-auto relative mb-10">
        <div className="w-full px-6 md:px-10 bg-gray-200 rounded border border-black flex justify-between items-center py-6">
          <div className="text-black text-2xl md:text-3xl font-bold">Modifier une collection</div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full border flex items-center justify-center">
              <img className="w-8 h-8 rounded-full" src="https://placehold.co/32x32" />
            </div>

            <div className="text-right leading-5">
              <div className="text-black text-sm font-bold">Fathnelle DJIHOUESSI</div>
              <div className="text-black text-sm">Admin</div>
            </div>
          </div>
        </div>

        {/* Sous-titre */}
        <div className="w-full flex justify-center mt-4">
          <div className="px-6 py-1 border border-black rounded text-black text-lg">
            Modifiez les informations de votre collection
          </div>
        </div>
      </div>

      {/* FORMULAIRE */}
      <div className="w-full max-w-[1156px] px-2 md:px-40 flex flex-col gap-8">

        {/* Nom */}
        <div className="flex flex-col">
          <label className="p-2 text-black text-lg">Nom de la collection</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Écrivez ici le nom de la collection"
            className="h-11 bg-neutral-200 rounded-sm p-2 text-lg text-black outline-none"
            required
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="p-2 text-black text-lg">Description :</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Décrivez brièvement la collection"
            className="h-36 bg-neutral-200 rounded-sm p-2 text-lg text-black outline-none resize-none"
            required
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="p-2 text-black text-lg">Image de couverture :</label>

          {/* Image actuelle */}
          {currentImage && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Image actuelle :</p>
              <img 
                src={`${import.meta.env.VITE_API_URL}/uploads/collections/${currentImage}`}
                alt="Image actuelle"
                className="w-32 h-24 object-cover rounded border"
              />
            </div>
          )}

          <label className="h-10 bg-neutral-200 rounded-sm flex items-center justify-between px-3 cursor-pointer">
            <span className="text-neutral-600 text-lg">
              {image ? image.name : "Changer l'image (optionnel)"}
            </span>

            {/* Icône upload */}
            <svg width="24" height="24" viewBox="0 0 24 24">
              <rect x="11" y="4" width="1.5" height="12" stroke="black" fill="none" />
              <rect x="6" y="15" width="12" height="1.5" stroke="black" fill="none" />
              <rect x="10" y="10" width="4" height="5" stroke="black" fill="none" />
            </svg>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </label>
        </div>

        {/* BOUTONS */}
        <div className="flex justify-between md:justify-center gap-4">
          <button
            onClick={() => window.location.href = '/dashboard/collections'}
            className="px-6 py-2 border border-gray-400 text-gray-600 font-bold rounded-sm hover:bg-gray-100"
          >
            Annuler
          </button>
          
          <button
            onClick={handleUpdate}
            disabled={loading}
            className={`px-6 py-2 font-bold rounded-sm ${
              loading 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? "Modification..." : "Modifier"}
          </button>
        </div>
      </div>

      {/* MODALS */}
      {showSuccess && (
        <SuccessModal onClose={() => {
          setShowSuccess(false);
          // Rediriger vers la liste des collections
          setTimeout(() => {
            window.location.href = '/dashboard/collections';
          }, 1000);
        }} />
      )}
      {showError && (
        <ErrorModal 
          message={errorMessage}
          onClose={() => {
            setShowError(false);
            setErrorMessage("");
          }} 
        />
      )}
    </div>
  );
}
