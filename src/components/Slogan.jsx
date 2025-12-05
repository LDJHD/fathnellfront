import React from "react";
import "../styles/Slogan.css"; // on relie le CSS

const Slogan = ({ className = "" }) => {
  return (
    <div className={`slogan ${className}`}>
      <p className="slogan-text text-lg md:text-3xl ">
        L’élégance du cuir, la force d’une signature.
      </p>
    </div>
  );
};

export default Slogan;
