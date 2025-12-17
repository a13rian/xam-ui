'use client';

import {
  PartnerRegisterForm,
  PartnerStatusCard,
  usePartnerAccountStatus,
} from '@/features/partner';

export default function BecomePartnerPage() {
  const { data, isLoading, error } = usePartnerAccountStatus();

  // Loading state
  if (isLoading) {
    return (
      <div className="container min-h-screen mx-auto space-y-6 flex items-center justify-center">
        <div className="mx-auto max-w-3xl rounded-2xl bg-white p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
            Đang tải...
          </div>
        </div>
      </div>
    );
  }

  // If account exists, show status card
  if (data) {
    return (
      <div className="container min-h-screen mx-auto space-y-6 flex items-center justify-center">
        <PartnerStatusCard />
      </div>
    );
  }

  // No account or error - show registration form
  return (
    <div className="container min-h-screen mx-auto space-y-6 flex items-center justify-center">
      <PartnerRegisterForm />
    </div>
  );
}
