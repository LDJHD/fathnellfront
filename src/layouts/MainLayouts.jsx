import { Outlet } from "react-router-dom"; // <-- OBLIGATOIRE
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Slogan from "../components/Slogan";
import { WishlistProvider } from "../contexts/WishlistContext";
import { PanierProvider } from "../contexts/PanierContext";

export default function MainLayout({ children }) {
  return (
    <WishlistProvider>
      <PanierProvider>
        <div className="flex flex-col min-h-screen">
          <Slogan />
          <Navbar />

          {/* Main Content */}
          <div className="flex-1 overflow-auto">
            <Outlet /> {/* Affiche les pages enfants */}
          </div>

          <Footer />
        </div>
      </PanierProvider>
    </WishlistProvider>
  );
}
