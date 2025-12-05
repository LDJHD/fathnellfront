
import React, { useState, useEffect } from "react";
import img1 from "../assets/c4a7047241bae2a48d4c9418731c13ef0f172c91.jpg";
import { ProductCard } from "./ProductCard";
import { produitsAPI } from "../services/api";

export const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Charger les produits vedettes
  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/produit/vedettes?limit=8`);
      
      if (response.ok) {
        const data = await response.json();
        const produits = data.produits || [];
        
        // Transformer les données pour qu'elles correspondent au format attendu par ProductCard
        const transformedProducts = produits.map(produit => ({
          id: produit.id,
          image: produit.image_principale 
            ? `${import.meta.env.VITE_API_URL}/uploads/produits/${produit.image_principale}`
            : img1,
          title: produit.nom,
          price: produit.prix,
          promo: produit.en_promo ? produit.prix_promo : null
        }));
        
        setProducts(transformedProducts);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des produits vedettes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <section className="px-3 py-5  md:py-12 bg-white">
      <h1 className="self-stretch text-center mb-12 justify-start text-black md:text-4xl text-xl font-bold font-['Glacial_Indifference'] leading-[52px]">NOS PRODUITS VEDETTES</h1>
      
      {loading ? (
        <div className="text-center py-8">
          <div className="text-black text-xl font-['Glacial_Indifference']">
            Chargement des produits...
          </div>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-black text-xl font-['Glacial_Indifference']">
            Aucun produit vedette disponible
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-w-7xl md:max-w-[1550px] mx-auto">
          {products.map((product, index) => (
            <ProductCard key={product.id || index} {...product} />
          ))}
        </div>
      )}
    </section>
  );
};
