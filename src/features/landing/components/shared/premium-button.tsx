'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/shared/lib/utils';
import { scaleDownHover, aescapeEase } from './animation-variants';

interface PremiumButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'default' | 'large';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

const variants = {
  primary:
    'bg-aescape-charcoal text-white hover:bg-aescape-charcoal/90',
  secondary:
    'bg-aescape-lavender text-aescape-charcoal hover:bg-aescape-lavender-dark',
  outline:
    'border-2 border-aescape-cream bg-transparent text-aescape-cream hover:bg-aescape-cream/10',
  ghost:
    'bg-transparent text-aescape-charcoal hover:bg-aescape-cream-dark',
};

const sizes = {
  default: 'h-12 px-8 text-sm',
  large: 'h-14 px-10 text-base',
};

export function PremiumButton({
  variant = 'primary',
  size = 'default',
  children,
  href,
  onClick,
  className,
  type = 'button',
  disabled = false,
}: PremiumButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center rounded-full font-medium',
    'transition-colors duration-300',
    'focus:outline-none focus:ring-2 focus:ring-aescape-lavender focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    variants[variant],
    sizes[size],
    className
  );

  if (href) {
    return (
      <motion.div
        whileHover={disabled ? undefined : scaleDownHover}
        whileTap={disabled ? undefined : { scale: 0.92 }}
        transition={{ duration: 0.3, ease: aescapeEase }}
      >
        <Link href={href} className={baseClasses}>
          {children}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={baseClasses}
      whileHover={disabled ? undefined : scaleDownHover}
      whileTap={disabled ? undefined : { scale: 0.92 }}
      transition={{ duration: 0.3, ease: aescapeEase }}
    >
      {children}
    </motion.button>
  );
}
