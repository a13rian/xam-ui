'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { Map as MapIcon, List } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { SearchProvider, useSearch } from './search-context';
import { SearchFilters } from './search-filters';
import { CompanionList } from '@/features/companions/components/companion-list';
import type { Companion } from '@/features/companions';

// Dynamically import map to avoid SSR issues with Leaflet
const CompanionMap = dynamic(
  () => import('@/features/companions/components/companion-map').then((mod) => mod.CompanionMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] bg-gray-100 animate-pulse flex items-center justify-center">
        <span className="text-gray-400">Đang tải bản đồ...</span>
      </div>
    ),
  }
);

interface SearchPageClientProps {
  initialCompanions: Companion[];
}

function SearchContent() {
  const { state, dispatch } = useSearch();
  const [showMobileMap, setShowMobileMap] = useState(false);

  const handleCompanionHover = (id: string | null) => {
    dispatch({ type: 'SET_HOVERED_COMPANION', payload: id });
  };

  const handleCompanionSelect = (id: string) => {
    dispatch({ type: 'SET_SELECTED_COMPANION', payload: id });
  };

  const handleMapViewChange = (viewState: typeof state.mapViewState) => {
    dispatch({ type: 'SET_MAP_VIEW_STATE', payload: viewState });
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Filters bar */}
      <div className="bg-white border-b px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <SearchFilters />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 relative">
        {/* Companion list */}
        <div
          className={cn(
            'w-full lg:w-[65%] xl:w-[60%] overflow-y-auto p-4 lg:p-6',
            showMobileMap && 'hidden lg:block'
          )}
        >
          <div className="max-w-3xl mx-auto lg:max-w-none">
            <CompanionList
              companions={state.companions}
              selectedId={state.selectedCompanionId}
              hoveredId={state.hoveredCompanionId}
              onCompanionHover={handleCompanionHover}
              onCompanionSelect={handleCompanionSelect}
            />
          </div>
        </div>

        {/* Map - desktop */}
        <div className="hidden lg:block lg:w-[35%] xl:w-[40%] sticky top-16 h-[calc(100vh-4rem)] p-4 lg:p-6">
          <div className="w-full h-full rounded-[32px] overflow-hidden">
            <CompanionMap
              companions={state.companions}
              selectedId={state.selectedCompanionId}
              hoveredId={state.hoveredCompanionId}
              onMarkerClick={handleCompanionSelect}
              onMarkerHover={handleCompanionHover}
              viewState={state.mapViewState}
              onViewStateChange={handleMapViewChange}
            />
          </div>
        </div>

        {/* Mobile map modal */}
        {showMobileMap && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white pt-16">
            <div className="h-full">
              <CompanionMap
                companions={state.companions}
                selectedId={state.selectedCompanionId}
                hoveredId={state.hoveredCompanionId}
                onMarkerClick={handleCompanionSelect}
                onMarkerHover={handleCompanionHover}
                viewState={state.mapViewState}
                onViewStateChange={handleMapViewChange}
              />
            </div>
          </div>
        )}

        {/* Mobile toggle button */}
        <Button
          onClick={() => setShowMobileMap(!showMobileMap)}
          className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 rounded-full shadow-lg gap-2"
        >
          {showMobileMap ? (
            <>
              <List className="size-4" />
              Hiện danh sách
            </>
          ) : (
            <>
              <MapIcon className="size-4" />
              Hiện bản đồ
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function SearchPageClient({ initialCompanions }: SearchPageClientProps) {
  return (
    <SearchProvider initialCompanions={initialCompanions}>
      <SearchContent />
    </SearchProvider>
  );
}
