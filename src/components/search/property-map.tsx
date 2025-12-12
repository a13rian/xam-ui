"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Property, MapViewState } from "@/types/property";
import { formatPrice } from "@/lib/mock-data/properties";

// Fix Leaflet default icon issues
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "",
  iconUrl: "",
  shadowUrl: "",
});

interface PropertyMapProps {
  properties: Property[];
  selectedId: string | null;
  hoveredId: string | null;
  onMarkerClick: (id: string) => void;
  onMarkerHover: (id: string | null) => void;
  viewState: MapViewState;
  onViewStateChange: (viewState: MapViewState) => void;
  className?: string;
}

export function PropertyMap({
  properties,
  selectedId,
  hoveredId,
  onMarkerClick,
  onMarkerHover,
  viewState,
  onViewStateChange,
  className,
}: PropertyMapProps) {
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

  // Update markers when properties change
  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    // Add new markers
    properties.forEach((property) => {
      const isSelected = property.id === selectedId;
      const isHovered = property.id === hoveredId;

      // Create custom div icon
      const priceText = formatPrice(property.pricing.perNight, property.pricing.currency);
      const icon = L.divIcon({
        className: "leaflet-price-marker",
        html: `<div class="price-marker-inner ${isSelected || isHovered ? "active" : ""}">${priceText}</div>`,
        iconSize: [100, 36],
        iconAnchor: [50, 18],
      });

      const marker = L.marker([property.location.lat, property.location.lng], {
        icon,
      }).addTo(map.current!);

      marker.on("click", () => onMarkerClick(property.id));
      marker.on("mouseover", () => onMarkerHover(property.id));
      marker.on("mouseout", () => onMarkerHover(null));

      markersRef.current.set(property.id, marker);
    });
  }, [properties, onMarkerClick, onMarkerHover]);

  // Update marker styles when selection/hover changes
  useEffect(() => {
    if (!map.current) return;

    markersRef.current.forEach((marker, id) => {
      const isSelected = id === selectedId;
      const isHovered = id === hoveredId;
      const property = properties.find((p) => p.id === id);

      if (!property) return;

      const priceText = formatPrice(property.pricing.perNight, property.pricing.currency);
      const icon = L.divIcon({
        className: "leaflet-price-marker",
        html: `<div class="price-marker-inner ${isSelected || isHovered ? "active" : ""}">${priceText}</div>`,
        iconSize: [100, 36],
        iconAnchor: [50, 18],
      });

      marker.setIcon(icon);
    });
  }, [selectedId, hoveredId, properties]);

  return (
    <div
      ref={mapContainer}
      className={`w-full h-full min-h-[400px] ${className || ""}`}
    />
  );
}
