// Type definitions for the portfolio website

// Personal Information
export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  profileImage: string;
  resume?: string;
}

// Project Types
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

// Skills Types
export interface Skill {
  name: string;
  icon?: string;
  level?: number; // 1-5 proficiency level
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

// Gallery Types
export interface Photo {
  id: string;
  src: string;
  alt: string;
  thumbnail: string;
}

// Contact Types
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  socialLinks: SocialLink[];
}

export interface FormData {
  name: string;
  email: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

// Main Portfolio Data Structure
export interface PortfolioData {
  personal: PersonalInfo;
  projects: Project[];
  skills: SkillCategory[];
  gallery: Photo[];
  contact: ContactInfo;
}

// Component Props Types
export interface NavbarProps {
  activeSection: string;
}

export interface HeroProps {
  name: string;
  title: string;
  description: string;
  profileImage: string;
  ctaButtons: CTAButton[];
}

export interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}

export interface ProjectsProps {
  projects: Project[];
}

export interface SkillsProps {
  skillCategories: SkillCategory[];
}

export interface GalleryProps {
  photos: Photo[];
}

export interface ContactProps {
  email: string;
  socialLinks: SocialLink[];
}

export interface FooterProps {
  socialLinks: SocialLink[];
}

// UI Component Props
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
}

export interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

// Theme Configuration
export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  animations: {
    duration: number;
    easing: string;
  };
}
