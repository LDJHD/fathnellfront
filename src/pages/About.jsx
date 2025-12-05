import img from "../assets/img.png";
import img1 from "../assets/images 1.png";
import img2 from "../assets/IMG 2.png";
import img3 from "../assets/IMH 3.png";
import img33 from "../assets/img 3.png"; // image sous le texte
import img4 from "../assets/img 4.png"; // grande image à droite
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";
import img88 from "../assets/img88.png";
import img9 from "../assets/img9.png";

export default function About() {
  return (
    <div id="apropos" className="w-full flex flex-col items-center bg-white">
      {/* Header bar */}
      <div className="w-full  px-16 py-1 bg-zinc-400 inline-flex justify-start items-center ">
        <div className=" text-center text-black  font-bold font-['Glacial_Indifference'] leading-6">
          A PROPOS
        </div>
      </div>

      {/* Title */}
      <div className="w-full max-w-[1440px] px-4 md:px-16 mt-10 md:mt-16">
        <h1 className="self-stretch text-center text-black text-4xl font-bold font-['Glacial_Indifference'] leading-[52px]">
          ORIGINE ET HISTOIRE
        </h1>
      </div>

      {/* Content section */}
      <div className="w-full max-w-[1440px] px-4 md:px-16 mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Text column */}
        <div className="flex flex-col text-black text-xl font-normal font-['Glacial_Indifference'] leading-10 space-y-4">
          <p>
            <span className="text-black text-3xl font-bold font-['Glacial_Indifference'] leading-10">FathNell</span> est bien plus qu’une marque de maroquinerie.
            C’est une déclaration d’amour à l’artisanat béninois, un pont entre héritage et audace
            contemporaine. Née en 2020 au cœur du Bénin, la maison FathNell s’impose avec une ambition
            claire : <span className="font-bold">élever le cuir local au rang d’excellence internationale</span>, en
            prouvant que le luxe peut aussi naître d’un ancrage profond, d’un geste sincère, d’une
            vision africaine forte.
          </p>

          <p>
            Derrière cette aventure, une femme : <span className="font-bold">Fathnelle Djihouessi</span>. Issue du monde
            des ressources humaines, elle décide un jour de quitter les bureaux pour retrouver la
            matière, le geste, le sens. Animée depuis toujours par une passion pour le bricolage, les
            arts manuels et le travail bien fait, <span className="font-bold">elle donne naissance à une marque qui lui
            ressemble : rigoureuse, créative et ancrée.</span>
          </p>

          <p>
            À travers chaque pièce, FathNell raconte une histoire :<br />
            celle d’un continent en mouvement;<br />
            celle d’un artisanat vivant;<br />
            celle d’une vision audacieuse qui mêle tradition, raffinement et modernité.
          </p>

          <p>
            En faisant le pari du fait-main et de la production locale, la marque s’engage à créer des
            pièces durables, puissantes, pensées avec exigence, tout en contribuant activement à
            l’économie créative et culturelle du Bénin.
          </p>

          <p>
            FathNell n’est pas née pour suivre les tendances.
            <span className="font-bold"> Elle est née pour tracer sa propre voie — celle d’une maroquinerie africaine
            libre, fière et visionnaire.</span>
          </p>
        </div>

        {/* Image column */}
        <div className="w-full flex justify-center md:justify-end">
          <img
            src={img}
            alt="Portrait"
            className=" w-full max-h-[850px]  object-cover rounded-lg"
          />
        </div>
      </div>
      {/* notre art de la maroquinerie */}

      <div className="text-center mt-8 mb-10 justify-start text-black text-xl md:text-3xl font-bold font-['Glacial_Indifference'] leading-[52px] py-8">NOTRE ART DE LA MAROQUINERIE</div>

  <div className="w-full flex justify-center px-4">

   <div className="w-full max-w-[1312px] text-black font-['Glacial_Indifference'] space-y-6">
    
    <p className="text-xl md:text-xl lg:text-xl font-normal leading-10">
      Chez NOUS, le cuir n’est pas qu’un matériau. C’est une matière vivante, vibrante, 
      qui incarne le lien entre tradition artisanale et innovation esthétique.
    </p>

    <p className="text-xl md:text-xl lg:text-xl font-bold leading-10">
      "L'élégance du cuir, la force d'une signature."
    </p>

    <p className="text-xl md:text-xl lg:text-xl font-normal leading-10">
      Chaque pièce – sac, chaussure, ceinture ou accessoire – est pensée comme une œuvre 
      à part entière, façonnée avec exigence, patience et passion. Nous travaillons 
      exclusivement des cuirs hautement sélectionnés pour leur qualité, leur souplesse, 
      leur tenue dans le temps et leur caractère.
    </p>

    <p className="text-xl md:text-xl lg:text-xl font-normal leading-10">
      Qu’il s’agisse de cuir rigide, tanné, végétal, de cuir 
      <span className="font-bold"> Crazy Horse</span> à l’aspect brut et évolutif, de 
      <span className="font-bold"> daim doux </span>
      ou de <span className="font-bold">cuir italien lisse</span> aux finitions impeccables, 
      chaque matière est choisie avec soin pour ce qu’elle raconte, pour ce qu’elle promet 
      de devenir.
    </p>

    <p className="text-xl md:text-xl lg:text-xl font-normal leading-10">
      La maison FathNell explore également les richesses du 
      <span className="font-bold"> cuir marocain</span>, connu pour sa souplesse et sa noblesse, 
      et développe des <span className="font-bold">partenariats autour de cuirs premium africains</span>, 
      alliant authenticité et savoir-faire local. Une attention est aussi portée au 
      <span className="font-bold"> cuir vegan</span>, pour offrir une alternative durable et 
      éthique à notre clientèle engagée.
    </p>

    <p className="text-xl md:text-xl lg:text-xl font-normal leading-10">
      Le cuir est notre matière de cœur, mais le geste est notre signature.  
      Chaque découpe est millimétrée, chaque couture est solide, chaque finition 
      est pensée pour durer. Dans cette quête d’excellence, nous avons également 
      conçu une ligne complète de produits d’entretien et de soins 
      <span className="font-bold"> (brosses, cirages, baumes protecteurs)</span> 
      afin de prolonger la vie et la beauté de chaque création.
    </p>

    <p className="text-xl md:text-xl lg:text-xl font-normal leading-10">
      Chez NOUS, le cuir est une promesse : celle d’un luxe sincère, 
      d’un art qui se porte, se transmet et se respecte.
    </p>

  </div>

</div>

<div className="w-full max-w-[1312px] mt-10 px-4 py-4 mb-10 flex flex-col md:flex-row justify-center items-start gap-6">

{/* Grande image à gauche */}
<div className="flex-1 w-full overflow-hidden">
  <img
    src={img1}
    alt="Grande image"
    className="w-full h-auto object-cover rounded-lg"
  />
</div>

{/* Les deux images à droite */}
<div className="flex-1 w-full flex flex-col justify-between items-center gap-6">
  <img
    src={img2}
    alt="Image du haut"
    className="w-full h-auto object-cover rounded-lg"
  />
  <img
    src={img3}
    alt="Image du bas"
    className="w-full h-auto object-cover rounded-lg"
  />
</div>

</div>

<div className="w-full max-w-[1312px] mt-10 mb-10 flex flex-col md:flex-row justify-between items-start gap-10 px-4">

      {/* ********** COLONNE GAUCHE ********** */}
      <div className="flex-1 flex flex-col justify-start items-start gap-8">

        {/* Titre + Sous-titre */}
        <div className="flex flex-col justify-center items-start gap-2">
          <div className="text-black text-xl md:text-xl font-bold font-['Glacial_Indifference'] leading-[42px] md:leading-[52px]">
            MADE IN BENIN
          </div>

          <div className="text-black text-2xl md:text-3xl font-bold font-['Glacial_Indifference'] leading-8 md:leading-10 max-w-[662px]">
            la fierté d’une origine, la puissance d’une vision
          </div>
        </div>

        {/* Texte long */}
        <div className="text-black text-xl md:text-xl font-normal font-['Glacial_Indifference'] leading-8 md:leading-10 max-w-[644px]">
          FathNell est bien plus qu’une marque : c’est une déclaration.<br /><br />
          Une marque 100% béninoise qui incarne un luxe assumé, enraciné et affirmé.<br />
          Chaque création est le reflet d’un héritage vivant, d’un savoir-faire transmis de main en main, d’âme en âme.<br /><br />
          Chez FathNell, l’authenticité se fabrique ici, au Bénin.<br />
          Avec nos artisans locaux, nous façonnons des pièces d’exception dans une démarche responsable, durable et engagée.<br />
          Notre ambition : hisser haut les couleurs du Bénin dans l’univers international de la maroquinerie, et démontrer que l’excellence n’a pas besoin d’exil pour briller.
        </div>

        {/* Image sous le texte (img3) */}
        <img
          src={img33}
          alt="Made in Benin"
          className="w-full h-auto rounded-lg object-cover"
        />
      </div>

      {/* ********** COLONNE DROITE ********** */}
      <div className="flex-1 w-full">
        <img
          src={img4}
          alt="Right side illustration"
          className="w-full max-h-[1050px] h-auto rounded-lg object-cover"
        />
      </div>
    </div>

    <div className="w-full flex flex-col items-center px-4 md:px-10 lg:px-20 py-16">

{/* ------- TITRE ------- */}
<h2 className="text-center text-black text-3xl md:text-3xl font-bold font-['Glacial_Indifference'] leading-[42px] md:leading-[52px]">
  NOS VALEURS - ESSENCE DE NOTRE MARQUE
</h2>

{/* ------- SOUS-TEXTE ------- */}
<p className="max-w-[1210px] text-center text-black text-lg md:text-2xl font-normal font-['Glacial_Indifference'] leading-8 md:leading-10 mt-6">
  FathNell évolue avec audace, sans jamais trahir ce qui la fonde.
  Nos valeurs ne sont pas des mots : elles sont tissées dans chaque couture,
  ancrées dans chaque décision, incarnées dans chaque sac.
</p>

{/* ------- GRID DES VALEURS ------- */}
<div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12 w-full max-w-[1000px]">

  {/* ---- Carte 1 ---- */}
  <div className="flex flex-col items-center text-center gap-4">
    <img
      src={img7}
      alt="Excellence artisanale"
      className="w-full h-auto max-w-[500px] rounded-lg object-cover"
    />
    <h3 className="text-black text-2xl md:text-3xl font-bold font-['Glacial_Indifference'] leading-10">
      Excellence artisanale:
    </h3>
    <p className="text-black text-base md:text-lg font-normal font-['Glacial_Indifference'] leading-8 max-w-[500px]">
      Rien n’est laissé au hasard. Chaque pièce est le fruit d’un travail minutieux,
      précis, pensé pour durer et pour sublimer.
    </p>
  </div>

  {/* ---- Carte 2 ---- */}
  <div className="flex flex-col items-center text-center gap-4">
    <img
      src={img8}
      alt="Créativité enracinée"
      className="w-full h-auto max-w-[500px] rounded-lg object-cover"
    />
    <h3 className="text-black text-2xl md:text-3xl font-bold font-['Glacial_Indifference'] leading-10">
      Créativité enracinée:
    </h3>
    <p className="text-black text-base md:text-lg font-normal font-['Glacial_Indifference'] leading-8 max-w-[500px]">
      Nos inspirations naissent ici. Dans la richesse de la culture béninoise,
      dans les rythmes du quotidien, dans les symboles qui nous habitent.
    </p>
  </div>

  {/* ---- Carte 3 ---- */}
  <div className="flex flex-col items-center text-center gap-4">
    <img
      src={img88}
      alt="Éthique & durabilité"
      className="w-full h-auto max-w-[500px] rounded-lg object-cover"
    />
    <h3 className="text-black text-2xl md:text-3xl font-bold font-['Glacial_Indifference'] leading-10">
      Éthique & durabilité:
    </h3>
    <p className="text-black text-base md:text-lg font-normal font-['Glacial_Indifference'] leading-8 max-w-[500px]">
      Nous choisissons des matériaux nobles, durables, et une production respectueuse.
      Parce qu’être beau, c’est aussi être juste.
    </p>
  </div>

  {/* ---- Carte 4 ---- */}
  <div className="flex flex-col items-center text-center gap-4">
    <img
      src={img9}
      alt="Savoir-faire local"
      className="w-full h-auto max-w-[500px] rounded-lg object-cover"
    />
    <h3 className="text-black text-2xl md:text-3xl font-bold font-['Glacial_Indifference'] leading-10">
      Savoir-faire local:
    </h3>
    <p className="text-black text-base md:text-lg font-normal font-['Glacial_Indifference'] leading-8 max-w-[500px]">
      Nous croyons en nos talents. Et nous les faisons grandir.
      Nous collaborons avec des artisans béninois pour valoriser
      l'économie locale et transmettre les savoirs.
    </p>
  </div>

</div>
</div>




    </div>
  );
}
