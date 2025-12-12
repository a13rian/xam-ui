'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import type { Property } from '@/types/property';
import { PropertyCard } from './property-card';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface PropertyListProps {
  properties: Property[];
  selectedId: string | null;
  hoveredId: string | null;
  onPropertyHover: (id: string | null) => void;
  onPropertySelect: (id: string) => void;
  className?: string;
  itemsPerPage?: number;
}

export function PropertyList({
  properties,
  selectedId,
  hoveredId,
  onPropertyHover,
  onPropertySelect,
  className,
  itemsPerPage = 12,
}: PropertyListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const prevPropertiesLengthRef = useRef(properties.length);

  // Reset to first page when properties change
  useEffect(() => {
    if (prevPropertiesLengthRef.current !== properties.length) {
      prevPropertiesLengthRef.current = properties.length;
      // Use setTimeout to schedule state update asynchronously
      const timeoutId = setTimeout(() => {
        setCurrentPage(1);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [properties.length]);

  const totalPages = Math.ceil(properties.length / itemsPerPage);

  const paginatedProperties = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return properties.slice(startIndex, endIndex);
  }, [properties, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of property list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Over {properties.length.toLocaleString()} homes
        </p>
      </div>

      {/* Property grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedProperties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            isSelected={selectedId === property.id}
            isHovered={hoveredId === property.id}
            onHover={() => onPropertyHover(property.id)}
            onLeave={() => onPropertyHover(null)}
            onClick={() => onPropertySelect(property.id)}
          />
        ))}
      </div>

      {/* Empty state */}
      {properties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No properties found</p>
          <p className="text-sm text-gray-400 mt-1">
            Try adjusting your search filters
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                className={cn(
                  currentPage === 1 && 'pointer-events-none opacity-50'
                )}
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                className={cn(
                  currentPage === totalPages && 'pointer-events-none opacity-50'
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
