'use client';

import type { IAccount } from '@/features/search/api/account-search.types';
import { BookingCard } from '@/features/bookings';
import { CompanionHero } from './companion-hero';
import { CompanionProfile } from './companion-profile';
import { CompanionBio } from './companion-bio';
import { CompanionGallery } from './companion-gallery';
import { CompanionServices } from './companion-services';
import { CompanionBookingCTA } from './companion-booking-cta';

interface CompanionDetailClientProps {
  account: IAccount;
}

export function CompanionDetailClient({ account }: CompanionDetailClientProps) {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero Section - Full width */}
      <CompanionHero
        coverImageUrl={account.coverImageUrl}
        videoIntroUrl={account.videoIntroUrl}
        displayName={account.displayName}
        avatarUrl={account.avatarUrl}
      />

      {/* Two-column layout */}
      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Content sections */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Section */}
            <CompanionProfile
              displayName={account.displayName}
              tagline={account.tagline}
              specialization={account.specialization}
              isVerified={account.isVerified}
              rating={account.rating}
              totalReviews={account.totalReviews}
              completedBookings={account.completedBookings}
              languages={account.languages}
              priceRange={account.priceRange}
              accountId={account.id}
            />

            {/* About Section */}
            <CompanionBio
              personalBio={account.personalBio}
              badges={account.badges}
            />

            {/* Services Section */}
            <CompanionServices services={account.services} />

            {/* Gallery Section */}
            <CompanionGallery galleries={account.galleries} />
          </div>

          {/* Right column - Booking form (desktop only) */}
          <div className="hidden lg:block">
            <BookingCard
              accountId={account.id}
              organizationId={account.organizationId ?? null}
              services={account.services}
            />
          </div>
        </div>
      </div>

      {/* Mobile: Sticky CTA button */}
      <div className="lg:hidden">
        <CompanionBookingCTA
          accountId={account.id}
          displayName={account.displayName}
          priceRange={account.priceRange}
        />
      </div>
    </main>
  );
}
