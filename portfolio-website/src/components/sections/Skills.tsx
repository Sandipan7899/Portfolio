'use client';

import { useEffect, useRef } from 'react';
import SkillBadge from '@/components/ui/SkillBadge';
import { SkillCategory } from '@/types';
import { fadeIn } from '@/lib/animations';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

/**
 * Skills Section Component
 * 
 * Displays skills organized by categories with animations
 * 
 * Features:
 * - Skills organized by category (Frontend, Backend, Tools, etc.)
 * - Responsive grid layout
 * - Staggered fade-in animations for skill badges
 * - Section title with fade-in animation
 * - Accessible structure with proper headings
 */
export default function Skills({ skillCategories }: SkillsProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const categoriesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Intersection Observer for scroll-triggered animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate title
            if (titleRef.current) {
              fadeIn(titleRef.current, 0);
            }

            // Staggered animation for skill categories and badges
            if (categoriesRef.current) {
              const categories = categoriesRef.current.querySelectorAll('.skill-category');
              categories.forEach((category, categoryIndex) => {
                // Animate category title
                const categoryTitle = category.querySelector('.category-title');
                if (categoryTitle) {
                  setTimeout(() => {
                    (categoryTitle as HTMLElement).animate(
                      [
                        { opacity: 0, transform: 'translateY(20px)' },
                        { opacity: 1, transform: 'translateY(0)' },
                      ],
                      {
                        duration: 600,
                        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                        fill: 'forwards',
                      }
                    );
                  }, categoryIndex * 200);
                }

                // Animate skill badges with stagger
                const badges = category.querySelectorAll('.skill-badge');
                badges.forEach((badge, badgeIndex) => {
                  setTimeout(() => {
                    (badge as HTMLElement).animate(
                      [
                        { opacity: 0, transform: 'scale(0.8) translateY(20px)' },
                        { opacity: 1, transform: 'scale(1) translateY(0)' },
                      ],
                      {
                        duration: 500,
                        easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                        fill: 'forwards',
                      }
                    );
                  }, categoryIndex * 200 + 100 + badgeIndex * 50);
                });
              });
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent"
          style={{ opacity: 0 }}
        >
          Skills & Technologies
        </h2>

        {/* Skills Categories */}
        <div ref={categoriesRef} className="space-y-12">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="skill-category"
            >
              {/* Category Title */}
              <h3
                className="category-title text-xl sm:text-2xl font-semibold text-text-primary dark:text-gray-100 mb-6"
                style={{ opacity: 0 }}
              >
                {category.category}
              </h3>

              {/* Skills Grid */}
              <div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                role="list"
                aria-label={`${category.category} skills`}
              >
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="skill-badge"
                    style={{ opacity: 0 }}
                  >
                    <SkillBadge skill={skill} showLevel={true} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
