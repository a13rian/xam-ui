"use client";

import { cn } from "@/shared/lib/utils";
import type { Companion } from "@/features/companions";
import { CompanionCard } from "./companion-card";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/shared/components/ui/pagination";

interface CompanionListProps {
  companions: Companion[];
  selectedId: string | null;
  hoveredId: string | null;
  onCompanionHover: (id: string | null) => void;
  onCompanionSelect: (id: string) => void;
  className?: string;
  // Server-side pagination props
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export function CompanionList({
  companions,
  selectedId,
  hoveredId,
  onCompanionHover,
  onCompanionSelect,
  className,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: CompanionListProps) {
  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 10; // Increased from 5 to show more pages

    if (totalPages <= maxVisible) {
      // Show all pages if total pages is less than max visible
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Show more pages around current page (2 pages before and after)
      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      // Add ellipsis if there's a gap between first page and start
      if (start > 2) {
        pages.push("ellipsis");
      }

      // Show pages around current page
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // Add ellipsis if there's a gap between end and last page
      if (end < totalPages - 1) {
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
      {/* Companion grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companions.map((companion) => (
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
      {totalPages > 1 && onPageChange && (
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
