export const SloganFat = () => {
    return (
    //   <section className="flex justify-center text-center py-12 px-4">
    //     <div className=" flex  w-96 self-stretch justify-center">
    //         <span class="text-black text-4xl font-bold font-['Glacial_Indifference'] leading-10">Fath</span><span class="text-red-600 text-4xl font-bold font-['Glacial_Indifference'] leading-10">Nell</span>
    //     </div>
    //     <p className="mt-4 max-w-2xl mx-auto text-gray-600">
    //       Découvrez nos produits vedettes et les nouveautés incontournables de la
    //       saison. Des articles uniques sélectionnés avec soin pour vous offrir le
    //       meilleur du style et du confort.
    //     </p>
    //   </section>
      <section className="flex flex-col items-center text-center py-16 px-2 bg-white">
      {/* Logo FathNell */}
      <h1 className="text-5xl md:text-6xl font-bold font-['Glacial_Indifference'] leading-tight">
        <span className="text-black">Fath</span>
        <span className="text-red-600">Nell</span>
      </h1>

      
    
      {/* Texte descriptif */}
      <div className="mt-8 sm:px-4 sm:py-6 md:max-w-6xl space-y-6 text-black text-xl font-normal italic font-['Glacial_Indifference'] leading-10  md:text-3xl  ">
        <p>
          FathNell est une marque béninoise de maroquinerie d’exception, née d’un amour profond
          pour le cuir, le style et l’élégance affirmée. Chaque pièce que nous créons est pensée
          comme une œuvre d’art : unique, fonctionnelle, raffinée.
        </p>
    
        <p>
          De nos sacs à nos sandales, en passant par nos ceintures et accessoires, nous faisons le
          choix de matières nobles et de finitions soignées. Nos créations incarnent l’audace,
          l’élégance et le savoir-faire local, avec une attention particulière portée aux détails,
          à l’esthétique et à la durabilité.
        </p>
    
        <p>
          FathNell, c’est plus qu’une marque : c’est une signature de caractère, un hommage à la
          beauté de l’artisanat béninois, au service de celles et ceux qui souhaitent affirmer leur
          style avec authenticité.
        </p>
      </div>
    </section>
     );
  };

  