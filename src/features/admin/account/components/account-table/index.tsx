'use client';

import { ColumnDef } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';

import { DataTable } from '@/shared/components/ui/table/data-table';
import { DataTableToolbar } from '@/shared/components/ui/table/data-table-toolbar';
import { useDataTable } from '@/shared/hooks/use-data-table';
import type { Account } from '../../types';
import { columns } from './columns';

interface AccountTableProps {
  data: Account[];
  totalItems: number;
}

export function AccountTable({ data, totalItems }: AccountTableProps) {
  const [pageSize] = useQueryState('perPage', parseAsInteger.withDefault(10));
  const effectivePageSize = pageSize ?? 10;
  const pageCount = Math.ceil(totalItems / effectivePageSize) || 1;

  const { table } = useDataTable({
    data,
    columns: columns as ColumnDef<Account>[],
    pageCount,
    shallow: false,
    debounceMs: 500
  });

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
