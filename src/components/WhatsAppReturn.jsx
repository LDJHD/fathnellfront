import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WhatsAppReturn = () => {
  const navigate = useNavigate();
  const [showReturnButton, setShowReturnButton] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur revient de WhatsApp
    const returnUrl = sessionStorage.getItem('whatsapp_return_url');
    if (returnUrl && returnUrl !== window.location.href) {
      setShowReturnButton(true);
    }
  }, []);

  const handleReturn = () => {
    const returnUrl = sessionStorage.getItem('whatsapp_return_url');
    if (returnUrl) {
      sessionStorage.removeItem('whatsapp_return_url');
      navigate(returnUrl);
    } else {
      navigate('/');
    }
  };

  if (!showReturnButton) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={handleReturn}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
      >
        ← Retour à FathNell
      </button>
    </div>
  );
};

export default WhatsAppReturn;