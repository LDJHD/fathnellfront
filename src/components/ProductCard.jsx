import { useWishlist } from "../hooks/useWishlist";
import PromoBadge from "./PromoBadge";

export const ProductCard = ({ id, image, title, price, promo }) => {
  const { isInWishlist, toggleWishlist } = useWishlist();

  const handleProductClick = () => {
    if (id) {
      window.location.href = `/produit/${id}`;
    }
  };

  return (
    <div 
      className="group relative bg-white transition overflow-hidden cursor-pointer"
      onClick={handleProductClick}
    >
      {/* Image du produit */}
      <div className="relative overflow-hidden aspect-square md:aspect-auto md:h-72">
        {/* Badge "En promo" */}
        {promo && (
          <div className="absolute top-2 left-0 z-10">
            <PromoBadge />
          </div>
        )}

        {/* Icône cœur */}
        <button
          className="absolute top-2 right-2 bg-white p-1 md:p-2 border border-black rounded-sm hover:scale-110 transition z-10"
          aria-label={isInWishlist(id) ? "Retirer de la liste de souhaits" : "Ajouter à la liste de souhaits"}
          onClick={async (e) => {
            e.stopPropagation();
            if (id) {
              await toggleWishlist(id);
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isInWishlist(id) ? "#ef4444" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke={isInWishlist(id) ? "#ef4444" : "black"}
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.74 0-3.255.986-4.062 2.437A4.687 4.687 0 008.188 3.75C5.6 3.75 3.5 5.765 3.5 8.25c0 7.22 8 11.25 8 11.25s8-4.03 8-11.25z"
            />
          </svg>
        </button>

        {/* Image avec effet de "rentrée" */}
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-95 group-hover:brightness-90"
        />
      </div>

      {/* Infos du produit */}
      <div className="mt-4 text-start">
        <h3 className="text-black text-lg  leading-8 font-normal">{title}</h3>
        <div className="mt-2">
          {promo ? (
            <>
              <span className="text-gray-400 line-through mr-2">{price?.toLocaleString()} xof</span>
              <span className="text-red-600 font-bold">{promo?.toLocaleString()} xof</span>
            </>
          ) : (
            <span className="text-gray-900 font-bold">{price?.toLocaleString()} xof</span>
          )}
        </div>
      </div>
    </div>
  );
};
