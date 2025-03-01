import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
}

export const Label: React.FC<LabelProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <label className={className} {...props}>
      {children}
    </label>
  );
};
