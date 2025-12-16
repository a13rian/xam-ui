'use client';

import { useCallback } from 'react';
import { Switch } from '@/shared/components/ui/switch';
import { Bell, Mail, Smartphone, Megaphone, Calendar } from 'lucide-react';
import {
  useNotificationSettings,
  useUpdateNotificationSettings,
} from '../api';
import type { NotificationSettings as NotificationSettingsType } from '../types';

interface NotificationItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

function NotificationItem({
  icon,
  title,
  description,
  checked,
  onCheckedChange,
  disabled,
}: NotificationItemProps) {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 text-gray-400">{icon}</div>
        <div>
          <p className="font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
      />
    </div>
  );
}

// Default settings when API hasn't returned data yet
const defaultSettings: NotificationSettingsType = {
  emailNotifications: true,
  pushNotifications: false,
  marketingEmails: false,
  bookingReminders: true,
};

export function NotificationSettings() {
  const { data: settings, isLoading, error } = useNotificationSettings();
  const { mutate: updateSettings, isPending } = useUpdateNotificationSettings();

  // Use server data with fallback to defaults
  // TanStack Query handles optimistic updates via onMutate in the mutation hook
  const currentSettings = settings ?? defaultSettings;

  const handleToggle = useCallback(
    (key: keyof NotificationSettingsType) => (checked: boolean) => {
      updateSettings({ [key]: checked });
    },
    [updateSettings]
  );

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-48 rounded bg-gray-200" />
          <div className="h-4 w-64 rounded bg-gray-200" />
          <div className="space-y-4 pt-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between py-4">
                <div className="space-y-2">
                  <div className="h-4 w-32 rounded bg-gray-200" />
                  <div className="h-3 w-48 rounded bg-gray-200" />
                </div>
                <div className="h-6 w-11 rounded-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="rounded-lg bg-orange-100 p-2">
          <Bell className="h-5 w-5 text-orange-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Cài đặt thông báo
          </h2>
          <p className="text-sm text-gray-500">
            Tùy chỉnh cách bạn nhận thông báo
          </p>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {(error as { message?: string })?.message ||
            'Không thể tải cài đặt thông báo. Vui lòng thử lại.'}
        </div>
      )}

      <div className="divide-y divide-gray-100">
        <NotificationItem
          icon={<Mail className="h-5 w-5" />}
          title="Thông báo qua email"
          description="Nhận thông báo về đặt chỗ và cập nhật tài khoản qua email"
          checked={currentSettings.emailNotifications}
          onCheckedChange={handleToggle('emailNotifications')}
          disabled={isPending}
        />

        <NotificationItem
          icon={<Smartphone className="h-5 w-5" />}
          title="Thông báo đẩy"
          description="Nhận thông báo trực tiếp trên thiết bị của bạn"
          checked={currentSettings.pushNotifications}
          onCheckedChange={handleToggle('pushNotifications')}
          disabled={isPending}
        />

        <NotificationItem
          icon={<Megaphone className="h-5 w-5" />}
          title="Email marketing"
          description="Nhận tin tức, ưu đãi và khuyến mãi đặc biệt"
          checked={currentSettings.marketingEmails}
          onCheckedChange={handleToggle('marketingEmails')}
          disabled={isPending}
        />

        <NotificationItem
          icon={<Calendar className="h-5 w-5" />}
          title="Nhắc nhở đặt chỗ"
          description="Nhận nhắc nhở trước khi lịch hẹn diễn ra"
          checked={currentSettings.bookingReminders}
          onCheckedChange={handleToggle('bookingReminders')}
          disabled={isPending}
        />
      </div>
    </div>
  );
}
