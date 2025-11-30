import React from "react";

export function Placeholder({ className = "", placeholderClassName = "", property1 = "default" }) {
  return (
    <div className={`${className} ${property1}`}>
      <input
        className={placeholderClassName}
        type="text"
        placeholder="Rechercher"
        aria-label="Rechercher"
      />
      
    </div>
  );
}

export default Placeholder;



