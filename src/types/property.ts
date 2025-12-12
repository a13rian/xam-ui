// Property location types
export interface PropertyLocation {
  lat: number;
  lng: number;
  city: string;
  country: string;
  address?: string;
}

// Property host types
export interface PropertyHost {
  id: string;
  name: string;
  avatarUrl?: string;
  isSuperhost: boolean;
}

// Property pricing types
export interface PropertyPricing {
  perNight: number;
  currency: string;
  cleaningFee?: number;
  serviceFee?: number;
}

// Property rating types
export interface PropertyRating {
  average: number;
  count: number;
}

// Badge types
export type PropertyBadge = "superhost" | "guest-favorite";

// Main property interface
export interface Property {
  id: string;
  title: string;
  description: string;
  images: string[];
  location: PropertyLocation;
  host: PropertyHost;
  pricing: PropertyPricing;
  rating: PropertyRating;
  badges: PropertyBadge[];
  amenities?: string[];
  maxGuests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

// Search filter types
export interface SearchFilters {
  location: string;
  checkIn: Date | null;
  checkOut: Date | null;
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
  properties: Property[];
  selectedPropertyId: string | null;
  hoveredPropertyId: string | null;
  mapViewState: MapViewState;
  isLoading: boolean;
}
