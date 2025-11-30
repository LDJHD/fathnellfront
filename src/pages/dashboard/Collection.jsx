import React, { useState, useEffect } from "react";
import { collectionsAPI } from "../../services/api";

export default function Collection() {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCollections = async () => {
    try {
      const response = await collectionsAPI.getAll();
      if (response.ok) {
        const data = await response.json();
        setCollections(data.collections || []);
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette collection ?")) {
      try {
        const response = await collectionsAPI.delete(id);
        if (response.ok) {
          setCollections(collections.filter(c => c.id !== id));
        }
      } catch (error) {
        console.error("Erreur:", error);
      }
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    <div className="w-full flex justify-center bg-[#F5F5F5] min-h-screen">
      <div className="w-full px-4 py-2 flex flex-col items-center gap-8 bg-white">

        {/* HEADER */}
        <div className="w-full h-auto relative flex flex-col gap-4">

          <div className="w-full px-2 h-[72px] bg-gray-200 rounded outline outline-1 outline-black flex justify-between items-center">
            <div className="text-black text-2xl md:text-3xl font-bold font-['Glacial_Indifference']">
              Ajouter une collection
            </div>

            {/* Profil */}
            <div className="flex items-center px-4 py-2">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full outline outline-[0.5px] outline-black flex items-center justify-center">
                <img src="https://placehold.co/32x32" className="w-8 h-8" />
              </div>

              <div className="px-2 flex flex-col">
                <span className="text-black text-xs md:text-sm font-bold leading-6 font-['Glacial_Indifference']">
                  Fathnelle DJIHOUESSI
                </span>
                <span className="text-black text-xs md:text-sm leading-6 font-['Glacial_Indifference']">
                  Admin
                </span>
              </div>
            </div>
          </div>

          <button 
            onClick={() => window.location.href = '/dashboard/ajouter-collection'}
            className="px-6 py-2 bg-black text-white rounded-sm text-base font-bold font-['Glacial_Indifference']"
          >
            Créer une nouvelle collection
          </button>
        </div>

        {/* SECTION TITRE */}
        <div className="w-full px-4 py-1 rounded outline outline-[0.55px] flex items-center">
          <div className="text-black text-base md:text-lg font-['Glacial_Indifference']">
            Liste des collections déjà créées :
          </div>
        </div>

        {/* TABLEAU RESPONSIVE */}
        <div className="w-full flex flex-col">

          {/* En-têtes (desktop only) */}
          <div className="hidden md:flex w-full px-8 py-1 items-center gap-4">
            <div className="flex-1 px-2 py-1 rounded-sm outline outline-1 outline-zinc-400 text-center text-black text-lg font-bold">
              Nom de la collection
            </div>
            <div className="flex-1 px-2 py-1 rounded-sm outline outline-1 outline-zinc-400 text-center text-black text-lg font-bold">
              Nombre d'articles
            </div>
            <div className="flex-1 px-2 py-1 rounded-sm outline outline-1 outline-zinc-400 text-center text-black text-lg font-bold">
              Actions
            </div>
          </div>

          {/* Lignes */}
          <div className="w-full p-4 flex flex-col items-center gap-4">
            {loading ? (
              <div className="text-black text-lg">Chargement...</div>
            ) : collections.length === 0 ? (
              <div className="text-black text-lg">Aucune collection créée pour le moment</div>
            ) : (
              collections.map((collection) => (
                <div
                  key={collection.id}
                  className="
                    w-full px-3 py-3 rounded outline outline-[0.5px] 
                    flex flex-col md:flex-row md:items-center gap-3 md:gap-4
                  "
                >
                  {/* Nom */}
                  <div className="flex-1 px-2 py-1 rounded outline outline-[0.5px] flex justify-center md:justify-center">
                    <div className="text-black text-base md:text-lg font-normal">
                      {collection.nom}
                    </div>
                  </div>

                  {/* Nombre */}
                  <div className="flex-1 px-2 py-1 rounded outline outline-[0.5px] flex justify-center md:justify-center">
                    <div className="text-black text-base md:text-lg font-normal">
                      {collection.nombre_articles || 0} articles
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex-1 px-2 py-1 rounded outline outline-[0.5px] flex justify-center gap-6 md:gap-4">

                    {/* EDIT */}
                    <div
                      onClick={() => window.location.href = `/dashboard/modifier-collection/${collection.id}`}
                      className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                      </svg>
                    </div>

                    {/* DELETE */}
                    <div
                      onClick={() => handleDelete(collection.id)}
                      className="w-10 h-10 flex items-center justify-center cursor-pointer hover:bg-red-100 rounded"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6" />
                        <path d="M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
