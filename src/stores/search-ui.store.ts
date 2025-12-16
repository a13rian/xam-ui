'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { SearchFilters, MapViewState } from '@/types/companion';

interface SearchUIState {
  // State
  filters: SearchFilters;
  selectedCompanionId: string | null;
  hoveredCompanionId: string | null;
  mapViewState: MapViewState;
  showMobileMap: boolean;

  // Actions
  setFilters: (filters: Partial<SearchFilters>) => void;
  resetFilters: () => void;
  setSelectedCompanion: (id: string | null) => void;
  setHoveredCompanion: (id: string | null) => void;
  setMapViewState: (viewState: MapViewState) => void;
  setShowMobileMap: (show: boolean) => void;
}

const defaultFilters: SearchFilters = {
  location: '',
  dateFrom: null,
  dateTo: null,
  guests: 1,
};

const defaultMapViewState: MapViewState = {
  center: [10.8231, 106.6297], // Ho Chi Minh City default
  zoom: 12,
};

export const useSearchUIStore = create<SearchUIState>()(
  devtools(
    (set) => ({
      // Initial state
      filters: defaultFilters,
      selectedCompanionId: null,
      hoveredCompanionId: null,
      mapViewState: defaultMapViewState,
      showMobileMap: false,

      // Actions
      setFilters: (newFilters) =>
        set(
          (state) => ({
            filters: { ...state.filters, ...newFilters },
          }),
          false,
          'search/setFilters'
        ),

      resetFilters: () =>
        set({ filters: defaultFilters }, false, 'search/resetFilters'),

      setSelectedCompanion: (id) =>
        set({ selectedCompanionId: id }, false, 'search/setSelectedCompanion'),

      setHoveredCompanion: (id) =>
        set({ hoveredCompanionId: id }, false, 'search/setHoveredCompanion'),

      setMapViewState: (viewState) =>
        set({ mapViewState: viewState }, false, 'search/setMapViewState'),

      setShowMobileMap: (show) =>
        set({ showMobileMap: show }, false, 'search/setShowMobileMap'),
    }),
    { name: 'SearchUIStore' }
  )
);

// Selector hooks for optimized re-renders
export const useSearchFilters = () => useSearchUIStore((state) => state.filters);
export const useSelectedCompanionId = () =>
  useSearchUIStore((state) => state.selectedCompanionId);
export const useHoveredCompanionId = () =>
  useSearchUIStore((state) => state.hoveredCompanionId);
export const useMapViewState = () =>
  useSearchUIStore((state) => state.mapViewState);
export const useShowMobileMap = () =>
  useSearchUIStore((state) => state.showMobileMap);
