'use client';

import { motion } from 'motion/react';
import { cn } from '@/shared/lib/utils';
import { sectionReveal } from './animation-variants';

interface SectionContainerProps {
  children: React.ReactNode;
  className?: string;
  background?: 'cream' | 'cream-dark' | 'white' | 'dark' | 'transparent';
  spacing?: 'default' | 'large' | 'small' | 'none';
  id?: string;
  animate?: boolean;
}

const backgrounds = {
  cream: 'bg-cream',
  'cream-dark': 'bg-cream-dark',
  white: 'bg-white',
  dark: 'bg-footer-bg',
  transparent: 'bg-transparent',
};

const spacings = {
  none: '',
  small: 'py-10 lg:py-16',
  default: 'py-14 lg:py-24',
  large: 'py-20 lg:py-32',
};

export function SectionContainer({
  children,
  className,
  background = 'cream',
  spacing = 'default',
  id,
  animate = true,
}: SectionContainerProps) {
  const Wrapper = animate ? motion.section : 'section';
  const animationProps = animate
    ? {
        initial: 'hidden',
        whileInView: 'visible',
        viewport: { once: true, margin: '-100px' },
        variants: sectionReveal,
      }
    : {};

  return (
    <Wrapper
      id={id}
      className={cn(backgrounds[background], spacings[spacing], className)}
      {...animationProps}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </Wrapper>
  );
}
