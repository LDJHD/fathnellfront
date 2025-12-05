import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collectionsAPI, couleursAPI, taillesAPI, produitsAPI, categoriesAPI } from "../../services/api";
const imgA = encodeURI("/mnt/data/Capture d’écran (166).png");
const imgB = encodeURI("/mnt/data/Capture d’écran (168).png");

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

/* ----------------------- COMPONENT PRINCIPAL ----------------------- */
export default function AjouterArticle({ editMode = false }) {
    const { id: produitId } = useParams();
    const navigate = useNavigate();
    // États UI
    const [openInfos, setOpenInfos] = useState(true);
    const [openCaracts, setOpenCaracts] = useState(false);
    const [openMedias, setOpenMedias] = useState(false);
    const [loading, setLoading] = useState(false);

    // États du formulaire
    const [nom, setNom] = useState("");
    const [description, setDescription] = useState("");
    const [prix, setPrix] = useState("");
    const [prixPromo, setPrixPromo] = useState("");
    const [enPromo, setEnPromo] = useState(false);
    const [vedette, setVedette] = useState(false);
    const [collection, setCollection] = useState("");
    const [categorieId, setCategorieId] = useState("");
    const [personnalisable, setPersonnalisable] = useState(false);
    const [stockStatus, setStockStatus] = useState("disponible");
    
    // Caractéristiques
    const [selectedCouleurs, setSelectedCouleurs] = useState([]);
    const [selectedTailles, setSelectedTailles] = useState([]);
    
    // Médias
    const [mediaFiles, setMediaFiles] = useState([]);
    
    // Données de référence
    const [collections, setCollections] = useState([]);
    const [couleurs, setCouleurs] = useState([]);
    const [tailles, setTailles] = useState([]);
    const [categories, setCategories] = useState([]);
    
    // Modals
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // Charger les données de référence et produit en mode édition
    useEffect(() => {
        const loadData = async () => {
            try {
                // Charger les collections
                const collectionsResponse = await collectionsAPI.getAll();
                if (collectionsResponse.ok) {
                    const collectionsData = await collectionsResponse.json();
                    setCollections(collectionsData.collections || []);
                }

                // Charger les couleurs
                const couleursResponse = await couleursAPI.getAll();
                if (couleursResponse.ok) {
                    const couleursData = await couleursResponse.json();
                    setCouleurs(couleursData.couleurs || []);
                }

                // Charger les tailles
                const taillesResponse = await taillesAPI.getAll();
                if (taillesResponse.ok) {
                    const taillesData = await taillesResponse.json();
                    setTailles(taillesData.tailles_toutes || []);
                }

                // Charger les catégories
                const categoriesResponse = await categoriesAPI.getAll();
                if (categoriesResponse.ok) {
                    const categoriesData = await categoriesResponse.json();
                    setCategories(categoriesData.categories || []);
                }

                // Si en mode édition, charger les données du produit
                if (editMode && produitId) {
                    const produitResponse = await produitsAPI.getById(produitId);
                    if (produitResponse.ok) {
                        const produitData = await produitResponse.json();
                        const produit = produitData.produit;

                        // Remplir les champs du formulaire
                        setNom(produit.nom || "");
                        setDescription(produit.description || "");
                        setPrix(produit.prix?.toString() || "");
                        setPrixPromo(produit.prix_promo?.toString() || "");
                        setEnPromo(!!produit.en_promo);
                        setVedette(!!produit.vedette);
                        setCollection(produit.collection_id?.toString() || "");
                        setCategorieId(produit.categorie_id?.toString() || "");
                        setPersonnalisable(!!produit.personnalisable);
                        setStockStatus(produit.stock_status || "disponible");

                        // Remplir les couleurs et tailles
                        if (produit.couleurs) {
                            setSelectedCouleurs(produit.couleurs.map(c => c.id));
                        }
                        if (produit.tailles) {
                            setSelectedTailles(produit.tailles.map(t => t.id));
                        }
                    }
                }
            } catch (error) {
                console.error("Erreur lors du chargement des données:", error);
                setErrorMessage("Erreur lors du chargement des données");
                setShowError(true);
            }
        };

        loadData();
    }, [editMode, produitId]);

    // Helpers
    const toggleArrayValue = (arr, setter, value) => {
        if (arr.includes(value)) {
            setter(arr.filter(a => a !== value));
        } else {
            setter([...arr, value]);
        }
    };

    const onFilesChange = (e) => {
        const files = Array.from(e.target.files);
        setMediaFiles(files);
    };

    // Validation
    const validateForm = () => {
        if (!nom.trim()) {
            setErrorMessage("Le nom de l'article est requis.");
            return false;
        }
        if (!prix || parseFloat(prix) <= 0) {
            setErrorMessage("Un prix valide est requis.");
            return false;
        }
        if (!categorieId) {
            setErrorMessage("La catégorie est requise.");
            return false;
        }
        if (enPromo && (!prixPromo || parseFloat(prixPromo) <= 0)) {
            setErrorMessage("Le prix promo est requis quand l'article est en promotion.");
            return false;
        }
        if (personnalisable && selectedCouleurs.length === 0 && selectedTailles.length === 0) {
            setErrorMessage("Veuillez sélectionner au moins une couleur ou une taille pour les articles personnalisables.");
            return false;
        }
        return true;
    };

    // Soumission du formulaire
    const handleSubmit = async () => {
        if (!validateForm()) {
            setShowError(true);
            return;
        }

        setLoading(true);

        try {
            // Préparer FormData
            const formData = new FormData();
            formData.append('nom', nom);
            formData.append('description', description);
            formData.append('prix', prix);
            formData.append('prix_promo', prixPromo || null);
            formData.append('en_promo', enPromo);
            formData.append('vedette', vedette);
            formData.append('personnalisable', personnalisable);
            formData.append('stock_status', stockStatus);
            formData.append('collection_id', collection || null);
            formData.append('categorie_id', categorieId || 1);
            
            // Ajouter les couleurs et tailles
            formData.append('couleurs', JSON.stringify(selectedCouleurs));
            formData.append('tailles', JSON.stringify(selectedTailles));
            
            // Ajouter les images
            mediaFiles.forEach((file, index) => {
                formData.append('images', file);
            });

            let response;
            if (editMode && produitId) {
                // Mode modification
                response = await produitsAPI.update(produitId, formData);
            } else {
                // Mode création
                response = await produitsAPI.create(formData);
            }
            
            if (response.ok) {
                setShowSuccess(true);
                if (!editMode) {
                    resetForm();
                }
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || `Erreur lors de ${editMode ? 'la modification' : 'la création'} de l'article.`);
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

    const resetForm = () => {
        setNom("");
        setDescription("");
        setPrix("");
        setPrixPromo("");
        setEnPromo(false);
        setVedette(false);
        setCollection("");
        setCategorieId("");
        setPersonnalisable(false);
        setStockStatus("disponible");
        setSelectedCouleurs([]);
        setSelectedTailles([]);
        setMediaFiles([]);
    };

    // Filtrer les tailles par type
    const taillesByType = {
        pointure: tailles.filter(t => t.type === 'pointure'),
        taille_vetement: tailles.filter(t => t.type === 'taille_vetement'),
        dimension: tailles.filter(t => t.type === 'dimension')
    };

    return (
        <div className="w-full min-h-screen bg-gray-100 p-4 font-['Glacial_Indifference'] text-black">
            <div className="w-full px-6 py-3 bg-white border-b-4 border-zinc-400 rounded-sm flex justify-between items-center mb-6">
                <div className="text-xl md:text-2xl font-bold">
                    {editMode ? "Modifier l'article" : "Ajouter un article"}
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full border flex items-center justify-center">
                        <img src={imgA} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-bold">Fathnelle DJIHOUESSI</div>
                        <div className="text-sm">Admin</div>
                    </div>
                </div>
            </div>

            <p className="text-center text-sm text-neutral-600 mb-6">
                Remplissez les informations suivantes pour publier / modifier un article.
            </p>

            <main className="max-w-4xl mx-auto flex flex-col gap-6">
                {/* INFOS GÉNÉRALES */}
                <section className="self-stretch px-4">
                    <button
                        onClick={() => setOpenInfos((s) => !s)}
                        className="w-full flex justify-between items-center bg-zinc-400 px-6 py-3 rounded-lg"
                        aria-expanded={openInfos}
                    >
                        <div className="text-black text-xl font-bold">Infos  générales</div>
                        <svg className={`w-6 h-6 transform transition-transform duration-200 ${openInfos ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {openInfos && (
                        <div className="mt-4 bg-white p-6 rounded-md border transition-all duration-200">
                            <div className="flex flex-col gap-6 max-w-3xl mx-auto">
                                {/* Nom */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg">Nom de l’article :</label>
                                    <input
                                        type="text"
                                        value={nom}
                                        onChange={(e) => setNom(e.target.value)}
                                        placeholder="Écrivez ici le nom de l'article"
                                        className="h-11 bg-neutral-200 rounded-sm px-3 text-neutral-800"
                                        required
                                    />
                                </div>

                                {/* Catégorie */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg">Sélectionnez une catégorie * :</label>
                                    <div className="relative">
                                        <select
                                            value={categorieId}
                                            onChange={(e) => setCategorieId(e.target.value)}
                                            className="w-full bg-neutral-200 rounded px-3 py-2"
                                            required
                                        >
                                            <option value="">-- Choisir une catégorie --</option>
                                            {categories.map(c => (
                                                <option key={c.id} value={c.id}>
                                                    {c.parent_id ? `${c.parent_nom} > ${c.nom}` : c.nom}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3">
                                            <div className="w-3 h-2 bg-zinc-400 outline outline-[0.5px] outline-black rounded-sm" />
                                        </div>
                                    </div>
                                </div>

                                {/* Collection */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg">Sélectionnez une collection :</label>
                                    <div className="relative">
                                        <select
                                            value={collection}
                                            onChange={(e) => setCollection(e.target.value)}
                                            className="w-full bg-neutral-200 rounded px-3 py-2"
                                        >
                                            <option value="">Aucune collection</option>
                                            {collections.map(c => (
                                                <option key={c.id} value={c.id}>{c.nom}</option>
                                            ))}
                                        </select>
                                        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3 h-3">
                                            <div className="w-3 h-2 bg-zinc-400 outline outline-[0.5px] outline-black rounded-sm" />
                                        </div>
                                    </div>
                                </div>

                                {/* Prix */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg">Prix (XOF) :</label>
                                    <input
                                        type="number"
                                        value={prix}
                                        onChange={(e) => setPrix(e.target.value)}
                                        placeholder="25000"
                                        className="h-11 bg-neutral-200 rounded-sm px-3 text-neutral-800"
                                        required
                                    />
                                </div>

                                {/* Promotion */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-lg">En promotion :</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2">
                                            <input 
                                                type="radio" 
                                                name="promo" 
                                                checked={!enPromo} 
                                                onChange={() => setEnPromo(false)} 
                                            />
                                            <span>Non</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input 
                                                type="radio" 
                                                name="promo" 
                                                checked={enPromo} 
                                                onChange={() => setEnPromo(true)} 
                                            />
                                            <span>Oui</span>
                                        </label>
                                        {enPromo && (
                                            <input
                                                type="number"
                                                value={prixPromo}
                                                onChange={(e) => setPrixPromo(e.target.value)}
                                                placeholder="Prix en promotion"
                                                className="flex-1 bg-neutral-200 h-11 rounded-sm px-3"
                                            />
                                        )}
                                    </div>
                                </div>

                                {/* Produit vedette */}
                                <div className="flex flex-col gap-3">
                                    <label className="text-lg">Produit vedette :</label>
                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2">
                                            <input 
                                                type="radio" 
                                                name="vedette" 
                                                checked={!vedette} 
                                                onChange={() => setVedette(false)} 
                                            />
                                            <span>Non</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input 
                                                type="radio" 
                                                name="vedette" 
                                                checked={vedette} 
                                                onChange={() => setVedette(true)} 
                                            />
                                            <span>Oui</span>
                                        </label>
                                    </div>
                                    <p className="text-sm text-gray-600">
                                        Les produits vedettes s'affichent dans la section "NOS PRODUITS VEDETTES" de la page d'accueil
                                    </p>
                                </div>

                                {/* Description */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg">Description :</label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Ecrivez ici le nom de l’article"
                                        className="h-36 bg-neutral-200 rounded-sm p-3 text-neutral-700 resize-vertical"
                                    />
                                </div>

                                {/* Personnalisation */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-lg">Personnalisation :</label>
                                    <div className="flex gap-6 pl-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={!personnalisable}
                                                onChange={() => setPersonnalisable(false)}
                                            />
                                            <span>Non</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={personnalisable}
                                                onChange={() => setPersonnalisable(true)}
                                            />
                                            <span>Oui</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* CARACTÉRISTIQUES - Seulement si personnalisable */}
                
                    <section className="self-stretch px-4">
                        <button
                            onClick={() => setOpenCaracts((s) => !s)}
                            className="w-full flex justify-between items-center bg-zinc-400 px-6 py-3 rounded-lg"
                        >
                            <div className="text-black text-xl font-bold">Caractéristiques</div>
                            <svg className={`w-6 h-6 transform transition-transform duration-200 ${openCaracts ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none">
                                <path d="M6 9l6 6 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {openCaracts && (
                            <div className="mt-4 bg-white p-6 rounded-md border">
                                <div className="max-w-3xl mx-auto space-y-6">
                                    {/* Couleurs */}
                                    <div>
                                        <div className="mb-2 text-lg">Couleurs disponibles :</div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pl-4">
                                            {couleurs.map(couleur => (
                                                <label key={couleur.id} className="inline-flex items-center gap-3">
                                                    <input
                                                        type="checkbox"
                                                        className="w-4 h-4"
                                                        checked={selectedCouleurs.includes(couleur.id)}
                                                        onChange={() => toggleArrayValue(selectedCouleurs, setSelectedCouleurs, couleur.id)}
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <div 
                                                            className="w-4 h-4 rounded-full border" 
                                                            style={{ backgroundColor: couleur.code_hex }}
                                                        ></div>
                                                        <span>{couleur.nom}</span>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Pointures */}
                                    {taillesByType.pointure.length > 0 && (
                                        <div>
                                            <div className="mb-2 text-lg">Pointures disponibles :</div>
                                            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 pl-4">
                                                {taillesByType.pointure.map(taille => (
                                                    <label key={taille.id} className="inline-flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4"
                                                            checked={selectedTailles.includes(taille.id)}
                                                            onChange={() => toggleArrayValue(selectedTailles, setSelectedTailles, taille.id)}
                                                        />
                                                        <span>{taille.nom}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tailles vêtement */}
                                    {taillesByType.taille_vetement.length > 0 && (
                                        <div>
                                            <div className="mb-2 text-lg">Tailles disponibles :</div>
                                            <div className="grid grid-cols-2 gap-3 pl-4">
                                                {taillesByType.taille_vetement.map(taille => (
                                                    <label key={taille.id} className="inline-flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4"
                                                            checked={selectedTailles.includes(taille.id)}
                                                            onChange={() => toggleArrayValue(selectedTailles, setSelectedTailles, taille.id)}
                                                        />
                                                        <span>{taille.nom}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Dimensions */}
                                    {taillesByType.dimension.length > 0 && (
                                        <div>
                                            <div className="mb-2 text-lg">Dimensions (cm) :</div>
                                            <div className="grid grid-cols-3 gap-3 pl-4">
                                                {taillesByType.dimension.map(taille => (
                                                    <label key={taille.id} className="inline-flex items-center gap-3">
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4"
                                                            checked={selectedTailles.includes(taille.id)}
                                                            onChange={() => toggleArrayValue(selectedTailles, setSelectedTailles, taille.id)}
                                                        />
                                                        <span>{taille.nom}</span>
                                                    </label>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </section>
              

                {/* MEDIAS ET ETAT DU STOCK */}
                <section className="self-stretch px-4">
                    <button
                        onClick={() => setOpenMedias((s) => !s)}
                        className="w-full flex justify-between items-center bg-zinc-400 px-6 py-3 rounded-lg"
                        aria-expanded={openMedias}
                    >
                        <div className="text-black text-xl font-bold">Médias et état de stock</div>
                        <svg className={`w-6 h-6 transform transition-transform duration-200 ${openMedias ? "rotate-180" : "rotate-0"}`} viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {openMedias && (
                        <div className="mt-4 bg-white p-6 rounded-md border">
                            <div className="max-w-3xl mx-auto space-y-6">
                                {/* Galerie */}
                                <div className="flex flex-col gap-2">
                                    <div className="text-lg">Galerie d'images :</div>
                                    <div className="flex gap-3 flex-wrap items-center">
                                        <label className="w-28 h-28 bg-neutral-200 rounded flex items-center justify-center text-neutral-600 cursor-pointer border-2 border-dashed">
                                            <input 
                                                type="file" 
                                                multiple 
                                                accept="image/*"
                                                className="hidden" 
                                                onChange={onFilesChange} 
                                            />
                                            + Ajouter
                                        </label>

                                        {mediaFiles.length > 0 && (
                                            <div className="flex gap-2 items-center flex-wrap">
                                                {mediaFiles.map((file, idx) => (
                                                    <div key={idx} className="text-sm bg-gray-200 px-3 py-1 rounded">
                                                        {file.name}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* État du stock */}
                                <div className="flex flex-col gap-2">
                                    <div className="text-lg">État du stock :</div>
                                    <select 
                                        value={stockStatus}
                                        onChange={(e) => setStockStatus(e.target.value)}
                                        className="w-full bg-neutral-200 rounded px-3 py-2 max-w-xs"
                                    >
                                        <option value="disponible">Disponible</option>
                                        <option value="stock_limite">Stock limité</option>
                                        <option value="indisponible">Indisponible</option>
                                    </select>
                                </div>


                            </div>
                        </div>
                    )}
                </section>

                {/* BOUTON PUBLIER */}
                <div className="flex justify-between items-center px-4">
                    <div className="text-sm text-neutral-600">Prêt à publier ?</div>
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className={`px-6 py-2 rounded font-bold ${
                            loading 
                                ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                                : 'bg-black text-white hover:bg-gray-800'
                        }`}
                    >
                        {loading ? (editMode ? "Modification..." : "Publication...") : (editMode ? "Modifier" : "Publier")}
                    </button>
                </div>
            </main>

            <footer className="max-w-4xl mx-auto mt-6 px-4">
                <div className="text-xs text-neutral-500">
                    * Les informations sont sauvegardées localement (exemple). Adapte la logique pour envoyer vers ton API.
                </div>
            </footer>

            {/* Modals */}
            {showSuccess && (
                <SuccessModal onClose={() => {
                    setShowSuccess(false);
                    if (editMode) {
                        navigate("/dashboard/catalogue");
                    }
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
