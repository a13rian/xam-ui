/**
 * API helpers for E2E test setup
 * Calls backend directly to create/cleanup test data
 */

// Backend API URL - port 3100 for backend with /api/v1 prefix
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:3100/api/v1';

interface RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roleIds: string[];
  };
}

interface RegisterResponse {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

export interface TestUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accessToken: string;
  refreshToken: string;
}

/**
 * Register a new user via API
 */
export async function registerUser(data: RegisterDto): Promise<RegisterResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Register failed: ${response.status} ${JSON.stringify(error)}`);
  }

  return response.json();
}

/**
 * Login user and get tokens
 */
export async function loginUser(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(`Login failed: ${response.status} ${JSON.stringify(error)}`);
  }

  return response.json();
}

/**
 * Create a test user and login, returning full test user data
 */
export async function createTestUser(data: RegisterDto): Promise<TestUser> {
  const registered = await registerUser(data);
  const loginResult = await loginUser(data.email, data.password);

  return {
    id: registered.id,
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    accessToken: loginResult.accessToken,
    refreshToken: loginResult.refreshToken,
  };
}

/**
 * Get current user info
 */
export async function getMe(accessToken: string): Promise<{ id: string; email: string }> {
  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Get me failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Check if backend is healthy
 * Try auth/me endpoint since /health doesn't exist
 */
export async function healthCheck(): Promise<boolean> {
  try {
    // Just check if the server responds - 401 is fine, means server is up
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
    });
    // Server is up if we get any response (even 401)
    return response.status === 401 || response.ok;
  } catch {
    return false;
  }
}
