'use client';

import { useRef, useEffect } from 'react';
import { ProjectsProps } from '@/types';
import ProjectCard from '@/components/ui/ProjectCard';
import { useInView } from '@/hooks/useInView';
import { prefersReducedMotion } from '@/lib/animations';

/**
 * Projects Section Component
 * 
 * Displays portfolio projects in a responsive grid layout
 * 
 * Features:
 * - Responsive grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
 * - Maps through projects data to render ProjectCard components
 * - Scroll-triggered staggered animations for cards
 * - Section heading with description
 * 
 * Layout breakpoints:
 * - Mobile (< 640px): 1 column
 * - Tablet (640px - 1024px): 2 columns
 * - Desktop (> 1024px): 3 columns
 */
export default function Projects({ projects }: ProjectsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { threshold: 0.1 });

  useEffect(() => {
    // Trigger staggered animations when section comes into view
    if (isInView && !prefersReducedMotion()) {
      const cards = sectionRef.current?.querySelectorAll('.project-card');
      
      cards?.forEach((card, index) => {
        (card as HTMLElement).animate(
          [
            { opacity: 0, transform: 'translateY(30px)' },
            { opacity: 1, transform: 'translateY(0)' },
          ],
          {
            duration: 600,
            delay: index * 150, // 150ms stagger between cards
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
          }
        );
      });
    }
  }, [isInView]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            My Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
            in web development.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card"
              style={{ opacity: 0 }}
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
