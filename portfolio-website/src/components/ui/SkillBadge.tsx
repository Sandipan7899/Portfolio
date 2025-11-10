'use client';

import { Skill } from '@/types';

interface SkillBadgeProps {
  skill: Skill;
  showLevel?: boolean;
}

/**
 * SkillBadge Component
 * 
 * Displays a skill with icon, name, and optional proficiency level
 * 
 * Features:
 * - Icon and skill name display
 * - Optional proficiency level indicator (1-5 dots)
 * - Hover animation (bounce effect)
 * - Responsive sizing
 * - Accessible with proper ARIA labels
 */
export default function SkillBadge({ skill, showLevel = true }: SkillBadgeProps) {
  const { name, icon, level } = skill;

  return (
    <div
      className="group relative inline-flex flex-col items-center gap-2 px-4 py-3 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-default"
      role="listitem"
      aria-label={`${name}${level ? ` - Proficiency level ${level} out of 5` : ''}`}
    >
      {/* Icon and Name */}
      <div className="flex items-center gap-2">
        {icon && (
          <span 
            className="text-2xl group-hover:scale-110 transition-transform duration-300"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <span className="text-sm font-medium text-text-primary dark:text-gray-100">
          {name}
        </span>
      </div>

      {/* Proficiency Level Indicator */}
      {showLevel && level && (
        <div 
          className="flex gap-1"
          aria-label={`Proficiency: ${level} out of 5`}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                index < level
                  ? 'bg-primary group-hover:scale-125'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
              aria-hidden="true"
            />
          ))}
        </div>
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/0 via-primary/5 to-secondary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
}
