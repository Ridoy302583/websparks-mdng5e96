import React from 'react';

interface SuccessMessageProps {
  email: string;
  onClose: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ email, onClose }) => {
  return (
    <div className="text-center animate-fade-in">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <i className="bi bi-check-circle-fill text-green-500 text-3xl"></i>
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-3">
        Welcome aboard! 🎉
      </h3>
      
      <p className="text-gray-600 mb-6 leading-relaxed">
        Thank you for subscribing! We have sent a confirmation email to{' '}
        <span className="font-semibold text-brand-600">{email}</span>
      </p>
      
      <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 mb-6">
        <div className="flex items-start gap-3">
          <i className="bi bi-info-circle text-brand-600 text-lg mt-0.5"></i>
          <div className="text-left">
            <p className="text-brand-800 font-medium mb-1">What happens next?</p>
            <ul className="text-brand-700 text-sm space-y-1">
              <li>• Check your inbox for a welcome email</li>
              <li>• Get exclusive content delivered weekly</li>
              <li>• Be the first to know about new updates</li>
            </ul>
          </div>
        </div>
      </div>
      
      <button
        onClick={onClose}
        className="bg-brand-600 hover:bg-brand-700 text-white py-3 px-8 rounded-xl font-medium transition-all duration-300 transform hover:scale-105"
      >
        Got it, thanks!
      </button>
    </div>
  );
};

export default SuccessMessage;
