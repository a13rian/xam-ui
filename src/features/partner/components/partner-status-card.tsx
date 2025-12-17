'use client';

import Link from 'next/link';
import { AlertTriangle, CheckCircle2, Clock, Ban } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Button } from '@/shared/components/ui/button';
import { AccountStatusEnum } from '../types';
import { usePartnerAccountStatus } from '../api';

export function PartnerStatusCard() {
  const { data, isLoading, error } = usePartnerAccountStatus();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trạng thái Partner</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
            Đang tải trạng thái...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || !data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Trở thành Partner</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            Bạn chưa đăng ký trở thành Partner trên Cogie.
          </p>
          <Button
            asChild
            variant="outline"
            className="border-orange-500 text-orange-600 hover:bg-orange-50"
          >
            <Link href="/become-partner">Đăng ký trở thành Partner</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (data.status === AccountStatusEnum.PENDING) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-base">
            <Clock className="h-4 w-4 text-orange-500" />
            Hồ sơ Partner đang được xem xét
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600">
            Cảm ơn bạn đã gửi hồ sơ. Đội ngũ Cogie sẽ kiểm duyệt và liên hệ lại
            trong thời gian sớm nhất.
          </p>
          <p className="text-xs text-gray-400">
            Trong lúc chờ duyệt, bạn có thể hoàn thiện thêm thông tin cá nhân và
            bảo mật tài khoản.
          </p>
        </CardContent>
      </Card>
    );
  }

  if (data.status === AccountStatusEnum.ACTIVE) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-base">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            Tài khoản Partner đã được kích hoạt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-gray-600">
            Chúc mừng! Bạn đã sẵn sàng để nhận booking từ khách hàng.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link href="/dashboard/bookings">Xem booking</Link>
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link href="/dashboard/settings">Cài đặt tài khoản</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (data.status === AccountStatusEnum.REJECTED) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2 text-base">
            <AlertTriangle className="h-4 w-4 text-red-500" />
            Hồ sơ Partner bị từ chối
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-gray-600">
            Rất tiếc, hồ sơ của bạn chưa được phê duyệt.
          </p>
          {data.rejectionReason && (
            <div className="rounded-lg bg-red-50 p-3 text-xs text-red-700">
              <span className="font-semibold">Lý do: </span>
              {data.rejectionReason}
            </div>
          )}
          <Button asChild variant="outline" size="sm">
            <Link href="/become-partner">
              Gửi lại hồ sơ / Cập nhật thông tin
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  // SUSPENDED or unknown status
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2 text-base">
          <Ban className="h-4 w-4 text-amber-500" />
          Tài khoản Partner đã bị tạm khóa
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-gray-600">
          Tài khoản Partner của bạn hiện đang bị tạm khóa và không thể nhận
          booking.
        </p>
        <div className="rounded-lg bg-amber-50 p-3">
          <p className="text-xs text-amber-800">
            <span className="font-semibold">Lưu ý: </span>
            Vui lòng liên hệ đội ngũ hỗ trợ của Cogie để được hỗ trợ và khôi
            phục tài khoản.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="outline" size="sm">
            <Link href="/dashboard/settings">Xem cài đặt tài khoản</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
