// User types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  dateOfBirth: string | null;
  gender: 'male' | 'female' | 'other' | null;
  avatarUrl: string | null;
  isActive: boolean;
  emailVerifiedAt: string | null;
  roleIds: string[];
  roleNames: string[];
  failedLoginAttempts: number;
  lockedUntil: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  roleIds?: string[];
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  isActive?: boolean;
  roleIds?: string[];
}

export interface ListUsersParams {
  page?: number;
  limit?: number;
  search?: string;
  isActive?: boolean;
  roleId?: string;
}

export interface ListUsersResponse {
  items: User[];
  total: number;
  page: number;
  limit: number;
}
