'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { Map as MapIcon, List, Loader2, AlertCircle, MapPin } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/components/ui/button';
import { SearchProvider, useSearch } from './search-context';
import { SearchFilters } from './search-filters';
import { CompanionList } from '@/features/companions/components/companion-list';
import { useGeolocation } from '@/shared/hooks';
import { useAccountSearch } from '../api';
import { mapAccountsToCompanions } from '../utils';
import type { AccountSearchParams } from '../api';

// Dynamically import map to avoid SSR issues with Leaflet
const CompanionMap = dynamic(
  () =>
    import('@/features/companions/components/companion-map').then(
      (mod) => mod.CompanionMap
    ),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[400px] bg-cream-dark animate-pulse flex items-center justify-center rounded-[32px]">
        <span className="text-charcoal-light">Đang tải bản đồ...</span>
      </div>
    ),
  }
);

// Loading skeleton component
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-3">
      <Loader2 className="size-8 animate-spin text-lavender-dark" />
      <p className="text-charcoal-light">Đang tìm kiếm...</p>
    </div>
  );
}

// Error state component
function ErrorState({
  message,
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <AlertCircle className="size-12 text-destructive" />
      <div className="text-center">
        <p className="text-destructive font-medium">Không thể tải kết quả</p>
        <p className="text-charcoal-light text-sm mt-1">
          {message || 'Vui lòng thử lại sau'}
        </p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Thử lại
        </Button>
      )}
    </div>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <MapPin className="size-12 text-charcoal-light/40" />
      <div className="text-center">
        <p className="text-charcoal font-medium">Không tìm thấy kết quả</p>
        <p className="text-charcoal-light text-sm mt-1">
          Thử thay đổi vị trí hoặc mở rộng phạm vi tìm kiếm
        </p>
      </div>
    </div>
  );
}

// Location notice component
function LocationNotice({ isUsingDefault }: { isUsingDefault: boolean }) {
  if (!isUsingDefault) return null;

  return (
    <div className="bg-cream-dark border border-charcoal/10 rounded-xl px-4 py-3 mb-4 text-sm text-charcoal">
      <span className="font-medium">Lưu ý:</span> Đang sử dụng vị trí mặc định
      (TP. Hồ Chí Minh). Cho phép truy cập vị trí để có kết quả chính xác hơn.
    </div>
  );
}

function SearchContent() {
  const { state, dispatch } = useSearch();
  const [showMobileMap, setShowMobileMap] = useState(false);

  // Get user's geolocation
  const {
    latitude,
    longitude,
    isLoading: geoLoading,
    isUsingDefault,
  } = useGeolocation();

  // Build search params from state and geolocation
  const searchParams: AccountSearchParams | null = useMemo(() => {
    if (!latitude || !longitude) return null;

    return {
      latitude,
      longitude,
      radiusKm: state.filters.radiusKm || 10,
      search: state.filters.search || undefined,
      city: state.filters.city || undefined,
      district: state.filters.district || undefined,
      ward: state.filters.ward || undefined,
      page: state.filters.page || 1,
      limit: state.filters.limit || 20,
    };
  }, [latitude, longitude, state.filters]);

  // Fetch accounts from API
  const {
    data,
    isLoading: searchLoading,
    isError,
    error,
    refetch,
  } = useAccountSearch(searchParams);

  // Map accounts to companions when data changes
  useEffect(() => {
    if (data?.items) {
      const companions = mapAccountsToCompanions(data.items);
      dispatch({ type: 'SET_COMPANIONS', payload: companions });
    }
  }, [data, dispatch]);

  // Update loading state in context
  useEffect(() => {
    dispatch({ type: 'SET_LOADING', payload: geoLoading || searchLoading });
  }, [geoLoading, searchLoading, dispatch]);

  const handleCompanionHover = (id: string | null) => {
    dispatch({ type: 'SET_HOVERED_COMPANION', payload: id });
  };

  const handleCompanionSelect = (id: string) => {
    dispatch({ type: 'SET_SELECTED_COMPANION', payload: id });
  };

  const handleMapViewChange = (viewState: typeof state.mapViewState) => {
    dispatch({ type: 'SET_MAP_VIEW_STATE', payload: viewState });
  };

  const handleRetry = () => {
    refetch();
  };

  // Determine what to render in the list area
  const renderListContent = () => {
    if (geoLoading || searchLoading) {
      return <LoadingState />;
    }

    if (isError) {
      return (
        <ErrorState
          message={(error as Error)?.message}
          onRetry={handleRetry}
        />
      );
    }

    if (state.companions.length === 0) {
      return <EmptyState />;
    }

    return (
      <CompanionList
        companions={state.companions}
        selectedId={state.selectedCompanionId}
        hoveredId={state.hoveredCompanionId}
        onCompanionHover={handleCompanionHover}
        onCompanionSelect={handleCompanionSelect}
      />
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-cream">
      {/* Filters bar */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-cream-dark px-4 py-3 sticky top-16 z-40">
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
            <LocationNotice isUsingDefault={isUsingDefault} />
            {data && !isError && (
              <p className="text-sm text-charcoal-light mb-4">
                Tìm thấy {data.total} kết quả
                {data.totalPages > 1 &&
                  ` (trang ${data.page}/${data.totalPages})`}
              </p>
            )}
            {renderListContent()}
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

export function SearchPageClient() {
  return (
    <SearchProvider>
      <SearchContent />
    </SearchProvider>
  );
}
