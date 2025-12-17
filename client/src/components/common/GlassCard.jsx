import React from 'react';

const GlassCard = ({ children, className = '', onClick, hover = true }) => {
  return (
    <div
      onClick={onClick}
      className={`
        glass rounded-xl p-6
        ${hover ? 'hover:shadow-2xl hover:scale-105 transition-smooth cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default GlassCard;