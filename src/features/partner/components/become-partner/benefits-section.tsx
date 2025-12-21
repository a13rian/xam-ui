'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { benefits } from '../../constants';
import { containerVariants, itemVariants, cardHover } from '../../lib/animations';

// Premium benefit colors with terracotta accent
const premiumColors: Record<string, string> = {
  'bg-emerald-100 text-emerald-600': 'bg-sage/20 text-sage',
  'bg-blue-100 text-blue-600': 'bg-terracotta-light text-terracotta',
  'bg-amber-100 text-amber-600': 'bg-terracotta/10 text-terracotta-dark',
  'bg-rose-100 text-rose-600': 'bg-cream text-terracotta',
};

export function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-background py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mb-14 text-center"
        >
          <motion.span
            variants={itemVariants}
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-terracotta"
          >
            <span className="h-px w-8 bg-terracotta/40" />
            Tại sao chọn Cogie?
            <span className="h-px w-8 bg-terracotta/40" />
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="mb-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl"
          >
            Những Lợi Ích Dành Cho Partner
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            Cogie mang đến môi trường lý tưởng để bạn phát triển sự nghiệp với sự linh hoạt
            và hỗ trợ tối đa.
          </motion.p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={itemVariants}
              whileHover={cardHover}
              className="group rounded-2xl border border-border/50 bg-background p-6 transition-shadow hover:shadow-lg"
            >
              <div
                className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${premiumColors[benefit.color] || benefit.color}`}
              >
                <benefit.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 font-display text-lg text-foreground">
                {benefit.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
