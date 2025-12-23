"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Phone,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Card } from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import type { Booking } from "../types";

interface BookingDetailClientProps {
  booking: Booking;
}

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("vi-VN").format(amount) + " " + currency;
}

function getStatusBadge(status: Booking["status"]) {
  const statusConfig = {
    pending: { label: "Chờ xác nhận", variant: "secondary" as const },
    confirmed: { label: "Đã xác nhận", variant: "default" as const },
    in_progress: { label: "Đang thực hiện", variant: "default" as const },
    completed: { label: "Hoàn thành", variant: "default" as const },
    cancelled: { label: "Đã hủy", variant: "destructive" as const },
  };

  const config = statusConfig[status] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function BookingDetailClient({
  booking,
}: BookingDetailClientProps) {
  const router = useRouter();
  const [cancelling, setCancelling] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = async () => {
    try {
      setCancelling(true);
      setError(null);
      // TODO: Implement cancel booking API call
      // await cancelBooking(booking.id, { reason: "User cancelled" });
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Không thể hủy booking. Vui lòng thử lại."
      );
    } finally {
      setCancelling(false);
    }
  };

  const scheduledDate = new Date(booking.scheduledDate);
  const canCancel = booking.status === "pending" || booking.status === "confirmed";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/dashboard/bookings"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="size-4" />
              Quay lại
            </Link>
            {getStatusBadge(booking.status)}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Booking Info Card */}
          <Card className="p-6">
            <h1 className="text-2xl font-semibold mb-6">Chi tiết booking</h1>

            <div className="space-y-4">
              {/* Date and Time */}
              <div className="flex items-start gap-3">
                <Calendar className="size-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-600">Ngày và giờ</p>
                  <p className="font-medium">
                    {scheduledDate.toLocaleDateString("vi-VN", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-sm text-gray-600">
                    {booking.startTime} - {booking.endTime}
                  </p>
                </div>
              </div>

              {/* Services */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Dịch vụ</p>
                <div className="space-y-2">
                  {booking.services.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{service.serviceName}</p>
                        <p className="text-sm text-gray-600">
                          {service.duration} phút
                        </p>
                      </div>
                      <p className="font-semibold">
                        {formatPrice(service.price, booking.currency)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3 pt-4 border-t">
                {booking.customerName && (
                  <div className="flex items-start gap-3">
                    <User className="size-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Khách hàng</p>
                      <p className="font-medium">{booking.customerName}</p>
                    </div>
                  </div>
                )}

                {booking.customerPhone && (
                  <div className="flex items-start gap-3">
                    <Phone className="size-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Số điện thoại</p>
                      <p className="font-medium">{booking.customerPhone}</p>
                    </div>
                  </div>
                )}

                {booking.customerAddress && (
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Địa chỉ</p>
                      <p className="font-medium">{booking.customerAddress}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Tổng cộng</span>
                  <span className="text-2xl font-bold">
                    {formatPrice(booking.totalAmount, booking.currency)}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Actions */}
          {canCancel && (
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Thao tác</h2>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" disabled={cancelling}>
                    {cancelling ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Đang xử lý...
                      </>
                    ) : (
                      "Hủy booking"
                    )}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Xác nhận hủy booking</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bạn có chắc chắn muốn hủy booking này? Hành động này
                      không thể hoàn tác.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Không</AlertDialogCancel>
                    <AlertDialogAction onClick={handleCancel}>
                      Có, hủy booking
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

