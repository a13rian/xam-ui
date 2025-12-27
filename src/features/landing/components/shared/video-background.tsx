'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { cn } from '@/shared/lib/utils';
import { videoFadeIn } from './animation-variants';

interface VideoBackgroundProps {
  src?: string;
  fallbackImage: string;
  overlay?: boolean;
  overlayOpacity?: number;
  className?: string;
  children?: React.ReactNode;
}

export function VideoBackground({
  src,
  fallbackImage,
  overlay = true,
  overlayOpacity = 0.4,
  className,
  children,
}: VideoBackgroundProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check if video is already cached/ready on mount
  const checkInitialReadyState = useCallback((video: HTMLVideoElement) => {
    if (video.readyState >= 3) {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // Check initial state after a microtask to avoid synchronous setState in effect
    queueMicrotask(() => checkInitialReadyState(video));

    // Use 'canplay' instead of 'canplaythrough' for faster loading
    // canplay: fires when enough data is available to start playing
    // canplaythrough: fires when entire video can play without buffering (slow for large files)
    const handleCanPlay = () => {
      setIsLoaded(true);
      // Ensure video plays after loading
      video.play().catch(() => {
        // Autoplay might be blocked, but video is still loaded
      });
    };

    const handleError = () => setHasError(true);

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('error', handleError);
    };
  }, [src, checkInitialReadyState]);

  const showVideo = src && !hasError;

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Fallback Image (always rendered as base layer) */}
      <Image
        src={fallbackImage}
        alt=""
        fill
        priority
        className={cn(
          'object-cover transition-opacity duration-1000',
          showVideo && isLoaded ? 'opacity-0' : 'opacity-100'
        )}
      />

      {/* Video Layer */}
      {showVideo && (
        <motion.video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover"
          initial="hidden"
          animate={isLoaded ? 'visible' : 'hidden'}
          variants={videoFadeIn}
        >
          <source src={src} type="video/mp4" />
        </motion.video>
      )}

      {/* Gradient Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Content */}
      {children && (
        <div className="relative z-10 h-full w-full">{children}</div>
      )}
    </div>
  );
}
