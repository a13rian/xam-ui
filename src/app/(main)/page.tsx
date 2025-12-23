import {
  VideoHero,
  TrustBar,
  ServiceCards,
  FeatureCarousel,
  PartnersShowcase,
  HowItWorksTimeline,
  LocationCTA,
  PressLogos,
  TestimonialsCarousel,
  FAQAccordion,
  NewsletterCTA,
} from '@/features/landing';

export default function Home() {
  return (
    <main className="bg-cream">
      <VideoHero />
      <TrustBar />
      <ServiceCards />
      <FeatureCarousel />
      <PartnersShowcase />
      <HowItWorksTimeline />
      <LocationCTA />
      <PressLogos />
      <TestimonialsCarousel />
      <FAQAccordion />
      <NewsletterCTA />
    </main>
  );
}
