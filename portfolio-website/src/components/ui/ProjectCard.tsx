'use client';

import Image from 'next/image';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

/**
 * ProjectCard Component
 * 
 * Displays a single project with:
 * - Project image
 * - Title and description
 * - Technology tags/badges
 * - Links to live demo and GitHub (open in new tab)
 * - Hover lift effect with shadow
 * 
 * Features:
 * - Responsive card layout
 * - Smooth hover animations (lift and shadow)
 * - External links open in new tabs
 * - Technology badges with modern styling
 */
export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, image, technologies, liveUrl, githubUrl } = project;

  return (
    <div
      className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Project Image */}
      <div className="relative h-48 w-full overflow-hidden bg-gray-200 dark:bg-gray-700">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Card Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {description}
        </p>

        {/* Technology Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 text-sm font-medium"
            >
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center px-4 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all duration-200 text-sm font-medium"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
