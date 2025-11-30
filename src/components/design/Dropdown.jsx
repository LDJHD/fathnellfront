import React, { useState, useRef, useEffect } from 'react';

const Dropdown = ({ 
  trigger, 
  children, 
  className = "", 
  dropdownClassName = "",
  position = "bottom-left" 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle hover events
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    // Small delay to prevent flickering when moving between trigger and dropdown
    setTimeout(() => {
      if (!isHovered) {
        setIsOpen(false);
      }
    }, 100);
  };

  // Handle click events
  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'top-full left-0';
      case 'bottom-right':
        return 'top-full right-0';
      case 'top-left':
        return 'bottom-full left-0';
      case 'top-right':
        return 'bottom-full right-0';
      default:
        return 'top-full left-0';
    }
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger element */}
      <div
        ref={triggerRef}
        onClick={handleClick}
        className="cursor-pointer"
      >
        {trigger}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className={`absolute ${getPositionClasses()} z-50 transition-all duration-200 ease-in-out ${dropdownClassName}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="bg-white border border-gray-200 rounded-md shadow-lg py-2 min-w-[180px]">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

// Dropdown Item component
export const DropdownItem = ({ 
  children, 
  onClick, 
  href, 
  className = "",
  ...props 
}) => {
  const baseClasses = "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-150 cursor-pointer";
  
  if (href) {
    return (
      <a 
        href={href}
        className={`${baseClasses} ${className}`}
        onClick={onClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <div 
      className={`${baseClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

export default Dropdown;