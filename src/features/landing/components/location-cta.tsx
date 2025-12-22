'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { PremiumButton } from './shared';
import { heroStagger, heroTextItem } from './shared/animation-variants';

export function LocationCTA() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden py-24 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/location-cta-bg.jpg"
          alt=""
          fill
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-aescape-charcoal/80 via-aescape-charcoal/60 to-aescape-charcoal/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <motion.p
            variants={heroTextItem}
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/60"
          >
            Ready to Start?
          </motion.p>

          <motion.h2
            variants={heroTextItem}
            className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Ready for Your First
            <br />
            Meaningful Connection?
          </motion.h2>

          <motion.p
            variants={heroTextItem}
            className="mt-6 text-base text-white/80 md:text-lg"
          >
            Join thousands of people who have found genuine companionship,
            stimulating conversations, and unforgettable experiences.
          </motion.p>

          <motion.div
            variants={heroTextItem}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <PremiumButton
              href="/sign-up"
              variant="primary"
              size="large"
              className="bg-aescape-cream text-aescape-charcoal hover:bg-white"
            >
              Get Started Free
            </PremiumButton>
            <PremiumButton
              href="/search"
              variant="outline"
              size="large"
            >
              Browse Partners
            </PremiumButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
