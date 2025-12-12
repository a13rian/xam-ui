"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Companion, MapViewState } from "@/types/companion";
import { formatPrice } from "@/lib/mock-data/companions";

// Fix Leaflet default icon issues
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "",
  iconUrl: "",
  shadowUrl: "",
});

interface CompanionMapProps {
  companions: Companion[];
  selectedId: string | null;
  hoveredId: string | null;
  onMarkerClick: (id: string) => void;
  onMarkerHover: (id: string | null) => void;
  viewState: MapViewState;
  onViewStateChange: (viewState: MapViewState) => void;
  className?: string;
}

export function CompanionMap({
  companions,
  selectedId,
  hoveredId,
  onMarkerClick,
  onMarkerHover,
  viewState,
  onViewStateChange,
  className,
}: CompanionMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = L.map(mapContainer.current, {
      center: [viewState.center[1], viewState.center[0]], // Leaflet uses [lat, lng]
      zoom: viewState.zoom,
      zoomControl: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map.current);

    // Handle view state changes
    map.current.on("moveend", () => {
      if (!map.current) return;
      const center = map.current.getCenter();
      const zoom = map.current.getZoom();
      onViewStateChange({
        center: [center.lng, center.lat],
        zoom,
      });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update markers when companions change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // Add new markers
    companions.forEach((companion) => {
      const isSelected = companion.id === selectedId;
      const isHovered = companion.id === hoveredId;

      // Create custom div icon
      const priceText = formatPrice(companion.pricing.perHour, companion.pricing.currency);
      const icon = L.divIcon({
        className: "leaflet-price-marker",
        html: `<div class="price-marker-inner ${isSelected || isHovered ? "active" : ""}">${priceText}</div>`,
        iconSize: [100, 36],
        iconAnchor: [50, 18],
      });

      const marker = L.marker([companion.location.lat, companion.location.lng], {
        icon,
      }).addTo(map.current!);

      marker.on("click", () => onMarkerClick(companion.id));
      marker.on("mouseover", () => onMarkerHover(companion.id));
      marker.on("mouseout", () => onMarkerHover(null));

      markersRef.current.set(companion.id, marker);
    });
  }, [companions, onMarkerClick, onMarkerHover]);

  // Update marker styles when selection/hover changes
  useEffect(() => {
    if (!map.current) return;

    markersRef.current.forEach((marker, id) => {
      const isSelected = id === selectedId;
      const isHovered = id === hoveredId;
      const companion = companions.find((c) => c.id === id);

      if (!companion) return;

      const priceText = formatPrice(companion.pricing.perHour, companion.pricing.currency);
      const icon = L.divIcon({
        className: "leaflet-price-marker",
        html: `<div class="price-marker-inner ${isSelected || isHovered ? "active" : ""}">${priceText}</div>`,
        iconSize: [100, 36],
        iconAnchor: [50, 18],
      });

      marker.setIcon(icon);
    });
  }, [selectedId, hoveredId, companions]);

  return (
    <div
      ref={mapContainer}
      className={`w-full h-full min-h-[400px] ${className || ""}`}
    />
  );
}

