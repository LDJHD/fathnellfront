import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Contact from "../pages/Contact";
import MainLayout from "../layouts/MainLayouts";
import About from "../pages/About";
import FAQ from "../pages/FAQ";
import Boutique from "../pages/Boutique";
import ListeSouhait from "../pages/ListeSouhait";
import Panier from "../pages/Panier";
import CategoriePublique from "../pages/categorie";
import FicheProduit from "../pages/FicheProduit";
import Magazin from "../pages/magazin";
import Search from "../pages/Search";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import GestionCommandes from "../pages/dashboard/Gestioncommandes";
import CatalogueResponsive from "../pages/dashboard/CatalogueResponsive";
import AjouterArticle from "../pages/dashboard/AjouterArticle";
import SuccessModal from "../pages/dashboard/SuccessModal";
import Ajoutercollection from "../pages/dashboard/AjouterCollection";
import CategorieDashboard from "../pages/dashboard/Categorie";
import AjouterCategorie from "../pages/dashboard/AjouterCategorie";
import Collection from "../pages/dashboard/Collection";
import ModifierCollection from "../pages/dashboard/ModifierCollection";
import GestionBannieres from "../pages/dashboard/GestionBannieres";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";


export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes d'authentification */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Routes avec MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/boutique" element={<Boutique />} />
          <Route path="/liste-souhait" element={<ListeSouhait />} />
          <Route path="/panier" element={<Panier />} />
          <Route path="/categorie" element={<CategoriePublique />} />
          <Route path="/categorie/:categoryName" element={<CategoriePublique />} />
          <Route path="/magazin/:collectionId" element={<Magazin />} />
          <Route path="/produit/:id" element={<FicheProduit />} />
          <Route path="/search" element={<Search />} />
        </Route>

        {/* Routes du dashboard avec DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/gestion" element={<GestionCommandes />} />
          <Route path="/dashboard/catalogue" element={<CatalogueResponsive />} />
          <Route path="/dashboard/ajouter-article" element={<AjouterArticle />} />
          <Route path="/dashboard/modifier-article/:id" element={<AjouterArticle editMode={true} />} />
          <Route path="/dashboard/ajouter-collection" element={<Ajoutercollection />} />
          <Route path="/successmodal" element={<SuccessModal />} />
          <Route path="/dashboard/collections" element={<Collection />} />
          <Route path="/dashboard/ajouter-collection" element={<Ajoutercollection />} />
          <Route path="/dashboard/modifier-collection/:id" element={<ModifierCollection />} />
          <Route path="/dashboard/categories" element={<CategorieDashboard />} />
          <Route path="/dashboard/ajouter-categorie" element={<AjouterCategorie />} />
          <Route path="/dashboard/modifier-categorie/:id" element={<AjouterCategorie editMode={true} />} />
          <Route path="/dashboard/bannieres" element={<GestionBannieres />} />

          {/* tu peux ajouter d'autres pages du dashboard ici */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
