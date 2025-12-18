'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { User, Briefcase } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { DataTableColumnHeader } from '@/shared/components/ui/data-table-column-header';
import type { Account } from '../../types';
import { CellAction } from './cell-action';

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  active: 'bg-green-100 text-green-800 border-green-200',
  rejected: 'bg-red-100 text-red-800 border-red-200',
  suspended: 'bg-gray-100 text-gray-800 border-gray-200',
};

export const columns: ColumnDef<Account>[] = [
  {
    id: 'account',
    accessorKey: 'displayName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Account" />
    ),
    cell: ({ row }) => {
      const account = row.original;
      const Icon = account.type === 'individual' ? User : Briefcase;
      return (
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">{account.displayName}</p>
            <p className="text-sm text-muted-foreground capitalize">
              {account.type}
            </p>
          </div>
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Type" />
    ),
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">
        {row.original.type === 'individual' ? 'Individual' : 'Business'}
      </Badge>
    ),
    enableSorting: false,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge className={`${statusColors[status]} border`} variant="outline">
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'specialization',
    header: 'Specialization',
    cell: ({ row }) => row.original.specialization || '-',
    enableSorting: false,
  },
  {
    accessorKey: 'city',
    header: 'Location',
    cell: ({ row }) => {
      const { city, district } = row.original;
      if (!city && !district) return '-';
      return [district, city].filter(Boolean).join(', ');
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created" />
    ),
    cell: ({ row }) => format(new Date(row.original.createdAt), 'MMM dd, yyyy'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
