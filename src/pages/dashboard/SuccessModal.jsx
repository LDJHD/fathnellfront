  export default function SuccessModal({ onClose }) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="w-[453px] bg-white rounded-lg px-6 pt-2 pb-6 flex flex-col items-center gap-6 shadow-lg relative">
  
          {/* CLOSE BUTTON */}
          <button
            onClick={onClose}
            className="absolute right-4 top-3 w-6 h-6 text-black bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2L10 10M10 2L2 10"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
  
          {/* CHECK ICON */}
          <div className="w-12 h-12 bg-green-400 rounded-full flex items-center justify-center">
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17L4 12" />
            </svg>
          </div>
  
          {/* TEXT */}
          <div className="text-center text-black text-lg leading-8 font-['Glacial_Indifference']">
            Modifications publiées avec succès ! <br />
            Vos changements sont désormais visibles sur le site.
          </div>
        </div>
      </div>
    );
  }
  