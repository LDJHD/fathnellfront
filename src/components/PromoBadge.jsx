import React, { useState, useEffect } from 'react';

const PromoBadge = ({ 
  text = 'En promo', 
  color = 'bg-red-500', 
  textColor = 'text-white',
  className = '' 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Map des couleurs hex pour le triangle (pour correspondre exactement aux couleurs Tailwind)
  const colorToHex = {
    'bg-red-500': '#ef4444',
    'bg-blue-500': '#3b82f6',
    'bg-green-500': '#10b981',
    'bg-purple-500': '#8b5cf6',
    'bg-pink-500': '#ec4899',
    'bg-indigo-500': '#6366f1',
    'bg-teal-500': '#14b8a6',
    'bg-orange-500': '#f97316',
    'bg-yellow-500': '#eab308',
    'bg-gray-500': '#6b7280',
  };

  const triangleColorHex = colorToHex[color] || '#ef4444';

  // Calculer les tailles en fonction de l'écran
  const getTriangleSize = () => {
    if (isMobile) {
      return {
        borderTop: '11px solid transparent',
        borderBottom: '11px solid transparent',
        borderLeft: `8px solid ${triangleColorHex}`,
      };
    } else if (isTablet) {
      return {
        borderTop: '15px solid transparent',
        borderBottom: '15px solid transparent',
        borderLeft: `12px solid ${triangleColorHex}`,
      };
    } else {
      return {
        borderTop: '19px solid transparent',
        borderBottom: '19px solid transparent',
        borderLeft: `14px solid ${triangleColorHex}`,
      };
    }
  };

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {/* Rectangle principal - collé à gauche avec coins arrondis à gauche seulement */}
      <div className={`
        ${color} 
        h-6 sm:h-8 md:h-10
        px-1 sm:px-1
        flex items-center justify-center 
        ${textColor} 
        text-xs sm:text-sm
        font-medium
        whitespace-nowrap
      `}>
        {text}
      </div>
      
      {/* Triangle (flèche) - Pointe fine et pointue comme sur l'image */}
      <div 
        className="w-0 ml-[-1px] h-6 sm:h-8 md:h-10"
        style={getTriangleSize()}
      />
    </div>
  );
};

export default PromoBadge;