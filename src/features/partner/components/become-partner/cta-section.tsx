'use client';

import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface CTASectionProps {
  onScrollToForm: () => void;
}

export function CTASection({ onScrollToForm }: CTASectionProps) {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 px-8 py-16 text-center text-white shadow-2xl sm:px-16"
        >
          {/* Decorative elements */}
          <motion.div
            animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-white/10"
          />
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10"
          />

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative mb-4 text-3xl font-bold sm:text-4xl"
          >
            Bắt Đầu Hành Trình Partner Ngay Hôm Nay
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative mb-8 text-lg text-white/90"
          >
            Gia nhập cộng đồng 500+ Partner đang tạo ra những kết nối ý nghĩa trên Cogie.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onScrollToForm}
            className="relative inline-flex h-14 items-center justify-center gap-2 rounded-full bg-white px-10 text-base font-semibold text-orange-600 shadow-lg transition-all hover:bg-orange-50"
          >
            <Sparkles className="h-5 w-5" />
            Đăng ký trở thành Partner
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
