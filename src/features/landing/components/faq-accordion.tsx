'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SectionContainer } from './shared';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { staggerContainer, fadeInUp } from './shared/animation-variants';

const faqs = [
  {
    question: 'Cogie hoạt động như thế nào?',
    answer:
      'Cogie kết nối bạn với các đối tác đã xác minh để có những cuộc trò chuyện và trải nghiệm ý nghĩa. Chỉ cần tạo tài khoản, duyệt đối tác theo sở thích và lịch trình, đặt buổi hẹn và gặp tại địa điểm bạn chọn. Tất cả thanh toán được xử lý an toàn qua nền tảng của chúng tôi.',
  },
  {
    question: 'Tất cả đối tác đều được xác minh?',
    answer:
      'Đúng vậy, mọi đối tác trên Cogie đều trải qua quy trình xác minh nghiêm ngặt bao gồm xác minh danh tính, kiểm tra lý lịch và phỏng vấn cá nhân. Chúng tôi cũng thu thập phản hồi liên tục để đảm bảo chất lượng và an toàn.',
  },
  {
    question: 'Chi phí như thế nào?',
    answer:
      'Giá cả thay đổi theo đối tác và loại trải nghiệm. Trò chuyện nhẹ nhàng bắt đầu từ 100,000 VND mỗi giờ. Mỗi đối tác tự đặt mức giá dựa trên kinh nghiệm và chuyên môn của họ. Bạn có thể xem giá chính xác trên hồ sơ của từng đối tác.',
  },
  {
    question: 'Làm thế nào để đặt lịch hẹn?',
    answer:
      'Duyệt đối tác, chọn người bạn thích, chọn khung giờ trống và xác nhận đặt lịch. Bạn sẽ thanh toán qua hệ thống thanh toán an toàn của chúng tôi. Đối tác sẽ xác nhận đặt lịch và bạn sẽ nhận được mọi chi tiết cho buổi gặp.',
  },
  {
    question: 'Có những biện pháp an toàn nào?',
    answer:
      'An toàn là ưu tiên hàng đầu của chúng tôi. Tất cả đối tác đều được xác minh, các buổi gặp có thể ở nơi công cộng, chúng tôi có đội ngũ hỗ trợ 24/7 và tất cả liên lạc đều được ghi nhận. Bạn cũng có thể đánh giá và nhận xét đối tác sau mỗi buổi.',
  },
  {
    question: 'Tôi có thể trở thành đối tác không?',
    answer:
      'Được! Chúng tôi luôn tìm kiếm những cá nhân chu đáo, hấp dẫn để tham gia mạng lưới đối tác. Nhấn "Trở Thành Đối Tác" để bắt đầu quy trình đăng ký. Bạn sẽ trải qua xác minh và đào tạo trước khi được liệt kê.',
  },
];

export function FAQAccordion() {
  return (
    <SectionContainer background="cream" id="faq">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Left - Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="lg:col-span-4"
        >
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal-light">
            Câu Hỏi Thường Gặp
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-charcoal md:text-4xl">
            Những Thắc Mắc Phổ Biến
          </h2>
          <p className="mt-4 text-base text-charcoal-light">
            Tất cả những gì bạn cần biết về việc tìm kiếm kết nối ý nghĩa.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-charcoal transition-colors hover:text-lavender-dark"
            >
              Còn thắc mắc? Liên hệ chúng tôi
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>

        {/* Right - Accordion */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="lg:col-span-7 lg:col-start-6"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <AccordionItem
                  value={`item-${index}`}
                  className="rounded-xl border border-charcoal/10 bg-white px-6 py-1"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-charcoal hover:no-underline [&[data-state=open]>svg]:text-lavender-dark">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-charcoal-light">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
