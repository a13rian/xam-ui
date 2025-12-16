// ============================================
// Profile Types
// ============================================

import type { AuthUser } from '@/features/auth';

export interface ProfileUpdateInput {
  firstName?: string;
  lastName?: string;
}

export interface UserProfile extends AuthUser {
  createdAt?: string;
  updatedAt?: string;
}

// ============================================
// Password Types
// ============================================

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ============================================
// Notification Types
// ============================================

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  marketingEmails: boolean;
  bookingReminders: boolean;
}

export interface UpdateNotificationSettingsRequest {
  emailNotifications?: boolean;
  pushNotifications?: boolean;
  marketingEmails?: boolean;
  bookingReminders?: boolean;
}

// ============================================
// Email Verification Types
// ============================================

export interface EmailVerificationStatus {
  email: string;
  verified: boolean;
  verificationSentAt?: string;
}
