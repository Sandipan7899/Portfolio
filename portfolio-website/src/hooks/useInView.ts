'use client';

import { useEffect, useState, RefObject } from 'react';

/**
 * Custom hook to detect when an element is in the viewport
 * 
 * Uses Intersection Observer API to efficiently track visibility
 * 
 * @param ref - React ref to the element to observe
 * @param options - Intersection Observer options
 * @returns boolean indicating if element is in view
 */
export function useInView(
  ref: RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
): boolean {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    // Check if we're in the browser (not server-side rendering)
    if (typeof window === 'undefined' || !ref.current) return;

    // Default options: trigger when 10% of element is visible
    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.1, // 10% of element must be visible
      rootMargin: '0px', // No margin
      ...options,
    };

    // Create the observer
    const observer = new IntersectionObserver(([entry]) => {
      // Update state when visibility changes
      if (entry.isIntersecting) {
        setIsInView(true);
        // Once animated, we don't need to observe anymore
        observer.disconnect();
      }
    }, defaultOptions);

    // Start observing the element
    observer.observe(ref.current);

    // Cleanup: stop observing when component unmounts
    return () => {
      observer.disconnect();
    };
  }, [ref, options]);

  return isInView;
}
