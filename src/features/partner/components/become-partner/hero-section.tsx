'use client';

import { motion } from 'motion/react';
import { Users, CheckCircle } from 'lucide-react';
import { containerVariants, itemVariants } from '../../lib/animations';
import { stats } from '../../constants';

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export function HeroSection({ onScrollToForm }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-cream py-20 lg:py-28">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-terracotta/[0.03] to-transparent" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-8">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-terracotta/20 bg-terracotta-light px-5 py-2.5 text-sm font-medium text-terracotta">
              <Users className="h-4 w-4" />
              Cộng đồng Partner Cogie
            </span>
          </motion.div>

          {/* Headline with serif font */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 font-display text-4xl tracking-tight text-foreground sm:text-5xl lg:text-6xl"
          >
            Trở Thành Partner,
            <br />
            <span className="text-terracotta">Lan Tỏa Giá Trị</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            Gia nhập cộng đồng những người lắng nghe tại Cogie. Thu nhập linh hoạt,
            thời gian tự do, và cơ hội tạo ra những cuộc trò chuyện ý nghĩa.
          </motion.p>

          {/* Single CTA Button */}
          <motion.div variants={itemVariants} className="mb-16">
            <button
              onClick={onScrollToForm}
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-terracotta px-10 text-base font-medium text-white transition-colors hover:bg-terracotta-dark"
            >
              <CheckCircle className="h-5 w-5" />
              Đăng ký trở thành Partner
            </button>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-border/50 bg-background p-5"
              >
                <div className="font-display text-2xl text-terracotta sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
