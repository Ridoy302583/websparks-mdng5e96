import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center mb-8 animate-bounce-gentle">
      <div className="relative">
        <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-accent-600 rounded-2xl flex items-center justify-center shadow-lg">
          <i className="bi bi-envelope-heart text-white text-2xl"></i>
        </div>
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
          <i className="bi bi-heart-fill text-white text-xs"></i>
        </div>
      </div>
    </div>
  );
};

export default Logo;
