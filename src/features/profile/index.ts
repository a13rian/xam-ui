// Types
export type {
  ProfileUpdateInput,
  UserProfile,
  ChangePasswordRequest,
  NotificationSettings,
  UpdateNotificationSettingsRequest,
  EmailVerificationStatus,
} from './types';

// Re-export auth mutations for profile updates
export {
  updateUser,
  uploadAvatar,
  removeAvatar,
} from '@/features/auth';

// API
export {
  changePassword,
  requestEmailVerification,
  getEmailVerificationStatus,
  getNotificationSettings,
  updateNotificationSettings,
} from './api';

// Query hooks
export {
  useChangePassword,
  useEmailVerificationStatus,
  useRequestEmailVerification,
  useNotificationSettings,
  useUpdateNotificationSettings,
} from './api';

// Components
export {
  ProfileHeader,
  UserInfoTab,
  ChangePasswordForm,
  EmailVerificationSection,
  NotificationSettings as NotificationSettingsComponent,
} from './components';
