"use client";

import { motion, type Variants } from "motion/react";
import Link from "next/link";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AnimatedHero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-white">
      {/* Background decorative blobs with animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.6, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="pointer-events-none absolute -right-20 -top-20 h-[600px] w-[600px] rounded-full bg-linear-to-br from-orange-200 via-orange-300 to-orange-400 blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
        className="pointer-events-none absolute -right-40 top-20 h-[400px] w-[400px] rounded-full bg-linear-to-br from-orange-300 to-orange-500 opacity-40"
      />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid min-h-[calc(100vh-64px)] items-center gap-12 py-12 lg:grid-cols-2 lg:gap-8 lg:py-24">
          {/* Left Side - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="mb-6 text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
            >
              Gặp Gỡ <span className="text-orange-500">Cogie</span>
              <br />
              Người Bạn Tâm Giao
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="mb-8 max-w-md text-lg leading-relaxed text-gray-600"
            >
              Kết nối với những người sẵn sàng lắng nghe, chia sẻ và đồng hành cùng bạn.
              Đặt lịch gặp mặt trực tiếp dễ dàng.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="mb-10 flex flex-col gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/search"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-orange-500 px-8 text-sm font-medium text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600 hover:shadow-xl"
                >
                  Bắt đầu ngay
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/how-it-works"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  Tìm hiểu thêm
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  href="/become-partner"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-orange-500 bg-white px-8 text-sm font-medium text-orange-600 transition-colors hover:bg-orange-50"
                >
                  Trở thành Partner
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats with avatars */}
            <motion.div variants={itemVariants} className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 0.4 }}
                    className={`h-10 w-10 rounded-full ring-2 ring-white ${
                      i === 0
                        ? "bg-orange-200"
                        : i === 1
                          ? "bg-blue-200"
                          : i === 2
                            ? "bg-green-200"
                            : "bg-purple-200"
                    }`}
                  />
                ))}
              </div>
              <div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="text-2xl font-bold text-gray-900"
                >
                  10,000+
                </motion.div>
                <div className="text-sm text-gray-500">Đã kết nối qua Cogie</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Hero Visual with floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative hidden lg:block"
          >
            <div className="relative mx-auto w-full max-w-lg">
              {/* Main hero image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative z-10 aspect-4/5 overflow-hidden rounded-4xl shadow-2xl"
              >
                <Image
                  src="/hero.jpg"
                  alt="Hai người đang trò chuyện vui vẻ tại quán cafe"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* Floating card - Top right - Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.4 },
                  scale: { duration: 0.6, delay: 0.4 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
                }}
                className="absolute -right-4 top-8 z-20 rounded-2xl bg-white p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                    <svg
                      className="h-6 w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">1K+</p>
                    <p className="text-xs text-gray-500">Cuộc hẹn mỗi tháng</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card - Middle right - Rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.6 },
                  scale: { duration: 0.6, delay: 0.6 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
                }}
                className="absolute -right-8 top-1/2 z-20 -translate-y-1/2 rounded-2xl bg-white p-4 shadow-xl"
              >
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">98%</p>
                  <p className="text-xs text-gray-500">Hài lòng</p>
                </div>
                <div className="mt-2 flex justify-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-4 w-4 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                </div>
              </motion.div>

              {/* Floating card - Bottom left - Verified */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.8 },
                  scale: { duration: 0.6, delay: 0.8 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.4 },
                }}
                className="absolute -left-8 bottom-16 z-20 rounded-2xl bg-white p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-6 w-6 text-green-600"
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
                    <p className="font-semibold text-gray-900">Đã xác minh</p>
                    <p className="text-xs text-gray-500">100% an toàn</p>
                  </div>
                </div>
              </motion.div>

              {/* Floating card - Bottom - Users online */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  y: [0, -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.6, delay: 1 },
                  scale: { duration: 0.6, delay: 1 },
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.6 },
                }}
                className="absolute -bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-2xl bg-white px-5 py-3 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-orange-300 ring-2 ring-white"></div>
                    <div className="h-8 w-8 rounded-full bg-blue-300 ring-2 ring-white"></div>
                    <div className="h-8 w-8 rounded-full bg-pink-300 ring-2 ring-white"></div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-600 ring-2 ring-white">
                      +50
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">500+</p>
                    <p className="text-xs text-gray-500">Đang online</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
