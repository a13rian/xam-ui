"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Companion } from "@/types/companion";
import { CompanionCard } from "./companion-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

interface CompanionListProps {
  companions: Companion[];
  selectedId: string | null;
  hoveredId: string | null;
  onCompanionHover: (id: string | null) => void;
  onCompanionSelect: (id: string) => void;
  className?: string;
  itemsPerPage?: number;
}

export function CompanionList({
  companions,
  selectedId,
  hoveredId,
  onCompanionHover,
  onCompanionSelect,
  className,
  itemsPerPage = 12,
}: CompanionListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const prevCompanionsLengthRef = useRef(companions.length);

  // Reset to first page when companions change
  useEffect(() => {
    if (prevCompanionsLengthRef.current !== companions.length) {
      prevCompanionsLengthRef.current = companions.length;
      // Use setTimeout to schedule state update asynchronously
      const timeoutId = setTimeout(() => {
        setCurrentPage(1);
      }, 0);
      return () => clearTimeout(timeoutId);
    }
  }, [companions.length]);

  const totalPages = Math.ceil(companions.length / itemsPerPage);

  const paginatedCompanions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return companions.slice(startIndex, endIndex);
  }, [companions, currentPage, itemsPerPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of companion list
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
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
        pages.push("ellipsis");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("ellipsis");
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Tìm thấy {companions.length.toLocaleString()} người đồng hành
        </p>
      </div>

      {/* Companion grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedCompanions.map((companion) => (
          <CompanionCard
            key={companion.id}
            companion={companion}
            isSelected={selectedId === companion.id}
            isHovered={hoveredId === companion.id}
            onHover={() => onCompanionHover(companion.id)}
            onLeave={() => onCompanionHover(null)}
            onClick={() => onCompanionSelect(companion.id)}
          />
        ))}
      </div>

      {/* Empty state */}
      {companions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Không tìm thấy người đồng hành</p>
          <p className="text-sm text-gray-400 mt-1">
            Hãy thử điều chỉnh bộ lọc tìm kiếm của bạn
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
                  currentPage === 1 && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === "ellipsis" ? (
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
                  currentPage === totalPages && "pointer-events-none opacity-50"
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

