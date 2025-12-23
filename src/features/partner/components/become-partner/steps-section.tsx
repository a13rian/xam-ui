'use client';

import { motion } from 'motion/react';
import {
  SectionContainer,
  PremiumButton,
  staggerContainer,
  fadeInUp,
  lineGrow,
} from '@/features/landing/components/shared';
import { steps } from '../../constants';

interface StepsSectionProps {
  onScrollToForm: () => void;
}

export function StepsSection({ onScrollToForm }: StepsSectionProps) {
  return (
    <SectionContainer background="cream-dark" id="steps">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left - Sticky Header */}
        <div className="lg:col-span-4 lg:sticky lg:top-32 lg:self-start">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal-light">
            Quy Trình Đăng Ký
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-charcoal md:text-4xl lg:text-5xl">
            Bốn Bước
            <br />
            Để Bắt Đầu
          </h2>
          <p className="mt-4 text-base text-charcoal-light lg:text-lg">
            Quy trình đơn giản, nhanh chóng để bạn trở thành đối tác của Cogie.
          </p>
          <div className="mt-8">
            <PremiumButton onClick={onScrollToForm} variant="primary" size="default">
              Đăng Ký Ngay
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
            className="absolute left-6 top-0 h-full w-[2px] origin-top bg-charcoal/10 md:left-8"
          />

          {/* Steps */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10 md:space-y-12"
          >
            {steps.map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="relative flex gap-6 md:gap-8"
              >
                {/* Number Circle */}
                <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-sm font-medium text-charcoal ring-4 ring-cream-dark md:h-16 md:w-16 md:text-base">
                  <step.icon className="h-5 w-5 text-lavender-dark md:h-6 md:w-6" />
                </div>

                {/* Content */}
                <div className="pb-2 pt-1">
                  <span className="text-xs font-medium text-lavender-dark">
                    Bước {step.number}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-medium text-charcoal md:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal-light md:text-base">
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
