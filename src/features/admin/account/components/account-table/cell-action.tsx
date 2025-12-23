'use client';

import { useState } from 'react';
import {
  MoreHorizontal,
  Eye,
  CheckCircle,
  XCircle,
  Ban,
  RotateCcw,
} from 'lucide-react';

import { Button } from '@/shared/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog';
import { Textarea } from '@/shared/components/ui/textarea';
import { Label } from '@/shared/components/ui/label';
import type { Account } from '../../types';
import { useUpdateAccountStatus } from '../../api/account.queries';
import { useApproveAccount, useRejectAccount } from '@/features/partner/api/partner.queries';
import { AccountDetailDialog } from '../account-detail-dialog';

interface CellActionProps {
  data: Account;
}

export function CellAction({ data }: CellActionProps) {
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  const updateStatusMutation = useUpdateAccountStatus();
  const approveMutation = useApproveAccount();
  const rejectMutation = useRejectAccount();

  const handleApprove = () => {
    approveMutation.mutate(data.id);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) return;
    rejectMutation.mutate(
      { id: data.id, reason: rejectionReason },
      {
        onSuccess: () => {
          setShowRejectDialog(false);
          setRejectionReason('');
        },
      }
    );
  };

  const handleSuspend = () => {
    updateStatusMutation.mutate({
      id: data.id,
      data: { status: 'suspended' },
    });
  };

  const handleReactivate = () => {
    updateStatusMutation.mutate({
      id: data.id,
      data: { status: 'active' },
    });
  };

  const isPending = data.status === 'pending';
  const isActive = data.status === 'active';
  const isSuspended = data.status === 'suspended';

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
          <DropdownMenuItem onClick={() => setShowDetailDialog(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {isPending && (
            <>
              <DropdownMenuItem
                onClick={handleApprove}
                disabled={approveMutation.isPending}
                className="text-green-600"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setShowRejectDialog(true)}
                className="text-red-600"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </DropdownMenuItem>
            </>
          )}
          {isActive && (
            <DropdownMenuItem
              onClick={handleSuspend}
              disabled={updateStatusMutation.isPending}
              className="text-orange-600"
            >
              <Ban className="mr-2 h-4 w-4" />
              Suspend
            </DropdownMenuItem>
          )}
          {isSuspended && (
            <DropdownMenuItem
              onClick={handleReactivate}
              disabled={updateStatusMutation.isPending}
              className="text-green-600"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Reactivate
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      <AccountDetailDialog
        account={data}
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
      />

      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Account</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this account. This will be
              visible to the account owner.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Rejection Reason</Label>
              <Textarea
                id="reason"
                placeholder="Enter rejection reason..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              disabled={rejectMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionReason.trim() || rejectMutation.isPending}
            >
              {rejectMutation.isPending ? 'Rejecting...' : 'Reject'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
