'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import {
  fadeInUp,
  staggerContainer,
  slideInRight,
  imageReveal,
  premiumEase,
} from './shared';

export function PremiumHero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-cream">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/5" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(90vh-80px)] items-center gap-12 py-16 lg:grid-cols-12 lg:gap-8 lg:py-24">
          {/* Left Side - Content (7 columns) */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col lg:col-span-7"
          >
            {/* Eyebrow */}
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-3"
            >
              <span className="h-px w-8 bg-terracotta" />
              <span className="text-sm font-medium uppercase tracking-widest text-terracotta">
                Companion Booking
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="font-display text-4xl font-normal leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl xl:text-7xl"
            >
              Khám Phá Những
              <br />
              <span className="text-terracotta">Cuộc Trò Chuyện</span>
              <br />
              Ý Nghĩa
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={fadeInUp}
              className="mt-8 max-w-lg text-lg leading-relaxed text-muted-foreground lg:text-xl"
            >
              Kết nối với những Partner đã được xác minh, sẵn sàng lắng nghe và
              chia sẻ trong những cuộc gặp gỡ trực tiếp.
            </motion.p>

            {/* CTA Button */}
            <motion.div variants={fadeInUp} className="mt-10">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: premiumEase }}
              >
                <Link
                  href="/search"
                  className="inline-flex h-14 items-center justify-center gap-3 rounded-full bg-terracotta px-10 text-base font-medium text-white shadow-lg shadow-terracotta/25 transition-colors hover:bg-terracotta-dark"
                >
                  Khám Phá Partners
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[
                  'bg-terracotta-light',
                  'bg-sage/30',
                  'bg-terracotta/20',
                  'bg-muted',
                ].map((bg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: 0.8 + i * 0.1,
                      duration: 0.4,
                      ease: premiumEase,
                    }}
                    className={`h-10 w-10 rounded-full ring-2 ring-cream ${bg}`}
                  />
                ))}
              </div>
              <div className="border-l border-border pl-4">
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  10,000+
                </p>
                <p className="text-sm text-muted-foreground">
                  Cuộc trò chuyện ý nghĩa
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Hero Image (5 columns) */}
          <motion.div
            variants={slideInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:col-span-5 lg:block"
          >
            <motion.div
              variants={imageReveal}
              className="relative aspect-[4/5] overflow-hidden rounded-3xl"
            >
              <Image
                src="/hero.jpg"
                alt="Hai người đang trò chuyện vui vẻ tại quán cafe"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Subtle overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 via-transparent to-transparent" />
            </motion.div>

            {/* Floating verification badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6, ease: premiumEase }}
              className="absolute -left-6 bottom-12 rounded-2xl bg-background/95 p-4 shadow-xl backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sage/20">
                  <svg
                    className="h-5 w-5 text-sage"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    100% Xác Minh
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Partners đáng tin cậy
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
