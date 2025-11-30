import Slogan from "../components/Slogan";
import heroImage from "../assets/hero-image.jpg";
import { SloganFat } from "../components/SloganFat";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Testimonials } from "../components/Testimonials";
export default function Home() {
  return (
    <div className="text-center">
      <div
        className="w-full h-[200px]  md:h-[700px] relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute  md:right-10 right-2 bottom-0  md:top-[573px] p-1.5 inline-flex justify-center items-center gap-2.5">
          <div className="flex text-end w-full text-white md:text-4xl font-bold ">
            <button
              className="p-1.5 inline-flex justify-center items-center  bg-inherit underline hover:bg-neutral-800 transition"
              onClick={() => window.location.href = '/boutique'}
            >
              <span className=" flex text-center  text-white text-sm md:text-4xl font-bold font-['Glacial_Indifference']  leading-[52px]">
                ALLER EN BOUTIQUE
              </span>
            </button>

          </div>
        </div>
      </div>
      <div className=" ">
        <main className="flex flex-col min-h-screen bg-white">
          <SloganFat />
          <FeaturedProducts />

          <div className="w-full px-4 py-5 mt-8 flex flex-col items-center text-center">
            {/* Titre */}
            <h2 className="text-black font-bold font-['Glacial_Indifference']
                 text-2xl sm:text-3xl md:text-4xl leading[52px]">
              Nos clients parlent de FathNell
            </h2>

            {/* Sous-titre */}
            <p className="mt-4 max-w-2xl text-black font-['Glacial_Indifference']
                text-base font-normal sm:text-lg md:text-3xl leading-10">
              À travers ces retours, découvrez ce que <br /> nos clientes et clients pensent
              de <br /> l’expérience FathNell.
            </p>
          </div>

          <Testimonials />
        </main>
      </div>
    </div>
  );
}
