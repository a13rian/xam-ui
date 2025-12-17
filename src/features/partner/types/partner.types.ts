// Partner / Account registration types

/**
 * Account type enum - matches backend AccountTypeEnum
 */
export enum AccountTypeEnum {
  INDIVIDUAL = 'individual',
  BUSINESS = 'business',
}

export type AccountType = `${AccountTypeEnum}`;

export interface RegisterAccountRequest {
  // Common fields
  type: AccountType;
  displayName: string;

  // Individual-specific fields
  specialization?: string;
  yearsExperience?: number;
  certifications?: string[];
  portfolio?: string;
  personalBio?: string;

  // Business-specific fields
  businessName?: string;
  description?: string;
  taxId?: string;
  businessLicense?: string;
  companySize?: string;
  website?: string;
  socialMedia?: Record<string, string>;
  establishedDate?: string;
}

/**
 * Account status enum - matches backend AccountStatusEnum
 */
export enum AccountStatusEnum {
  PENDING = 'pending',
  ACTIVE = 'active',
  REJECTED = 'rejected',
  SUSPENDED = 'suspended',
}

export type AccountStatus = `${AccountStatusEnum}`;

export interface AccountStatusResponse {
  id: string;
  type: AccountType;
  status: AccountStatus;
  rejectionReason?: string | null;
}
