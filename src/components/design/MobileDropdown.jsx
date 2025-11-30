import React, { useState } from 'react';

const MobileDropdown = ({ 
  label, 
  items = [], 
  className = "",
  onItemClick
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    if (item.onClick) {
      item.onClick();
    }
    if (onItemClick) {
      onItemClick();
    }
    setIsOpen(false);
  };

  return (
    <div className={`${className}`}>
      {/* Trigger element */}
      <button
        onClick={handleToggle}
        className="flex items-center justify-between w-full px-4 py-3 text-left text-lg font-['Glacial_Indifference'] text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
      >
        {label}
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown content */}
      {isOpen && (
        <div className="pl-6 py-2 space-y-1">
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href || "#"}
              className="block px-3 py-2 text-base text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded transition-colors font-['Glacial_Indifference']"
              onClick={() => handleItemClick(item)}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileDropdown;