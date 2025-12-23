'use client';

import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';
import { Text } from 'lucide-react';

import { Badge } from '@/shared/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { DataTableColumnHeader } from '@/shared/components/ui/table/data-table-column-header';
import type { User } from '../../types';
import { CellAction } from './cell-action';
import { USER_STATUS_OPTIONS } from './options';

export const columns: ColumnDef<User>[] = [
  {
    id: 'user',
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="User" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`.toUpperCase();
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.avatarUrl || undefined} />
            <AvatarFallback>{initials || 'U'}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      );
    },
    meta: {
      label: 'Search',
      placeholder: 'Search users...',
      variant: 'text',
      icon: Text
    },
    enableColumnFilter: true,
    enableSorting: false,
  },
  {
    id: 'status',
    accessorKey: 'isActive',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const isActive = row.original.isActive;
      return (
        <Badge variant={isActive ? 'default' : 'secondary'}>
          {isActive ? 'Active' : 'Inactive'}
        </Badge>
      );
    },
    meta: {
      label: 'Status',
      variant: 'select',
      options: USER_STATUS_OPTIONS
    },
    enableColumnFilter: true,
    enableSorting: false,
  },
  {
    id: 'roles',
    accessorKey: 'roleNames',
    header: 'Roles',
    cell: ({ row }) => {
      const roles = row.original.roleNames || [];
      if (roles.length === 0) {
        return <span className="text-muted-foreground">No roles</span>;
      }
      return (
        <div className="flex flex-wrap gap-1">
          {roles.slice(0, 2).map((role) => (
            <Badge key={role} variant="outline" className="text-xs">
              {role}
            </Badge>
          ))}
          {roles.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{roles.length - 2}
            </Badge>
          )}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: 'emailVerified',
    accessorKey: 'emailVerifiedAt',
    header: 'Email Verified',
    cell: ({ row }) => {
      const verified = row.original.emailVerifiedAt;
      return (
        <Badge variant={verified ? 'default' : 'outline'}>
          {verified ? 'Verified' : 'Unverified'}
        </Badge>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Joined" />
    ),
    cell: ({ row }) => format(new Date(row.original.createdAt), 'MMM dd, yyyy'),
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
