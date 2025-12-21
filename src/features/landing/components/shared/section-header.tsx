'use client';

import { motion } from 'motion/react';
import { fadeInUp, staggerContainer } from './animation-variants';

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  description,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignmentClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
      className={`mb-12 flex flex-col ${alignmentClasses} ${className}`}
    >
      {label && (
        <motion.div
          variants={fadeInUp}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium tracking-wide text-terracotta uppercase"
        >
          <span className="h-px w-6 bg-terracotta" />
          {label}
        </motion.div>
      )}

      <motion.h2
        variants={fadeInUp}
        className="font-display text-3xl font-normal tracking-tight text-foreground sm:text-4xl lg:text-5xl"
      >
        {title}
        {subtitle && (
          <>
            <br />
            <span className="text-muted-foreground">{subtitle}</span>
          </>
        )}
      </motion.h2>

      {description && (
        <motion.p
          variants={fadeInUp}
          className={`mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground ${
            align === 'center' ? 'mx-auto' : ''
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
