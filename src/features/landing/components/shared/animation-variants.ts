import type { Variants } from 'motion/react';

// Premium easing curve - smooth, refined feel
export const premiumEase = [0.22, 1, 0.36, 1] as const;

// Elegant fade in from bottom
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

// Subtle fade in (no movement)
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

// Image reveal with subtle scale
export const imageReveal: Variants = {
  hidden: { opacity: 0, scale: 1.02 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: premiumEase,
    },
  },
};

// Container with staggered children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// Faster stagger for lists
export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// Card hover effect (subtle lift)
export const cardHover = {
  y: -4,
  transition: { duration: 0.3, ease: premiumEase },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

// Scale up reveal
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

// ========================================
// Additional Premium Animations
// ========================================

// Signature scale-down hover effect (tactile press-in)
export const scaleDownHover = {
  scale: 0.95,
  transition: { duration: 0.3, ease: premiumEase },
};

// Section reveal with refined timing
export const sectionReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: premiumEase,
    },
  },
};

// Video fade in (slower for cinematic effect)
export const videoFadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: premiumEase,
    },
  },
};

// Underline reveal animation for nav links
export const underlineReveal: Variants = {
  rest: { scaleX: 0, originX: 0 },
  hover: {
    scaleX: 1,
    transition: { duration: 0.4, ease: premiumEase },
  },
};

// Hero text stagger (slower, more dramatic)
export const heroStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Hero text item animation
export const heroTextItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: premiumEase,
    },
  },
};

// Card press effect (scale down on hover - tactile press)
export const cardPress = {
  rest: { scale: 1 },
  hover: {
    scale: 0.95,
    transition: { duration: 0.3, ease: premiumEase },
  },
};

// Scroll indicator bounce
export const scrollBounce: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, 8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Counter animation (for stats)
export const counterReveal: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: premiumEase,
    },
  },
};

// Timeline line draw animation
export const lineGrow: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 1.2,
      ease: premiumEase,
    },
  },
};

// Mobile menu item stagger
export const menuItemStagger: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: premiumEase,
    },
  }),
};
