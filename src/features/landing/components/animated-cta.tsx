"use client";

import { motion, type Variants } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      staggerChildren: 0.15,
    },
  },
};

const textVariants: Variants = {
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

export function AnimatedCTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="relative overflow-hidden rounded-3xl bg-linear-to-r from-orange-500 to-orange-600 px-8 py-16 text-center text-white shadow-2xl sm:px-16"
        >
          {/* Decorative elements */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isInView
                ? {
                    scale: [1, 1.1, 1],
                    opacity: 1,
                    rotate: [0, 5, 0],
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-white/10"
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={
              isInView
                ? {
                    scale: [1, 1.1, 1],
                    opacity: 1,
                    rotate: [0, 5, 0],
                  }
                : { scale: 0, opacity: 0 }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
            className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-white/10"
          />

          <motion.h2
            variants={textVariants}
            className="relative mb-4 text-3xl font-bold sm:text-4xl"
          >
            Sẵn Sàng <span className="text-orange-200">Kết Nối</span>?<br />
            Trải Nghiệm Cogie Ngay
          </motion.h2>
          <motion.p variants={textVariants} className="relative mb-8 text-lg text-white/90">
            Hàng ngàn người đang chờ để lắng nghe câu chuyện của bạn.
          </motion.p>
          <motion.div
            variants={textVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <Link
              href="/sign-up"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-medium text-orange-600 shadow-lg transition-all hover:bg-orange-50"
            >
              Bắt đầu ngay
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
