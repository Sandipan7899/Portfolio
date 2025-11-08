# Design Document

## Overview

This design document outlines the technical architecture and implementation approach for a modern portfolio website built with Next.js, Tailwind CSS, and Anime.js. The website will be a single-page application (SPA) with smooth scrolling between sections, featuring a hero section, projects showcase, skills display, photo gallery, and contact form.

The design emphasizes modern aesthetics, smooth animations, responsive layouts, and an educational implementation approach where each component is built incrementally with clear explanations.

## Architecture

### Application Structure

```
portfolio-website/
├── public/
│   ├── images/
│   │   ├── hero/
│   │   ├── projects/
│   │   └── gallery/
│   └── favicon.ico
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx             # Main page component
│   │   └── globals.css          # Global styles and Tailwind imports
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx       # Navigation component
│   │   │   └── Footer.tsx       # Footer component
│   │   ├── sections/
│   │   │   ├── Hero.tsx         # Hero/landing section
│   │   │   ├── Projects.tsx     # Projects showcase section
│   │   │   ├── Skills.tsx       # Skills display section
│   │   │   ├── Gallery.tsx      # Photo gallery section
│   │   │   └── Contact.tsx      # Contact form section
│   │   ├── ui/
│   │   │   ├── ProjectCard.tsx  # Individual project card
│   │   │   ├── SkillBadge.tsx   # Skill badge component
│   │   │   ├── Button.tsx       # Reusable button component
│   │   │   └── Lightbox.tsx     # Photo lightbox modal
│   │   └── animations/
│   │       └── AnimatedSection.tsx  # Wrapper for scroll animations
│   ├── lib/
│   │   ├── animations.ts        # Anime.js animation utilities
│   │   └── data.ts              # Portfolio data (projects, skills, etc.)
│   ├── hooks/
│   │   ├── useScrollSpy.ts      # Hook for active section detection
│   │   └── useInView.ts         # Hook for scroll-triggered animations
│   └── types/
│       └── index.ts             # TypeScript type definitions
├── tailwind.config.ts           # Tailwind configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
└── package.json                 # Dependencies and scripts
```

### Technology Stack Rationale

**Next.js 14+**
- Server-side rendering (SSR) for better SEO
- Built-in image optimization with next/image
- App Router for modern React patterns
- Fast refresh for development
- Optimized production builds

**Tailwind CSS**
- Utility-first approach for rapid development
- Consistent design system
- Built-in responsive design utilities
- Easy customization through config
- Small production bundle (unused styles purged)

**Anime.js**
- Lightweight (9kb) animation library
- Smooth, performant animations
- Works with DOM, CSS, SVG
- Timeline-based animations
- Easy to learn and implement

**TypeScript**
- Type safety prevents runtime errors
- Better IDE support and autocomplete
- Self-documenting code
- Easier refactoring and maintenance

## Components and Interfaces

### Layout Components

#### Navbar Component
```typescript
interface NavbarProps {
  activeSection: string;
}
```

**Functionality:**
- Fixed position at top of viewport
- Smooth scroll to sections on click
- Highlights active section based on scroll position
- Responsive hamburger menu for mobile
- Transparent background with blur effect

**Animation:**
- Fade in on page load
- Slide down animation
- Active link underline animation with Anime.js

#### Footer Component
```typescript
interface FooterProps {
  socialLinks: SocialLink[];
}

interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}
```

**Functionality:**
- Display copyright information
- Social media links
- Back to top button

### Section Components

#### Hero Section
```typescript
interface HeroProps {
  name: string;
  title: string;
  description: string;
  profileImage: string;
  ctaButtons: CTAButton[];
}

interface CTAButton {
  text: string;
  href: string;
  variant: 'primary' | 'secondary';
}
```

**Layout:**
- Full viewport height
- Centered content with profile image
- Name with gradient text effect
- Animated typing effect for title
- Call-to-action buttons

**Animations:**
- Profile image: scale and fade in
- Name: slide up with fade
- Title: typing animation effect
- Description: fade in with delay
- Buttons: slide up with stagger

#### Projects Section
```typescript
interface ProjectsProps {
  projects: Project[];
}

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}
```

**Layout:**
- Grid layout (3 columns on desktop, 2 on tablet, 1 on mobile)
- Project cards with hover effects
- Technology tags
- Links to live demo and source code

**Animations:**
- Cards: fade in and slide up on scroll
- Staggered animation for multiple cards
- Hover: lift effect with shadow
- Image: zoom on hover

#### Skills Section
```typescript
interface SkillsProps {
  skillCategories: SkillCategory[];
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  icon?: string;
  level?: number;
}
```

**Layout:**
- Categorized skill groups
- Icon-based or badge-based display
- Optional proficiency indicators

**Animations:**
- Categories: fade in on scroll
- Skills: staggered fade and scale animation
- Hover: bounce or pulse effect

#### Gallery Section
```typescript
interface GalleryProps {
  photos: Photo[];
}

interface Photo {
  id: string;
  src: string;
  alt: string;
  thumbnail: string;
}
```

**Layout:**
- Masonry or grid layout
- Responsive columns (4 on desktop, 3 on tablet, 2 on mobile)
- Lightbox modal for full-size viewing

**Animations:**
- Photos: fade in with stagger on scroll
- Hover: scale and overlay effect
- Lightbox: fade in background, scale image
- Navigation: slide animations between photos

#### Contact Section
```typescript
interface ContactProps {
  email: string;
  socialLinks: SocialLink[];
}

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}
```

**Layout:**
- Two-column layout (form + contact info)
- Form with validation
- Social media links
- Success/error messages

**Animations:**
- Form fields: slide in from left
- Contact info: slide in from right
- Submit button: loading animation
- Success message: fade in with checkmark animation

### UI Components

#### Button Component
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
}
```

**Variants:**
- Primary: Solid background with gradient
- Secondary: Solid background, different color
- Outline: Transparent with border

**Animations:**
- Hover: scale slightly, change shadow
- Active: scale down
- Disabled: reduced opacity

#### Lightbox Component
```typescript
interface LightboxProps {
  photos: Photo[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}
```

**Functionality:**
- Full-screen overlay
- Display current photo
- Navigation arrows
- Close button
- Keyboard navigation (arrow keys, escape)
- Click outside to close

**Animations:**
- Background: fade in
- Image: scale and fade in
- Navigation: slide animations
- Close: fade out

## Data Models

### Portfolio Data Structure

```typescript
// Main portfolio data
interface PortfolioData {
  personal: PersonalInfo;
  projects: Project[];
  skills: SkillCategory[];
  gallery: Photo[];
  contact: ContactInfo;
}

interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  profileImage: string;
  resume?: string;
}

interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  socialLinks: SocialLink[];
}
```

### Configuration

```typescript
// Theme configuration
interface ThemeConfig {
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
```

## Animation Strategy

### Scroll-Triggered Animations

**Implementation Approach:**
1. Use Intersection Observer API to detect when sections enter viewport
2. Trigger Anime.js animations when elements are in view
3. Animate once (no repeat on scroll up)

**Common Animation Patterns:**
- **Fade In**: Opacity 0 → 1
- **Slide Up**: TranslateY(50px) → 0
- **Slide In**: TranslateX(-50px or 50px) → 0
- **Scale**: Scale(0.8) → 1
- **Stagger**: Delay between multiple elements

### Anime.js Animation Utilities

```typescript
// Animation helper functions
export const fadeIn = (targets: string, delay = 0) => {
  anime({
    targets,
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
    delay,
    easing: 'easeOutCubic'
  });
};

export const staggerFadeIn = (targets: string) => {
  anime({
    targets,
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 600,
    delay: anime.stagger(100),
    easing: 'easeOutCubic'
  });
};

export const scaleIn = (targets: string) => {
  anime({
    targets,
    scale: [0.8, 1],
    opacity: [0, 1],
    duration: 500,
    easing: 'easeOutElastic(1, .8)'
  });
};
```

### Navigation Animations

**Smooth Scroll:**
- Use native CSS `scroll-behavior: smooth` for basic scrolling
- Enhance with Anime.js for custom easing curves
- Calculate scroll position based on section offsets

**Active Section Detection:**
- Use Intersection Observer with threshold
- Update navbar active state
- Smooth transition of active indicator

## Responsive Design Strategy

### Breakpoints (Tailwind defaults)
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (sm to lg)
- **Desktop**: > 1024px (lg+)

### Mobile-First Approach
1. Design for mobile first
2. Add complexity for larger screens
3. Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)

### Responsive Patterns

**Navigation:**
- Desktop: Horizontal menu
- Mobile: Hamburger menu with slide-in drawer

**Grid Layouts:**
- Projects: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)
- Gallery: 2 col (mobile) → 3 col (tablet) → 4 col (desktop)
- Skills: 1 col (mobile) → 2 col (tablet) → 3 col (desktop)

**Typography:**
- Scale down heading sizes on mobile
- Adjust line heights and spacing
- Use Tailwind text size utilities

**Images:**
- Use Next.js Image component for optimization
- Provide multiple sizes for different viewports
- Lazy load images below the fold

## Error Handling

### Form Validation

**Client-Side Validation:**
```typescript
const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  
  if (!data.name.trim()) {
    errors.name = 'Name is required';
  }
  
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  if (!data.message.trim()) {
    errors.message = 'Message is required';
  } else if (data.message.length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  
  return errors;
};
```

**Error Display:**
- Show inline error messages below form fields
- Red border on invalid fields
- Clear errors on field focus
- Disable submit button while submitting

### Image Loading

**Error States:**
- Placeholder image for failed loads
- Skeleton loaders while loading
- Alt text for accessibility

**Implementation:**
```typescript
<Image
  src={imageSrc}
  alt={altText}
  onError={(e) => {
    e.currentTarget.src = '/images/placeholder.jpg';
  }}
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

### Animation Fallbacks

**Reduced Motion:**
- Respect `prefers-reduced-motion` media query
- Disable animations for users who prefer reduced motion
- Maintain functionality without animations

```typescript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (!prefersReducedMotion) {
  // Apply animations
}
```

## Performance Optimization

### Image Optimization
- Use Next.js Image component
- Serve WebP format with fallbacks
- Lazy load images below fold
- Provide appropriate sizes for viewports
- Compress images before upload

### Code Splitting
- Next.js automatic code splitting by route
- Dynamic imports for heavy components (Lightbox)
- Lazy load Anime.js only when needed

### Bundle Size
- Tree-shake unused Tailwind classes
- Minimize JavaScript bundle
- Use production builds for deployment

### Loading Strategy
- Critical CSS inline
- Defer non-critical JavaScript
- Preload hero image
- Lazy load gallery images

## Testing Strategy

### Component Testing
- Test individual components in isolation
- Verify props are handled correctly
- Test responsive behavior
- Test accessibility features

### Integration Testing
- Test section interactions
- Verify navigation works correctly
- Test form submission flow
- Test lightbox functionality

### Visual Testing
- Test on multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on multiple devices (mobile, tablet, desktop)
- Verify animations work smoothly
- Check responsive breakpoints

### Accessibility Testing
- Keyboard navigation
- Screen reader compatibility
- Color contrast ratios
- Focus indicators
- ARIA labels where needed

### Performance Testing
- Lighthouse scores (aim for 90+ in all categories)
- Core Web Vitals
- Load time under 3 seconds
- Smooth 60fps animations

## Deployment Strategy

### Vercel Deployment

**Setup:**
1. Connect GitHub repository to Vercel
2. Configure build settings (automatic for Next.js)
3. Set environment variables if needed
4. Enable automatic deployments on push

**Build Configuration:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "installCommand": "npm install"
}
```

**Environment Variables:**
- Form submission endpoint (if using API)
- Analytics keys (optional)
- Any third-party service keys

### Custom Domain (Optional)
- Configure DNS settings
- Add domain in Vercel dashboard
- Enable HTTPS (automatic with Vercel)

## Educational Implementation Approach

### Phase 1: Project Setup
**Learning Focus:** Understanding Next.js project structure, Tailwind setup, TypeScript configuration

**Steps:**
1. Create Next.js project with TypeScript
2. Install and configure Tailwind CSS
3. Install Anime.js
4. Set up project folder structure
5. Configure TypeScript paths

**Explanation:** Each configuration file and its purpose

### Phase 2: Layout and Navigation
**Learning Focus:** React components, props, state management, responsive design

**Steps:**
1. Create root layout with metadata
2. Build Navbar component with mobile menu
3. Implement smooth scroll navigation
4. Add scroll spy for active section
5. Create Footer component

**Explanation:** Component composition, hooks (useState, useEffect), Tailwind responsive classes

### Phase 3: Hero Section
**Learning Focus:** Tailwind styling, Next.js Image, basic Anime.js animations

**Steps:**
1. Create Hero component structure
2. Style with Tailwind (flexbox, gradients)
3. Add profile image with Next.js Image
4. Implement text animations with Anime.js
5. Add CTA buttons

**Explanation:** Tailwind utilities, Image optimization, animation timing

### Phase 4: Projects Section
**Learning Focus:** Grid layouts, mapping data, hover effects, card components

**Steps:**
1. Create Project data structure
2. Build ProjectCard component
3. Implement grid layout
4. Add hover animations
5. Implement scroll-triggered animations

**Explanation:** Array mapping, component reusability, CSS transforms

### Phase 5: Skills Section
**Learning Focus:** Categorization, badges, icons, staggered animations

**Steps:**
1. Create Skills data structure
2. Build SkillBadge component
3. Implement category layout
4. Add staggered animations
5. Add hover effects

**Explanation:** Data organization, animation stagger, icon integration

### Phase 6: Gallery Section
**Learning Focus:** Grid layouts, lightbox modal, state management, keyboard events

**Steps:**
1. Create Gallery component with grid
2. Build Lightbox component
3. Implement modal state management
4. Add navigation controls
5. Add keyboard navigation
6. Implement animations

**Explanation:** Modal patterns, event handling, portal rendering, complex state

### Phase 7: Contact Section
**Learning Focus:** Forms, validation, error handling, API integration

**Steps:**
1. Create Contact form component
2. Implement form state management
3. Add client-side validation
4. Display error messages
5. Add form submission handling
6. Implement success/error states

**Explanation:** Form handling, validation patterns, async operations

### Phase 8: Animations and Polish
**Learning Focus:** Intersection Observer, scroll animations, performance

**Steps:**
1. Create useInView hook
2. Apply scroll animations to all sections
3. Add loading states
4. Optimize images
5. Test responsive design
6. Add accessibility features

**Explanation:** Custom hooks, performance optimization, accessibility best practices

### Phase 9: Deployment
**Learning Focus:** Build process, deployment, environment configuration

**Steps:**
1. Test production build locally
2. Set up Vercel account
3. Connect repository
4. Configure deployment settings
5. Deploy and test live site

**Explanation:** Build optimization, deployment platforms, CI/CD basics

## Design Decisions and Rationale

### Single Page Application
**Decision:** Build as SPA with smooth scrolling sections
**Rationale:** 
- Better user experience with smooth transitions
- Simpler navigation for portfolio content
- Easier to implement scroll animations
- Faster perceived performance (no page reloads)

### Tailwind CSS over CSS Modules
**Decision:** Use Tailwind for styling
**Rationale:**
- Faster development with utility classes
- Consistent design system
- Smaller CSS bundle (purged unused styles)
- Easy responsive design
- Good for learning modern CSS patterns

### Anime.js over Framer Motion
**Decision:** Use Anime.js for animations
**Rationale:**
- Lighter weight (9kb vs 50kb+)
- More control over animation timelines
- Works with any framework
- Great for creative, unique animations
- Easier to learn for beginners

### TypeScript
**Decision:** Use TypeScript instead of JavaScript
**Rationale:**
- Catch errors during development
- Better IDE support and autocomplete
- Self-documenting code with types
- Easier to maintain and refactor
- Industry standard for modern React

### Static Data vs CMS
**Decision:** Start with static data in code
**Rationale:**
- Simpler to implement and understand
- No backend complexity for learning
- Faster initial development
- Can migrate to CMS later if needed
- Sufficient for personal portfolio

### Client-Side Form Handling
**Decision:** Handle form validation on client, use service for submission
**Rationale:**
- Immediate feedback to users
- Reduced server load
- Can use services like Formspree or EmailJS
- Simpler than building backend
- Good learning experience for form handling

## Future Enhancements

### Potential Additions
- Dark mode toggle
- Blog section with MDX
- CMS integration (Sanity, Contentful)
- Analytics integration
- SEO optimization with metadata
- Internationalization (i18n)
- Progressive Web App (PWA) features
- Admin panel for content management

These enhancements can be added incrementally after the core portfolio is complete and understood.
