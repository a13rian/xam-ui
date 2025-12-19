# Home Page Animations Implementation

This document describes the animations added to the home page at `/src/app/(main)/page.tsx`.

## Technology

- **Motion** (Framer Motion v12) - Production-ready animation library for React
- Scroll-triggered animations using `useInView` hook
- TypeScript strict typing with `Variants` type

## Architecture

The page has been split into 6 animated client components to maintain Next.js 15 server component structure:

### 1. AnimatedHero (`_components/animated-hero.tsx`)
**Hero Section Animations:**
- Background gradient blobs fade in with scale animation
- Staggered entrance for content (headline, subheadline, CTAs, stats)
- Floating cards with gentle continuous floating motion:
  - Stats card (top right)
  - Rating card (middle right)
  - Verified badge (bottom left)
  - Online users (bottom center)
- Button hover effects with scale transformation
- Avatar stagger animation

**Animation Details:**
- Initial delay: 200ms
- Stagger delay: 100ms between items
- Floating motion: 3s cycle, -10px vertical movement
- Custom ease: cubic-bezier(0.22, 1, 0.36, 1)

### 2. AnimatedAbout (`_components/animated-about.tsx`)
**About Section Animations:**
- Scroll-triggered activation (100px before viewport)
- Image scales up from 95% to 100%
- Content stagger: badge, heading, description, button
- Avatar row appears with individual stagger (100ms each)
- Avatar hover effect: scale + rotate

**Animation Details:**
- Trigger: -100px margin from viewport
- Image duration: 700ms
- Content items: 600ms each
- Avatar hover: 1.1x scale, 5deg rotation

### 3. AnimatedFeatures (`_components/animated-features.tsx`)
**Features Section Animations:**
- Header section staggered entrance
- Feature cards slide up with stagger
- Card hover: -8px lift with shadow transition
- Icon hover: scale + rotate animation
- Highlighted card (orange) gets special treatment

**Animation Details:**
- Card stagger: 100ms
- Card hover lift: -8px, 300ms
- Icon hover: 1.1x scale, 5deg rotate

### 4. AnimatedHowItWorks (`_components/animated-how-it-works.tsx`)
**How It Works Section Animations:**
- Content section staggered from left
- Step cards slide in from left
- Active step (step 2) highlighted with orange background
- Card hover: 2% scale increase
- Number badge hover: scale + rotate

**Animation Details:**
- Step slide distance: -30px
- Stagger delay: 150ms
- Hover scale: 1.02x
- Badge hover: 1.1x scale, 5deg rotate

### 5. AnimatedFAQ (`_components/animated-faq.tsx`)
**FAQ Section Animations:**
- Left content stagger (badge, heading, description, button)
- FAQ items slide in from right
- Accordion expand/collapse with rotation
- Item hover: subtle 1% scale increase
- Button hover with scale

**Animation Details:**
- FAQ slide distance: 30px from right
- Stagger: 100ms
- Chevron rotation: 180deg when open
- Hover: 1.01x scale

### 6. AnimatedCTA (`_components/animated-cta.tsx`)
**CTA Section Animations:**
- Container scales from 95% to 100%
- Decorative blobs with continuous floating motion
- Text content stagger (heading, description, button)
- Button hover with scale effect

**Animation Details:**
- Container scale: 0.95 to 1.0
- Blob animation: 4s cycle, scale 1.0-1.1, rotate 0-5deg
- Text stagger: 150ms
- Button hover: 1.05x scale

## Animation Principles

### Performance Optimizations
1. **Once-only animations**: Using `once: true` in `useInView` to prevent re-triggering
2. **GPU-accelerated properties**: Transform (translate, scale, rotate) and opacity only
3. **Will-change hints**: Automatically handled by Motion
4. **Selective client components**: Only animated sections are client components

### User Experience
1. **Smooth easing**: Custom cubic-bezier(0.22, 1, 0.36, 1) for natural motion
2. **Appropriate durations**: 300-700ms for most animations
3. **Staggered reveals**: Creates rhythm and hierarchy
4. **Scroll margin**: -100px trigger ensures animations start before viewport
5. **Hover feedback**: All interactive elements have hover states

### Accessibility
1. **Respects reduced motion**: Motion library automatically respects `prefers-reduced-motion`
2. **No jarring animations**: All animations are subtle and enhance UX
3. **Content remains readable**: Text doesn't animate while reading
4. **Focus states preserved**: Interactive elements maintain focus indicators

## File Structure

```
src/app/(main)/
├── page.tsx                              # Server component, imports animated sections
└── _components/
    ├── animated-hero.tsx                 # Client component
    ├── animated-about.tsx                # Client component
    ├── animated-features.tsx             # Client component
    ├── animated-how-it-works.tsx         # Client component
    ├── animated-faq.tsx                  # Client component
    └── animated-cta.tsx                  # Client component
```

## Dependencies

```json
{
  "motion": "^12.23.26"
}
```

## Usage

The animations are production-ready and require no configuration. They:
- Work on all modern browsers
- Automatically handle reduced motion preferences
- Are fully TypeScript typed
- Use performant GPU-accelerated properties
- Trigger on scroll with optimal timing
- Maintain 60fps performance

## Future Enhancements

Potential improvements:
1. Add entrance animations for mobile viewport
2. Implement parallax effects for background elements
3. Add micro-interactions for form elements
4. Create custom animation variants for dark mode
5. Add page transition animations when navigating
