import {
  PremiumHero,
  TrustIndicators,
  FeaturedPartners,
  ValueProposition,
  AnimatedHowItWorks,
  AnimatedFeatures,
  Testimonials,
  PricingPreview,
  AnimatedFAQ,
  PremiumCTA,
} from '@/features/landing';

export default function Home() {
  return (
    <>
      <PremiumHero />
      <TrustIndicators />
      <FeaturedPartners />
      <ValueProposition />
      <AnimatedHowItWorks />
      <AnimatedFeatures />
      <Testimonials />
      <PricingPreview />
      <AnimatedFAQ />
      <PremiumCTA />
    </>
  );
}
