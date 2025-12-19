"use client";

import { motion, type Variants } from "motion/react";
import { useInView } from "motion/react";
import { useRef } from "react";
import Link from "next/link";

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

const faqItemVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function AnimatedFAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const faqs = [
    {
      question: "1. Cogie là gì?",
      answer:
        "Cogie là nền tảng kết nối những người cần trò chuyện, chia sẻ với những người sẵn sàng lắng nghe - gặp mặt trực tiếp (face-to-face).",
    },
    {
      question: "2. Làm sao để trở thành Partner?",
      answer:
        "Bạn có thể đăng ký trở thành Partner bằng cách tạo tài khoản và hoàn thành quy trình xác minh danh tính. Sau khi được duyệt, bạn có thể bắt đầu nhận booking.",
    },
    {
      question: "3. Cogie có an toàn không?",
      answer:
        "Có! Tất cả Partner đều được xác minh danh tính. Chúng tôi có hệ thống đánh giá và review để đảm bảo chất lượng dịch vụ.",
    },
    {
      question: "4. Chi phí sử dụng Cogie như thế nào?",
      answer:
        "Đăng ký tài khoản hoàn toàn miễn phí. Chi phí mỗi cuộc hẹn sẽ tùy thuộc vào Partner bạn chọn, được hiển thị rõ ràng trên hồ sơ của họ.",
    },
  ];

  return (
    <section ref={ref} className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Header */}
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
              FAQ
            </motion.div>
            <motion.h2
              variants={fadeInUpVariants}
              className="mb-6 text-3xl font-bold text-gray-900 sm:text-4xl"
            >
              Cần Trợ Giúp?
              <br />
              Bắt Đầu Với Những Câu Hỏi Này
            </motion.h2>
            <motion.p variants={fadeInUpVariants} className="mb-8 text-gray-600">
              Cần thêm hỗ trợ?
            </motion.p>
            <motion.div variants={fadeInUpVariants} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/contact"
                className="inline-flex h-12 items-center justify-center rounded-full border border-gray-300 bg-white px-8 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
              >
                Liên hệ chúng tôi
              </Link>
            </motion.div>
          </motion.div>

          {/* Right - FAQ Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                variants={faqItemVariants}
                whileHover={{ scale: 1.01 }}
                className="group rounded-2xl border border-gray-200 bg-white"
              >
                <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-gray-900">
                  <span>{faq.question}</span>
                  <svg
                    className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </summary>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-5 pb-5 text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
