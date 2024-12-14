import React from 'react';
import { ContainerProps } from '../types';
import './Layout.css';

export const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '' 
}) => {
  return (
    <div className={`container ${className}`.trim()}>
      {children}
    </div>
  );
};