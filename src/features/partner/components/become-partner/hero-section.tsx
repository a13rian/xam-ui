'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import {
  PremiumButton,
  heroStagger,
  heroTextItem,
  scrollBounce,
  staggerContainerFast,
  counterReveal,
} from '@/features/landing/components/shared';
import { stats } from '../../constants';

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export function HeroSection({ onScrollToForm }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/partner-hero.jpg"
          alt="Become a Partner"
          fill
          priority
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={heroTextItem}
            className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-white/80"
          >
            Trở Thành Đối Tác
          </motion.p>

          {/* Headline */}
          <motion.h1
            variants={heroTextItem}
            className="font-display text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Chia sẻ thời gian,
            <br />
            <span className="italic text-lavender">tạo nên giá trị</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={heroTextItem}
            className="mx-auto mt-6 max-w-xl text-base text-white/80 sm:text-lg md:mt-8"
          >
            Gia nhập cộng đồng những người đồng hành tại Cogie. Thu nhập linh
            hoạt, thời gian tự do, và cơ hội tạo ra những kết nối ý nghĩa.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={heroTextItem}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12"
          >
            <PremiumButton
              onClick={onScrollToForm}
              variant="primary"
              size="large"
              className="bg-cream text-charcoal hover:bg-white"
            >
              Đăng Ký Ngay
            </PremiumButton>
            <PremiumButton href="#benefits" variant="outline" size="large">
              Tìm Hiểu Thêm
            </PremiumButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={staggerContainerFast}
            initial="hidden"
            animate="visible"
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={counterReveal}>
                <p className="font-display text-2xl text-white md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-white/60 md:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          variants={scrollBounce}
          initial="initial"
          animate="animate"
        >
          <button
            onClick={() =>
              document
                .getElementById('benefits')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="flex flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
            aria-label="Scroll down"
          >
            <span className="text-xs uppercase tracking-widest">Cuộn</span>
            <ChevronDown className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
