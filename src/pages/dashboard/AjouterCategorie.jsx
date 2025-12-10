import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { categoriesAPI } from "../../services/api";
import logo from "../../assets/logo.png";

/* ----------------------- MODAL SUCCÈS ----------------------- */
function SuccessModal({ onClose, editMode = false }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-[453px] bg-white rounded-lg px-6 pt-2 pb-6 flex flex-col items-center gap-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-3 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M2 2L10 10M10 2L2 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
          <svg width="26" height="26" viewBox="0 0 24 24" stroke="white" strokeWidth="3" fill="none">
            <path d="M20 6L9 17L4 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div className="text-center text-black text-lg leading-8 font-['Glacial_Indifference']">
          Catégorie {editMode ? 'modifiée' : 'créée'} avec succès ! <br />
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
        <button
          onClick={onClose}
          className="absolute right-4 top-3 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
        >
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M2 2L10 10M10 2L2 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
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

export default function AjouterCategorie({ editMode = false }) {
  const { id: categorieId } = useParams();
  const navigate = useNavigate();
  
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [parentId, setParentId] = useState("");
  const [banniere, setBanniere] = useState(null);
  const [currentBanniere, setCurrentBanniere] = useState("");
  const [removeBanniere, setRemoveBanniere] = useState(false);
  const [categoriesParent, setCategoriesParent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Charger les données
  useEffect(() => {
    const loadData = async () => {
      try {
        // Charger toutes les catégories pour le parent (on filtrera côté frontend)
        const allCategoriesResponse = await categoriesAPI.getAll();
        if (allCategoriesResponse.ok) {
          const allCategoriesData = await allCategoriesResponse.json();
          // Filtrer pour ne garder que les catégories principales (sans parent)
          const principales = (allCategoriesData.categories || []).filter(cat => !cat.parent_id);
          setCategoriesParent(principales);
        }

        // Si en mode édition, charger les données de la catégorie
        if (editMode && categorieId) {
          const categorieResponse = await categoriesAPI.getById(categorieId);
          if (categorieResponse.ok) {
            const categorieData = await categorieResponse.json();
            const categorie = categorieData.categorie;
            
            console.log("Données catégorie chargées:", categorie);
            
            setNom(categorie.nom || "");
            setDescription(categorie.description || "");
            setParentId(categorie.parent_id?.toString() || "");
            setCurrentBanniere(categorie.banniere_url || "");
          } else {
            const errorData = await categorieResponse.json();
            setErrorMessage("Erreur lors du chargement de la catégorie: " + (errorData.message || "Catégorie non trouvée"));
            setShowError(true);
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement:", error);
        setErrorMessage("Erreur lors du chargement des données: " + error.message);
        setShowError(true);
      }
    };
    loadData();
  }, [editMode, categorieId]);

  const handleCreate = async () => {
    if (!nom) {
      setErrorMessage("Le nom de la catégorie est requis.");
      setShowError(true);
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('nom', nom.trim());
      formData.append('description', description.trim() || '');
      formData.append('parent_id', parentId || '');
      
      if (banniere) {
        formData.append('banniere', banniere);
      }

      // En mode édition, indiquer si la bannière doit être supprimée
      if (editMode && removeBanniere) {
        formData.append('removeBanniere', 'true');
      }

      let response;
      if (editMode && categorieId) {
        formData.append('id', categorieId);
        response = await categoriesAPI.update(formData);
      } else {
        response = await categoriesAPI.create(formData);
      }
      
      if (response.ok) {
        setShowSuccess(true);
        if (!editMode) {
          setNom("");
          setDescription("");
          setParentId("");
          setBanniere(null);
        }
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Erreur lors de la création de la catégorie.");
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
          <div className="text-black text-2xl md:text-3xl font-bold">
            {editMode ? "Modifier la catégorie" : "Ajouter une catégorie"}
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full border flex items-center justify-center">
              <img className="w-8 h-8 rounded-full" src={logo} />
            </div>
            <div className="text-right leading-5">
              <div className="text-black text-sm font-bold">Fathnelle DJIHOUESSI</div>
              <div className="text-black text-sm">Admin</div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <div className="px-6 py-1 border border-black rounded text-black text-lg">
            Remplissez ce formulaire pour {editMode ? "modifier" : "créer"} votre catégorie
          </div>
        </div>
      </div>

      {/* FORMULAIRE */}
      <div className="w-full max-w-[1156px] px-2 md:px-40 flex flex-col gap-8">
        {/* Nom */}
        <div className="flex flex-col">
          <label className="p-2 text-black text-lg">Nom de la catégorie</label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full px-3 py-2 border bg-white border-gray-400 rounded text-black text-base"
            placeholder="Ex: Vêtements, Accessoires..."
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="p-2 text-black text-lg">Description (optionnelle)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border bg-white border-gray-400 rounded text-black text-base resize-none"
            placeholder="Description de la catégorie..."
          />
        </div>

        {/* Catégorie parent */}
        <div className="flex flex-col">
          <label className="p-2 text-black text-lg">Catégorie parent (optionnelle)</label>
          <select
            value={parentId}
            onChange={(e) => setParentId(e.target.value)}
            className="w-full px-3 py-2 border bg-white border-gray-400 rounded text-black text-base"
          >
            <option value="">-- Catégorie principale --</option>
            {categoriesParent.map(categorie => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.nom}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-600 mt-1">
            Laisser vide pour créer une catégorie principale
          </p>
        </div>

        {/* Bannière de catégorie */}
        <div className="flex flex-col">
          <label className="p-2 text-black text-lg">Bannière de catégorie (optionnelle)</label>

          {/* Bannière actuelle avec option de suppression */}
          {currentBanniere && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Bannière actuelle :</p>
              <div className="relative inline-block">
                <img 
                  src={currentBanniere.startsWith('http') ? currentBanniere : `${import.meta.env.VITE_API_URL}/uploads/categories/${currentBanniere}`}
                  alt="Bannière actuelle"
                  className="w-48 h-24 object-cover rounded border"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/400x200?text=Bannière+non+trouvée";
                  }}
                />
                <button
                  onClick={() => {
                    if (confirm("Êtes-vous sûr de vouloir supprimer la bannière actuelle ?")) {
                      setCurrentBanniere("");
                      setRemoveBanniere(true);
                    }
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition"
                  type="button"
                  title="Supprimer la bannière actuelle"
                >
                  ×
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Cliquez sur × pour supprimer cette bannière</p>
            </div>
          )}

          {/* Aperçu de la nouvelle bannière sélectionnée */}
          {banniere && (
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Nouvelle bannière sélectionnée :</p>
              <div className="relative inline-block">
                <img 
                  src={URL.createObjectURL(banniere)}
                  alt="Nouvelle bannière"
                  className="w-48 h-24 object-cover rounded border border-green-500"
                />
                <button
                  onClick={() => setBanniere(null)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm hover:bg-red-600 transition"
                  type="button"
                  title="Annuler la sélection"
                >
                  ×
                </button>
                <div className="absolute top-1 left-1 bg-green-500 text-white px-1 rounded text-xs">
                  Nouveau
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{banniere.name} ({(banniere.size / (1024 * 1024)).toFixed(1)} MB)</p>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBanniere(e.target.files[0])}
            className="w-full px-3 py-2 border bg-white border-gray-400 rounded text-black text-base"
          />
          <p className="text-sm text-gray-600 mt-1">
            Image qui s'affichera en haut de la page catégorie (JPG, PNG, GIF, WEBP - max 5MB)
          </p>
          
          {(currentBanniere || banniere) && (
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded mt-2">
              <strong>📝 Note :</strong> {banniere ? "Une nouvelle bannière remplacera la bannière actuelle lors de la sauvegarde." : "Vous pouvez ajouter une nouvelle bannière ou supprimer la bannière actuelle."}
            </div>
          )}
        </div>

        {/* Boutons */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleCreate}
            disabled={loading}
            className={`w-full py-3 rounded text-white font-bold text-lg transition-colors ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-800'
            }`}
          >
            {loading ? (editMode ? "Modification..." : "Création...") : (editMode ? "Modifier" : "Créer")}
          </button>

          <button
            onClick={() => navigate('/dashboard/categories')}
            className="w-full py-2 border border-black rounded text-black font-semibold hover:bg-gray-50 transition-colors"
          >
            Retour à la liste
          </button>
        </div>
      </div>

      {/* Modals */}
      {showError && <ErrorModal onClose={() => setShowError(false)} message={errorMessage} />}
      {showSuccess && <SuccessModal 
        editMode={editMode}
        onClose={() => {
          setShowSuccess(false);
          if (editMode) navigate('/dashboard/categories');
        }} 
      />}
    </div>
  );
}
