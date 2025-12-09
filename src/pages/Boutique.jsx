import img10 from "../assets/img10.png";
import { collectionsAPI } from "../services/api";
import { useState, useEffect } from "react";
import { getCollectionImageUrl } from "../utils/imageUtils";

export default function Boutique() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les collections
  const fetchCollections = async () => {
    try {
      const response = await collectionsAPI.getAll();
      if (response.ok) {
        const data = await response.json();
        setCollections(data.collections || []);
      } else {
        console.error("Erreur lors de la récupération des collections");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleDecouvrir = (collectionId) => {
    // Naviguer vers la page magazin avec l'ID de la collection
    window.location.href = `/magazin/${collectionId}`;
  };

  return (
    <div id="boutique" className="w-full flex flex-col items-center bg-white  ">
<div className="w-full  px-16 py-1 mb-10 bg-zinc-400 inline-flex justify-start items-center ">
        <div className=" text-center text-black  font-bold font-['Glacial_Indifference'] leading-6">
          BOUTIQUE
        </div>
      </div>
      {/* ---- TEXTE INTRO ---- */}
      <p className="text-center text-black text-xl md:text-2xl font-normal font-['Glacial_Indifference'] leading-10 max-w-4xl">
        Cuir d’exception, détails soignés, design singulier : chaque collection
        FathNell reflète l’essence de notre artisanat. Parcourez nos univers et
        trouvez celui qui vous ressemble.
      </p>

      {/* ---- GRID RESPONSIVE ---- */}
      <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 w-full max-w-[1440px] mb-10 justify-items-center">
        
        {loading ? (
          <div className="col-span-full text-center py-8">
            <div className="text-black text-xl font-['Glacial_Indifference']">
              Chargement des collections...
            </div>
          </div>
        ) : collections.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <div className="text-black text-xl font-['Glacial_Indifference']">
              Aucune collection disponible pour le moment
            </div>
          </div>
        ) : (
          collections.map((collection) => (
            <div
              key={collection.id}
              className="flex flex-col justify-center items-center gap-4"
            >
              {/* ---- IMAGE ---- */}
              <img
                src={getCollectionImageUrl(collection.image, img10)}
                alt={collection.nom}
                className="w-80 h-72 object-cover"
              />

              {/* ---- CONTENU ---- */}
              <div className="w-80 flex flex-col justify-center items-center gap-2">

                {/* TITRE COLLECTION */}
                <div className="self-stretch p-1 bg-white flex justify-center">
                  <div className="text-center text-black text-3xl font-bold font-['Glacial_Indifference'] leading-10">
                    {collection.nom}
                  </div>
                </div>

                {/* BOUTON DÉCOUVRIR */}
                <div 
                  className="self-stretch px-6 py-2 bg-gray-200 rounded-sm flex justify-center cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => handleDecouvrir(collection.id)}
                >
                  <div className="text-center text-black  text-base font-bold font-['Glacial_Indifference'] leading-6">
                    Découvrir
                  </div>
                </div>

              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}
