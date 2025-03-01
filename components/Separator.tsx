'use client';

import React from 'react';

interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

export const Separator: React.FC<SeparatorProps> = ({
  orientation = 'horizontal',
  className = '',
}) => {
  return (
    <div
      className={`bg-[#e5e5e5] dark:bg-[#333333] ${
        orientation === 'horizontal' ? 'h-px w-full' : 'w-px h-full'
      } ${className}`}
      role="separator"
    />
  );
};
