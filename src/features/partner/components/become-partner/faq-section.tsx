'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { faqs } from '../../constants';

interface FAQItemProps {
  question: string;
  answer: string;
  index: number;
}

function FAQItem({ question, answer, index }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white p-5 text-left transition-all hover:border-orange-200 hover:shadow-md"
      >
        <span className="pr-4 font-medium text-gray-900">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="shrink-0"
        >
          <ChevronDown className="h-5 w-5 text-gray-500" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-5 pb-5 pt-3 text-gray-600">{answer}</div>
      </motion.div>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left - Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-orange-500">
              <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
              FAQ
            </span>
            <h2 className="mb-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="mb-8 text-gray-600">
              Tìm câu trả lời cho những thắc mắc phổ biến về việc trở thành Partner Cogie.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700"
            >
              Cần hỗ trợ thêm?
              <ChevronDown className="h-4 w-4 rotate-[-90deg]" />
            </Link>
          </motion.div>

          {/* Right - FAQ Items */}
          <div className="space-y-4 lg:col-span-3">
            {faqs.map((faq, i) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
