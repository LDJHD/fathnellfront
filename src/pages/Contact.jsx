import React, { useState } from "react";
import img11 from "../assets/img11.png";

export default function Contact() {
  const [formData, setFormData] = useState({
    email: "",
    objet: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.objet || !formData.message) {
      setMessage("Veuillez remplir tous les champs");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/contact/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage("✅ Message envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.");
        setFormData({ email: "", objet: "", message: "" });
      } else {
        setMessage(data.message || "Erreur lors de l'envoi du message");
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessage("Erreur de connexion. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white  ">

  {/* ---------- BANDEAU HAUT ---------- */}
  <div className="w-full px-16 py-1 bg-zinc-400 flex items-center">
    <div className="text-black text-base font-bold font-['Glacial_Indifference'] leading-6">
      CONTACTS
    </div>
  </div>

 

  {/* ---------- FORMULAIRE + IMAGE ---------- */}
  <div className="w-full max-w-[1440px] mt-12 px-6 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-10">

    {/* ----------- FORMULAIRE ----------- */}
    <div className="flex flex-col gap-10">

       {/* ---------- TITRE CENTRAL ---------- */}
  <div className="w-full flex justify-center ">
    <div className="text-black text-3xl md:text-7xl font-bold font-['Glacial_Indifference'] leading-[68px]">
      Contactez-nous
    </div>
  </div>

  {/* ---------- DESCRIPTION ---------- */}
  <div className="w-full flex justify-center ">
    <div className="max-w-3xl leading-8 text-black text-lg font-normal font-['Glacial_Indifference'] leading-8 justify-start ">
      Vous avez des questions ou toute autre idée nécessitant de nous contacter,
      nous vous invitons à le faire via ce formulaire. FathNell vous répondra
      dans les plus brefs délais.
    </div>
  </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-10">
      {/* INPUT MAIL */}
      <div className="bg-neutral-200 rounded p-2">
        <input
          type="email"
          name="email"
          placeholder="Mail: johndoe@gmail.com"
          value={formData.email}
          onChange={handleChange}
          className="w-full bg-neutral-200 text-neutral-600 text-lg font-normal font-['Glacial_Indifference'] leading-8 outline-none px-2"
          required
        />
      </div>

      {/* INPUT OBJET */}
      <div className="bg-neutral-200 rounded p-2">
        <input
          type="text"
          name="objet"
          placeholder="Objet de votre message"
          value={formData.objet}
          onChange={handleChange}
          className="w-full bg-neutral-200 text-neutral-600 text-lg font-normal font-['Glacial_Indifference'] leading-8 outline-none px-2"
          required
        />
      </div>

      {/* INPUT MESSAGE */}
      <div className="bg-neutral-200 rounded p-2 h-60">
        <textarea
          name="message"
          placeholder="Votre message"
          value={formData.message}
          onChange={handleChange}
          className="w-full h-full bg-neutral-200 text-neutral-600 text-lg font-normal font-['Glacial_Indifference'] leading-8 outline-none px-2 resize-none"
          required
        ></textarea>
      </div>

      {/* MESSAGE DE RETOUR */}
      {message && (
        <div className={`p-3 rounded text-sm font-['Glacial_Indifference'] ${
          message.includes("✅") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
        }`}>
          {message}
        </div>
      )}

      {/* BOUTON ENVOYER */}
      <button 
        type="submit"
        disabled={loading}
        className="w-full px-6 py-2 bg-black rounded-sm flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-white text-base font-bold font-['Glacial_Indifference'] leading-6">
          {loading ? "ENVOI EN COURS..." : "ENVOYER"}
        </span>
      </button>
      </form>
    </div>

    {/* ----------- IMAGE À DROITE ----------- */}
    <div className="w-full flex justify-center">
      <img
        src={img11}
        alt="Contact"
        className="w-[644px] max-h-[745px] object-cover border-[3px] rounded"
      />
    </div>

  </div>

  {/* ---------- GOOGLE MAP ---------- */}
  <div className="w-full mt-16 px-6 mb-10 lg:px-16">
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1081389042356!2d2.3650501!3d6.380040500000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x102357c66327fe49%3A0x28dfe4be99cc46fe!2sFathNell%20Maroquinerie!5e0!3m2!1sfr!2sbj!4v1763398533233!5m2!1sfr!2sbj"
      width="100%"
      height="500"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="rounded"
    ></iframe>
  </div>

</div>
)
  }
  