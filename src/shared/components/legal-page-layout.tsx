'use client';

import { motion } from 'motion/react';

// Animation variants matching landing page
const premiumEase = [0.22, 1, 0.36, 1] as const;

const heroVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: premiumEase },
  },
};

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}

export function LegalPageLayout({
  title,
  lastUpdated,
  children,
}: LegalPageLayoutProps) {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-cream-dark py-16 lg:py-24">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-charcoal-light">
              Pháp lý
            </p>
            <h1 className="font-display text-4xl font-medium tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-4 text-charcoal-light">
              Cập nhật lần cuối: {lastUpdated}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="space-y-10"
          >
            {children}
          </motion.div>
        </div>
      </section>
    </main>
  );
}

// Reusable section component for legal content
interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <motion.section variants={fadeInUp}>
      <h2 className="mb-4 font-display text-2xl font-medium text-charcoal">
        {title}
      </h2>
      <div className="space-y-4 text-charcoal-light leading-relaxed">
        {children}
      </div>
    </motion.section>
  );
}

// Reusable subsection component
interface LegalSubsectionProps {
  title: string;
  children: React.ReactNode;
}

export function LegalSubsection({ title, children }: LegalSubsectionProps) {
  return (
    <div className="mt-6">
      <h3 className="mb-3 text-lg font-medium text-charcoal">{title}</h3>
      {children}
    </div>
  );
}

// Styled list for legal content
interface LegalListProps {
  items: React.ReactNode[];
}

export function LegalList({ items }: LegalListProps) {
  return (
    <ul className="ml-4 list-inside list-disc space-y-2 text-charcoal-light">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}

// Styled link for legal content
interface LegalLinkProps {
  href: string;
  children: React.ReactNode;
}

export function LegalLink({ href, children }: LegalLinkProps) {
  return (
    <a
      href={href}
      className="font-medium text-lavender-dark transition-colors hover:text-lavender"
    >
      {children}
    </a>
  );
}
