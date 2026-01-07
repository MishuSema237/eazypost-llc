import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/EazyPostLLC_LOGO.svg"
        alt="EazyPost LLC"
        className="h-10 w-auto sm:h-12"
        onError={(e) => {
          // Fallback if SVG fails
          const target = e.target as HTMLImageElement;
          target.src = '/EazyPostLLC_LOGO.png';
        }}
      />
    </div>
  );
};

export default Logo;