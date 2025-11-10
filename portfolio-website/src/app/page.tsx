'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
import Skills from '@/components/sections/Skills';
import Gallery from '@/components/sections/Gallery';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { portfolioData, ctaButtons } from '@/lib/data';

const sectionIds = ['hero', 'projects', 'skills', 'gallery', 'contact'];

export default function Home() {
  // Track which section is currently in view
  const activeSection = useScrollSpy(sectionIds);

  return (
    <>
      {/* Navigation */}
      <Navbar activeSection={activeSection} />

      <main className="min-h-screen">
        {/* Hero Section */}
        <Hero
          name={portfolioData.personal.name}
          title={portfolioData.personal.title}
          description={portfolioData.personal.description}
          profileImage={portfolioData.personal.profileImage}
          ctaButtons={ctaButtons}
        />

        {/* Projects Section */}
        <Projects projects={portfolioData.projects} />

        {/* Skills Section */}
        <Skills skillCategories={portfolioData.skills} />

        {/* Gallery Section */}
        <Gallery photos={portfolioData.gallery} />

        {/* Contact Section */}
        <section id="contact" className="min-h-screen py-20 px-4 bg-background">
          {/* Contact component will be added here */}
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Contact</h2>
            <p className="text-center text-text-secondary mb-12">
              Section placeholder - Contact form will be displayed here
            </p>
          </div>
        </section>
      </main>

      {/* Footer will be added here */}
      {/* <Footer socialLinks={portfolioData.contact.socialLinks} /> */}
    </>
  );
}
