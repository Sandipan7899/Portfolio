import { ThemeConfig } from '@/types';

// Theme configuration for the portfolio
export const theme: ThemeConfig = {
  colors: {
    primary: '#6366f1', // Indigo
    secondary: '#8b5cf6', // Purple
    accent: '#ec4899', // Pink
    background: '#ffffff',
    text: '#1f2937',
  },
  fonts: {
    heading: 'var(--font-geist-sans)',
    body: 'var(--font-geist-sans)',
  },
  animations: {
    duration: 600, // milliseconds
    easing: 'easeOutCubic',
  },
};

// Breakpoints for responsive design (matching Tailwind defaults)
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Animation durations
export const animationDurations = {
  fast: 200,
  normal: 300,
  slow: 500,
};

// Z-index layers
export const zIndex = {
  navbar: 50,
  lightbox: 100,
  modal: 90,
  dropdown: 60,
};
