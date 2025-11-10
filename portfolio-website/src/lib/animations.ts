'use client';

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Simple CSS-based animations using Web Animations API
// These are more performant and don't require external libraries

// Fade in animation
export const fadeIn = (element: HTMLElement | string, delay = 0) => {
  if (prefersReducedMotion()) return;
  
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.animate(
    [
      { opacity: 0, transform: 'translateY(20px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    {
      duration: 800,
      delay,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards',
    }
  );
};

// Staggered fade in for multiple elements
export const staggerFadeIn = (selector: string) => {
  if (prefersReducedMotion()) return;

  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    (el as HTMLElement).animate(
      [
        { opacity: 0, transform: 'translateY(30px)' },
        { opacity: 1, transform: 'translateY(0)' },
      ],
      {
        duration: 600,
        delay: index * 100, // 100ms stagger
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        fill: 'forwards',
      }
    );
  });
};

// Scale in animation
export const scaleIn = (element: HTMLElement | string, delay = 0) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.animate(
    [
      { opacity: 0, transform: 'scale(0.8)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
    {
      duration: 500,
      delay,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      fill: 'forwards',
    }
  );
};

// Slide in from left
export const slideInLeft = (element: HTMLElement | string, delay = 0) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.animate(
    [
      { opacity: 0, transform: 'translateX(-50px)' },
      { opacity: 1, transform: 'translateX(0)' },
    ],
    {
      duration: 700,
      delay,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards',
    }
  );
};

// Slide in from right
export const slideInRight = (element: HTMLElement | string, delay = 0) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.animate(
    [
      { opacity: 0, transform: 'translateX(50px)' },
      { opacity: 1, transform: 'translateX(0)' },
    ],
    {
      duration: 700,
      delay,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards',
    }
  );
};

// Slide up animation
export const slideUp = (element: HTMLElement | string, delay = 0) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.animate(
    [
      { opacity: 0, transform: 'translateY(50px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
    {
      duration: 800,
      delay,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      fill: 'forwards',
    }
  );
};

// Typing animation effect (for text)
export const typingAnimation = (
  element: HTMLElement, 
  text: string, 
  onComplete?: () => void
) => {
  if (prefersReducedMotion()) {
    element.textContent = text;
    if (onComplete) onComplete();
    return;
  }

  let index = 0;
  element.textContent = '';

  const interval = setInterval(() => {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
    } else {
      clearInterval(interval);
      if (onComplete) onComplete();
    }
  }, 50); // 50ms per character
};

// Smooth scroll to element
export const smoothScrollTo = (targetId: string) => {
  const element = document.getElementById(targetId);
  if (!element) return;

  const targetPosition = element.offsetTop - 80; // 80px offset for navbar
  
  window.scrollTo({
    top: targetPosition,
    behavior: 'smooth',
  });
};

// Pulse animation (for buttons, icons)
export const pulse = (element: HTMLElement | string) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.animate(
    [
      { transform: 'scale(1)' },
      { transform: 'scale(1.05)' },
      { transform: 'scale(1)' },
    ],
    {
      duration: 600,
      easing: 'ease-in-out',
    }
  );
};

// Bounce animation
export const bounce = (element: HTMLElement | string) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.animate(
    [
      { transform: 'translateY(0)' },
      { transform: 'translateY(-10px)' },
      { transform: 'translateY(0)' },
    ],
    {
      duration: 500,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    }
  );
};

// Rotate animation
export const rotate = (element: HTMLElement | string, degrees = 360) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.animate(
    [
      { transform: 'rotate(0deg)' },
      { transform: `rotate(${degrees}deg)` },
    ],
    {
      duration: 800,
      easing: 'ease-in-out',
    }
  );
};

// Shake animation (for error states)
export const shake = (element: HTMLElement | string) => {
  if (prefersReducedMotion()) return;

  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (!el) return;

  el.animate(
    [
      { transform: 'translateX(0)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(-10px)' },
      { transform: 'translateX(10px)' },
      { transform: 'translateX(0)' },
    ],
    {
      duration: 500,
      easing: 'ease-in-out',
    }
  );
};
