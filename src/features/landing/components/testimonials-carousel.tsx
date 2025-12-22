'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { Quote } from 'lucide-react';
import { SectionContainer } from './shared';
import { aescapeEase } from './shared/animation-variants';

const testimonials = [
  {
    id: 1,
    quote:
      'Cogie helped me find genuine conversations when I needed them most. The partners are thoughtful, engaged, and truly care about creating meaningful connections.',
    author: 'Thanh Nguyen',
    role: 'Marketing Manager',
    avatar: '/images/testimonial-1.jpg',
  },
  {
    id: 2,
    quote:
      'As someone who travels frequently for work, having reliable companions in different cities has been invaluable. The quality of partners on this platform is exceptional.',
    author: 'Minh Le',
    role: 'Business Consultant',
    avatar: '/images/testimonial-2.jpg',
  },
  {
    id: 3,
    quote:
      'I was skeptical at first, but the verification process gave me confidence. Every session has been professional, enjoyable, and exactly what I was looking for.',
    author: 'Hoa Tran',
    role: 'Software Engineer',
    avatar: '/images/testimonial-3.jpg',
  },
  {
    id: 4,
    quote:
      'The platform is beautifully designed and easy to use. Finding partners who share my interests in art and culture has never been easier.',
    author: 'Duc Pham',
    role: 'Art Director',
    avatar: '/images/testimonial-4.jpg',
  },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const currentTestimonial = testimonials[currentIndex];

  return (
    <SectionContainer background="cream-dark" spacing="large">
      <div className="mx-auto max-w-4xl text-center">
        {/* Quote Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: aescapeEase }}
          className="mb-8 inline-flex h-16 w-16 items-center justify-center rounded-full bg-aescape-lavender/20"
        >
          <Quote className="h-8 w-8 text-aescape-lavender-dark" />
        </motion.div>

        {/* Testimonial Content */}
        <div className="relative min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: aescapeEase }}
            >
              <blockquote className="font-display text-xl font-medium leading-relaxed text-aescape-charcoal md:text-2xl lg:text-3xl">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-8 flex flex-col items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full bg-aescape-cream">
                  <Image
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-aescape-charcoal">
                    {currentTestimonial.author}
                  </p>
                  <p className="text-sm text-aescape-charcoal-light">
                    {currentTestimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="mt-10 flex justify-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-aescape-charcoal'
                  : 'w-2 bg-aescape-charcoal/20 hover:bg-aescape-charcoal/40'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
