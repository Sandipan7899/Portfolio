'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import { fadeIn, scaleIn, slideUp } from '@/lib/animations';
import { CTAButton } from '@/types';

interface HeroProps {
  name: string;
  title: string;
  description: string;
  profileImage: string;
  ctaButtons: CTAButton[];
}

/**
 * Hero Section Component
 * 
 * The landing section of the portfolio
 * 
 * Features:
 * - Full viewport height
 * - Profile image with scale animation
 * - Name with gradient text effect
 * - Animated title and description
 * - Call-to-action buttons with stagger animation
 * - Responsive layout
 */
export default function Hero({
  name,
  title,
  description,
  profileImage,
  ctaButtons,
}: HeroProps) {
  const profileRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Trigger animations on mount with staggered delays
    if (profileRef.current) scaleIn(profileRef.current, 200);
    if (nameRef.current) slideUp(nameRef.current, 400);
    if (titleRef.current) fadeIn(titleRef.current, 600);
    if (descRef.current) fadeIn(descRef.current, 800);
    if (buttonsRef.current) slideUp(buttonsRef.current, 1000);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Profile Image */}
        <div
          ref={profileRef}
          className="mb-8 inline-block"
          style={{ opacity: 0 }}
        >
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full blur-md opacity-50" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <Image
                src={profileImage}
                alt={`${name} - Profile Picture`}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 640px) 128px, (max-width: 768px) 160px, 192px"
              />
            </div>
          </div>
        </div>

        {/* Name */}
        <h1
          ref={nameRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4"
          style={{ opacity: 0 }}
        >
          <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            {name}
          </span>
        </h1>

        {/* Title */}
        <p
          ref={titleRef}
          className="text-xl sm:text-2xl md:text-3xl font-medium text-foreground mb-6"
          style={{ opacity: 0 }}
        >
          {title}
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ opacity: 0 }}
        >
          {description}
        </p>

        {/* CTA Buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          style={{ opacity: 0 }}
        >
          {ctaButtons.map((button, index) => (
            <Button
              key={index}
              variant={button.variant}
              size="lg"
              href={button.href}
            >
              {button.text}
            </Button>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg
            className="w-6 h-6 text-text-secondary"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
}
