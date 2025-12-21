'use client';

import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { containerVariants, itemVariants } from '../../lib/animations';

interface CTASectionProps {
  onScrollToForm: () => void;
}

export function CTASection({ onScrollToForm }: CTASectionProps) {
  return (
    <section className="bg-background py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-foreground px-8 py-16 text-center text-background sm:px-16"
        >
          {/* Subtle decorative gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-terracotta/10 via-transparent to-terracotta/5" />

          <motion.h2
            variants={itemVariants}
            className="relative mb-4 font-display text-3xl tracking-tight sm:text-4xl"
          >
            Bắt Đầu Hành Trình Partner Ngay Hôm Nay
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="relative mb-10 text-lg text-background/70"
          >
            Gia nhập cộng đồng 500+ Partner đang tạo ra những kết nối ý nghĩa trên Cogie.
          </motion.p>
          <motion.button
            variants={itemVariants}
            onClick={onScrollToForm}
            className="relative inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-terracotta px-10 text-base font-medium text-white transition-colors hover:bg-terracotta-dark"
          >
            Đăng ký trở thành Partner
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
