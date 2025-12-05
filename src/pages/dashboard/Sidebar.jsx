import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import {
  Home,
  HelpCircle,
  Mail,
  Box,
  BarChart2,
  PlusSquare,
  FolderPlus,
  LogOut,
  Menu,
  X,
  Image as ImageIcon,
} from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Bouton Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-black shadow rounded-full"
        onClick={() => setOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen  w-72 bg-gray-200 border-r px-4 pt-1 pb-8 flex flex-col gap-6 z-50 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* Bouton fermer (mobile) */}
        <button
          className="md:hidden absolute top-4 right-4 p-1 bg-black shadow rounded-full"
          onClick={() => setOpen(false)}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <div className="w-full flex justify-center items-center bg-white py-4">
          <img src={logo} alt="Logo" className="h-10" />
        </div>

        {/* Menu principal */}
        <div className="flex flex-col gap-4">
          <p className="px-2 text-neutral-700 text-sm font-normal">MENU PRINCIPAL</p>

          <div className="flex flex-col">
            <div 
              onClick={() => navigate("/dashboard")}
              className={`w-full p-2 rounded flex items-center gap-2 cursor-pointer ${
                isActive("/dashboard") ? "bg-white" : "text-neutral-700"
              }`}
            >
              <Home className="w-5 h-5" />
              <span className={`text-base ${isActive("/dashboard") ? "font-bold text-black" : "text-sm"}`}>
                Tableau de bord
              </span>
            </div>

            <div 
              onClick={() => navigate("/dashboard/gestion")}
              className={`w-full p-2 rounded flex items-center gap-2 cursor-pointer ${
                isActive("/dashboard/gestion") ? "bg-white" : "text-neutral-700"
              }`}
            >
              <Box className="w-5 h-5" />
              <span className={`${isActive("/dashboard/gestion") ? "font-bold text-black" : "text-sm"}`}>
                Gestion des commandes
              </span>
            </div>

            <div className="w-full p-2 flex items-center gap-2 text-neutral-700 cursor-pointer">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm">Gestion de la FAQ</span>
            </div>

            <div className="w-full p-2 flex items-center gap-2 text-neutral-700 cursor-pointer">
              <Mail className="w-5 h-5" />
              <span className="text-sm">Newsletter</span>
            </div>

            <div 
              onClick={() => navigate("/dashboard/bannieres")}
              className={`w-full p-2 rounded flex items-center gap-2 cursor-pointer ${
                isActive("/dashboard/bannieres") ? "bg-white" : "text-neutral-700"
              }`}
            >
              <ImageIcon className="w-5 h-5" />
              <span className={`${isActive("/dashboard/bannieres") ? "font-bold text-black" : "text-sm"}`}>
                Gestion des bannières
              </span>
            </div>
          </div>
        </div>

        {/* Produits */}
        <div className="flex flex-col gap-4">
          <p className="px-2 text-neutral-700 text-sm font-normal">PRODUITS</p>

          <div className="flex flex-col gap-1">
            <div 
              onClick={() => navigate("/dashboard/catalogue")}
              className={`w-full p-2 rounded flex items-center gap-2 cursor-pointer ${
                isActive("/dashboard/catalogue") ? "bg-white" : "text-neutral-700"
              }`}
            >
              <Box className="w-5 h-5" />
              <span className={`${isActive("/dashboard/catalogue") ? "font-bold text-black" : "text-sm"}`}>
                Gestion du catalogue
              </span>
            </div>

            <div 
              onClick={() => navigate("/dashboard/categories")}
              className={`w-full p-2 rounded flex items-center gap-2 cursor-pointer ${
                isActive("/dashboard/categories") ? "bg-white" : "text-neutral-700"
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              <span className={`${isActive("/dashboard/categories") ? "font-bold text-black" : "text-sm"}`}>
                Catégories
              </span>
            </div>

            <div 
              onClick={() => navigate("/dashboard/ajouter-article")}
              className={`w-full p-2 rounded flex items-center gap-2 cursor-pointer ${
                isActive("/dashboard/ajouter-article") ? "bg-white" : "text-neutral-700"
              }`}
            >
              <PlusSquare className="w-5 h-5" />
              <span className={`${isActive("/dashboard/ajouter-article") ? "font-bold text-black" : "text-sm"}`}>
                Ajouter un article
              </span>
            </div>

            <div 
              onClick={() => navigate("/dashboard/collections")}
              className={`w-full p-2 rounded flex items-center gap-2 cursor-pointer ${
                isActive("/dashboard/collections") ? "bg-white" : "text-neutral-700"
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              <span className={`${isActive("/dashboard/collections") ? "font-bold text-black" : "text-sm"}`}>
                Collections
              </span>
            </div>

            <div 
              onClick={() => navigate("/dashboard/ajouter-collection")}
              className={`w-full p-2 rounded flex items-center gap-2 cursor-pointer ${
                isActive("/dashboard/ajouter-collection") ? "bg-white" : "text-neutral-700"
              }`}
            >
              <FolderPlus className="w-5 h-5" />
              <span className={`${isActive("/dashboard/ajouter-collection") ? "font-bold text-black" : "text-sm"}`}>
                Ajouter une collection
              </span>
            </div>
          </div>
        </div>

        {/* Logout */}
        <div className="mt-auto">
          <div 
            onClick={handleLogout}
            className="w-full p-2 flex items-center gap-2 text-neutral-700 cursor-pointer hover:bg-red-50 rounded transition"
          >
            <LogOut className="w-5 h-5" />
            <span className="text-sm">Déconnexion</span>
          </div>
        </div>
      </div>
    </>
  );
}
