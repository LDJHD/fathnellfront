import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Placeholder } from "./Placeholder";
import "./style.css";
import SearchIcon from "../../assets/Icon.svg";

export const SearchBar = ({
  className = "",
  placeholderPropertyDefaultClassName,
  onSearchChange,
  searchValue = "",
}) => {
  const [inputValue, setInputValue] = useState(searchValue);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Si une fonction de callback est fournie, l'appeler
    if (onSearchChange) {
      onSearchChange(value);
    }
    
    // Naviguer vers la page de recherche avec le terme
    if (value.trim()) {
      navigate(`/search?q=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`search-bar ${className}`}>
      <div className="search-icon">
        <div className="icon">
          <img className="img" alt="Search icon" src={SearchIcon} />
        </div>
      </div>

      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Rechercher un produit..."
        className="search-input w-full bg-transparent border-none outline-none text-black placeholder-gray-500 font-['Glacial_Indifference']"
      />
    </form>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  placeholderPropertyDefaultClassName: PropTypes.string,
  onSearchChange: PropTypes.func,
  searchValue: PropTypes.string,
};

export default SearchBar;
