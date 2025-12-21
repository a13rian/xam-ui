'use client';

import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import Link from 'next/link';
import { SectionHeader } from './shared';
import { fadeInUp, staggerContainer, premiumEase } from './shared';

const faqs = [
  {
    question: 'Cogie là gì?',
    answer:
      'Cogie là nền tảng kết nối những người cần trò chuyện, chia sẻ với những người sẵn sàng lắng nghe - gặp mặt trực tiếp (face-to-face). Chúng tôi tin rằng những cuộc trò chuyện thực sự có thể thay đổi cuộc sống.',
  },
  {
    question: 'Làm sao để trở thành Partner?',
    answer:
      'Bạn có thể đăng ký trở thành Partner bằng cách tạo tài khoản và hoàn thành quy trình xác minh danh tính. Sau khi được duyệt, bạn có thể bắt đầu nhận booking và tự đặt mức giá cho mình.',
  },
  {
    question: 'Cogie có an toàn không?',
    answer:
      'Tuyệt đối! Tất cả Partner đều được xác minh danh tính qua CCCD/CMND. Chúng tôi có hệ thống đánh giá, review và hỗ trợ 24/7 để đảm bảo an toàn cho cả hai bên.',
  },
  {
    question: 'Chi phí sử dụng Cogie như thế nào?',
    answer:
      'Đăng ký tài khoản hoàn toàn miễn phí. Chi phí mỗi cuộc hẹn sẽ tùy thuộc vào Partner bạn chọn, được hiển thị rõ ràng trên hồ sơ của họ. Không có phí ẩn.',
  },
  {
    question: 'Tôi có thể hủy lịch hẹn không?',
    answer:
      'Có, bạn có thể hủy lịch hẹn trước 24 giờ mà không mất phí. Hủy muộn hơn có thể bị tính phí tùy theo chính sách của Partner.',
  },
];

export function AnimatedFAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section ref={ref} className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left - Header */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <SectionHeader
              label="FAQ"
              title="Câu Hỏi"
              subtitle="Thường Gặp"
              description="Tìm câu trả lời cho những thắc mắc phổ biến về Cogie."
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6, ease: premiumEase }}
              className="mt-8"
            >
              <p className="mb-4 text-muted-foreground">
                Không tìm thấy câu trả lời?
              </p>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: premiumEase }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-base font-medium text-terracotta transition-colors hover:text-terracotta-dark"
                >
                  Liên hệ hỗ trợ
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Right - FAQ Items */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                variants={fadeInUp}
                className="group rounded-2xl border border-border/50 bg-card transition-shadow hover:shadow-md"
              >
                <summary className="flex cursor-pointer items-center justify-between p-6 text-foreground">
                  <span className="pr-4 font-medium">{faq.question}</span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta-light transition-colors group-open:bg-terracotta group-open:text-white">
                    <svg
                      className="h-4 w-4 transition-transform group-open:rotate-45"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-muted-foreground">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
