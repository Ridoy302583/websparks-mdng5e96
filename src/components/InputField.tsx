import React from 'react';

interface InputFieldProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  icon, 
  error 
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <i className={`${icon} text-gray-400`}></i>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-12 pr-4 py-4 border-2 ${
          error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-brand-500'
        } rounded-xl focus:outline-none focus:ring-4 focus:ring-brand-100 transition-all duration-300 text-gray-700 placeholder-gray-400`}
      />
      {error && (
        <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
          <i className="bi bi-exclamation-circle"></i>
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
