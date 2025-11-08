'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { useInView } from '@/hooks/useInView';
import { fadeIn, slideUp, slideInLeft, slideInRight } from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideInLeft' | 'slideInRight';
  delay?: number;
  className?: string;
}

/**
 * AnimatedSection Wrapper Component
 * 
 * Automatically animates children when they enter the viewport
 * 
 * Features:
 * - Uses Intersection Observer to detect visibility
 * - Supports multiple animation types
 * - Configurable delay
 * - Respects user's motion preferences
 * - Animates only once (no repeat on scroll)
 * 
 * Usage:
 * <AnimatedSection animation="fadeIn" delay={200}>
 *   <YourContent />
 * </AnimatedSection>
 */
export default function AnimatedSection({
  children,
  animation = 'fadeIn',
  delay = 0,
  className = '',
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  useEffect(() => {
    // When element comes into view, trigger the animation
    if (isInView && ref.current) {
      // Select the animation function based on prop
      switch (animation) {
        case 'fadeIn':
          fadeIn(ref.current, delay);
          break;
        case 'slideUp':
          slideUp(ref.current, delay);
          break;
        case 'slideInLeft':
          slideInLeft(ref.current, delay);
          break;
        case 'slideInRight':
          slideInRight(ref.current, delay);
          break;
        default:
          fadeIn(ref.current, delay);
      }
    }
  }, [isInView, animation, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        // Start invisible - animation will make it visible
        opacity: isInView ? 1 : 0,
      }}
    >
      {children}
    </div>
  );
}
