import React from 'react';

const FooterLinks: React.FC = () => {
  const handleLinkClick = (linkType: string) => {
    console.log(`${linkType} clicked`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-center gap-6 text-sm">
        <button 
          onClick={() => handleLinkClick('Terms')}
          className="text-gray-500 hover:text-brand-600 transition-colors duration-200 flex items-center gap-1"
        >
          <i className="bi bi-file-text"></i>
          Terms of Service
        </button>
        <button 
          onClick={() => handleLinkClick('Privacy')}
          className="text-gray-500 hover:text-brand-600 transition-colors duration-200 flex items-center gap-1"
        >
          <i className="bi bi-shield-check"></i>
          Privacy Policy
        </button>
        <button 
          onClick={() => handleLinkClick('Help')}
          className="text-gray-500 hover:text-brand-600 transition-colors duration-200 flex items-center gap-1"
        >
          <i className="bi bi-question-circle"></i>
          Help Center
        </button>
      </div>
      
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm mb-2">
          <i className="bi bi-shield-lock"></i>
          <span>We respect your privacy and will never spam you</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
          <i className="bi bi-check-circle"></i>
          <span>Unsubscribe anytime with one click</span>
        </div>
      </div>
    </div>
  );
};

export default FooterLinks;
