import {
  AnimatedHero,
  AnimatedAbout,
  AnimatedFeatures,
  AnimatedHowItWorks,
  AnimatedFAQ,
  AnimatedCTA,
} from '@/features/landing';

export default function Home() {
  return (
    <>
      <AnimatedHero />
      <AnimatedAbout />
      <AnimatedFeatures />
      <AnimatedHowItWorks />
      <AnimatedFAQ />
      <AnimatedCTA />
    </>
  );
}
