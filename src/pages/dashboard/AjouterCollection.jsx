import React, { useState } from "react";
import { collectionsAPI } from "../../services/api";

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
          Modifications publiées avec succès ! <br />
          Vos changements sont désormais visibles sur le site.
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
export default function AjouterCollection() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreate = async () => {
    if (!nom || !description || !image) {
      setErrorMessage("Veuillez remplir tous les champs et sélectionner une image.");
      setShowError(true);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nom', nom);
      formData.append('description', description);
      formData.append('image', image);

      const response = await collectionsAPI.create(formData);
      
      if (response.ok) {
        setShowSuccess(true);
        // Reset form
        setNom("");
        setDescription("");
        setImage(null);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erreur lors de la création de la collection.");
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

  return (
    <div className="w-full px-4 py-10 flex flex-col items-center font-['Glacial_Indifference']">

      {/* HEADER */}
      <div className="w-full h-auto relative mb-10">
        <div className="w-full px-6 md:px-10 bg-gray-200 rounded border border-black flex justify-between items-center py-6">
          <div className="text-black text-2xl md:text-3xl font-bold">Ajouter une collection</div>

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
            Remplissez ce formulaire pour créer votre collection
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
          />
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="p-2 text-black text-lg">Image de couverture :</label>

          <label className="h-10 bg-neutral-200 rounded-sm flex items-center justify-between px-3 cursor-pointer">
            <span className="text-neutral-600 text-lg">
              {image ? image.name : "Téléversez un média"}
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

        {/* BOUTON */}
        <div className="flex justify-start md:justify-center">
          <button
            onClick={handleCreate}
            disabled={loading}
            className={`px-6 py-2 font-bold rounded-sm ${
              loading 
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {loading ? "Création..." : "Créer"}
          </button>
        </div>
      </div>

      {/* MODALS */}
      {showSuccess && (
        <SuccessModal onClose={() => {
          setShowSuccess(false);
          // Optionnel: rediriger vers la liste des collections
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
