'use client';

import { motion } from 'motion/react';
import { UserPlus, Search, Calendar, Heart } from 'lucide-react';
import { SectionContainer, PremiumButton } from './shared';
import {
  staggerContainer,
  fadeInUp,
  lineGrow,
} from './shared/animation-variants';

const steps = [
  {
    icon: UserPlus,
    number: '01',
    title: 'Create Your Account',
    description:
      'Sign up for free in just a few minutes. Tell us about yourself and what you are looking for in a companion.',
  },
  {
    icon: Search,
    number: '02',
    title: 'Browse Partners',
    description:
      'Explore our verified partners. Filter by interests, availability, location, and specialty to find your perfect match.',
  },
  {
    icon: Calendar,
    number: '03',
    title: 'Book a Session',
    description:
      'Choose a convenient time and place. Secure your booking with our safe payment system.',
  },
  {
    icon: Heart,
    number: '04',
    title: 'Connect & Enjoy',
    description:
      'Meet your companion and enjoy meaningful conversations. Rate your experience to help others find great partners.',
  },
];

export function HowItWorksTimeline() {
  return (
    <SectionContainer background="cream-dark" id="how-it-works">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left - Sticky Header */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-aescape-charcoal-light">
            How It Works
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-aescape-charcoal md:text-4xl lg:text-5xl">
            Getting Started
            <br />
            is Simple
          </h2>
          <p className="mt-4 text-base text-aescape-charcoal-light lg:text-lg">
            Four easy steps to meaningful connections.
          </p>
          <div className="mt-8">
            <PremiumButton href="/sign-up" variant="primary" size="default">
              Get Started Free
            </PremiumButton>
          </div>
        </div>

        {/* Right - Timeline */}
        <div className="relative lg:col-span-7 lg:col-start-6">
          {/* Vertical Line */}
          <motion.div
            variants={lineGrow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="absolute left-6 top-0 h-full w-[2px] origin-top bg-aescape-charcoal/10 md:left-8"
          />

          {/* Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10 md:space-y-12"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="relative flex gap-6 md:gap-8"
              >
                {/* Number Circle */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-aescape-cream text-sm font-medium text-aescape-charcoal ring-4 ring-aescape-cream-dark md:h-16 md:w-16 md:text-base">
                  <step.icon className="h-5 w-5 md:h-6 md:w-6" />
                </div>

                {/* Content */}
                <div className="pb-2 pt-1">
                  <span className="text-xs font-medium text-aescape-lavender-dark">
                    Step {step.number}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-medium text-aescape-charcoal md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-aescape-charcoal-light md:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </SectionContainer>
  );
}
