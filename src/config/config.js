// Configuration centralisée pour FathNell
export const CONFIG = {
  // Configuration WhatsApp
  WHATSAPP: {
    // Remplacez par votre numéro WhatsApp au format international (sans le +)
    // Exemple: pour +33 6 12 34 56 78, mettez "33612345678"
    // Exemple: pour +229 XX XX XX XX, mettez "229XXXXXXXX"
    PHONE_NUMBER: "22967357728", // À REMPLACER par votre vraie numéro 22999999515
    
    // Messages prédéfinis
    MESSAGES: {
      ORDER: (numeroCommande, montant, articles = []) => {
        console.log("📱 Génération message ORDER avec articles:", articles);
        let message = `Bonjour FathNell,

Je souhaite finaliser ma commande. Voici les détails :

`;
        
        // Séparer les articles personnalisés et non personnalisés
        const articlesNonPersonnalises = articles.filter(article => !article.personnalise);
        const articlesPersonnalises = articles.filter(article => article.personnalise);
        
        // Articles sans personnalisation
        if (articlesNonPersonnalises.length > 0) {
          message += `Articles sans personnalisation :
`;
          articlesNonPersonnalises.forEach((article) => {
            const nomProduit = article.produit_nom || article.nom || 'Produit sans nom';
            const quantite = article.quantite || 1;
            message += `${nomProduit}
`;
            if (article.couleur) {
              message += `Couleur : ${article.couleur}
`;
            }
            if (article.taille) {
              message += `Taille : ${article.taille}
`;
            }
            if (article.texte_personnalisation) {
              message += `Personnalisation : "${article.texte_personnalisation}"
`;
            }
            message += `Quantité : ${quantite}
`;
            const prixUnitaire = typeof article.prix_unitaire === 'number' 
              ? article.prix_unitaire.toLocaleString() 
              : parseFloat(article.prix_unitaire || 0).toLocaleString();
            message += `Prix : ${prixUnitaire} FCFA

`;
          });
        }
        
        // Articles avec personnalisation
        if (articlesPersonnalises.length > 0) {
          message += `Articles avec personnalisation :

`;
          articlesPersonnalises.forEach((article) => {
            const nomProduit = article.produit_nom || article.nom || 'Produit sans nom';
            const quantite = article.quantite || 1;
            message += `${nomProduit}
`;
            if (article.couleur) {
              message += `Couleur : ${article.couleur}
`;
            }
            if (article.matiere) {
              message += `Matière : ${article.matiere}
`;
            }
            if (article.gravure) {
              message += `Gravure : ${article.gravure}
`;
            }
            if (article.texte_personnalisation) {
              message += `Personnalisation : "${article.texte_personnalisation}"
`;
            }
            message += `Quantité : ${quantite}
`;
            message += `Prix : à définir

`;
          });
        }
        
        // Calcul du total pour les articles non personnalisés
        if (articlesNonPersonnalises.length > 0) {
          const totalNonPersonnalises = articlesNonPersonnalises.reduce((total, article) => {
            const prix = typeof article.prix_unitaire === 'number' ? article.prix_unitaire : parseFloat(article.prix_unitaire || 0);
            const quantite = article.quantite || 1;
            return total + (prix * quantite);
          }, 0);
          message += `Montant total (articles sans personnalisation) : ${totalNonPersonnalises.toLocaleString()} FCFA

`;
        }
        
        message += `Merci de me confirmer le prix total et le délai de livraison.`;
        return message;
      },
        
      CUSTOM_ORDER: (numeroCommande, articles = []) => {
        console.log("📱 Génération message CUSTOM_ORDER avec articles:", articles);
        let message = `Bonjour FathNell,

Je souhaite finaliser ma commande. Voici les détails :

`;
        
        // Séparer les articles personnalisés et non personnalisés
        const articlesNonPersonnalises = articles.filter(article => !article.personnalise);
        const articlesPersonnalises = articles.filter(article => article.personnalise);
        
        // Articles sans personnalisation
        if (articlesNonPersonnalises.length > 0) {
          message += `Articles sans personnalisation :
`;
          articlesNonPersonnalises.forEach((article) => {
            const nomProduit = article.produit_nom || article.nom || 'Produit sans nom';
            const quantite = article.quantite || 1;
            message += `${nomProduit}
`;
            if (article.couleur) {
              message += `Couleur : ${article.couleur}
`;
            }
            if (article.taille) {
              message += `Taille : ${article.taille}
`;
            }
            if (article.texte_personnalisation) {
              message += `Personnalisation : "${article.texte_personnalisation}"
`;
            }
            message += `Quantité : ${quantite}
`;
            const prixUnitaire = typeof article.prix_unitaire === 'number' 
              ? article.prix_unitaire.toLocaleString() 
              : parseFloat(article.prix_unitaire || 0).toLocaleString();
            message += `Prix : ${prixUnitaire} FCFA

`;
          });
        }
        
        // Articles avec personnalisation
        if (articlesPersonnalises.length > 0) {
          message += `Articles avec personnalisation :

`;
          articlesPersonnalises.forEach((article) => {
            const nomProduit = article.produit_nom || article.nom || 'Produit sans nom';
            const quantite = article.quantite || 1;
            message += `${nomProduit}
`;
            if (article.couleur) {
              message += `Couleur : ${article.couleur}
`;
            }
            if (article.matiere) {
              message += `Matière : ${article.matiere}
`;
            }
            if (article.gravure) {
              message += `Gravure : ${article.gravure}
`;
            }
            if (article.texte_personnalisation) {
              message += `Personnalisation : "${article.texte_personnalisation}"
`;
            }
            message += `Quantité : ${quantite}
`;
            message += `Prix : à définir

`;
          });
        }
        
        // Calcul du total pour les articles non personnalisés seulement
        if (articlesNonPersonnalises.length > 0) {
          const totalNonPersonnalises = articlesNonPersonnalises.reduce((total, article) => {
            const prix = typeof article.prix_unitaire === 'number' ? article.prix_unitaire : parseFloat(article.prix_unitaire || 0);
            const quantite = article.quantite || 1;
            return total + (prix * quantite);
          }, 0);
          message += `Montant total (articles sans personnalisation) : ${totalNonPersonnalises.toLocaleString()} FCFA

`;
        }
        
        message += `Merci de me confirmer le prix total et le délai de livraison.`;
        return message;
      },
        
      CONTACT: () =>
        `Bonjour ! 👋\n\nJe souhaite obtenir des informations sur vos produits FathNell.\n\nMerci de me recontacter.\n\nCordialement`,
        
      PRODUCT_INFO: (productName) =>
        `Bonjour ! 👋\n\nJe suis intéressé(e) par votre produit : ${productName}\n\n` +
        `Pourriez-vous me donner plus d'informations ?\n\nMerci !`
    }
  },
  
  // Configuration générale
  APP: {
    NAME: "FathNell",
    CURRENCY: "XOF",
    COMPANY_NAME: "FathNell - Maroquinerie de luxe"
  },
  
  // Configuration des notifications
  NOTIFICATIONS: {
    SUCCESS_DURATION: 3000,
    ERROR_DURATION: 5000
  }
};

// Fonction utilitaire pour générer l'URL WhatsApp
export const generateWhatsAppURL = (message) => {
  const phoneNumber = CONFIG.WHATSAPP.PHONE_NUMBER;
  
  if (phoneNumber === "229XXXXXXXX") {
    console.warn("⚠️ ATTENTION: Le numéro WhatsApp n'est pas configuré ! Modifiez CONFIG.WHATSAPP.PHONE_NUMBER dans config.js");
    return "#"; // Retourne un lien vide si pas configuré
  }
  
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

// Fonction utilitaire pour formater les prix
export const formatPrice = (price) => {
  if (!price) return "0";
  return price.toLocaleString();
};

// Validation du numéro WhatsApp
export const isWhatsAppConfigured = () => {
  return CONFIG.WHATSAPP.PHONE_NUMBER !== "229XXXXXXXX" && CONFIG.WHATSAPP.PHONE_NUMBER.length > 5;
};
