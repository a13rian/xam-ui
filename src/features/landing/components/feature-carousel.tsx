'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionContainer } from './shared';
import { aescapeEase, scaleDownHover } from './shared/animation-variants';

const features = [
  {
    title: 'Verified Partners',
    subtitle: 'Trust & Safety First',
    description:
      'Every partner goes through a rigorous verification process including identity checks, background screening, and personal interviews to ensure your safety.',
    image: '/images/feature-verified.jpg',
  },
  {
    title: 'Flexible Scheduling',
    subtitle: 'Book Anytime, Anywhere',
    description:
      'Browse available partners, check their schedules, and book sessions that fit your lifestyle. Reschedule or cancel with ease.',
    image: '/images/feature-schedule.jpg',
  },
  {
    title: 'Secure Payments',
    subtitle: 'Safe Transactions',
    description:
      'All payments are processed securely through our platform. Your financial information is protected with bank-level encryption.',
    image: '/images/feature-payment.jpg',
  },
];

export function FeatureCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));
  };

  const currentFeature = features[currentIndex];

  return (
    <SectionContainer background="cream-dark" id="features">
      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-aescape-cream lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.5, ease: aescapeEase }}
              className="absolute inset-0"
            >
              <Image
                src={currentFeature.image}
                alt={currentFeature.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="lg:col-span-5 lg:col-start-8">
          {/* Navigation */}
          <div className="mb-8 flex items-center justify-between">
            <span className="text-sm text-aescape-charcoal-light">
              {currentIndex + 1} of {features.length}
            </span>
            <div className="flex gap-2">
              <motion.button
                onClick={goToPrevious}
                whileHover={scaleDownHover}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-aescape-charcoal/20 text-aescape-charcoal transition-colors hover:bg-aescape-charcoal hover:text-white"
                aria-label="Previous feature"
              >
                <ChevronLeft className="h-5 w-5" />
              </motion.button>
              <motion.button
                onClick={goToNext}
                whileHover={scaleDownHover}
                whileTap={{ scale: 0.9 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-aescape-charcoal/20 text-aescape-charcoal transition-colors hover:bg-aescape-charcoal hover:text-white"
                aria-label="Next feature"
              >
                <ChevronRight className="h-5 w-5" />
              </motion.button>
            </div>
          </div>

          {/* Feature Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: aescapeEase }}
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-aescape-lavender-dark">
                {currentFeature.subtitle}
              </p>
              <h3 className="font-display text-2xl font-medium text-aescape-charcoal md:text-3xl lg:text-4xl">
                {currentFeature.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-aescape-charcoal-light md:text-lg">
                {currentFeature.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="mt-8 flex gap-2">
            {features.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 bg-aescape-charcoal'
                    : 'w-2 bg-aescape-charcoal/20 hover:bg-aescape-charcoal/40'
                }`}
                aria-label={`Go to feature ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
