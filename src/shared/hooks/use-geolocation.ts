'use client';

import { useState, useEffect, useCallback } from 'react';

interface GeolocationState {
  latitude: number | null;
  longitude: number | null;
  error: string | null;
  isLoading: boolean;
}

interface UseGeolocationOptions {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
}

// Default coordinates: Ho Chi Minh City center
const DEFAULT_COORDS = {
  latitude: 10.7769,
  longitude: 106.7009,
};

/**
 * Hook to get user's geolocation
 *
 * Falls back to Ho Chi Minh City coordinates when:
 * - Geolocation API not supported
 * - User denies permission
 * - Geolocation request fails
 *
 * @example
 * const { latitude, longitude, isLoading, error } = useGeolocation();
 */
export function useGeolocation(options: UseGeolocationOptions = {}) {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    error: null,
    isLoading: true,
  });

  const requestLocation = useCallback(() => {
    // Check if geolocation is supported
    if (typeof window === 'undefined' || !navigator.geolocation) {
      setState({
        ...DEFAULT_COORDS,
        error: 'Geolocation is not supported by your browser',
        isLoading: false,
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        // Fall back to default coordinates on any error
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Bạn đã từ chối quyền truy cập vị trí';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Không thể xác định vị trí của bạn';
            break;
          case error.TIMEOUT:
            errorMessage = 'Yêu cầu vị trí đã hết thời gian chờ';
            break;
          default:
            errorMessage = 'Không thể lấy vị trí của bạn';
        }

        setState({
          ...DEFAULT_COORDS,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: options.enableHighAccuracy ?? false,
        timeout: options.timeout ?? 10000,
        maximumAge: options.maximumAge ?? 300000, // 5 minutes cache
      }
    );
  }, [options.enableHighAccuracy, options.timeout, options.maximumAge]);

  useEffect(() => {
    requestLocation();
  }, [requestLocation]);

  return {
    ...state,
    requestLocation,
    isUsingDefault: state.error !== null,
  };
}
