import Slogan from "../components/Slogan";
import heroImage from "../assets/hero-image.jpg";
import { SloganFat } from "../components/SloganFat";
import { FeaturedProducts } from "../components/FeaturedProducts";
import { Testimonials } from "../components/Testimonials";
import BanniereCarousel from "../components/BanniereCarousel";
export default function Home() {
  return (
    <div id="accueil" className="text-center">
      <BanniereCarousel />

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
