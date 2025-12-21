'use client';

import { motion } from 'motion/react';
import { fadeIn, staggerContainerFast, premiumEase } from './shared';

const stats = [
  { value: '50+', label: 'Partners Xác Minh' },
  { value: '10,000+', label: 'Cuộc Hẹn' },
  { value: '98%', label: 'Hài Lòng' },
  { value: '24/7', label: 'Hỗ Trợ' },
];

export function TrustIndicators() {
  return (
    <section className="border-y border-border/50 bg-background py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainerFast}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="flex flex-wrap items-center justify-center gap-8 lg:justify-between"
        >
          {/* Trust Badge */}
          <motion.div
            variants={fadeIn}
            className="flex items-center gap-3 text-muted-foreground"
          >
            <svg
              className="h-5 w-5 text-sage"
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
            <span className="text-sm font-medium">Verified Partners</span>
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeIn}
            className="hidden h-6 w-px bg-border lg:block"
          />

          {/* Stats */}
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap items-center justify-center gap-8 lg:gap-12"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 + index * 0.1,
                  duration: 0.5,
                  ease: premiumEase,
                }}
                className="text-center"
              >
                <p className="text-xl font-semibold tracking-tight text-foreground lg:text-2xl">
                  {stat.value}
                </p>
                <p className="text-xs text-muted-foreground lg:text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Divider */}
          <motion.div
            variants={fadeIn}
            className="hidden h-6 w-px bg-border lg:block"
          />

          {/* Security Badge */}
          <motion.div
            variants={fadeIn}
            className="flex items-center gap-3 text-muted-foreground"
          >
            <svg
              className="h-5 w-5 text-terracotta"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
              />
            </svg>
            <span className="text-sm font-medium">Bảo Mật SSL</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
