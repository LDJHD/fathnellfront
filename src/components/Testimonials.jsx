import React, { useState } from "react";

const testimonials = [
  {
    id: 1,
    name: "Nom du client 1",
    text: "Franchement, vos articles, c'est de la pure pépite. j'ai pris une pochette que j'ai pris bientôt 3 ans et c'est resté pareil.",
  },
  {
    id: 2,
    name: "Nom du client 2",
    text: "Franchement, vos articles, c'est de la pure pépite. j'ai pris une pochette que j'ai pris bientôt 3 ans et c'est resté pareil.",
  },
  {
    id: 3,
    name: "Nom du client 3",
    text: "Franchement, vos articles, c'est de la pure pépite. j'ai pris une pochette que j'ai pris bientôt 3 ans et c'est resté pareil.",
  },
  {
    id: 4,
    name: "Nom du client 4",
    text: "Franchement, vos articles, c'est de la pure pépite. j'ai pris une pochette que j'ai pris bientôt 3 ans et c'est resté pareil.",
  },
  {
    id: 5,
    name: "Nom du client 5",
    text: "Franchement, vos articles, c'est de la pure pépite. j'ai pris une pochette que j'ai pris bientôt 3 ans et c'est resté pareil.",
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => {
    setActiveIndex((current) =>
      current === 0 ? testimonials.length - 1 : current - 1
    );
  };

  const next = () => {
    setActiveIndex((current) =>
      current === testimonials.length - 1 ? 0 : current + 1
    );
  };

  const getTestimonialByOffset = (offset) => {
    const index = (activeIndex + offset + testimonials.length) % testimonials.length;
    return testimonials[index];
  };

  return (
    <section className="py-4 md:py-5 bg-white relative overflow-hidden flex flex-col items-center">
      <div className="relative flex items-center justify-center w-full max-w-[1018px] h-[420px]">
        
        {/* Bouton gauche */}
        <button
          onClick={prev}
          aria-label="Précédent"
          className="absolute left-8 md:left-[-80px]  top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center border border-gray-200"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="black" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Container des témoignages */}
        <div className="w-[1018px] self-stretch py-0.5 inline-flex justify-center items-center gap-6 transition-all duration-500 ease-in-out">
          
          {/* Témoignage de gauche (background/blur) */}
          <div className="w-80 h-48 p-2 bg-white rounded outline outline-[0.30px] outline-black blur-[2px] inline-flex flex-col justify-start items-center gap-2 transform transition-all duration-500 ease-in-out hover:scale-[1.02]">
            <div className="self-stretch p-1 bg-neutral-200 rounded inline-flex justify-center items-center gap-2.5 transition-colors duration-300">
              <div className="flex-1 text-center justify-center text-black text-base font-bold font-['Glacial_Indifference'] leading-6 transition-all duration-500">
                {getTestimonialByOffset(-1).name}
              </div>
            </div>
            <div className="self-stretch p-1 rounded-sm inline-flex justify-center items-start gap-2.5">
              <div className="flex-1 justify-start text-black text-lg font-normal font-['Glacial_Indifference'] leading-8 transition-all duration-500">
                {getTestimonialByOffset(-1).text}
              </div>
            </div>
          </div>

          {/* Témoignage central (foreground/net) */}
          <div className="w-80 h-96 p-2 bg-white rounded outline outline-[0.30px] outline-black inline-flex flex-col justify-start items-center gap-2 transform transition-all duration-500 ease-in-out shadow-lg hover:shadow-xl hover:scale-[1.02]">
            <div className="self-stretch p-1 bg-neutral-200 rounded inline-flex justify-center items-center gap-2.5 transition-colors duration-300">
              <div className="flex-1 text-center justify-center text-black text-base font-bold font-['Glacial_Indifference'] leading-6 transition-all duration-500">
                {getTestimonialByOffset(0).name}
              </div>
            </div>
            <div className="self-stretch flex-1 p-1 rounded-sm inline-flex justify-center items-start gap-2.5">
              <div className="flex-1 self-stretch justify-start text-black text-lg font-normal font-['Glacial_Indifference'] leading-8 transition-all duration-500">
                {getTestimonialByOffset(0).text}
              </div>
            </div>
          </div>

          {/* Témoignage de droite (background/blur) */}
          <div className="w-80 h-48 p-2 bg-white rounded outline outline-[0.30px] outline-black blur-[2px] inline-flex flex-col justify-start items-center gap-2 transform transition-all duration-500 ease-in-out hover:scale-[1.02]">
            <div className="self-stretch p-1 bg-neutral-200 rounded inline-flex justify-center items-center gap-2.5 transition-colors duration-300">
              <div className="flex-1 text-center justify-center text-black text-base font-bold font-['Glacial_Indifference'] leading-6 transition-all duration-500">
                {getTestimonialByOffset(1).name}
              </div>
            </div>
            <div className="self-stretch p-1 rounded-sm inline-flex justify-center items-start gap-2.5">
              <div className="flex-1 justify-start text-black text-lg font-normal font-['Glacial_Indifference'] leading-8 transition-all duration-500">
                {getTestimonialByOffset(1).text}
              </div>
            </div>
          </div>
        </div>

        {/* Bouton droit */}
        <button
          onClick={next}
          aria-label="Suivant"
          className="absolute right-8 md:right-[-80px] top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center justify-center border border-gray-200"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="black" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </section>
  );
};
