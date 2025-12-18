'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MoreHorizontal, Eye, Pencil, Trash2, UserX, UserCheck } from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import { ROUTES } from '@/shared/constants/routes';
import type { User } from '../../types';
import { useDeleteUser, useUpdateUser } from '../../api/user.queries';
import { DeleteConfirmDialog } from '../delete-confirm-dialog';

interface CellActionProps {
  data: User;
}

export function CellAction({ data }: CellActionProps) {
  const router = useRouter();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteMutation = useDeleteUser();
  const updateMutation = useUpdateUser();

  const handleToggleStatus = () => {
    updateMutation.mutate({
      id: data.id,
      data: { isActive: !data.isActive },
    });
  };

  const handleDelete = () => {
    deleteMutation.mutate(data.id, {
      onSuccess: () => setShowDeleteDialog(false),
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push(ROUTES.ADMIN.USER(data.id))}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push(`${ROUTES.ADMIN.USER(data.id)}?edit=true`)}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={handleToggleStatus}
            disabled={updateMutation.isPending}
          >
            {data.isActive ? (
              <>
                <UserX className="mr-2 h-4 w-4" />
                Deactivate
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Activate
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setShowDeleteDialog(true)}
            className="text-red-600"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteConfirmDialog
        open={showDeleteDialog}
        onOpenChange={setShowDeleteDialog}
        onConfirm={handleDelete}
        loading={deleteMutation.isPending}
        title="Delete User"
        description={`Are you sure you want to delete ${data.firstName} ${data.lastName}? This action cannot be undone.`}
      />
    </>
  );
}
