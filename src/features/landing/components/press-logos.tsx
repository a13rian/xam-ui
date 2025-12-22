'use client';

import { motion } from 'motion/react';
import { SectionContainer } from './shared';
import { staggerContainerFast, fadeIn } from './shared/animation-variants';

const pressLogos = [
  { name: 'VnExpress', logo: '/images/press/vnexpress.svg' },
  { name: 'Zing News', logo: '/images/press/zingnews.svg' },
  { name: 'Tuoi Tre', logo: '/images/press/tuoitre.svg' },
  { name: 'Dantri', logo: '/images/press/dantri.svg' },
  { name: 'Kenh14', logo: '/images/press/kenh14.svg' },
];

export function PressLogos() {
  return (
    <SectionContainer background="cream" spacing="small">
      <div className="text-center">
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.3em] text-aescape-charcoal-light">
          As Featured In
        </p>

        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
        >
          {pressLogos.map((press) => (
            <motion.div
              key={press.name}
              variants={fadeIn}
              className="group relative h-8 w-auto opacity-40 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
            >
              {/* Placeholder for actual logo */}
              <div className="flex h-8 items-center justify-center px-4">
                <span className="text-lg font-medium text-aescape-charcoal">
                  {press.name}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </SectionContainer>
  );
}
