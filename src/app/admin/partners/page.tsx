'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { Badge } from '@/shared/components/ui/badge';
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
import {
  usePendingAccounts,
  useApproveAccount,
  useRejectAccount,
  type PendingAccount,
} from '@/features/partner';
import { CheckCircle2, XCircle, Loader2, User, Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

export default function AdminPartnersPage() {
  const [page, setPage] = useState(1);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<PendingAccount | null>(
    null
  );
  const [rejectReason, setRejectReason] = useState('');

  const { data, isLoading, error } = usePendingAccounts(page, 20);
  const approveMutation = useApproveAccount();
  const rejectMutation = useRejectAccount();

  const handleApprove = (account: PendingAccount) => {
    if (
      confirm(
        `Bạn có chắc chắn muốn phê duyệt đơn đăng ký của ${account.displayName}?`
      )
    ) {
      approveMutation.mutate(account.id);
    }
  };

  const handleRejectClick = (account: PendingAccount) => {
    setSelectedAccount(account);
    setRejectReason('');
    setRejectDialogOpen(true);
  };

  const handleReject = () => {
    if (!selectedAccount || !rejectReason.trim()) {
      return;
    }

    rejectMutation.mutate(
      {
        id: selectedAccount.id,
        reason: rejectReason.trim(),
      },
      {
        onSuccess: () => {
          setRejectDialogOpen(false);
          setSelectedAccount(null);
          setRejectReason('');
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Duyệt đăng ký Partner
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý và phê duyệt các đơn đăng ký làm partner
          </p>
        </div>
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-600">
              Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const accounts = data?.items || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Duyệt đăng ký Partner
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý và phê duyệt các đơn đăng ký làm partner
          </p>
        </div>
        <Badge variant="secondary" className="text-sm">
          {total} đơn chờ duyệt
        </Badge>
      </div>

      {/* Accounts List */}
      {accounts.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <p className="text-gray-500">
                Không có đơn đăng ký nào chờ duyệt
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {accounts.map((account) => (
            <Card key={account.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-3">
                      {account.type === 'individual' ? (
                        <User className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Briefcase className="h-5 w-5 text-gray-400" />
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {account.displayName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {account.type === 'individual'
                              ? 'Cá nhân'
                              : 'Doanh nghiệp'}
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {format(new Date(account.createdAt), 'dd/MM/yyyy', {
                              locale: vi,
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {account.specialization && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Chuyên môn:
                        </p>
                        <p className="text-sm text-gray-600">
                          {account.specialization}
                        </p>
                      </div>
                    )}

                    {account.yearsExperience && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Kinh nghiệm:
                        </p>
                        <p className="text-sm text-gray-600">
                          {account.yearsExperience} năm
                        </p>
                      </div>
                    )}

                    {account.personalBio && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Giới thiệu:
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {account.personalBio}
                        </p>
                      </div>
                    )}

                    {account.certifications &&
                      account.certifications.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Chứng chỉ:
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {account.certifications.map((cert, idx) => (
                              <Badge
                                key={idx}
                                variant="secondary"
                                className="text-xs"
                              >
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                    {account.portfolio && (
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Portfolio:
                        </p>
                        <a
                          href={account.portfolio}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-orange-600 hover:underline"
                        >
                          {account.portfolio}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleApprove(account)}
                      disabled={
                        approveMutation.isPending || rejectMutation.isPending
                      }
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="h-4 w-4 mr-2" />
                      Phê duyệt
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRejectClick(account)}
                      disabled={
                        approveMutation.isPending || rejectMutation.isPending
                      }
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Từ chối
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Trước
          </Button>
          <span className="text-sm text-gray-600">
            Trang {page} / {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Sau
          </Button>
        </div>
      )}

      {/* Reject Dialog */}
      <Dialog open={rejectDialogOpen} onOpenChange={setRejectDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Từ chối đơn đăng ký</DialogTitle>
            <DialogDescription>
              Vui lòng nhập lý do từ chối đơn đăng ký của{' '}
              {selectedAccount?.displayName}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="reason">Lý do từ chối *</Label>
              <Textarea
                id="reason"
                placeholder="Nhập lý do từ chối..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setRejectDialogOpen(false);
                setRejectReason('');
              }}
              disabled={rejectMutation.isPending}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectReason.trim() || rejectMutation.isPending}
            >
              {rejectMutation.isPending && (
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              )}
              Xác nhận từ chối
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
