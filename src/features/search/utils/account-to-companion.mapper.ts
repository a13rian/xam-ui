import type { Companion, CompanionBadge } from '@/features/companions';
import type { AccountSearchItem, IAccount } from '../api/account-search.types';

// Placeholder image for accounts without images
const PLACEHOLDER_IMAGE =
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop';

/**
 * Maps a backend AccountSearchItem to frontend Companion format
 *
 * Now uses real data from API where available:
 * - images: from gallery or avatarUrl, fallback to placeholder
 * - pricing: from priceRange if available
 * - rating: from actual rating/totalReviews
 * - badges: from account badges + 'verified' if isVerified
 */
export function mapAccountToCompanion(account: AccountSearchItem): Companion {
  // Build address from available parts
  const addressParts = [account.street, account.ward, account.district].filter(
    Boolean
  );
  const address = addressParts.length > 0 ? addressParts.join(', ') : undefined;

  // Build images array: gallery first, then avatar, then placeholder
  const images: string[] = [];
  if (account.gallery && account.gallery.length > 0) {
    images.push(...account.gallery.map((g) => g.imageUrl));
  }
  if (account.avatarUrl && !images.includes(account.avatarUrl)) {
    images.unshift(account.avatarUrl);
  }
  if (images.length === 0) {
    images.push(PLACEHOLDER_IMAGE);
  }

  // Build badges array
  const badges: CompanionBadge[] = [];
  if (account.isVerified) {
    badges.push('verified');
  }
  // Map custom badges to CompanionBadge if they match
  if (account.badges) {
    for (const badge of account.badges) {
      if (badge === 'popular' || badge === 'new') {
        badges.push(badge);
      }
    }
  }

  return {
    id: account.id,
    name: account.displayName,
    bio: account.personalBio ?? account.tagline ?? '',
    images,
    location: {
      lat: account.latitude ?? 0,
      lng: account.longitude ?? 0,
      city: account.city ?? '',
      country: 'Vietnam',
      address,
    },
    profile: {
      id: account.id,
      name: account.displayName,
      avatarUrl: account.avatarUrl ?? undefined,
      isVerified: account.isVerified,
      bio: account.personalBio ?? undefined,
    },
    pricing: {
      perHour: account.priceRange?.min ?? 0,
      currency: account.priceRange?.currency ?? 'đ',
    },
    rating: {
      average: account.rating ?? 0,
      count: account.totalReviews,
    },
    badges,
    languages: account.languages,
    age: 0,
    distanceKm: account.distanceKm,
  };
}

/**
 * Maps an array of AccountSearchItems to Companion format
 */
export function mapAccountsToCompanions(
  accounts: AccountSearchItem[]
): Companion[] {
  return accounts.map(mapAccountToCompanion);
}

/**
 * Maps a PublicAccountDetail (from detail API) to frontend Companion format
 * Used for the companion detail page
 */
export function mapPublicAccountToCompanion(account: IAccount): Companion {
  // Build images array: galleries first, then avatar, then placeholder
  const images: string[] = [];
  if (account.galleries && account.galleries.length > 0) {
    // Sort by sortOrder and extract imageUrl
    const sortedGallery = [...account.galleries].sort(
      (a, b) => a.sortOrder - b.sortOrder
    );
    images.push(...sortedGallery.map((g) => g.imageUrl));
  }
  if (account.avatarUrl && !images.includes(account.avatarUrl)) {
    images.unshift(account.avatarUrl);
  }
  if (images.length === 0) {
    images.push(PLACEHOLDER_IMAGE);
  }

  // Build badges array
  const badges: CompanionBadge[] = [];
  if (account.isVerified) {
    badges.push('verified');
  }
  if (account.badges) {
    for (const badge of account.badges) {
      if (badge === 'popular' || badge === 'new') {
        badges.push(badge);
      }
    }
  }

  // Build specialties from specialization
  const specialties = account.specialization ? [account.specialization] : [];

  return {
    id: account.id,
    name: account.displayName,
    bio: account.personalBio ?? account.tagline ?? '',
    images,
    location: {
      lat: 0, // No location data in detail API
      lng: 0,
      city: '',
      country: 'Vietnam',
    },
    profile: {
      id: account.id,
      name: account.displayName,
      avatarUrl: account.avatarUrl ?? undefined,
      isVerified: account.isVerified,
      bio: account.personalBio ?? undefined,
    },
    pricing: {
      perHour: account.priceRange?.min ?? 0,
      currency: account.priceRange?.currency ?? 'đ',
    },
    rating: {
      average: account.rating ?? 0,
      count: account.totalReviews,
    },
    badges,
    specialties: specialties.length > 0 ? specialties : undefined,
    languages: account.languages.length > 0 ? account.languages : undefined,
    age: 0,
  };
}
