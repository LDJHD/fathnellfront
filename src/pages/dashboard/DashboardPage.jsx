import React from "react";
import thumbnail from "../../assets/img01.png";
import logo from "../../assets/logo.png";

/*
  DashboardPage.jsx
  - Components: TopBar, StatsCards, MostLikedArticles, MostVisitedPages
  - Fully responsive with Tailwind
  - Uses inline SVG icons for pixel-perfect control
  - Thumbnail image path: ../../src/assets/img miniature.png
*/

function IconUsers(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 21c0-2.761-4-5-8-5s-8 2.239-8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconTag(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 10v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconHeart(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="0" fill="#ef4444" />
    </svg>
  );
}

function TopBar({ userName = "Fathnelle DJIHOUESSI", role = "Admin" }) {
  return (
    <div className="w-full flex items-center justify-between bg-transparent mb-6  px-10 bg-gray-200 rounded outline outline-1 outline-offset-[-1px] outline-black ">
      <h1 className="flex-1 text-2xl md:text-3xl text-black leading-10 font-bold font-['Glacial_Indifference']">Tableau de bord</h1>

      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center outline outline-1 outline-offset-[-1px]">
          <img src={logo} alt="avatar" className="w-8 h-8 object-cover rounded-full" />
        </div>
        <div className="text-right">
          <div className="text-sm font-bold text-black font-['Glacial_Indifference'] leading-6">{userName}</div>
          <div className="text-xs text-zinc-600">{role}</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ colorClass = 'bg-blue-100', icon, value, label }) {
  return (
    <div className="flex-1 min-w-[160px] max-w-[360px] px-8 py-5 bg-neutral-200 rounded-lg flex items-center gap-4">
      <div className={`${colorClass} p-2 rounded`}>{icon}</div>
      <div className="flex flex-col">
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-zinc-600">{label}</div>
      </div>
    </div>
  );
}

function StatsCards() {
  return (
    <div className="w-full flex flex-col justify-around md:flex-row gap-4 mb-6">
      <StatCard
        colorClass="bg-blue-400/70"
        icon={<IconUsers className="w-6 h-6 text-black" />}
        value={123}
        label="Articles actifs"
      />

      <StatCard
        colorClass="bg-rose-300"
        icon={<IconTag className="w-6 h-6 text-black" />}
        value={23}
        label="Articles en promotion"
      />

      <StatCard
        colorClass="bg-blue-600/70"
        icon={<IconUsers className="w-6 h-6 text-black" />}
        value={321}
        label="Visiteurs au total"
      />

      <StatCard
        colorClass="bg-green-500/70"
        icon={<IconUsers className="w-6 h-6 text-black" />}
        value={'70%'}
        label="Taux de clic vers whats’App"
      />
    </div>
  );
}

function LikedItem({ index, imgSrc, title, likes }) {
  return (
    <div className="w-full flex items-center justify-between py-2">
      <div className="flex items-center gap-4">
        <div className="text-lg font-bold">#{index}</div>
        <img src={imgSrc} alt={title} className="w-12 h-12 rounded object-cover" />
        <div className="text-sm">{title}</div>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-sm">{likes}</div>
        <div className="w-6 h-6">
          <IconHeart className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}

function MostLikedArticles() {
  const items = [1000, 950, 900, 850, 800];
  return (
    <div className="flex-1 text-black bg-neutral-200 rounded-2xl p-4">
      <h3 className="font-bold mb-4">Articles les plus aimés</h3>
      <div className="space-y-2">
        {items.map((n, i) => (
          <LikedItem
            key={i}
            index={i + 1}
            imgSrc={thumbnail}
            title={`Nom de l’article-Nom de l’article`}
            likes={n}
          />
        ))}

        <div className="w-32 mx-auto mt-4">
          <button className="w-full bg-black text-white py-2 rounded-sm">Voir plus</button>
        </div>
      </div>
    </div>
  );
}

function MostVisitedPages() {
  const data = [
    { label: 'Sacs', percent: 20, color: 'bg-blue-500' },
    { label: 'Chaussures', percent: 20, color: 'bg-green-500' },
    { label: 'Ceintures', percent: 20, color: 'bg-yellow-500' },
    { label: 'Petite maroquinerie', percent: 15, color: 'bg-purple-500' },
    { label: 'Gadgets', percent: 15, color: 'bg-orange-500' },
    { label: 'Produits d\'entretiens', percent: 10, color: 'bg-sky-400' },
  ];

  return (
    <div className="w-80 bg-neutral-200 rounded-2xl p-4">
      <h4 className="font-bold mb-4">Pages les plus consultées</h4>
      <div className="space-y-3">
        {data.map((d) => (
          <div key={d.label} className="flex items-center justify-between">
            <div className="text-sm">{d.label}</div>
            <div className="text-sm text-blue-600">{d.percent}%</div>
            <div className="w-full ml-4 bg-zinc-100 rounded-full h-2 overflow-hidden">
              <div className={`${d.color} h-2`} style={{ width: `${d.percent}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-6 bg-white">
      <TopBar />

      <div className="inline-flex flex-col justify-start items-center gap-4 m-4 w-full md:w-auto">
      <div className="self-stretch px-4 py-2 bg-neutral-200 rounded inline-flex justify-center items-center gap-2 cursor-pointer hover:bg-neutral-300 transition">
        <div className="text-start text-black text-base font-normal font-['Glacial_Indifference'] underline leading-6">
          Les 7 derniers jours
        </div>
        {/* SVG flèche vers le bas */}
        <svg
          className="w-4 h-4 text-zinc-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>

      <div className="mb-6">
        <StatsCards />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <MostLikedArticles />
        <MostVisitedPages />
      </div>
    </div>
  );
}
