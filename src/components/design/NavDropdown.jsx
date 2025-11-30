import React, { useState, useRef, useEffect } from 'react';

const NavDropdown = ({ 
  label, 
  items = [], 
  className = "",
  to = "#"
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);
  const timeoutRef = useRef(null);

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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle hover events
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    // Small delay to prevent flickering when moving between trigger and dropdown
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  // Handle click events
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger element */}
      <a
        ref={triggerRef}
        href={to}
        onClick={handleClick}
        className="flex items-center gap-1 px-3 py-2 text-black hover:text-gray-700 transition-colors duration-150 font-['Glacial_Indifference'] text-lg"
      >
        {label}
        {/* <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg> */}
      </a>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-full left-0 z-50 mt-1 bg-white border border-gray-200 rounded-sm shadow-lg min-w-[200px] py-1"
          style={{
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          {items.map((item, index) => (
            <a
              key={index}
              href={item.href || "#"}
              className="block px-4 py-3 text-gray-800 hover:bg-gray-50 transition-colors duration-150 font-['Glacial_Indifference'] text-base border-b border-gray-100 last:border-b-0"
              onClick={() => {
                setIsOpen(false);
                item.onClick && item.onClick();
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* CSS for animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default NavDropdown;