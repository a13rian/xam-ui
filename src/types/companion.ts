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

// Search filter types
export interface SearchFilters {
  location: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  guests: number;
}

// Date range type
export interface DateRange {
  from: Date | null;
  to: Date | null;
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

// Search state
export interface SearchState {
  filters: SearchFilters;
  companions: Companion[];
  selectedCompanionId: string | null;
  hoveredCompanionId: string | null;
  mapViewState: MapViewState;
  isLoading: boolean;
}

