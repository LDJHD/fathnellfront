import React, { useState } from "react";
import { Link } from "react-router-dom";
import phoneIcon from "../assets/si_phone-fill.svg";
import whatsappIcon from "../assets/uil_whatsapp.svg";
import mailIcon from "../assets/material-symbols-light_mail-outline.svg";
import mapIcon from "../assets/arcticons_map.svg";
import { WhatsAppButton } from "./WhatsAppButton";

import facebookIcon from "../assets/facebook-logo-light-1.svg";
import instagramIcon from "../assets/instagram-logo-light-1.svg";
import linkedinIcon from "../assets/linkedin-logo-light-1.svg";
import tiktokIcon from "../assets/tiktok-logo-light-1.svg";

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();

    if (!newsletterEmail) {
      setNewsletterMessage("Veuillez entrer une adresse email");
      return;
    }

    setNewsletterLoading(true);
    setNewsletterMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/contact/newsletter/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setNewsletterMessage("✅ Abonnement réussi ! Merci de vous être abonné.");
        setNewsletterEmail("");
      } else {
        setNewsletterMessage(data.message || "Erreur lors de l'abonnement");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setNewsletterMessage("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setNewsletterLoading(false);
    }
  };

  return (
    <footer className="w-full bg-black border-t-[12px] border-red-600 text-white font-['Glacial_Indifference'] flex flex-col items-center">
      {/* Newsletter */}
      <div className="mt-8 flex flex-col items-center gap-6 px-4 md:px-0">
        <p className="text-lg leading-8 text-center">
          Souscrivez à notre newsletter pour être informé de nos offres et nouvelles sorties
        </p>

        <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <input
            type="email"
            placeholder="Votre e-mail; example@gmail.com"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            className="flex-1 p-3 md:w-96 rounded-sm text-neutral-600 text-lg font-normal bg-neutral-200 placeholder-neutral-600 focus:outline-none"
            required
          />
          <button
            type="submit"
            disabled={newsletterLoading}
            className="px-6 py-2 bg-white text-black font-bold text-base rounded-sm hover:bg-neutral-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {newsletterLoading ? "Envoi..." : "Je m'abonne"}
          </button>
        </form>

        {newsletterMessage && (
          <p className={`text-sm ${newsletterMessage.includes("✅") ? "text-green-400" : "text-red-400"}`}>
            {newsletterMessage}
          </p>
        )}
      </div>

      {/* Liens & Informations */}
      <div className="w-full max-w-[1312px] px-4 md:px-10 mt-16 flex flex-col md:flex-row md:justify-between md:items-start gap-10 md:gap-0">
        {/* Liens rapides */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl md:text-3xl underline leading-8 mb-4 md:leading-10">Liens rapides</h3>
          <ul className="space-y-10 text-3xl font-normal ">
            {[
              { label: "Accueil", path: "/", scrollTo: "accueil" },
              { label: "A propos", path: "/about", scrollTo: "apropos" },
              { label: "Boutique", path: "/boutique", scrollTo: "boutique" },
              { label: "Contacts", path: "/contact", scrollTo: "contact" },
              { label: "FAQs", path: "/faq", scrollTo: "faq" },
            ].map((item) => (
              <li key={item.label}>
                {item.scrollTo ? (
                  <span
                    onClick={() => {
                      window.location.href = item.path;
                      setTimeout(() => {
                        const element = document.getElementById(item.scrollTo);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="cursor-pointer text-white hover:text-red-600  bg-transparent block text-left"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    className="cursor-pointer text-white hover:text-red-600 block"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Nos articles */}
        <div className="flex flex-col gap-4">
          <h3 className="text-2xl md:text-3xl underline mb-4 leading-8 md:leading-10">Nos articles</h3>
          <ul className="space-y-10 text-3xl font-normal">
            {[
              { label: "Sacs", path: "/categorie/sacs hommes" },
              { label: "Chaussures", path: "/categorie/chaussures hommes" },
              { label: "Ceintures", path: "/categorie/ceintures hommes" },
              { label: "Petite maroquinerie", path: "/categorie/pochettes" },
              { label: "Gadjets", path: "/categorie/accessoires" },
              { label: "Produits d'entretiens", path: "/categorie/produits d'entretiens" },
            ].map((item) => (
              <li key={item.label}>
                <Link
                  to={item.path}
                  className="cursor-pointer text-white hover:text-red-600 block"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contacts */}
        <div className="flex flex-col gap-4 w-full sm:w-64">
          <h3 className="text-2xl md:text-3xl underline mb-4 leading-8 md:leading-10">Contacts</h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center my-7 gap-6">
              <img src={phoneIcon} alt="Phone" className="w-7 h-7" />
              <span>00 229 01 99 99 95 15</span>
            </div>
            <WhatsAppButton
              className="flex items-center gap-3 text-white hover:text-green-400  my-7 transition-colors"
              showIcon={false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                className="w-7 h-7 fill-current"
              >
                <path d="M16.001 3.2c-7.033 0-12.8 5.766-12.8 12.8 0 2.257.589 4.455 1.712 6.389L3.2 28.8l6.624-1.715a12.76 12.76 0 0 0 6.177 1.579h.001c7.033 0 12.8-5.767 12.8-12.8s-5.767-12.8-12.8-12.8zm0 23.467h-.001a10.61 10.61 0 0 1-5.393-1.475l-.386-.229-3.93 1.017 1.05-3.833-.252-.394a10.583 10.583 0 0 1-1.638-5.657c0-5.88 4.787-10.667 10.667-10.667S26.667 10.12 26.667 16s-4.787 10.667-10.666 10.667zm5.973-7.893c-.326-.163-1.93-.953-2.23-1.061-.3-.112-.52-.163-.74.163-.214.326-.847 1.06-1.04 1.28-.193.214-.387.244-.713.082-.326-.163-1.378-.508-2.624-1.622-.971-.866-1.63-1.933-1.823-2.259-.192-.326-.02-.5.144-.662.148-.148.326-.387.488-.58.163-.193.214-.326.326-.54.112-.214.05-.407-.025-.57-.082-.163-.74-1.79-1.015-2.453-.267-.64-.54-.553-.74-.553-.192 0-.407-.025-.627-.025-.214 0-.57.082-.866.407-.295.326-1.13 1.105-1.13 2.69 0 1.585 1.158 3.117 1.32 3.333.163.214 2.28 3.48 5.523 4.873.772.333 1.372.53 1.84.68.773.245 1.477.21 2.033.128.62-.093 1.93-.79 2.205-1.552.276-.763.276-1.417.193-1.552-.082-.148-.3-.244-.627-.407z" />
              </svg>

              <span>Nous contacter via WhatsApp</span>
            </WhatsAppButton>

            <div className="flex items-center my-7 gap-6">
              <img src={mailIcon} alt="Mail" className="w-7 h-7" />
              <span>fathnell2020@gmail.com</span>
            </div>
            <div className="flex items-start my-7  gap-6">
              <img src={mapIcon} alt="Map" className="w-7 h-7 mt-1" />
              <span>
                Agla-Rue du commissariat
                <br />
                Cotonou-Bénin
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Horaires */}
      <div className="mt-12 text-2xl md:text-3xl leading-8 md:leading-10 text-center px-4">
        Horaires d’ouverture: Du lundi au samedi de 9H à 20h GMT+1
      </div>

      {/* Réseaux sociaux */}
      <div className="mt-10 flex flex-col items-center gap-4 mb-16">
        <p className="text-2xl md:text-3xl leading-8 md:leading-10">SUIVEZ-NOUS SUR</p>
        <div className="flex gap-6 flex-wrap justify-center">
          {[
            { icon: facebookIcon, url: "https://www.facebook.com/FathNell", alt: "Facebook" },
            { icon: instagramIcon, url: "https://www.instagram.com/fathnell_maroquinerie/", alt: "Instagram" },
            { icon: linkedinIcon, url: "https://www.linkedin.com/in/fathnell-maroquinerie-b5a556194?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", alt: "LinkedIn" },
            { icon: tiktokIcon, url: "https://www.tiktok.com/@fathnell.maroquinerie?is_from_webapp=1&sender_device=pc", alt: "TikTok" },
          ].map((social, idx) => (
            <a
              key={idx}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:opacity-80 transition-opacity"
              aria-label={social.alt}
            >
              <img
                src={social.icon}
                alt={social.alt}
                className="w-7 h-7"
              />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
