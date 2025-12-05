import React, { useState } from "react";
import { CONFIG, generateWhatsAppURL, isWhatsAppConfigured } from "../config/config";

export const WhatsAppAdmin = () => {
  const [testMessage, setTestMessage] = useState("Test de configuration WhatsApp");
  const configured = isWhatsAppConfigured();

  const handleTestWhatsApp = () => {
    const url = generateWhatsAppURL(testMessage);
    if (url !== "#") {
      // Pour les tests admin, on peut garder window.open mais avec une approche plus robuste
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
        // Si le popup est bloqué, proposer une alternative
        if (confirm("Le popup WhatsApp semble bloqué. Voulez-vous ouvrir WhatsApp dans cet onglet ?")) {
          window.location.href = url;
        }
      }
    } else {
      alert("Configuration WhatsApp non valide");
    }
  };

  const handleTestOrderMessage = () => {
    const message = CONFIG.WHATSAPP.MESSAGES.ORDER("CMD-20241212-123456", 50000);
    const url = generateWhatsAppURL(message);
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      if (confirm("Le popup WhatsApp semble bloqué. Voulez-vous ouvrir WhatsApp dans cet onglet ?")) {
        window.location.href = url;
      }
    }
  };

  const handleTestCustomMessage = () => {
    const message = CONFIG.WHATSAPP.MESSAGES.CUSTOM_ORDER("CMD-20241212-123456");
    const url = generateWhatsAppURL(message);
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed == 'undefined') {
      if (confirm("Le popup WhatsApp semble bloqué. Voulez-vous ouvrir WhatsApp dans cet onglet ?")) {
        window.location.href = url;
      }
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">🔧 Administration WhatsApp</h2>
      
      {/* Statut de la configuration */}
      <div className={`p-4 rounded-lg mb-6 ${configured ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-2xl ${configured ? 'text-green-600' : 'text-red-600'}`}>
            {configured ? '✅' : '❌'}
          </span>
          <span className={`font-bold ${configured ? 'text-green-800' : 'text-red-800'}`}>
            {configured ? 'WhatsApp Configuré' : 'WhatsApp NON Configuré'}
          </span>
        </div>
        <p className="text-sm text-gray-600">
          Numéro actuel : <code className="bg-gray-200 px-2 py-1 rounded">{CONFIG.WHATSAPP.PHONE_NUMBER}</code>
        </p>
        {!configured && (
          <p className="text-sm text-red-600 mt-2">
            ⚠️ Modifiez PHONE_NUMBER dans front/src/config/config.js
          </p>
        )}
      </div>

      {/* Test personnalisé */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Message de test personnalisé :
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
            placeholder="Tapez votre message de test..."
          />
          <button
            onClick={handleTestWhatsApp}
            disabled={!configured}
            className={`px-4 py-2 rounded font-medium ${
              configured 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Tester
          </button>
        </div>
      </div>

      {/* Tests prédéfinis */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">Tests des messages prédéfinis :</h3>
        
        <button
          onClick={handleTestOrderMessage}
          disabled={!configured}
          className={`w-full text-left p-3 rounded border ${
            configured 
              ? 'border-blue-300 hover:bg-blue-50 cursor-pointer' 
              : 'border-gray-300 bg-gray-50 cursor-not-allowed'
          }`}
        >
          <div className="font-medium">📋 Message de commande normale</div>
          <div className="text-sm text-gray-600">Teste le message de finalisation de commande</div>
        </button>

        <button
          onClick={handleTestCustomMessage}
          disabled={!configured}
          className={`w-full text-left p-3 rounded border ${
            configured 
              ? 'border-orange-300 hover:bg-orange-50 cursor-pointer' 
              : 'border-gray-300 bg-gray-50 cursor-not-allowed'
          }`}
        >
          <div className="font-medium">🎨 Message de commande personnalisée</div>
          <div className="text-sm text-gray-600">Teste le message pour articles personnalisés</div>
        </button>
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h4 className="font-semibold mb-2">📖 Instructions rapides :</h4>
        <ol className="text-sm text-gray-700 space-y-1 list-decimal list-inside">
          <li>Ouvrez <code>front/src/config/config.js</code></li>
          <li>Modifiez <code>PHONE_NUMBER: "229XXXXXXXX"</code></li>
          <li>Utilisez le format international sans le + (ex: "22912345678")</li>
          <li>Rechargez cette page pour voir les changements</li>
        </ol>
      </div>
    </div>
  );
};

export default WhatsAppAdmin;
