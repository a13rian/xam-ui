'use client';

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from 'react';
import type {
  Companion,
  MapViewState,
} from '@/features/companions';
import { defaultMapCenter, defaultMapZoom } from '@/shared/mock-data';

// Local types for search state
interface SearchFilters {
  // Text search on display name
  search: string;
  // Geolocation search radius in km
  radiusKm: number;
  // Address filters
  city: string;
  district: string;
  ward: string;
  // Pagination
  page: number;
  limit: number;
  // Legacy fields (kept for UI compatibility)
  location: string;
  dateFrom: Date | null;
  dateTo: Date | null;
  guests: number;
}

interface SearchState {
  filters: SearchFilters;
  companions: Companion[];
  selectedCompanionId: string | null;
  hoveredCompanionId: string | null;
  mapViewState: MapViewState;
  isLoading: boolean;
}

// Default values
const defaultFilters: SearchFilters = {
  search: '',
  radiusKm: 10,
  city: '',
  district: '',
  ward: '',
  page: 1,
  limit: 20,
  // Legacy fields
  location: '',
  dateFrom: null,
  dateTo: null,
  guests: 1,
};

const defaultMapViewState: MapViewState = {
  center: defaultMapCenter,
  zoom: defaultMapZoom,
};

const initialState: SearchState = {
  filters: defaultFilters,
  companions: [],
  selectedCompanionId: null,
  hoveredCompanionId: null,
  mapViewState: defaultMapViewState,
  isLoading: false,
};

// Action types
type SearchAction =
  | { type: 'SET_FILTERS'; payload: Partial<SearchFilters> }
  | { type: 'SET_COMPANIONS'; payload: Companion[] }
  | { type: 'SET_SELECTED_COMPANION'; payload: string | null }
  | { type: 'SET_HOVERED_COMPANION'; payload: string | null }
  | { type: 'SET_MAP_VIEW_STATE'; payload: MapViewState }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET_FILTERS' };

// Reducer
function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'SET_FILTERS':
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case 'SET_COMPANIONS':
      return { ...state, companions: action.payload };
    case 'SET_SELECTED_COMPANION':
      return { ...state, selectedCompanionId: action.payload };
    case 'SET_HOVERED_COMPANION':
      return { ...state, hoveredCompanionId: action.payload };
    case 'SET_MAP_VIEW_STATE':
      return { ...state, mapViewState: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'RESET_FILTERS':
      return { ...state, filters: defaultFilters };
    default:
      return state;
  }
}

// Context
const SearchContext = createContext<SearchState | null>(null);
const SearchDispatchContext = createContext<Dispatch<SearchAction> | null>(
  null
);

// Provider
export function SearchProvider({
  children,
  initialCompanions = [],
}: {
  children: ReactNode;
  initialCompanions?: Companion[];
}) {
  const [state, dispatch] = useReducer(searchReducer, {
    ...initialState,
    companions: initialCompanions,
  });

  return (
    <SearchContext.Provider value={state}>
      <SearchDispatchContext.Provider value={dispatch}>
        {children}
      </SearchDispatchContext.Provider>
    </SearchContext.Provider>
  );
}

// Hooks
export function useSearchState() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchState must be used within SearchProvider');
  }
  return context;
}

export function useSearchDispatch() {
  const context = useContext(SearchDispatchContext);
  if (!context) {
    throw new Error('useSearchDispatch must be used within SearchProvider');
  }
  return context;
}

// Convenience hook combining both
export function useSearch() {
  return { state: useSearchState(), dispatch: useSearchDispatch() };
}
