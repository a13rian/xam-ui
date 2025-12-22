'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SectionContainer, PremiumButton } from './shared';
import {
  staggerContainer,
  fadeInUp,
  cardPress,
  aescapeEase,
} from './shared/animation-variants';

const services = [
  {
    title: 'Casual Conversations',
    duration: 'From 1 hour',
    price: 'From 100,000 VND',
    description:
      'Light-hearted chats and genuine connections. Perfect for coffee dates or evening walks.',
    image: '/images/service-casual.jpg',
    href: '/search?type=casual',
  },
  {
    title: 'Deep Discussions',
    duration: 'From 2 hours',
    price: 'From 180,000 VND',
    description:
      'Meaningful conversations about life, goals, and aspirations. For those seeking depth.',
    image: '/images/service-deep.jpg',
    href: '/search?type=deep',
  },
  {
    title: 'Activity Partners',
    duration: 'Flexible',
    price: 'From 150,000 VND',
    description:
      'Shared experiences and adventures together. Dining, events, sports, or travel.',
    image: '/images/service-activity.jpg',
    href: '/search?type=activity',
  },
];

export function ServiceCards() {
  return (
    <SectionContainer background="cream" id="services">
      {/* Section Header */}
      <div className="mb-12 text-center lg:mb-16">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-aescape-charcoal-light">
          Our Experience
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-aescape-charcoal md:text-4xl lg:text-5xl">
          Find Your Perfect Companion
        </h2>
      </div>

      {/* Cards Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        {services.map((service) => (
          <motion.div
            key={service.title}
            variants={fadeInUp}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div
              variants={cardPress}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-aescape-cream-dark">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Duration & Price */}
                <div className="mb-3 flex items-center justify-between text-sm text-aescape-charcoal-light">
                  <span>{service.duration}</span>
                  <span className="font-medium text-aescape-charcoal">
                    {service.price}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-display text-xl font-medium text-aescape-charcoal">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-sm leading-relaxed text-aescape-charcoal-light">
                  {service.description}
                </p>

                {/* CTA */}
                <Link
                  href={service.href}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-aescape-charcoal transition-colors hover:text-aescape-lavender-dark"
                >
                  Book Now
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
