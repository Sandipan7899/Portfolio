'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to detect which section is currently in view
 * 
 * Uses Intersection Observer to track multiple sections
 * Returns the ID of the section that's most visible
 * 
 * @param sectionIds - Array of section IDs to observe
 * @param options - Intersection Observer options
 * @returns The ID of the currently active section
 */
export function useScrollSpy(
  sectionIds: string[],
  options: IntersectionObserverInit = {}
): string {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] || '');

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window === 'undefined') return;

    // Default options: trigger when 30% of section is visible
    const defaultOptions: IntersectionObserverInit = {
      threshold: 0.3, // 30% of section must be visible
      rootMargin: '-80px 0px -50% 0px', // Account for navbar height
      ...options,
    };

    // Keep track of which sections are currently intersecting
    const intersectingEntries = new Map<string, IntersectionObserverEntry>();

    // Create the observer
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Section is visible, add to map
          intersectingEntries.set(entry.target.id, entry);
        } else {
          // Section is not visible, remove from map
          intersectingEntries.delete(entry.target.id);
        }
      });

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let mostVisibleSection = activeSection;

      intersectingEntries.forEach((entry) => {
        if (entry.intersectionRatio > maxRatio) {
          maxRatio = entry.intersectionRatio;
          mostVisibleSection = entry.target.id;
        }
      });

      // Update active section if it changed
      if (mostVisibleSection && mostVisibleSection !== activeSection) {
        setActiveSection(mostVisibleSection);
      }
    }, defaultOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup: stop observing when component unmounts
    return () => {
      observer.disconnect();
    };
  }, [sectionIds, activeSection, options]);

  return activeSection;
}
