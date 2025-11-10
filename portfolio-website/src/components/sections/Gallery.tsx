'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { GalleryProps } from '@/types';
import Lightbox from '@/components/ui/Lightbox';
import { staggerFadeIn } from '@/lib/animations';
import { useInView } from '@/hooks/useInView';

/**
 * Gallery Section Component
 * 
 * Displays a responsive grid of photos with lightbox functionality
 * 
 * Features:
 * - Responsive grid layout (2 col mobile, 3 col tablet, 4 col desktop)
 * - Thumbnail images with Next.js Image optimization
 * - Hover overlay effect with zoom
 * - Click handler to open lightbox
 * - Staggered fade-in animations on scroll
 * 
 * Requirements: 7.1, 7.2, 8.3
 */
export default function Gallery({ photos }: GalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const gridRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(gridRef, { threshold: 0.1 });

  // Trigger staggered animation when grid comes into view
  useEffect(() => {
    if (isInView) {
      staggerFadeIn('.gallery-item');
    }
  }, [isInView]);

  // Open lightbox with selected photo
  const openLightbox = (index: number) => {
    setCurrentPhotoIndex(index);
    setLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  // Navigate to next photo
  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  // Navigate to previous photo
  const previousPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section id="gallery" className="min-h-screen py-20 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            A collection of moments and memories captured through the lens
          </p>
        </div>

        {/* Photo Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              className="gallery-item opacity-0 relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              {/* Photo Thumbnail */}
              <Image
                src={photo.thumbnail}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg
                    className="w-12 h-12 mx-auto mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                    />
                  </svg>
                  <p className="text-sm font-medium">View Full Size</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <Lightbox
          photos={photos}
          currentIndex={currentPhotoIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNext={nextPhoto}
          onPrevious={previousPhoto}
        />
      </div>
    </section>
  );
}
