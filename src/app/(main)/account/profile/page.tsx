'use client';

import { UserInfoTab } from '@/features/profile';
import { useUser } from '@/stores';

export default function ProfilePage() {
  const user = useUser();

  if (!user) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <UserInfoTab user={user} />
    </div>
  );
}
