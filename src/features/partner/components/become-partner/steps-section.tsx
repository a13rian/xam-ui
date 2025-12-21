'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { steps } from '../../constants';
import { containerVariants, itemVariants } from '../../lib/animations';

export function StepsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-cream py-20 lg:py-24">
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
            Quy trình đăng ký
            <span className="h-px w-8 bg-terracotta/40" />
          </motion.span>
          <motion.h2
            variants={itemVariants}
            className="mb-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl"
          >
            4 Bước Để Bắt Đầu
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl text-muted-foreground"
          >
            Quy trình đơn giản, nhanh chóng để bạn trở thành Partner Cogie.
          </motion.p>
        </motion.div>

        {/* Steps Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Vertical connection line - desktop */}
          <div className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 bg-gradient-to-b from-terracotta/20 via-terracotta/40 to-terracotta/20 lg:block" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid gap-8 lg:grid-cols-2"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className={`relative ${index % 2 === 1 ? 'lg:mt-24' : ''}`}
              >
                <div className="rounded-2xl border border-border/50 bg-background p-6 transition-shadow hover:shadow-lg">
                  {/* Step number badge */}
                  <div className="absolute -top-4 left-6 flex h-9 w-9 items-center justify-center rounded-full bg-terracotta font-display text-sm text-white shadow-md">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 mt-2 flex h-12 w-12 items-center justify-center rounded-xl bg-terracotta-light">
                    <step.icon className="h-6 w-6 text-terracotta" />
                  </div>

                  <h3 className="mb-2 font-display text-lg text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
