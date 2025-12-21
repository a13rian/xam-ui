'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { faqs } from '../../constants';
import { containerVariants, itemVariants, slideInLeft, premiumEase } from '../../lib/animations';

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div variants={itemVariants} className="group">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between rounded-2xl border border-border/50 bg-background p-5 text-left transition-all hover:border-terracotta/30 hover:shadow-md"
      >
        <span className="pr-4 font-medium text-foreground">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: premiumEase }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-terracotta-light"
        >
          <ChevronDown className="h-4 w-4 text-terracotta" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: premiumEase }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 pt-4 leading-relaxed text-muted-foreground">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  return (
    <section className="bg-cream py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Left - Header */}
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <span className="mb-4 inline-flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-terracotta">
              <span className="h-px w-8 bg-terracotta/40" />
              FAQ
            </span>
            <h2 className="mb-4 font-display text-3xl tracking-tight text-foreground sm:text-4xl">
              Câu Hỏi Thường Gặp
            </h2>
            <p className="mb-8 leading-relaxed text-muted-foreground">
              Tìm câu trả lời cho những thắc mắc phổ biến về việc trở thành Partner Cogie.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 font-medium text-terracotta transition-colors hover:text-terracotta-dark"
            >
              Cần hỗ trợ thêm?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          {/* Right - FAQ Items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4 lg:col-span-3"
          >
            {faqs.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
