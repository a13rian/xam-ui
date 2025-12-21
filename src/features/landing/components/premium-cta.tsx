'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { fadeInUp, staggerContainer, premiumEase } from './shared';

export function PremiumCTA() {
  return (
    <section className="relative overflow-hidden bg-foreground py-20 lg:py-28">
      {/* Subtle gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-terracotta/10 via-transparent to-sage/5" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-terracotta"
          >
            <span className="h-px w-6 bg-terracotta" />
            Bắt đầu ngay
            <span className="h-px w-6 bg-terracotta" />
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="font-display text-3xl font-normal leading-tight tracking-tight text-background sm:text-4xl lg:text-5xl"
          >
            Sẵn Sàng Cho Cuộc
            <br />
            <span className="text-terracotta">Trò Chuyện Đầu Tiên?</span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-background/70"
          >
            Đăng ký miễn phí và khám phá hàng trăm Partners đang chờ đón bạn.
            Chỉ mất vài phút để bắt đầu.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: premiumEase }}
            >
              <Link
                href="/sign-up"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-terracotta px-10 text-base font-medium text-white shadow-lg shadow-terracotta/25 transition-colors hover:bg-terracotta-dark"
              >
                Tạo Tài Khoản Miễn Phí
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

            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2, ease: premiumEase }}
            >
              <Link
                href="/become-partner"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-background/20 px-10 text-base font-medium text-background transition-colors hover:bg-background/10"
              >
                Trở Thành Partner
              </Link>
            </motion.div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-8 text-background/50"
          >
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                />
              </svg>
              <span className="text-sm">100% An toàn</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span className="text-sm">50+ Partners</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                />
              </svg>
              <span className="text-sm">4.9/5 Đánh giá</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
