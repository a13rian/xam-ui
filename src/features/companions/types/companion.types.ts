// ============================================
// Companion Types
// ============================================

// Companion location types
export interface CompanionLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
  address?: string;
}

// Companion profile types
export interface CompanionProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  isVerified: boolean;
  age?: number;
  bio?: string;
}

// Companion pricing types
export interface CompanionPricing {
  perHour: number;
  currency: string;
  serviceFee?: number;
}

// Companion rating types
export interface CompanionRating {
  average: number;
  count: number;
}

// Badge types
export type CompanionBadge = "verified" | "popular" | "new";

// Main companion interface
export interface Companion {
  id: string;
  name: string;
  bio: string;
  images: string[];
  location: CompanionLocation;
  profile: CompanionProfile;
  pricing: CompanionPricing;
  rating: CompanionRating;
  badges: CompanionBadge[];
  specialties?: string[];
  languages?: string[];
  age: number;
  gender?: string;
}

// Map types
export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface MapViewState {
  center: [number, number];
  zoom: number;
  bounds?: MapBounds;
}

// API Response
export interface CompanionsListResponse {
  items: Companion[];
  total: number;
  page: number;
  limit: number;
}
