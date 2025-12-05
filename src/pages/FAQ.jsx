import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Questions et réponses exactes du fichier PDF FathNell
  const faqData = [
    {
      question: "Comment passer commande sur FathNell ?",
      response: "Pour toute commande, il vous suffit :\n- d'ajouter votre article au panier ;\n- d'aller dans votre panier et de cliquer sur le bouton \"Finaliser ma commande via WhatsApp\" présent au bas de votre page panier.\n\nVous serez automatiquement redirigé vers notre service clientèle, qui vous accompagnera pour la validation et le paiement de votre achat."
    },
    {
      question: "Quels types de produits propose FathNell ?",
      response: "FathNell propose une gamme variée d'articles en cuirs: sacs, sandales, ceintures, accessoires de maroquinerie et produits d'entretiens, conçus avec un savoir-faire minutieux. Chaque pièce est sélectionnée pour sa qualité, son style et sa durabilité."
    },
    {
      question: "Quels sont les délais de livraison ?",
      response: "Les délais varient selon plusieurs paramètres, mais notre service clientèle vous indiquera précisément la date estimée lors de la livraison de votre commande."
    },
    {
      question: "Comment puis-je payer ma commande ?",
      response: "Pour ceux qui sont au Bénin, les paiements se font directement via les moyens de paiement locaux tels que :\n- Mobile Money (MTN, Moov etc...)\n- Paiement en espèces (pour ceux qui passeront à notre showroom)\n- Paiement par carte\n\nPour les internationaux, vous recevrez toutes les instructions sécurisées au moment de la commande."
    },
    {
      question: "Puis-je échanger ou retourner un produit ?",
      response: "Oui. Si le produit reçu ne correspond pas à votre demande, vous pouvez demander :\n- Un échange, selon les stocks disponibles\n- Un retour, dans un délai maximum de 72 heures après réception\n\nLe produit doit être en parfait état et non utilisé. Vous êtes entièrement responsable des frais d'expédition pour retourner un article. Ces frais sont non remboursables. Autrement, les frais d'expédition seront déduits de votre remboursement.\n\nPlus d'informations, veuillez nous contacter via email au fathnell2020@gmail.com ou nous écrire via WhatsApp au +229 99 99 95 15."
    },
    {
      question: "Faites-vous des livraisons internationales ?",
      response: "Oui, FathNell livre dans plusieurs pays d'Afrique et d'Europe. Les frais et délais exacts vous seront communiqués selon le lieu de livraison."
    },
    {
      question: "Comment entretenir mon article FathNell ?",
      response: "Nous vous recommandons :\n- Un nettoyage doux avec une brosse-cirage FathNell\n- D'éviter l'exposition prolongée à l'humidité\n- De ranger votre article dans un endroit ventilé\n\nSur demande, nous pouvons vous donner des conseils personnalisés pour le type de cuir ou de matériau de votre article."
    },
    {
      question: "Comment contacter FathNell ?",
      response: "Vous pouvez nous contacter via :\n- WhatsApp & tél : 00229 01 99 99 95 15\n- Facebook : @FathNell\n- Instagram : @fathnellmaroquinerie\n- LinkedIn : @FathNell Maroquinerie\n- TikTok : @FathNell Maroquinerie"
    },
    {
      question: "Où se situe FathNell ?",
      response: "Nous sommes situés à AGLA \"Les Pylônes\" 100m à gauche après le commissariat en quittant le Stade ou Cica Toyota."
    },
    {
      question: "Partenariat ou Business",
      response: "Les termes et conditions de vente sont valables pour les clients achetant des produits destinés à la revente. Si vous êtes client d'affaires, veuillez nous contacter à l'adresse mail fathnelle2020@gmail.com.\n\nSi les articles sont commandés à l'extérieur du pays de résidence de FathNell, les droits d'importation et des taxes peuvent être inclus une fois que vos produits atteignent leur destination. FathNell n'est pas responsable de ces charges. Si vous achetez internationalement, vous devez contacter vos autorités douanières locales pour des détails supplémentaires concernant les coûts et procédures.\n\nEn tant qu'acheteur de nos articles, vous seriez également l'importateur d'enregistrement, et cela devrait permettre à votre achat d'être pleinement conforme aux lois du pays dans lequel les articles sont importés. Veuillez être conscient que les articles peuvent être inspectés à l'arrivée au port à des fins douanières et nous ne pouvons pas, dans ces cas, garantir l'emballage intact de vos produits."
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-50 py-16 px-4">
        <div id="faq" className="max-w-4xl mx-auto text-center">
          <h1 className="text-black font-bold font-['Glacial_Indifference'] text-3xl md:text-5xl leading-tight">
            Questions Fréquemment Posées
          </h1>
          <p className="mt-6 text-black font-['Glacial_Indifference'] text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur nos produits, 
            nos services et nos conditions de vente.
          </p>
        </div>
      </div>

      {/* FAQ Content */}
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqData.map((item, index) => (
              <div 
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                {/* Question */}
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 transition-colors duration-200 flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold font-['Glacial_Indifference'] text-black pr-4">
                    {item.question}
                  </h3>
                  <div className="flex-shrink-0 ml-4">
                    {openItems[index] ? (
                      <ChevronUp className="h-5 w-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-600" />
                    )}
                  </div>
                </button>

                {/* Response */}
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openItems[index] ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                    <div className="text-gray-700 font-['Glacial_Indifference'] text-base leading-relaxed whitespace-pre-line">
                      {item.response}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-16 bg-black rounded-lg p-8 text-center">
            <h2 className="text-white font-bold font-['Glacial_Indifference'] text-2xl md:text-3xl mb-4">
              Une autre question ?
            </h2>
            <p className="text-gray-300 font-['Glacial_Indifference'] text-lg mb-6">
              Notre équipe est là pour vous aider. N'hésitez pas à nous contacter.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/contact"
                className="inline-block bg-white text-black px-6 py-3 rounded-lg font-semibold font-['Glacial_Indifference'] hover:bg-gray-100 transition-colors duration-200"
              >
                Nous contacter
              </a>
              <a 
                href="https://wa.me/22901999995015" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg font-semibold font-['Glacial_Indifference'] hover:bg-green-700 transition-colors duration-200"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;