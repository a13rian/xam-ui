"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Map as MapIcon, List } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SearchProvider, useSearch } from "./search-context";
import { SearchFilters } from "./search-filters";
import { PropertyList } from "./property-list";
import type { Property } from "@/types/property";

// Dynamically import map to avoid SSR issues with Leaflet
const PropertyMap = dynamic(() => import("./property-map").then((mod) => mod.PropertyMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] bg-gray-100 animate-pulse flex items-center justify-center">
      <span className="text-gray-400">Loading map...</span>
    </div>
  ),
});

interface SearchPageClientProps {
  initialProperties: Property[];
}

function SearchContent() {
  const { state, dispatch } = useSearch();
  const [showMobileMap, setShowMobileMap] = useState(false);

  const handlePropertyHover = (id: string | null) => {
    dispatch({ type: "SET_HOVERED_PROPERTY", payload: id });
  };

  const handlePropertySelect = (id: string) => {
    dispatch({ type: "SET_SELECTED_PROPERTY", payload: id });
  };

  const handleMapViewChange = (viewState: typeof state.mapViewState) => {
    dispatch({ type: "SET_MAP_VIEW_STATE", payload: viewState });
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
        {/* Property list */}
        <div
          className={cn(
            "w-full lg:w-[65%] xl:w-[60%] overflow-y-auto p-4 lg:p-6",
            showMobileMap && "hidden lg:block"
          )}
        >
          <div className="max-w-3xl mx-auto lg:max-w-none">
            <PropertyList
              properties={state.properties}
              selectedId={state.selectedPropertyId}
              hoveredId={state.hoveredPropertyId}
              onPropertyHover={handlePropertyHover}
              onPropertySelect={handlePropertySelect}
            />
          </div>
        </div>

        {/* Map - desktop */}
        <div className="hidden lg:block lg:w-[35%] xl:w-[40%] sticky top-16 h-[calc(100vh-4rem)] p-4 lg:p-6">
          <div className="w-full h-full rounded-[32px] overflow-hidden">
            <PropertyMap
              properties={state.properties}
              selectedId={state.selectedPropertyId}
              hoveredId={state.hoveredPropertyId}
              onMarkerClick={handlePropertySelect}
              onMarkerHover={handlePropertyHover}
              viewState={state.mapViewState}
              onViewStateChange={handleMapViewChange}
            />
          </div>
        </div>

        {/* Mobile map modal */}
        {showMobileMap && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white pt-16">
            <div className="h-full">
              <PropertyMap
                properties={state.properties}
                selectedId={state.selectedPropertyId}
                hoveredId={state.hoveredPropertyId}
                onMarkerClick={handlePropertySelect}
                onMarkerHover={handlePropertyHover}
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
              Show list
            </>
          ) : (
            <>
              <MapIcon className="size-4" />
              Show map
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export function SearchPageClient({ initialProperties }: SearchPageClientProps) {
  return (
    <SearchProvider initialProperties={initialProperties}>
      <SearchContent />
    </SearchProvider>
  );
}
