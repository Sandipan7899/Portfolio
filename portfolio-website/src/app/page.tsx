'use client';

import AnimatedSection from '@/components/animations/AnimatedSection';
import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';
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
        <section id="skills" className="min-h-screen py-20 px-4 bg-background">
          {/* Skills component will be added here */}
          <AnimatedSection animation="slideUp">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4">Skills</h2>
              <p className="text-center text-text-secondary mb-12">
                Section placeholder - Skills will be displayed here
                <br />
                <span className="text-sm">
                  (This section slides up when you scroll to it!)
                </span>
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="min-h-screen py-20 px-4">
          {/* Gallery component will be added here */}
          <AnimatedSection animation="slideInLeft" delay={100}>
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4">Gallery</h2>
              <p className="text-center text-text-secondary mb-12">
                Section placeholder - Photo gallery will be displayed here
                <br />
                <span className="text-sm">
                  (This section slides in from the left with a delay!)
                </span>
              </p>
            </div>
          </AnimatedSection>
        </section>

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
