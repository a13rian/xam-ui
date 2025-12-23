'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import {
  SectionContainer,
  staggerContainer,
  fadeInUp,
} from '@/features/landing/components/shared';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { faqs } from '../../constants';

export function FAQSection() {
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
            Thắc Mắc Về Việc Trở Thành Đối Tác
          </h2>
          <p className="mt-4 text-base text-charcoal-light">
            Tìm câu trả lời cho những câu hỏi phổ biến về quy trình đăng ký và
            làm việc cùng Cogie.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-charcoal transition-colors hover:text-lavender-dark"
            >
              Cần hỗ trợ thêm? Liên hệ chúng tôi
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
              <motion.div key={faq.question} variants={fadeInUp}>
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
