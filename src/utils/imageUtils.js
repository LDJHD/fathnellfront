// Utilitaire pour gérer les URLs d'images (local et Cloudflare R2)
export const getImageUrl = (imageUrl, fallbackImage = null, folder = '') => {
  // Si pas d'image, retourner l'image par défaut
  if (!imageUrl) {
    return fallbackImage;
  }

  // Si l'URL commence par http/https, c'est une URL Cloudflare R2 complète
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }

  // Sinon, c'est un chemin local, construire l'URL complète
  const baseUrl = import.meta.env.VITE_API_URL;
  
  // Si l'URL commence déjà par /uploads, l'utiliser directement
  if (imageUrl.startsWith('/uploads')) {
    return `${baseUrl}${imageUrl}`;
  }

  // Sinon, construire le chemin avec le dossier spécifié
  return `${baseUrl}/uploads/${folder}/${imageUrl}`;
};

// Utilitaires spécifiques par type d'image
export const getProductImageUrl = (imageUrl, fallbackImage = null) => 
  getImageUrl(imageUrl, fallbackImage, 'produits');

export const getCollectionImageUrl = (imageUrl, fallbackImage = null) => 
  getImageUrl(imageUrl, fallbackImage, 'collections');

export const getBanniereImageUrl = (imageUrl, fallbackImage = null) => 
  getImageUrl(imageUrl, fallbackImage, 'bannieres');

export const getCategoryImageUrl = (imageUrl, fallbackImage = null) => 
  getImageUrl(imageUrl, fallbackImage, 'categories');