import React from "react";

export default function AjouterCollection() {
  return (
    <div className="w-full px-4 py-10 flex flex-col items-center font-['Glacial_Indifference']">

      {/* HEADER */}
      <div className="w-full  h-auto relative mb-10">
        <div className="w-full px-6 md:px-10 bg-gray-200 rounded border border-black flex justify-between items-center py-6">
          <div className="text-black text-2xl md:text-3xl font-bold">
            Ajouter une collection
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-full border flex items-center justify-center">
              <img
                className="w-8 h-8 rounded-full"
                src="https://placehold.co/32x32"
              />
            </div>

            <div className="text-right leading-5">
              <div className="text-black text-sm font-bold">Fathnelle DJIHOUESSI</div>
              <div className="text-black text-sm">Admin</div>
            </div>
          </div>
        </div>

        {/* SOUS-TITRE */}
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
          <div className="h-11 bg-neutral-200 rounded-sm p-2 flex items-center">
            <span className="text-neutral-600 text-lg">
              Écrivez ici le nom de la collection
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="p-2 text-black text-lg">Description :</label>
          <div className="h-36 bg-neutral-200 rounded-sm p-2 flex items-start">
            <span className="text-neutral-600 text-lg">
              Décrivez brièvement la collection
            </span>
          </div>
        </div>

        {/* Image */}
        <div className="flex flex-col">
          <label className="p-2 text-black text-lg">
            Image de couverture de la collection :
          </label>

          <div className="h-10 bg-neutral-200 rounded-sm flex items-center justify-between px-3">
            <span className="text-neutral-600 text-lg">Téléversez un média</span>

            {/* Icône upload (recréée fidèlement) */}
            <svg width="24" height="24" viewBox="0 0 24 24">
              <rect x="11" y="4" width="1.5" height="12" stroke="black" fill="none" />
              <rect x="6" y="15" width="12" height="1.5" stroke="black" fill="none" />
              <rect x="10" y="10" width="4" height="5" stroke="black" fill="none" />
            </svg>
          </div>
        </div>

        {/* BOUTON */}
        <div className="flex justify-start md:justify-center">
          <button className="px-6 py-2 bg-black text-white font-bold rounded-sm">
            Créer
          </button>
        </div>
      </div>
    </div>
  );
}
