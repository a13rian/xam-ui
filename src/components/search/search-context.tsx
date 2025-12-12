"use client";

import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
  type Dispatch,
} from "react";
import type {
  Property,
  SearchFilters,
  MapViewState,
  SearchState,
} from "@/types/property";
import { defaultMapCenter, defaultMapZoom } from "@/lib/mock-data/properties";

// Default values
const defaultFilters: SearchFilters = {
  location: "",
  checkIn: null,
  checkOut: null,
  guests: 1,
};

const defaultMapViewState: MapViewState = {
  center: defaultMapCenter,
  zoom: defaultMapZoom,
};

const initialState: SearchState = {
  filters: defaultFilters,
  properties: [],
  selectedPropertyId: null,
  hoveredPropertyId: null,
  mapViewState: defaultMapViewState,
  isLoading: false,
};

// Action types
type SearchAction =
  | { type: "SET_FILTERS"; payload: Partial<SearchFilters> }
  | { type: "SET_PROPERTIES"; payload: Property[] }
  | { type: "SET_SELECTED_PROPERTY"; payload: string | null }
  | { type: "SET_HOVERED_PROPERTY"; payload: string | null }
  | { type: "SET_MAP_VIEW_STATE"; payload: MapViewState }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "RESET_FILTERS" };

// Reducer
function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    case "SET_PROPERTIES":
      return { ...state, properties: action.payload };
    case "SET_SELECTED_PROPERTY":
      return { ...state, selectedPropertyId: action.payload };
    case "SET_HOVERED_PROPERTY":
      return { ...state, hoveredPropertyId: action.payload };
    case "SET_MAP_VIEW_STATE":
      return { ...state, mapViewState: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "RESET_FILTERS":
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
  initialProperties = [],
}: {
  children: ReactNode;
  initialProperties?: Property[];
}) {
  const [state, dispatch] = useReducer(searchReducer, {
    ...initialState,
    properties: initialProperties,
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
    throw new Error("useSearchState must be used within SearchProvider");
  }
  return context;
}

export function useSearchDispatch() {
  const context = useContext(SearchDispatchContext);
  if (!context) {
    throw new Error("useSearchDispatch must be used within SearchProvider");
  }
  return context;
}

// Convenience hook combining both
export function useSearch() {
  return { state: useSearchState(), dispatch: useSearchDispatch() };
}
