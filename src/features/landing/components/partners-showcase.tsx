'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Star, ArrowRight } from 'lucide-react';
import { SectionContainer, PremiumButton } from './shared';
import {
  staggerContainer,
  fadeInUp,
  cardPress,
} from './shared/animation-variants';

const partners = [
  {
    id: '1',
    name: 'Minh Anh',
    specialty: 'Conversation & Culture',
    rating: 4.9,
    reviews: 127,
    price: '150,000 VND/hr',
    image: '/images/partner-1.jpg',
    verified: true,
  },
  {
    id: '2',
    name: 'Thu Hà',
    specialty: 'Activities & Travel',
    rating: 4.8,
    reviews: 89,
    price: '180,000 VND/hr',
    image: '/images/partner-2.jpg',
    verified: true,
  },
  {
    id: '3',
    name: 'Quang Minh',
    specialty: 'Deep Discussions',
    rating: 5.0,
    reviews: 64,
    price: '200,000 VND/hr',
    image: '/images/partner-3.jpg',
    verified: true,
  },
  {
    id: '4',
    name: 'Ngọc Linh',
    specialty: 'Casual & Fun',
    rating: 4.9,
    reviews: 156,
    price: '120,000 VND/hr',
    image: '/images/partner-4.jpg',
    verified: true,
  },
];

export function PartnersShowcase() {
  return (
    <SectionContainer background="cream" id="partners">
      {/* Section Header */}
      <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left lg:mb-16">
        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-aescape-charcoal-light">
            Featured Partners
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-aescape-charcoal md:text-4xl">
            Meet Our Partners
          </h2>
        </div>
        <Link
          href="/search"
          className="group inline-flex items-center gap-2 text-sm font-medium text-aescape-charcoal transition-colors hover:text-aescape-lavender-dark"
        >
          See All Partners
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Partners Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {partners.map((partner) => (
          <motion.div
            key={partner.id}
            variants={fadeInUp}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <Link href={`/partners/${partner.id}`}>
              <motion.div
                variants={cardPress}
                className="group overflow-hidden rounded-2xl bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg"
              >
                {/* Avatar */}
                <div className="relative aspect-square overflow-hidden bg-aescape-cream-dark">
                  <Image
                    src={partner.image}
                    alt={partner.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {partner.verified && (
                    <div className="absolute right-3 top-3 rounded-full bg-white px-2 py-1 text-xs font-medium text-aescape-charcoal shadow-sm">
                      Verified
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-display text-lg font-medium text-aescape-charcoal">
                    {partner.name}
                  </h3>
                  <p className="mt-1 text-sm text-aescape-charcoal-light">
                    {partner.specialty}
                  </p>

                  {/* Rating & Price */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-aescape-charcoal">
                        {partner.rating}
                      </span>
                      <span className="text-sm text-aescape-charcoal-light">
                        ({partner.reviews})
                      </span>
                    </div>
                    <span className="text-sm font-medium text-aescape-charcoal">
                      {partner.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
