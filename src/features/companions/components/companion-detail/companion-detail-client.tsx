'use client';

import { BookingCard } from '@/features/bookings/components';
import type { IAccount } from '@/features/search/api/account-search.types';
import { CompanionHeader } from './companion-header';
import { CompanionHero } from './companion-hero';
import { CompanionProfile } from './companion-profile';
import { CompanionGallery } from './companion-gallery';
import { CompanionBio } from './companion-bio';

interface CompanionDetailClientProps {
  account: IAccount;
}

export function CompanionDetailClient({ account }: CompanionDetailClientProps) {
  return (
    <div className="min-h-screen bg-white">
      <CompanionHeader />

      <CompanionHero
        coverImageUrl={account.coverImageUrl}
        videoIntroUrl={account.videoIntroUrl}
        displayName={account.displayName}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <CompanionProfile
          avatarUrl={account.avatarUrl}
          displayName={account.displayName}
          tagline={account.tagline}
          specialization={account.specialization}
          isVerified={account.isVerified}
          rating={account.rating}
          totalReviews={account.totalReviews}
          completedBookings={account.completedBookings}
          languages={account.languages}
          priceRange={account.priceRange}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <CompanionBio
              personalBio={account.personalBio}
              badges={account.badges}
            />

            <CompanionGallery galleries={account.galleries} />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <BookingCard
              accountId={account.id}
              organizationId={account.organizationId ?? null}
              services={account.services}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
