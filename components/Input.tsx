import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => {
  return (
    <input
      className={`w-full p-3 rounded-md border border-[#e5e7eb] dark:border-[#4b5563] ${className}`}
      {...props}
    />
  );
};
