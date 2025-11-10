'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { LightboxProps } from '@/types';
import { prefersReducedMotion } from '@/lib/animations';

/**
 * Lightbox Modal Component
 * 
 * Full-screen modal for viewing photos in detail
 * 
 * Features:
 * - Full-screen overlay with backdrop
 * - Display full-size image
 * - Previous/Next navigation buttons
 * - Close button and click-outside-to-close
 * - Keyboard navigation (arrow keys, escape)
 * - Smooth fade and scale animations
 * - Portal rendering for proper z-index layering
 * 
 * Requirements: 7.3, 7.4, 7.5, 8.5
 */
export default function Lightbox({
  photos,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrevious]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Animate entrance
  useEffect(() => {
    if (isOpen && !prefersReducedMotion()) {
      // Backdrop fade in
      if (backdropRef.current) {
        backdropRef.current.animate(
          [{ opacity: 0 }, { opacity: 1 }],
          {
            duration: 300,
            easing: 'ease-out',
            fill: 'forwards',
          }
        );
      }

      // Image scale and fade in
      if (imageContainerRef.current) {
        imageContainerRef.current.animate(
          [
            { opacity: 0, transform: 'scale(0.9)' },
            { opacity: 1, transform: 'scale(1)' },
          ],
          {
            duration: 400,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            fill: 'forwards',
          }
        );
      }
    }
  }, [isOpen, currentIndex]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render if not open
  if (!isOpen) return null;

  const currentPhoto = photos[currentIndex];

  return (
    // Portal-like rendering using fixed positioning
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      style={{ opacity: 0 }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white hover:text-gray-300 transition-colors p-2 rounded-full hover:bg-white/10"
        aria-label="Close lightbox"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-all p-3 rounded-full hover:bg-white/10 hover:scale-110"
        aria-label="Previous photo"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-gray-300 transition-all p-3 rounded-full hover:bg-white/10 hover:scale-110"
        aria-label="Next photo"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Image Container */}
      <div
        ref={imageContainerRef}
        className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
        style={{ opacity: 0 }}
      >
        <div className="relative w-full h-full">
          <Image
            src={currentPhoto.src}
            alt={currentPhoto.alt}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>

        {/* Photo Counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
          {currentIndex + 1} / {photos.length}
        </div>

        {/* Photo Caption */}
        {currentPhoto.alt && (
          <div className="absolute bottom-16 left-1/2 -translate-x-1/2 bg-black/70 text-white px-6 py-3 rounded-lg text-center max-w-2xl">
            <p className="text-sm md:text-base">{currentPhoto.alt}</p>
          </div>
        )}
      </div>

      {/* Keyboard Hints */}
      <div className="absolute bottom-4 right-4 text-white/60 text-xs hidden md:block">
        <p>← → Navigate | ESC Close</p>
      </div>
    </div>
  );
}
