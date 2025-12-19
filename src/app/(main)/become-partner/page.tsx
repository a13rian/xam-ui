'use client';

import { useRef } from 'react';
import {
  BecomePartnerHero,
  BecomePartnerBenefits,
  BecomePartnerSteps,
  BecomePartnerForm,
  BecomePartnerFAQ,
  BecomePartnerCTA,
} from '@/features/partner';

export default function BecomePartnerPage() {
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <BecomePartnerHero onScrollToForm={scrollToForm} />
      <BecomePartnerBenefits />
      <BecomePartnerSteps />
      <BecomePartnerForm ref={formRef} />
      <BecomePartnerFAQ />
      <BecomePartnerCTA onScrollToForm={scrollToForm} />
    </>
  );
}
