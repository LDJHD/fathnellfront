import PropTypes from "prop-types";
import React from "react";
import { Placeholder } from "./Placeholder";
import "./style.css";
import SearchIcon from "../../assets/Icon.svg"; // 👈 on importe directement ton SVG

export const SearchBar = ({
  className = "",
  placeholderPropertyDefaultClassName,
}) => {
  return (
    <div className={`search-bar ${className}`}>
      <div className="search-icon">
        <div className="icon">
          {/* 👇 on utilise ton SVG ici */}
          <img className="img" alt="Search icon" src={SearchIcon} />
        </div>
      </div>

      <Placeholder
        className={placeholderPropertyDefaultClassName}
        placeholderClassName="placeholder-contenair"
        property1="default"
      />
    </div>
  );
};

SearchBar.propTypes = {
  className: PropTypes.string,
  placeholderPropertyDefaultClassName: PropTypes.string,
};

export default SearchBar;
