'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  SectionContainer,
  PremiumButton,
  staggerContainer,
  fadeInUp,
} from '@/features/landing/components/shared';

interface CTASectionProps {
  onScrollToForm: () => void;
}

export function CTASection({ onScrollToForm }: CTASectionProps) {
  return (
    <SectionContainer background="white" className="overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl bg-charcoal px-8 py-16 text-center sm:px-16 lg:py-20"
      >
        {/* Subtle decorative gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-lavender/10 via-transparent to-lavender/5" />

        {/* Decorative circles */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-lavender/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-lavender/10 blur-3xl" />

        <motion.p
          variants={fadeInUp}
          className="relative mb-4 text-xs font-medium uppercase tracking-[0.3em] text-lavender"
        >
          Bắt Đầu Ngay
        </motion.p>

        <motion.h2
          variants={fadeInUp}
          className="relative mx-auto max-w-2xl font-display text-3xl font-medium tracking-tight text-cream sm:text-4xl lg:text-5xl"
        >
          Sẵn Sàng Trở Thành Đối Tác Cogie?
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="relative mx-auto mt-4 max-w-xl text-base text-cream/70 lg:text-lg"
        >
          Gia nhập cộng đồng 500+ đối tác đang tạo ra những kết nối ý nghĩa và
          thu nhập linh hoạt trên Cogie.
        </motion.p>

        <motion.div variants={fadeInUp} className="relative mt-10">
          <PremiumButton
            onClick={onScrollToForm}
            variant="primary"
            size="large"
            className="bg-cream text-charcoal hover:bg-white"
          >
            Đăng Ký Trở Thành Đối Tác
            <ArrowRight className="ml-2 h-5 w-5" />
          </PremiumButton>
        </motion.div>
      </motion.div>
    </SectionContainer>
  );
}
