import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { SearchBar } from "./design/SearchBar";
import { Link as MenuLink } from "./design/Link";
import { FathnellLogo } from "./design/FathnellLogo";
import { ShopIncon } from "./design/ShopIncon";
import { WishListIcon } from "./design/WishListIcon";
import NavDropdown from "./design/NavDropdown";
import MobileDropdown from "./design/MobileDropdown";
import { useWishlist } from "../hooks/useWishlist";
import { usePanier } from "../hooks/usePanier";
import "./design/style.css";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { wishlistItems } = useWishlist();
  const { panierItems } = usePanier();

  // Vérifier si on est sur la page panier ou wishlist
  const isOnPanierPage = location.pathname === '/panier';
  const isOnWishlistPage = location.pathname === '/liste-souhait';

  // Compter les items
  const wishlistCount = wishlistItems.length;
  const panierCount = panierItems.length;

  const links = [
    "SACS",
    "CHAUSSURES",
    "CEINTURES",
    "PETITE MAROQUINERIE",
    "GADGETS",
    "PRODUITS D'ENTRETIENS",
  ];

  // Dropdown menu items - dirigent vers /categorie avec les bons paramètres
  const sacsDropdownItems = [
    { label: "Sacs hommes", href: "/categorie/sacs hommes" },
    { label: "Sacs femmes", href: "/categorie/sacs femmes" }
  ];

  const chaussuresDropdownItems = [
    { label: "Chaussures hommes", href: "/categorie/chaussures hommes" },
    { label: "Chaussures femmes", href: "/categorie/chaussures femmes" },
    { label: "Chaussures enfants", href: "/categorie/chaussures enfants" }
  ];

  const ceinturesDropdownItems = [
    { label: "Ceintures hommes", href: "/categorie/ceintures hommes" },
    { label: "Ceintures femmes", href: "/categorie/ceintures femmes" }
  ];

  const gadjetsDropdownItems = [
    { label: "Les accessoires", href: "/categorie/accessoires" },
    { label: "Bracelets hommes", href: "/categorie/bracelets hommes" },
    { label: "Bracelets femmes", href: "/categorie/bracelets femmes" }
  ];

  const petiteMaroquinerieItems = [
    { label: "Pochettes", href: "/categorie/pochettes" },
    { label: "Portefeuilles", href: "/categorie/portefeuilles" },
    { label: "Porte documents", href: "/categorie/porte documents" }
  ];

  const produitsentretiensDropdownItems = [
    { label: "Produits d'entretien", href: "/categorie/produits d'entretiens" }
  ];

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // Close search when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchOpen && !event.target.closest('.mobile-search-container')) {
        closeSearch();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && searchOpen) {
        closeSearch();
      }
    };

    if (searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [searchOpen]);

  return (
    <nav className="bg-white w-full relative z-50 border-b font-['Glacial_Indifference'] text-lg border-gray-200">
      {/* Desktop menu */}
      <div className="nav-bar-test hidden font-['Glacial_Indifference'] text-lg lg:flex">
        <SearchBar
          className="search-bar-instance"
          placeholderPropertyDefaultClassName="design-component-instance-node"
          icon={new URL("../assets/icon-3.svg", import.meta.url).href}
        />

        <NavDropdown
          label="SACS"
          items={sacsDropdownItems}
          className="link-instance font-['Glacial_Indifference']"
          to="/categorie"
        />

        <NavDropdown
          label="CHAUSSURES"
          items={chaussuresDropdownItems}
          className="link-instance font-['Glacial_Indifference']"
          to="/categorie"
        />

        <NavDropdown
          label="CEINTURES"
          items={ceinturesDropdownItems}
          className="link-instance font-['Glacial_Indifference']"
          to="/categorie"
        />

        <FathnellLogo
          className="fathnell-logo-2"
          baseClassName="fathnell-logo-3"
          vectorClassName="fathnell-logo-instance"
          color="black"
          version="full"
          img={new URL("../assets/Glyph.svg", import.meta.url).href}
          base={new URL("../assets/base.svg", import.meta.url).href}
        />

        <NavDropdown
          label="PETITE MAROQUINERIE"
          items={petiteMaroquinerieItems}
          className="link-instance"
          to="/categorie"
        />
        <NavDropdown
          label="GADGETS"
          items={gadjetsDropdownItems}
          className="link-instance"
          to="/categorie"
        />
         <NavDropdown
          label="PRODUITS D'ENTRETIENS"
          items={produitsentretiensDropdownItems}
          className="link-instance"
          to="/categorie"
        />
        <div className="icon-2 flex items-center gap-2">
          <div onClick={() => navigate('/panier')} className="cursor-pointer relative">
            <ShopIncon className="shop-incon" color={isOnPanierPage ? "#ef4444" : "#010101"} />
            {panierCount > 0 && (
              <span className={`absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${isOnPanierPage ? 'bg-red-600' : 'bg-black'}`}>
                {panierCount > 9 ? '9+' : panierCount}
              </span>
            )}
          </div>
          <div onClick={() => navigate('/liste-souhait')} className="cursor-pointer relative">
            <WishListIcon 
              className=" wish-list-icon" 
              color={isOnWishlistPage ? "#ef4444" : "#010101"}
              fill={isOnWishlistPage ? "#ef4444" : "none"}
            />
            {wishlistCount > 0 && (
              <span className={`absolute -top-2 -right-2 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center ${isOnWishlistPage ? 'bg-red-600' : 'bg-black'}`}>
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Tablet menu (medium screens) */}
      <div className="hidden md:flex lg:hidden items-center justify-between px-6 py-4 h-20">
        <SearchBar
          className="search-bar-instance flex-1 max-w-xs"
          placeholderPropertyDefaultClassName="design-component-instance-node"
          icon={new URL("../assets/icon-3.svg", import.meta.url).href}
        />

        <FathnellLogo
          className="fathnell-logo-2 mx-4"
          baseClassName="fathnell-logo-3"
          vectorClassName="fathnell-logo-instance"
          color="black"
          version="full"
          img={new URL("../assets/Glyph.svg", import.meta.url).href}
          base={new URL("../assets/base.svg", import.meta.url).href}
        />

        <div className="flex items-center gap-4">
          <div className="icon-2 text-center flex items-center gap-2">
            <div onClick={() => navigate('/panier')} className="cursor-pointer relative">
              <ShopIncon className="shop-incon" color={isOnPanierPage ? "#ef4444" : "#010101"} />
              {panierCount > 0 && (
                <span className={`absolute -top-2 -right-2 ${isOnPanierPage ? 'bg-red-600' : 'bg-black'} text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
                  {panierCount > 9 ? '9+' : panierCount}
                </span>
              )}
            </div>
            <div onClick={() => navigate('/liste-souhait')} className="cursor-pointer relative">
              <WishListIcon 
                className="wish-list-icon" 
                color={isOnWishlistPage ? "#ef4444" : "#010101"}
                fill={isOnWishlistPage ? "#ef4444" : "none"}
              />
              {wishlistCount > 0 && (
                <span className={`absolute -top-2 -right-2 ${isOnWishlistPage ? 'bg-red-600' : 'bg-black'} text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
                  {wishlistCount > 9 ? '9+' : wishlistCount}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={toggleDrawer}
            className="p-2 rounded-md hover:bg-gray-100 transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile header */}
      <div className="flex items-center justify-between px-4 py-3 md:hidden h-16 relative">
        {/* Left side - Hamburger and Search */}
        <div className="flex items-center gap-2">
          {/* Hamburger */}
          <button
            onClick={toggleDrawer}
            className="p-2 rounded-md hover:bg-gray-100 bg-white transition-colors"
            aria-label="Menu"
          >
            <svg className="w-6 h-6 bg-white text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Search Icon */}
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="cursor-pointer p-2 bg-white"
            aria-label="Rechercher"
          >
            <svg className="w-6 h-6 bg-white text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>

        {/* Logo - Centré absolument */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <FathnellLogo
            className="fathnell-logo-2 scale-75"
            baseClassName="fathnell-logo-3"
            vectorClassName="fathnell-logo-instance"
            color="black"
            version="full"
            img={new URL("../assets/Glyph.svg", import.meta.url).href}
            base={new URL("../assets/base.svg", import.meta.url).href}
          />
        </div>

        {/* Right side - Cart and Wishlist Icons */}
        <div className="icon-2 flex items-center gap-3">
          <div onClick={() => navigate('/panier')} className="cursor-pointer relative">
            <ShopIncon className="shop-incon w-6 h-6" color={isOnPanierPage ? "#ef4444" : "#010101"} />
            {panierCount > 0 && (
              <span className={`absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${isOnPanierPage ? 'bg-red-600' : 'bg-black'}`}>
                {panierCount > 9 ? '9+' : panierCount}
              </span>
            )}
          </div>
          <div onClick={() => navigate('/liste-souhait')} className="cursor-pointer relative">
            <WishListIcon 
              className="wish-list-icon w-6 h-6" 
              color={isOnWishlistPage ? "#ef4444" : "#010101"}
              fill={isOnWishlistPage ? "#ef4444" : "none"}
            />
            {wishlistCount > 0 && (
              <span className={`absolute -top-1 -right-1 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center ${isOnWishlistPage ? 'bg-red-600' : 'bg-black'}`}>
                {wishlistCount > 9 ? '9+' : wishlistCount}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile search - only show when searchOpen is true */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 border-t border-gray-200 mobile-search-container">
          <div className="flex items-center justify-between">
            <SearchBar
              className="search-bar-instance flex-1"
              placeholderPropertyDefaultClassName="design-component-instance-node-mobile"
              icon={new URL("../assets/icon-3.svg", import.meta.url).href}
            />
            <button 
              onClick={closeSearch}
              className="ml-2 p-2 text-gray-500 hover:text-gray-700"
              aria-label="Fermer la recherche"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Mobile/Tablet drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-[60] ${drawerOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Drawer header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h1 className="text-lg font-normal font-['Glacial_Indifference'] text-black">
              FathNell Maroquinerie
            </h1>
            <button
              onClick={closeDrawer}
              className="p-2 rounded-md hover:bg-gray-100 bg-white transition-colors"
              aria-label="Fermer le menu"
            >
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col px-4 py-6 gap-2 flex-1 overflow-y-auto">
            <div className="">
              <MobileDropdown
                label="SACS"
                items={sacsDropdownItems}
                className="w-full"
                onItemClick={closeDrawer}
              />
            </div>

            <div className="">
              <MobileDropdown
                label="CHAUSSURES"
                items={chaussuresDropdownItems}
                className="w-full"
                onItemClick={closeDrawer}
              />
            </div>

            <div className="">
              <MobileDropdown
                label="CEINTURES"
                items={ceinturesDropdownItems}
                className="w-full"
                onItemClick={closeDrawer}
              />
            </div>

            <div className="">
              <MobileDropdown
                label="PETITE MAROQUINERIE"
                items={petiteMaroquinerieItems}
                className="w-full"
                onItemClick={closeDrawer}
              />
            </div>

            <div className="">
              <MobileDropdown
                label="GADGETS"
                items={gadjetsDropdownItems}
                className="w-full"
                onItemClick={closeDrawer}
              />
            </div>

            <div className=" last:border-b-0">
              <MobileDropdown
                label="PRODUITS D'ENTRETIENS"
                items={produitsentretiensDropdownItems}
                className="w-full"
                onItemClick={closeDrawer}
              />
            </div>

            {/* Navigation links adicionales */}
            {/* <div className="border-t border-gray-200 mt-4 pt-4">
              <div className="space-y-2">
                <button
                  onClick={() => { navigate('/'); closeDrawer(); }}
                  className="w-full text-left px-4 py-3 text-black font-['Glacial_Indifference'] hover:bg-gray-100 rounded-md transition-colors"
                >
                  ACCUEIL
                </button>
                <button
                  onClick={() => { navigate('/about'); closeDrawer(); }}
                  className="w-full text-left px-4 py-3 text-black font-['Glacial_Indifference'] hover:bg-gray-100 rounded-md transition-colors"
                >
                  À PROPOS
                </button>
                <button
                  onClick={() => { navigate('/contact'); closeDrawer(); }}
                  className="w-full text-left px-4 py-3 text-black font-['Glacial_Indifference'] hover:bg-gray-100 rounded-md transition-colors"
                >
                  CONTACT
                </button>
                <button
                  onClick={() => { navigate('/faq'); closeDrawer(); }}
                  className="w-full text-left px-4 py-3 text-black font-['Glacial_Indifference'] hover:bg-gray-100 rounded-md transition-colors"
                >
                  FAQ
                </button>
              </div>
            </div> */}
          </div>

          {/* Drawer footer with icons */}
          {/* <div className="p-4 border-t border-gray-200">
            <div className="flex justify-center gap-6">
              <div onClick={() => { navigate('/panier'); closeDrawer(); }} className="cursor-pointer relative">
                <ShopIncon className="shop-incon w-8 h-8" color={isOnPanierPage ? "#ef4444" : "#010101"} />
                {panierCount > 0 && (
                  <span className={`absolute -top-1 -right-1 ${isOnPanierPage ? 'bg-red-600' : 'bg-black'} text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
                    {panierCount > 9 ? '9+' : panierCount}
                  </span>
                )}
              </div>
              <div onClick={() => { navigate('/liste-souhait'); closeDrawer(); }} className="cursor-pointer relative">
                <WishListIcon 
                  className="wish-list-icon w-8 h-8" 
                  color={isOnWishlistPage ? "#ef4444" : "#010101"}
                  fill={isOnWishlistPage ? "#ef4444" : "none"}
                />
                {wishlistCount > 0 && (
                  <span className={`absolute -top-1 -right-1 ${isOnWishlistPage ? 'bg-red-600' : 'bg-black'} text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center`}>
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Overlay */}
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300"
          onClick={closeDrawer}
        />
      )}

      {/* Chemin de page */}
      {/* <div className="chemin-de-page px-4 lg:px-8 py-2 bg-gray-50 border-b border-gray-200">
        <div className="text-black font-bold text-sm">SACS &gt; Hommes</div>
      </div> */}
    </nav>
  );
}
