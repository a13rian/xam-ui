'use client';

import { motion } from 'motion/react';
import {
  SectionContainer,
  staggerContainer,
  fadeInUp,
  cardPress,
} from '@/features/landing/components/shared';
import { benefits } from '../../constants';

export function BenefitsSection() {
  return (
    <SectionContainer background="cream" id="benefits">
      {/* Section Header */}
      <div className="mb-12 text-center lg:mb-16">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal-light">
          Tại Sao Chọn Cogie
        </p>
        <h2 className="font-display text-3xl font-medium tracking-tight text-charcoal md:text-4xl lg:text-5xl">
          Những Lợi Ích Dành Cho Bạn
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-charcoal-light">
          Cogie mang đến môi trường lý tưởng để bạn phát triển với sự linh hoạt
          và hỗ trợ tối đa.
        </p>
      </div>

      {/* Benefits Grid */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-8"
      >
        {benefits.map((benefit) => (
          <motion.div
            key={benefit.title}
            variants={fadeInUp}
            initial="rest"
            whileHover="hover"
            animate="rest"
          >
            <motion.div
              variants={cardPress}
              className="group h-full overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg"
            >
              {/* Icon */}
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-lavender/20">
                <benefit.icon className="h-7 w-7 text-lavender-dark" />
              </div>

              {/* Content */}
              <h3 className="mb-2 font-display text-lg font-medium text-charcoal">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-charcoal-light">
                {benefit.description}
              </p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  );
}
