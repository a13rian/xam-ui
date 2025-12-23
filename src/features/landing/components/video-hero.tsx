'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { VideoBackground, PremiumButton } from './shared';
import {
  heroStagger,
  heroTextItem,
  scrollBounce,
} from './shared/animation-variants';

export function VideoHero() {
  return (
    <section className="relative h-screen min-h-[600px] w-full">
      <VideoBackground
        src="/videos/hero-background.mp4"
        fallbackImage="/images/hero-fallback.jpg"
        overlay
        overlayOpacity={0.5}
        className="absolute inset-0"
      >
        <div className="flex h-full flex-col items-center justify-center px-4 text-center">
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
              Đặt Lịch Đồng Hành
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={heroTextItem}
              className="font-display text-4xl font-medium leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Sống trọn vẹn mỗi ngày
              <br />
              <span className="italic text-lavender">
                mọi kết nối, mọi khoảnh khắc
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={heroTextItem}
              className="mx-auto mt-6 max-w-xl text-base text-white/80 sm:text-lg md:mt-8"
            >
              Khám phá những cuộc trò chuyện ý nghĩa và kết nối chân thực với
              các đối tác đã được xác minh, thấu hiểu nghệ thuật đồng hành.
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={heroTextItem}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row md:mt-12"
            >
              <PremiumButton
                href="/search"
                variant="primary"
                size="large"
                className="bg-cream text-charcoal hover:bg-white"
              >
                Đặt Lịch Ngay
              </PremiumButton>
              <PremiumButton
                href="/become-partner"
                variant="outline"
                size="large"
              >
                Trở Thành Đối Tác
              </PremiumButton>
            </motion.div>

            {/* Social Proof */}
            <motion.p
              variants={heroTextItem}
              className="mt-10 text-sm text-white/60"
            >
              Tham gia cùng 10,000+ người tìm kiếm kết nối ý nghĩa
            </motion.p>
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
                window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
              }
              className="flex flex-col items-center gap-2 text-white/60 transition-colors hover:text-white"
              aria-label="Scroll down"
            >
              <span className="text-xs uppercase tracking-widest">Cuộn</span>
              <ChevronDown className="h-5 w-5" />
            </button>
          </motion.div>
        </div>
      </VideoBackground>
    </section>
  );
}
