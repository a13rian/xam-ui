"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import type { CarouselApi } from "@/shared/components/ui/carousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shared/components/ui/carousel";
import { cn } from "@/shared/lib/utils";

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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // Set initial state and subscribe to changes
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  const goToSlide = (index: number) => {
    api?.scrollTo(index);
  };

  if (images.length === 0) {
    return null;
  }

  return (
    <div
      className={cn("relative overflow-hidden rounded-xl", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        // Stop propagation for all clicks within carousel controls
        const target = e.target as HTMLElement;
        if (
          target.closest('button') ||
          target.closest('[data-slot="carousel-previous"]') ||
          target.closest('[data-slot="carousel-next"]') ||
          target.closest('[data-slot="pagination-link"]')
        ) {
          e.stopPropagation();
        }
      }}
    >
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-0">
          {images.map((image, index) => (
            <CarouselItem key={index} className="pl-0">
              <div className="relative aspect-square">
                <Image
                  src={image}
                  alt={`${alt} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Navigation arrows - only show on hover and if multiple images */}
        {images.length > 1 && (
          <>
            <CarouselPrevious
              className={cn(
                "left-2 top-1/2 -translate-y-1/2 z-20",
                "size-8 bg-white/90 hover:bg-white rounded-full shadow-md",
                "transition-opacity duration-200",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
            <CarouselNext
              className={cn(
                "right-2 top-1/2 -translate-y-1/2 z-20",
                "size-8 bg-white/90 hover:bg-white rounded-full shadow-md",
                "transition-opacity duration-200",
                isHovered ? "opacity-100" : "opacity-0"
              )}
              onMouseDown={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </>
        )}
      </Carousel>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                goToSlide(index);
              }}
              className={cn(
                "size-1.5 rounded-full transition-all duration-200",
                index === current
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
