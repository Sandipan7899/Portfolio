'use client';

import ProjectCard from '@/components/ui/ProjectCard';
import AnimatedSection from '@/components/animations/AnimatedSection';
import { Project } from '@/types';

interface ProjectsProps {
  projects: Project[];
}

/**
 * Projects Section Component
 * 
 * Displays a grid of project cards
 * 
 * Features:
 * - Responsive grid layout (1 → 2 → 3 columns)
 * - Animated entrance
 * - Section heading
 * - Maps through projects data
 */
export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        <AnimatedSection animation="fadeIn">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Here are some of my recent projects showcasing my skills and
              experience in web development.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
                className="animate-in fade-in slide-in-from-bottom-4 duration-700"
              >
                <ProjectCard project={project} />
              </div>
            ))}
          </div>

          {/* Empty State */}
          {projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">
                No projects to display yet. Check back soon!
              </p>
            </div>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
