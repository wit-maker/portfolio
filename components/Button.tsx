'use client';

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'default',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded-md transition-colors';
  const variantStyles = {
    default: 'bg-[#3b82f6] text-white hover:bg-[#2563eb]',
    outline: 'bg-transparent border-2 hover:bg-opacity-10',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
