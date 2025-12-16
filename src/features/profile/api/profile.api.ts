import { api } from '@/shared/lib/api';
import type {
  ChangePasswordRequest,
  NotificationSettings,
  UpdateNotificationSettingsRequest,
  EmailVerificationStatus,
} from '../types';

// ============================================
// Password API
// ============================================

export async function changePassword(
  data: ChangePasswordRequest
): Promise<void> {
  return api.post('/auth/change-password', data);
}

// ============================================
// Email Verification API
// ============================================

export async function requestEmailVerification(): Promise<void> {
  return api.post('/auth/request-verification');
}

export async function getEmailVerificationStatus(): Promise<EmailVerificationStatus> {
  return api.get('/auth/me/verification-status');
}

// ============================================
// Notification Settings API
// ============================================

export async function getNotificationSettings(): Promise<NotificationSettings> {
  return api.get('/users/me/notifications');
}

export async function updateNotificationSettings(
  data: UpdateNotificationSettingsRequest
): Promise<NotificationSettings> {
  return api.patch('/users/me/notifications', data);
}
