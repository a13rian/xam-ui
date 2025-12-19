"use client";

import { motion, type Variants } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const cardVariants: Variants = {
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

export function AnimatedFeatures() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const features = [
    {
      icon: (
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
            d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
          />
        </svg>
      ),
      title: "Kết Nối Thông Minh",
      description:
        "Hệ thống matching thông minh giúp bạn tìm được người phù hợp dựa trên sở thích, chủ đề quan tâm và vị trí.",
      isHighlighted: false,
    },
    {
      icon: (
        <svg
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
          />
        </svg>
      ),
      title: "Đặt Lịch Linh Hoạt",
      description:
        "Dễ dàng đặt lịch hẹn gặp mặt trực tiếp với lịch trình linh hoạt, phù hợp với thời gian của cả hai bên.",
      isHighlighted: true,
    },
    {
      icon: (
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
            d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
          />
        </svg>
      ),
      title: "An Toàn & Tin Cậy",
      description:
        "Tất cả Partner đều được xác minh danh tính. Hệ thống đánh giá giúp bạn an tâm khi kết nối.",
      isHighlighted: false,
    },
  ];

  return (
    <section ref={ref} className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end"
        >
          <div>
            <motion.div
              variants={fadeInUpVariants}
              className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
              Tính năng
            </motion.div>
            <motion.h2
              variants={fadeInUpVariants}
              className="text-3xl font-bold text-gray-900 sm:text-4xl"
            >
              Trải Nghiệm Kết Nối
              <br />
              Hoàn Toàn Mới
            </motion.h2>
          </div>
          <motion.p variants={fadeInUpVariants} className="max-w-md text-gray-600">
            Cogie cung cấp những tính năng thông minh giúp bạn kết nối dễ dàng, an toàn và hiệu
            quả.
          </motion.p>
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`rounded-2xl p-6 ${
                feature.isHighlighted
                  ? "bg-orange-500 text-white shadow-lg"
                  : "bg-white shadow-sm transition-shadow hover:shadow-md"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${
                  feature.isHighlighted ? "bg-white/20" : "bg-orange-100"
                }`}
              >
                {feature.icon}
              </motion.div>
              <h3
                className={`mb-2 text-lg font-semibold ${feature.isHighlighted ? "text-white" : "text-gray-900"}`}
              >
                {feature.title}
              </h3>
              <p className={feature.isHighlighted ? "text-white/90" : "text-gray-600"}>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
