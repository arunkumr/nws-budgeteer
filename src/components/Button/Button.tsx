import React from 'react';
import { ButtonProps } from '../types';
import './Button.css';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  disabled = false,
  className = '',
}) => {
  const baseClass = 'button';
  const classes = `${baseClass} ${baseClass}--${variant} ${baseClass}--${size} ${className}`.trim();

  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};