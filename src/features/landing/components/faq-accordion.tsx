'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SectionContainer, PremiumButton } from './shared';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/components/ui/accordion';
import { staggerContainer, fadeInUp } from './shared/animation-variants';

const faqs = [
  {
    question: 'How does Cogie work?',
    answer:
      'Cogie connects you with verified companions for meaningful conversations and experiences. Simply create an account, browse partners by interests and availability, book a session, and meet at your preferred location. All payments are handled securely through our platform.',
  },
  {
    question: 'Are all partners verified?',
    answer:
      'Yes, every partner on Cogie goes through a rigorous verification process including identity verification, background checks, and personal interviews. We also collect ongoing feedback to ensure quality and safety.',
  },
  {
    question: 'How much does it cost?',
    answer:
      'Prices vary by partner and type of experience. Casual conversations start from 100,000 VND per hour. Each partner sets their own rates based on their experience and specialties. You can see exact pricing on each partner profile.',
  },
  {
    question: 'How do I book a session?',
    answer:
      'Browse partners, select one you like, choose an available time slot, and confirm your booking. You will pay through our secure payment system. The partner will confirm the booking, and you will receive all the details for your meeting.',
  },
  {
    question: 'What safety measures are in place?',
    answer:
      'Safety is our top priority. All partners are verified, meetings can be in public places, we have a 24/7 support team, and all communications are logged. You can also rate and review partners after each session.',
  },
  {
    question: 'Can I become a partner?',
    answer:
      'Yes! We are always looking for thoughtful, engaging individuals to join our partner network. Click "Become a Partner" to start the application process. You will go through verification and training before being listed.',
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
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-aescape-charcoal-light">
            FAQ
          </p>
          <h2 className="font-display text-3xl font-medium tracking-tight text-aescape-charcoal md:text-4xl">
            Common Questions
          </h2>
          <p className="mt-4 text-base text-aescape-charcoal-light">
            Everything you need to know about finding meaningful connections.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 text-sm font-medium text-aescape-charcoal transition-colors hover:text-aescape-lavender-dark"
            >
              Still have questions? Contact us
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
                  className="rounded-xl border border-aescape-charcoal/10 bg-white px-6 py-1"
                >
                  <AccordionTrigger className="text-left text-base font-medium text-aescape-charcoal hover:no-underline [&[data-state=open]>svg]:text-aescape-lavender-dark">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-aescape-charcoal-light">
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
