'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { cn } from '@/shared/lib/utils';
import { scaleDownHover, premiumEase } from './animation-variants';

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
    'bg-charcoal text-white hover:bg-charcoal/90',
  secondary:
    'bg-lavender text-charcoal hover:bg-lavender-dark',
  outline:
    'border-2 border-cream bg-transparent text-cream hover:bg-cream/10',
  ghost:
    'bg-transparent text-charcoal hover:bg-cream-dark',
};

const sizes = {
  default: 'h-12 px-8 text-sm',
  large: 'h-14 px-12 text-base', // hero CTAs 56px height
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
    'inline-flex items-center justify-center rounded-[16px] font-medium',
    'transition-colors duration-300',
    'focus:outline-none focus:ring-2 focus:ring-lavender focus:ring-offset-2',
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
        transition={{ duration: 0.3, ease: premiumEase }}
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
      transition={{ duration: 0.3, ease: premiumEase }}
    >
      {children}
    </motion.button>
  );
}
