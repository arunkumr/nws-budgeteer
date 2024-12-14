// Common types used across components
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Button specific types
export type ButtonVariant = 'primary' | 'secondary' | 'outline';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps extends BaseComponentProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  disabled?: boolean;
}

// Card specific types
export interface CardProps extends BaseComponentProps {
  title?: string;
}

// Container specific types
export interface ContainerProps extends BaseComponentProps {}