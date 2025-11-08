'use client';

import Link from 'next/link';
import { ButtonProps } from '@/types';

/**
 * Reusable Button Component
 * 
 * Features:
 * - Multiple variants: primary (gradient), secondary (solid), outline (border)
 * - Three sizes: sm, md, lg
 * - Can be a button or link (if href is provided)
 * - Smooth hover and active animations
 * - Disabled state support
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  disabled = false,
  className = '',
}: ButtonProps) {
  // Base styles that apply to all buttons
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded-full transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles - different looks for different button types
  const variantStyles = {
    primary:
      'bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-primary',
    secondary:
      'bg-secondary text-white hover:bg-secondary/90 hover:shadow-lg hover:scale-105 active:scale-95 focus:ring-secondary',
    outline:
      'border-2 border-primary text-primary hover:bg-primary hover:text-white hover:scale-105 active:scale-95 focus:ring-primary',
  };

  // Size styles - different padding and text sizes
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  // Combine all styles
  const buttonClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

  // If href is provided, render as a Link (for navigation)
  if (href) {
    return (
      <Link
        href={href}
        className={buttonClasses}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }

  // Otherwise, render as a button
  return (
    <button
      type="button"
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
