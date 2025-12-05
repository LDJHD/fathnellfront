import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const FathnellLogo = ({
  className = "",
  version = "full",
  color = "black",
  vector,
  img,
  base,
  vectorClassName = "",
  baseClassName = "",
}) => {
  const handleLogoClick = () => {
    window.location.href = '/';
  };

  return (
    <div 
      className={`fathnell-logo ${version} ${color} ${className} cursor-pointer`}
      onClick={handleLogoClick}
    >
      <div className="glyph flex items-center justify-center">
        {vector && <img className={`vector ${vectorClassName}`} alt="Vector" src={vector} />}
        {img && <img className="img" alt="Vector" src={img} />}
      </div>
      <div className=" flex items-center justify-center">
      {(version === "full" || version === "full_1" || version === "horizontal") && base && (
        <img className={`base ${baseClassName}  mt-2`} alt="Base" src={base} />
      )}
       </div>
    </div>
  );
};

FathnellLogo.propTypes = {
  className: PropTypes.string,
  version: PropTypes.string,
  color: PropTypes.oneOf(["black", "white"]),
  vector: PropTypes.string,
  img: PropTypes.string,
  base: PropTypes.string,
  vectorClassName: PropTypes.string,
  baseClassName: PropTypes.string,
};

export default FathnellLogo;



