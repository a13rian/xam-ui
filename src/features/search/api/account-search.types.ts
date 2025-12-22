// ============================================
// Account Search API Types
// ============================================

/**
 * Gallery image from account
 */
export interface AccountGalleryImage {
  id: string;
  imageUrl: string;
  caption: string | null;
}

/**
 * Price range for account services
 */
export interface AccountPriceRange {
  min: number;
  max: number;
  currency: string;
}

/**
 * Account item returned from search API
 * Matches backend AccountSearchItemDto
 */
export interface AccountSearchItem {
  id: string;
  displayName: string;
  type: 'individual' | 'business';
  status: 'active' | 'pending' | 'inactive';
  // Location
  street: string | null;
  ward: string | null;
  district: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  distanceKm: number;
  // Profile
  avatarUrl: string | null;
  tagline: string | null;
  personalBio: string | null;
  // Trust & rating
  isVerified: boolean;
  rating: number | null;
  totalReviews: number;
  completedBookings: number;
  badges: string[];
  // Additional info
  languages: string[];
  priceRange: AccountPriceRange | null;
  // Gallery
  gallery: AccountGalleryImage[];
}

/**
 * Paginated response from account search API
 */
export interface AccountSearchResponse {
  items: AccountSearchItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

/**
 * Parameters for account search API
 */
export interface AccountSearchParams {
  /** Search center latitude (required) */
  latitude: number;
  /** Search center longitude (required) */
  longitude: number;
  /** Search radius in km (default: 10, range: 1-50) */
  radiusKm?: number;
  /** Text search on display name */
  search?: string;
  /** Filter by city */
  city?: string;
  /** Filter by district */
  district?: string;
  /** Filter by ward */
  ward?: string;
  /** Page number (default: 1) */
  page?: number;
  /** Items per page (default: 20, max: 100) */
  limit?: number;
}

// ============================================
// Public Account Detail API Types
// ============================================

/**
 * Gallery image with sort order for account detail
 */
export interface AccountDetailGalleryImage {
  id: string;
  imageUrl: string;
  caption: string | null;
  sortOrder: number;
}

/**
 * Full public account details for profile pages
 * Matches backend PublicAccountResponseDto
 */
export interface PublicAccountDetail {
  id: string;
  displayName: string;
  type: 'individual' | 'business';
  status: 'active' | 'pending' | 'inactive';
  // Profile fields
  avatarUrl: string | null;
  coverImageUrl: string | null;
  videoIntroUrl: string | null;
  tagline: string | null;
  personalBio: string | null;
  specialization: string | null;
  yearsExperience: number | null;
  certifications: string[];
  // Trust & rating
  isVerified: boolean;
  rating: number | null;
  totalReviews: number;
  completedBookings: number;
  badges: string[];
  // Additional info
  languages: string[];
  priceRange: AccountPriceRange | null;
  // Gallery
  gallery: AccountDetailGalleryImage[];
}
