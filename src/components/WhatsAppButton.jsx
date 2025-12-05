import React from "react";
import { CONFIG, generateWhatsAppURL } from "../config/config";
import whatsappIcon from "../assets/uil_whatsapp.svg";

// Composant bouton WhatsApp réutilisable
export const WhatsAppButton = ({ 
  message = CONFIG.WHATSAPP.MESSAGES.CONTACT(), 
  children, 
  className = "",
  showIcon = true 
}) => {
  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    const url = generateWhatsAppURL(message);
    
    if (url !== "#") {
      // Utiliser window.location.href au lieu de window.open pour éviter les bloqueurs de popup
      // Sauvegarder l'URL actuelle pour permettre le retour
      const currentUrl = window.location.href;
      sessionStorage.setItem('whatsapp_return_url', currentUrl);
      
      // Ouvrir WhatsApp dans le même onglet
      window.location.href = url;
    } else {
      alert("⚠️ Configuration WhatsApp manquante. Contactez l'administrateur.");
    }
  };

  return (
    <div 
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center gap-2 ${className}`}
    >
      {showIcon &&  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    className="w-6 h-6 fill-current"
  >
    <path d="M16.001 3.2c-7.033 0-12.8 5.766-12.8 12.8 0 2.257.589 4.455 1.712 6.389L3.2 28.8l6.624-1.715a12.76 12.76 0 0 0 6.177 1.579h.001c7.033 0 12.8-5.767 12.8-12.8s-5.767-12.8-12.8-12.8zm0 23.467h-.001a10.61 10.61 0 0 1-5.393-1.475l-.386-.229-3.93 1.017 1.05-3.833-.252-.394a10.583 10.583 0 0 1-1.638-5.657c0-5.88 4.787-10.667 10.667-10.667S26.667 10.12 26.667 16s-4.787 10.667-10.666 10.667zm5.973-7.893c-.326-.163-1.93-.953-2.23-1.061-.3-.112-.52-.163-.74.163-.214.326-.847 1.06-1.04 1.28-.193.214-.387.244-.713.082-.326-.163-1.378-.508-2.624-1.622-.971-.866-1.63-1.933-1.823-2.259-.192-.326-.02-.5.144-.662.148-.148.326-.387.488-.58.163-.193.214-.326.326-.54.112-.214.05-.407-.025-.57-.082-.163-.74-1.79-1.015-2.453-.267-.64-.54-.553-.74-.553-.192 0-.407-.025-.627-.025-.214 0-.57.082-.866.407-.295.326-1.13 1.105-1.13 2.69 0 1.585 1.158 3.117 1.32 3.333.163.214 2.28 3.48 5.523 4.873.772.333 1.372.53 1.84.68.773.245 1.477.21 2.033.128.62-.093 1.93-.79 2.205-1.552.276-.763.276-1.417.193-1.552-.082-.148-.3-.244-.627-.407z" />
  </svg>}
      {children}
    </div>
  );
};

// Composant lien WhatsApp pour les produits
export const WhatsAppProductLink = ({ productName, className = "", children }) => {
  const message = CONFIG.WHATSAPP.MESSAGES.PRODUCT_INFO(productName);
  
  return (
    <WhatsAppButton 
      message={message} 
      className={className}
      showIcon={true}
    >
      {children || "Contacter via WhatsApp"}
    </WhatsAppButton>
  );
};

// Hook pour vérifier si WhatsApp est configuré
export const useWhatsAppConfig = () => {
  const isConfigured = CONFIG.WHATSAPP.PHONE_NUMBER !== "229XXXXXXXX" && 
                      CONFIG.WHATSAPP.PHONE_NUMBER.length > 5;
  
  return {
    isConfigured,
    phoneNumber: CONFIG.WHATSAPP.PHONE_NUMBER,
    generateURL: generateWhatsAppURL
  };
};

export default WhatsAppButton;
