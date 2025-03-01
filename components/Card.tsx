'use client';

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`rounded-lg overflow-hidden shadow-md ${className}`}>
    {children}
  </div>
);

export const CardHeader: React.FC<CardProps> = ({
  children,
  className = '',
}) => <div className={`p-4 ${className}`}>{children}</div>;

export const CardTitle: React.FC<CardProps> = ({
  children,
  className = '',
}) => <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;

export const CardContent: React.FC<CardProps> = ({
  children,
  className = '',
}) => <div className={`p-4 ${className}`}>{children}</div>;

export const CardDescription: React.FC<CardProps> = ({
  children,
  className = '',
}) => <p className={`text-sm text-gray-500 ${className}`}>{children}</p>;

export default Card;
