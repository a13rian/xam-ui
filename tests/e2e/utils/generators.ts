/**
 * Test data generators
 * Generate unique test data for each test run
 */

/**
 * Generate a unique email for testing
 */
export function generateTestEmail(prefix = 'test'): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `${prefix}-${timestamp}-${random}@test.com`;
}

/**
 * Generate a valid password for testing
 */
export function generateTestPassword(): string {
  return 'TestPassword123!';
}

/**
 * Generate test user registration data
 */
export function generateTestUserData(overrides: Partial<{
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}> = {}) {
  return {
    email: overrides.email || generateTestEmail(),
    password: overrides.password || generateTestPassword(),
    firstName: overrides.firstName || 'Test',
    lastName: overrides.lastName || 'User',
  };
}

/**
 * Generate partner registration data
 */
export function generatePartnerData(
  type: 'INDIVIDUAL' | 'BUSINESS',
  overrides: Partial<{
    displayName: string;
    specialization: string;
    businessName: string;
    bio: string;
    certifications: string[];
  }> = {}
) {
  const baseData = {
    displayName: overrides.displayName || `Test Partner ${Date.now()}`,
    specialization: overrides.specialization || 'Massage trị liệu',
    bio: overrides.bio || 'Chuyên viên massage trị liệu với 5 năm kinh nghiệm.',
  };

  if (type === 'BUSINESS') {
    return {
      ...baseData,
      accountType: 'BUSINESS' as const,
      businessName: overrides.businessName || `Test Business ${Date.now()}`,
      certifications: overrides.certifications || ['Chứng chỉ Massage'],
    };
  }

  return {
    ...baseData,
    accountType: 'INDIVIDUAL' as const,
    certifications: overrides.certifications || ['Chứng chỉ Y tế cơ bản'],
  };
}
