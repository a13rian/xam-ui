"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CompanionCardCarouselProps {
  images: string[];
  alt: string;
  className?: string;
}

export function CompanionCardCarousel({
  images,
  alt,
  className,
}: CompanionCardCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goToPrevious = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    },
    [images.length]
  );

  const goToNext = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    },
    [images.length]
  );

  const goToSlide = useCallback((e: React.MouseEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrentIndex(index);
  }, []);

  return (
    <div
      className={cn("relative overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-square">
        <Image
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Navigation arrows - only show on hover and if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 z-20",
              "size-8 flex items-center justify-center",
              "bg-white/90 hover:bg-white rounded-full shadow-md",
              "transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="size-4 text-gray-900" />
          </button>
          <button
            onClick={goToNext}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 z-20",
              "size-8 flex items-center justify-center",
              "bg-white/90 hover:bg-white rounded-full shadow-md",
              "transition-opacity duration-200",
              isHovered ? "opacity-100" : "opacity-0"
            )}
            aria-label="Next image"
          >
            <ChevronRight className="size-4 text-gray-900" />
          </button>
        </>
      )}

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToSlide(e, index)}
              className={cn(
                "size-1.5 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-white w-2"
                  : "bg-white/60 hover:bg-white/80"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

