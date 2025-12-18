'use client';

import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type SortingState,
} from '@tanstack/react-table';
import { useState } from 'react';

import { DataTable } from '@/shared/components/ui/data-table';
import { DataTablePagination } from '@/shared/components/ui/data-table-pagination';
import { DataTableToolbar } from '@/shared/components/ui/data-table-toolbar';
import type { User } from '../../types';
import { columns } from './columns';

interface UserTableProps {
  data: User[];
  pageCount: number;
}

export function UserTable({ data, pageCount }: UserTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
  });

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchKey="user"
        searchPlaceholder="Search users..."
      />
      <DataTable table={table} columns={columns} />
      <DataTablePagination table={table} />
    </div>
  );
}
