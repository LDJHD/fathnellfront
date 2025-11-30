import React from "react";

export const ShopIncon = ({ className = "", color = "#010101" }) => {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6h15l-2 9H7L6 6zm0 0L5 3H2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="9" cy="20" r="1" fill={color}/>
      <circle cx="17" cy="20" r="1" fill={color}/>
    </svg>
  );
};

export default ShopIncon;



