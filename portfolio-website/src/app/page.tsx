import Button from '@/components/ui/Button';
import AnimatedSection from '@/components/animations/AnimatedSection';

export default function Home() {
  return (
    <>
      {/* Navigation will be added here */}
      {/* <Navbar activeSection={activeSection} /> */}

      <main className="min-h-screen">
        {/* Hero Section */}
        <section id="hero" className="min-h-screen">
          {/* Hero component will be added here */}
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
            <div className="text-center px-4">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
                Portfolio Website
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
                Modern portfolio with smooth animations, responsive design, and
                beautiful UI.
                <br />
                Testing our new Button and AnimatedSection components!
              </p>

              {/* Testing our Button components */}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button variant="primary" size="lg" href="#projects">
                  View Projects
                </Button>
                <Button variant="secondary" size="lg" href="#contact">
                  Contact Me
                </Button>
                <Button variant="outline" size="lg" href="#skills">
                  My Skills
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="min-h-screen py-20 px-4">
          {/* Projects component will be added here */}
          <AnimatedSection animation="fadeIn">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-4">Projects</h2>
              <p className="text-center text-text-secondary mb-12">
                Section placeholder - Projects will be displayed here
                <br />
                <span className="text-sm">
                  (Scroll down to see the fade-in animation!)
                </span>
              </p>
            </div>
          </AnimatedSection>
        </section>

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
