// Configuration centralisée pour FathNell
export const CONFIG = {
  // Configuration WhatsApp
  WHATSAPP: {
    // Remplacez par votre numéro WhatsApp au format international (sans le +)
    // Exemple: pour +33 6 12 34 56 78, mettez "33612345678"
    // Exemple: pour +229 XX XX XX XX, mettez "229XXXXXXXX"
    PHONE_NUMBER: "22967357728", // À REMPLACER par votre vraie numéro
    
    // Messages prédéfinis
    MESSAGES: {
      ORDER: (numeroCommande, montant, articles = []) => {
        console.log("📱 Génération message ORDER avec articles:", articles);
        let message = `Bonjour ! 👋\n\nJe souhaite finaliser ma commande FathNell :\n\n`;
        message += `🔖 Numéro de commande : ${numeroCommande}\n`;
        message += `💰 Montant total : ${montant} XOF\n\n`;
        
        // Toujours afficher les détails si des articles sont fournis
        if (articles && Array.isArray(articles) && articles.length > 0) {
          message += `📦 DÉTAILS DE LA COMMANDE :\n\n`;
          articles.forEach((article, index) => {
            const nomProduit = article.produit_nom || article.nom || 'Produit sans nom';
            message += `${index + 1}. ${nomProduit}\n`;
            message += `   • Quantité : ${article.quantite || 1}\n`;
            if (article.personnalise) {
              message += `   • Prix : À définir (article personnalisé)\n`;
            } else {
              const prixUnitaire = typeof article.prix_unitaire === 'number' 
                ? article.prix_unitaire.toLocaleString() 
                : parseFloat(article.prix_unitaire || 0).toLocaleString();
              const prixTotal = typeof article.prix_total === 'number'
                ? article.prix_total.toLocaleString()
                : parseFloat(article.prix_total || 0).toLocaleString();
              message += `   • Prix unitaire : ${prixUnitaire} XOF\n`;
              message += `   • Prix total : ${prixTotal} XOF\n`;
            }
            if (article.couleur) {
              message += `   • Couleur : ${article.couleur}\n`;
            }
            if (article.taille) {
              message += `   • Taille : ${article.taille}${article.taille_type ? ` (${article.taille_type})` : ''}\n`;
            }
            message += `\n`;
          });
        } else {
          console.warn("⚠️ Aucun article fourni pour le message ORDER");
        }
        
        message += `Merci de me confirmer les détails de livraison et de paiement.\n\n`;
        message += `Cordialement`;
        return message;
      },
        
      CUSTOM_ORDER: (numeroCommande, articles = []) => {
        console.log("📱 Génération message CUSTOM_ORDER avec articles:", articles);
        let message = `Bonjour ! 👋\n\nJe souhaite finaliser ma commande FathNell avec des articles personnalisés :\n\n`;
        message += `🔖 Numéro de commande : ${numeroCommande}\n`;
        message += `⚠️ Cette commande contient des articles personnalisés (prix à définir)\n\n`;
        
        // Toujours afficher les détails si des articles sont fournis
        if (articles && Array.isArray(articles) && articles.length > 0) {
          message += `📦 DÉTAILS DE LA COMMANDE :\n\n`;
          articles.forEach((article, index) => {
            const nomProduit = article.produit_nom || article.nom || 'Produit sans nom';
            message += `${index + 1}. ${nomProduit}\n`;
            message += `   • Quantité : ${article.quantite || 1}\n`;
            if (article.personnalise) {
              message += `   • Prix : À définir (article personnalisé)\n`;
            } else {
              const prixUnitaire = typeof article.prix_unitaire === 'number' 
                ? article.prix_unitaire.toLocaleString() 
                : parseFloat(article.prix_unitaire || 0).toLocaleString();
              const prixTotal = typeof article.prix_total === 'number'
                ? article.prix_total.toLocaleString()
                : parseFloat(article.prix_total || 0).toLocaleString();
              message += `   • Prix unitaire : ${prixUnitaire} XOF\n`;
              message += `   • Prix total : ${prixTotal} XOF\n`;
            }
            if (article.couleur) {
              message += `   • Couleur : ${article.couleur}\n`;
            }
            if (article.taille) {
              message += `   • Taille : ${article.taille}${article.taille_type ? ` (${article.taille_type})` : ''}\n`;
            }
            message += `\n`;
          });
        } else {
          console.warn("⚠️ Aucun article fourni pour le message CUSTOM_ORDER");
        }
        
        message += `Merci de me contacter pour finaliser les détails.\n\n`;
        message += `Cordialement`;
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
