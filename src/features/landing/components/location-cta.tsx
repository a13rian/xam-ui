'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { PremiumButton } from './shared';
import { heroStagger, heroTextItem } from './shared/animation-variants';

export function LocationCTA() {
  return (
    <section className="relative min-h-[60vh] w-full overflow-hidden py-24 lg:py-32">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/location-cta-bg.jpg"
          alt=""
          fill
          className="object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-charcoal/40" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={heroStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <motion.p
            variants={heroTextItem}
            className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-white/60"
          >
            Sẵn Sàng Bắt Đầu?
          </motion.p>

          <motion.h2
            variants={heroTextItem}
            className="font-display text-3xl font-medium tracking-tight text-white md:text-4xl lg:text-5xl"
          >
            Sẵn Sàng Cho Kết Nối
            <br />
            Ý Nghĩa Đầu Tiên?
          </motion.h2>

          <motion.p
            variants={heroTextItem}
            className="mt-6 text-base text-white/80 md:text-lg"
          >
            Tham gia cùng hàng nghìn người đã tìm thấy sự đồng hành chân thực,
            những cuộc trò chuyện thú vị và trải nghiệm khó quên.
          </motion.p>

          <motion.div
            variants={heroTextItem}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <PremiumButton
              href="/sign-up"
              variant="primary"
              size="large"
              className="bg-cream text-charcoal hover:bg-white"
            >
              Bắt Đầu Miễn Phí
            </PremiumButton>
            <PremiumButton
              href="/search"
              variant="outline"
              size="large"
            >
              Duyệt Đối Tác
            </PremiumButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
