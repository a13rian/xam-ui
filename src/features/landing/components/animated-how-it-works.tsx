"use client";

import { motion, type Variants } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

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

const stepVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AnimatedHowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const steps = [
    {
      number: "01",
      title: "Đăng Ký Tài Khoản",
      description: "Tạo tài khoản miễn phí chỉ trong 1 phút",
      isActive: false,
    },
    {
      number: "02",
      title: "Tìm Kiếm Partner",
      description: "Duyệt qua các hồ sơ và tìm người phù hợp với bạn",
      isActive: true,
    },
    {
      number: "03",
      title: "Đặt Lịch Hẹn",
      description: "Chọn thời gian và địa điểm phù hợp",
      isActive: false,
    },
    {
      number: "04",
      title: "Gặp Gỡ & Chia Sẻ",
      description: "Tận hưởng cuộc trò chuyện ý nghĩa",
      isActive: false,
    },
  ];

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Content */}
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
              Cách thức hoạt động
            </motion.div>
            <motion.h2
              variants={fadeInUpVariants}
              className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl"
            >
              Bắt Đầu Sử Dụng Cogie Thật Dễ Dàng
            </motion.h2>
            <motion.p variants={fadeInUpVariants} className="mb-8 text-gray-600">
              Chỉ với vài bước đơn giản, bạn đã có thể bắt đầu hành trình kết nối với những người
              bạn tâm giao.
            </motion.p>
          </motion.div>

          {/* Right - Steps */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                variants={stepVariants}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2 },
                }}
                className={`rounded-2xl p-5 transition-all ${
                  step.isActive
                    ? "bg-orange-500 text-white shadow-lg"
                    : "border border-gray-200 bg-white hover:border-orange-200 hover:shadow-md"
                }`}
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                      step.isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {step.number}
                  </motion.div>
                  <div>
                    <h3
                      className={`font-semibold ${step.isActive ? "text-white" : "text-gray-900"}`}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={`text-sm ${step.isActive ? "text-white/80" : "text-gray-500"}`}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
