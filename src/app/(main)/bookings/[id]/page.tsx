import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBooking } from '@/features/bookings/api';
import { BookingDetailClient } from '@/features/bookings/components/booking-detail-client';

interface BookingPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookingPageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const booking = await getBooking(id);
    return {
      title: `Booking #${booking.id.slice(-8)}`,
      description: `Chi tiết booking ngày ${new Date(booking.scheduledDate).toLocaleDateString('vi-VN')}`,
    };
  } catch {
    return {
      title: 'Không tìm thấy',
      description: 'Booking không tồn tại',
    };
  }
}

export default async function BookingDetailPage({
  params,
}: BookingPageProps) {
  const { id } = await params;

  const booking = await getBooking(id).catch(() => null);

  if (!booking) {
    notFound();
  }

  return <BookingDetailClient booking={booking} />;
}

