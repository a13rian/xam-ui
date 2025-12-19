"use client";

import { motion, type Variants } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AnimatedAbout() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Image */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageVariants}
            className="relative"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-linear-to-br from-orange-100 to-orange-50">
              <Image src="/hero.jpg" alt="Người dùng Cogie" fill className="object-cover" />
            </div>
            {/* Avatar row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 gap-2"
            >
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`h-14 w-14 overflow-hidden rounded-2xl shadow-lg ${
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
            </motion.div>
          </motion.div>

          {/* Right - Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div
              variants={fadeInUpVariants}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
              Về chúng tôi
            </motion.div>
            <motion.h2
              variants={fadeInUpVariants}
              className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl"
            >
              Được Tạo Ra Để Giúp Bạn Kết Nối Chân Thật Hơn
            </motion.h2>
            <motion.p
              variants={fadeInUpVariants}
              className="mb-8 text-lg leading-relaxed text-gray-600"
            >
              Cogie được thiết kế để giúp bạn tìm kiếm những người bạn tâm giao, sẵn sàng lắng
              nghe và chia sẻ. Chúng tôi tin rằng mỗi cuộc trò chuyện đều có thể mang lại giá trị
              và ý nghĩa.
            </motion.p>
            <motion.div variants={fadeInUpVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/about"
                className="inline-flex h-12 items-center justify-center rounded-full bg-orange-500 px-8 text-sm font-medium text-white shadow-lg shadow-orange-500/30 transition-all hover:bg-orange-600"
              >
                Tìm hiểu thêm
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
