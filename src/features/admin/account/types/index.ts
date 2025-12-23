// Account types
export type AccountType = 'individual' | 'business';
export type AccountStatus = 'pending' | 'active' | 'rejected' | 'suspended';

export interface Account {
  id: string;
  userId: string;
  type: AccountType;
  status: AccountStatus;
  displayName: string;
  specialization: string | null;
  yearsExperience: number | null;
  certifications: string[];
  portfolio: string | null;
  personalBio: string | null;
  // Business fields
  businessName: string | null;
  taxId: string | null;
  businessLicense: string | null;
  companySize: string | null;
  website: string | null;
  // Contact
  phone: string | null;
  businessEmail: string | null;
  // Location
  city: string | null;
  district: string | null;
  // Metadata
  avatarUrl: string | null;
  rejectionReason: string | null;
  approvedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ListAccountsParams {
  page?: number;
  limit?: number;
  type?: AccountType;
  status?: AccountStatus;
  search?: string;
}

export interface ListAccountsResponse {
  items: Account[];
  total: number;
  page: number;
  limit: number;
}

export interface UpdateAccountStatusRequest {
  status: AccountStatus;
  rejectionReason?: string;
}
