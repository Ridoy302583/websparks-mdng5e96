import React from 'react';

interface SocialButtonProps {
  icon: string;
  provider: string;
  bgColor: string;
  hoverColor: string;
  onClick: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ 
  icon, 
  provider, 
  bgColor, 
  hoverColor, 
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={`flex-1 ${bgColor} ${hoverColor} text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2`}
    >
      <i className={`${icon} text-lg`}></i>
      <span className="text-sm">{provider}</span>
    </button>
  );
};

export default SocialButton;
