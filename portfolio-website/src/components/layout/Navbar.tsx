'use client';

import { useState, useEffect, useRef } from 'react';
import { smoothScrollTo } from '@/lib/animations';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Home', href: 'hero' },
  { name: 'Projects', href: 'projects' },
  { name: 'Skills', href: 'skills' },
  { name: 'Gallery', href: 'gallery' },
  { name: 'Contact', href: 'contact' },
];

interface NavbarProps {
  activeSection: string;
}

/**
 * Navbar Component
 * 
 * Features:
 * - Fixed position at top of page
 * - Transparent background with blur effect (glassmorphism)
 * - Smooth scroll navigation
 * - Active section highlighting
 * - Responsive mobile menu with slide-in animation
 * - Animated hamburger icon
 * - Close on outside click
 */
export default function Navbar({ activeSection }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    smoothScrollTo(href);
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        mobileMenuRef.current &&
        hamburgerButtonRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !hamburgerButtonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-200/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, 'hero')}
              className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:opacity-80 transition-opacity"
            >
              Portfolio
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={`#${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-300 ${
                    activeSection === link.href
                      ? 'text-primary'
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  {link.name}
                  {/* Active indicator underline */}
                  {activeSection === link.href && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-secondary animate-in slide-in-from-bottom-1" />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button with animated hamburger icon */}
          <div className="md:hidden">
            <button
              ref={hamburgerButtonRef}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-gray-100/10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors"
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {/* Animated Hamburger Icon */}
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? 'rotate-45 translate-y-1.5'
                      : '-translate-y-1'
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-out ${
                    isMobileMenuOpen
                      ? '-rotate-45 -translate-y-1.5'
                      : 'translate-y-1'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu drawer with slide-in animation */}
      <div
        ref={mobileMenuRef}
        className={`md:hidden fixed top-16 right-0 h-[calc(100vh-4rem)] w-64 bg-background/95 backdrop-blur-md border-l border-gray-200/20 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="px-4 pt-4 pb-3 space-y-2 h-full overflow-y-auto">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={`#${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
                activeSection === link.href
                  ? 'text-primary bg-primary/10 shadow-sm'
                  : 'text-foreground hover:text-primary hover:bg-gray-100/10'
              }`}
              style={{
                animation: isMobileMenuOpen
                  ? `slideInRight 0.3s ease-out ${index * 0.05}s both`
                  : 'none',
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      {/* Overlay backdrop when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[-1] animate-in fade-in duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </nav>
  );
}
