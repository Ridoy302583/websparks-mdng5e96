import React, { useEffect, useRef } from 'react';

interface CustomAlertProps {
  type: 'success' | 'error' | 'info';
  message: string;
  onClose: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({ type, message, onClose }) => {
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Auto close after 5 seconds
    timeoutRef.current = window.setTimeout(() => {
      onClose();
      timeoutRef.current = null;
    }, 5000);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [onClose]);

  const handleClose = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    onClose();
  };

  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'bi bi-check-circle-fill text-green-500';
      case 'error':
        return 'bi bi-exclamation-triangle-fill text-red-500';
      case 'info':
        return 'bi bi-info-circle-fill text-blue-500';
      default:
        return 'bi bi-info-circle-fill text-gray-500';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md p-4 border rounded-xl shadow-lg animate-slide-up ${getAlertStyles()}`}>
      <div className="flex items-start gap-3">
        <i className={`${getIcon()} text-lg mt-0.5`}></i>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
    </div>
  );
};

export default CustomAlert;
