// ============================================
// Search Types
// ============================================

import type { Companion, MapViewState } from '@/features/companions';

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

// Search state
export interface SearchState {
  filters: SearchFilters;
  companions: Companion[];
  selectedCompanionId: string | null;
  hoveredCompanionId: string | null;
  mapViewState: MapViewState;
  isLoading: boolean;
}
