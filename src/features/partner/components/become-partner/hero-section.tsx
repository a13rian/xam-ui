'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Users, Wallet, Star, Sparkles } from 'lucide-react';
import { containerVariants, itemVariants } from '../../lib/animations';
import { stats } from '../../constants';

interface HeroSectionProps {
  onScrollToForm: () => void;
}

export function HeroSection({ onScrollToForm }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50 pb-16 pt-12 lg:pb-24 lg:pt-20">
      {/* Background decorative elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-orange-200 via-orange-300 to-amber-200 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
        className="pointer-events-none absolute -right-20 bottom-0 h-[400px] w-[400px] rounded-full bg-gradient-to-br from-rose-200 to-orange-200 blur-3xl"
      />

      {/* Floating decorative cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -15, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.5 },
          y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="pointer-events-none absolute right-[10%] top-24 hidden rounded-2xl bg-white/80 p-4 shadow-xl backdrop-blur-sm lg:block"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
            <Wallet className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-lg font-bold text-gray-900">2-5M</p>
            <p className="text-xs text-gray-500">VNĐ / tuần</p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [0, -12, 0] }}
        transition={{
          opacity: { duration: 0.8, delay: 0.7 },
          y: { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 },
        }}
        className="pointer-events-none absolute left-[8%] top-40 hidden rounded-2xl bg-white/80 p-4 shadow-xl backdrop-blur-sm lg:block"
      >
        <div className="flex items-center gap-2">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
        </div>
        <p className="mt-1 text-xs text-gray-500">Đánh giá từ khách hàng</p>
      </motion.div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
              <Users className="h-4 w-4" />
              Cộng đồng Partner Cogie
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Trở Thành{' '}
            <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
              Partner
            </span>
            <br />
            Kết Nối & Lan Tỏa Giá Trị
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-gray-600"
          >
            Gia nhập cộng đồng những người lắng nghe tại Cogie. Thu nhập linh hoạt, thời gian tự
            do, và cơ hội tạo ra những cuộc trò chuyện ý nghĩa.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="mb-12 flex flex-wrap justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onScrollToForm}
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 px-10 text-base font-semibold text-white shadow-lg shadow-orange-500/30 transition-all hover:shadow-xl"
            >
              <Sparkles className="h-5 w-5" />
              Đăng ký ngay
            </motion.button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/how-it-works"
                className="inline-flex h-14 items-center justify-center rounded-full border-2 border-gray-200 bg-white px-10 text-base font-semibold text-gray-700 transition-colors hover:border-orange-200 hover:bg-orange-50"
              >
                Tìm hiểu thêm
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                className="rounded-2xl bg-white/70 p-4 backdrop-blur-sm"
              >
                <div className="text-2xl font-bold text-orange-600 sm:text-3xl">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
