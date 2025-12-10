import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import heroImage from "../assets/hero-image.jpg";
import { getBanniereImageUrl } from "../utils/imageUtils";

export default function BanniereCarousel() {
    const [bannieres, setBannieres] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const API_BASE_URL = import.meta.env.VITE_API_URL;

    // Charger les bannières actives
    useEffect(() => {
        const chargerBannieres = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/banniere/actives`);
                const data = await response.json();
                
                if (data.success && data.bannieres.length > 0) {
                    setBannieres(data.bannieres);
                }
            } catch (error) {
                console.error('Erreur lors du chargement des bannières:', error);
            } finally {
                setLoading(false);
            }
        };

        chargerBannieres();
    }, []);

    // Auto-slide pour le carousel
    useEffect(() => {
        if (bannieres.length > 1) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => 
                    prevIndex === bannieres.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000); // Change toutes les 5 secondes

            return () => clearInterval(interval);
        }
    }, [bannieres.length]);

    // Navigation manuelle
    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? bannieres.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === bannieres.length - 1 ? 0 : currentIndex + 1);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Afficher l'image hero par défaut si pas de bannières
    if (loading) {
        return (
            <div className="w-full h-[400px] md:h-[1000px] bg-gray-200 animate-pulse">
                {/* Skeleton loader */}
            </div>
        );
    }

    if (bannieres.length === 0) {
        // Afficher l'image hero par défaut
        return (
            <div
                className="w-full h-[400px] md:h-[1000px] relative overflow-hidden bg-cover bg-center"
                // style={{ backgroundImage: `url(${heroImage})` }}
            >
                <div
                    className="
                        absolute bottom-[-15px] right-1  /* Mobile : centré en bas */
                        md:left-auto md:translate-x-0 md:right-10  /* Desktop : aligné à droite */
                        md:bottom-2                   /* En bas du conteneur */
                    "
                >
                    <span
                        className="p-1.5 bg-inherit border-none hover:text-red-700 transition flex justify-center cursor-pointer"
                        onClick={() => window.location.href = '/boutique'}
                    >
                        <span className="text-white hover:text-red-700 text-sm md:text-4xl space-x-0 font-bold font-['Glacial_Indifference'] tracking-tight leading-[52px]">
                            ALLER EN BOUTIQUE
                        </span>
                    </span>
                </div>
            </div>
        );
    }

    // Si une seule bannière, affichage simple
    if (bannieres.length === 1) {
        return (
            <div
                className="w-full h-[400px] md:h-[1000px] relative overflow-hidden bg-cover bg-center"
                style={{ backgroundImage: `url(${getBanniereImageUrl(bannieres[0].image_url, heroImage)})` }}
            >
                <div
                    className="
                        absolute bottom-[-15px] right-1  /* Mobile : centré en bas */
                        md:left-auto md:translate-x-0 md:right-10  /* Desktop : aligné à droite */
                        md:bottom-2                   /* En bas du conteneur */
                    "
                >
                    <span
                        className="p-1.5 bg-inherit border-none hover:text-red-700 transition flex justify-center"
                        onClick={() => window.location.href = '/boutique'}
                    >
                        <span className="text-white hover:text-red-700 text-sm md:text-4xl space-x-0 font-bold font-['Glacial_Indifference'] tracking-tight leading-[52px]">
                            ALLER EN BOUTIQUE
                        </span>
                    </span>
                </div>
            </div>
        );
    }

    // Carousel avec plusieurs bannières
    return (
        <div className="w-full h-[400px] md:h-[1000px] relative overflow-hidden">
            {/* Images du carousel */}
            <div 
                className="flex transition-transform duration-500 ease-in-out h-full"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {bannieres.map((banniere, index) => (
                    <div
                        key={banniere.id}
                        className="w-full h-full flex-shrink-0 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${getBanniereImageUrl(banniere.image_url, heroImage)})` }}
                    >
                        {/* Bouton "Aller en boutique" */}
                        <div
                            className="
                                absolute bottom-[-15px] right-1   /* Mobile : centré en bas */
                                md:left-auto md:translate-x-0 md:right-10  /* Desktop : aligné à droite */
                                md:bottom-2                   /* En bas du conteneur */
                            "
                        >
                            <span
                                className="p-1.5 bg-inherit border-none hover:text-red-700 transition flex justify-center cursor-pointer"
                                onClick={() => window.location.href = '/boutique'}
                            >
                                <span className="text-white hover:text-red-700 text-sm md:text-4xl space-x-0 font-bold font-['Glacial_Indifference'] tracking-tight leading-[52px]">
                                    ALLER EN BOUTIQUE
                                </span>
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Boutons de navigation */}
            {bannieres.length > 1 && (
                <>
                    {/* Bouton précédent */}
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                        aria-label="Bannière précédente"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    {/* Bouton suivant */}
                    <button
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                        aria-label="Bannière suivante"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Indicateurs de pagination */}
                    {/* <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                        {bannieres.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`w-3 h-3 rounded-full transition-all ${
                                    index === currentIndex 
                                        ? 'bg-white' 
                                        : 'bg-white/50 hover:bg-white/75'
                                }`}
                                aria-label={`Aller à la bannière ${index + 1}`}
                            />
                        ))}
                    </div> */}
                </>
            )}
        </div>
    );
}