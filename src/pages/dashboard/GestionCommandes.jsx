import React, { useState, useEffect } from "react";
import thumbnail from "../../assets/img01.png";
import { commandesAPI } from "../../services/api";

export default function GestionCommandes() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtreActive, setFiltreActive] = useState('3_jours');

  // Charger les commandes
  const fetchCommandes = async () => {
    try {
      const response = await commandesAPI.getAll({
        periode: filtreActive,
        limit: 100
      });
      
      if (response.ok) {
        const data = await response.json();
        setCommandes(data.commandes || []);
      } else {
        console.error("Erreur lors de la récupération des commandes");
      }
    } catch (error) {
      console.error("Erreur réseau:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCommandes();
  }, [filtreActive]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
  };

  return (
    <div className="min-h-screen p-6 bg-white w-full">
      {/* Top Bar */}
      <div className="w-full flex items-center justify-between mb-6 px-10 bg-gray-200 rounded outline outline-1 outline-offset-[-1px] outline-black">
        <h1 className="flex-1 text-3xl text-black font-bold font-['Glacial_Indifference'] leading-10">
          Gestion des commandes
        </h1>

        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center outline outline-1 outline-offset-[-1px]">
            <img
              src={thumbnail}
              alt="avatar"
              className="w-8 h-8 object-cover rounded-full"
            />
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-black font-['Glacial_Indifference'] leading-6">
              Fathnelle DJIHOUESSI
            </div>
            <div className="text-xs text-zinc-600">Admin</div>
          </div>
        </div>
      </div>

      {/* Intro text */}
      <div className="text-center text-black text-lg font-normal font-['Glacial_Indifference'] leading-8 max-w-3xl mx-auto">
        Cette page montre toutes les tentaives de commandes lancées par les clients.<br />
        Les commandes une fois lancées, se finalisent sur whats’App.
      </div>

      {/* Filter + count */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 my-6">
        <div className="relative">
          <select
            value={filtreActive}
            onChange={(e) => setFiltreActive(e.target.value)}
            className="px-4 py-2 bg-neutral-200 rounded cursor-pointer text-black text-base font-normal font-['Glacial_Indifference'] underline leading-6"
          >
            <option value="3_jours">Les 3 derniers jours</option>
            <option value="7_jours">Les 7 derniers jours</option>
            <option value="30_jours">Les 30 derniers jours</option>
            <option value="">Toutes les commandes</option>
          </select>
        </div>

        <div className="px-4 py-2 bg-green-400 rounded inline-flex justify-center items-center gap-2">
          <div className="text-black text-lg font-normal font-['Glacial_Indifference'] leading-8">
            {loading ? "Chargement..." : `${commandes.length} tentatives de commandes`}
          </div>
        </div>
      </div>

      {/* Table headers */}
      <div className="grid grid-cols-1 md:grid-cols-3 w-full bg-neutral-100 border border-zinc-400 rounded-sm">
        <div className="px-2 py-1 border-r border-zinc-400 text-black text-lg font-bold font-['Glacial_Indifference']">
          Période/Date sélectionnée
        </div>
        <div className="px-2 py-1 border-r border-zinc-400 text-black text-lg font-bold font-['Glacial_Indifference']">
          Articles
        </div>
        <div className="px-2 py-1 text-black text-lg font-bold font-['Glacial_Indifference'] text-center">
          Total (xof) sans personnalisation
        </div>
      </div>

      {/* Commandes */}
      {loading ? (
        <div className="text-center py-8">
          <div className="text-black text-lg font-['Glacial_Indifference']">
            Chargement des commandes...
          </div>
        </div>
      ) : commandes.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-black text-lg font-['Glacial_Indifference']">
            Aucune commande pour cette période
          </div>
        </div>
      ) : (
        commandes.map((commande) => (
          <div
            key={commande.id}
            className="grid grid-cols-1 md:grid-cols-3 w-full border-b border-black py-2"
          >
            {/* Column 1 - Date */}
            <div className="px-2 py-1 border-b md:border-none">
              <div className="text-black text-lg font-normal font-['Glacial_Indifference'] leading-8">
                {formatDate(commande.created_at)}
              </div>
              <div className="text-sm text-gray-600">
                {commande.numero_commande}
              </div>
              <div className="text-sm text-gray-600 capitalize">
                Statut: {commande.status}
              </div>
            </div>

            {/* Column 2 - Articles */}
            <div className="flex flex-col gap-2 border-b md:border-none px-2 py-1">
              <div className="text-black text-lg font-normal font-['Glacial_Indifference'] leading-8 border-b pb-1">
                {commande.articles_resume || `${commande.nombre_articles} articles`}
              </div>
            </div>

            {/* Column 3 - Total */}
            <div className="flex flex-col gap-2 px-2 py-1 text-center">
              <div className="text-red-600 text-lg font-normal leading-8 border-b pb-1">
                {commande.montant_total?.toLocaleString()} xof
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
