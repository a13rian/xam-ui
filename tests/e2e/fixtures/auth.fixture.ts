/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Playwright fixtures for authenticated tests
 *
 * Note: ESLint rule disabled because Playwright's `use` function
 * is incorrectly flagged as a React Hook violation
 */
import { test as base, type Page, type BrowserContext } from '@playwright/test';
import { createTestUser, type TestUser } from '../utils/api';
import { generateTestUserData } from '../utils/generators';

/**
 * Extended test fixtures
 */
type AuthFixtures = {
  /** Test user with credentials and tokens */
  testUser: TestUser;
  /** Page with auth cookies set */
  authenticatedPage: Page;
};

/**
 * Test with auth fixtures
 */
export const test = base.extend<AuthFixtures>({
  // Create a unique test user for each test
  testUser: async ({}, use) => {
    const userData = generateTestUserData();
    const user = await createTestUser(userData);
    await use(user);
    // Cleanup: No API to delete user, but test DB is reset between runs
  },

  // Page with authentication cookies already set
  authenticatedPage: async ({ page, testUser }, use) => {
    // Set auth cookies to simulate logged-in state
    await page.context().addCookies([
      {
        name: 'accessToken',
        value: testUser.accessToken,
        domain: 'localhost',
        path: '/',
        sameSite: 'Strict',
      },
      {
        name: 'refreshToken',
        value: testUser.refreshToken,
        domain: 'localhost',
        path: '/',
        sameSite: 'Strict',
      },
      {
        name: 'tokenExpiry',
        value: (Date.now() + 3600000).toString(), // 1 hour from now
        domain: 'localhost',
        path: '/',
        sameSite: 'Strict',
      },
    ]);

    await use(page);
  },
});

export { expect } from '@playwright/test';

/**
 * Helper to set auth cookies on a page/context
 */
export async function setAuthCookies(
  context: BrowserContext,
  accessToken: string,
  refreshToken: string
): Promise<void> {
  await context.addCookies([
    {
      name: 'accessToken',
      value: accessToken,
      domain: 'localhost',
      path: '/',
      sameSite: 'Strict',
    },
    {
      name: 'refreshToken',
      value: refreshToken,
      domain: 'localhost',
      path: '/',
      sameSite: 'Strict',
    },
    {
      name: 'tokenExpiry',
      value: (Date.now() + 3600000).toString(),
      domain: 'localhost',
      path: '/',
      sameSite: 'Strict',
    },
  ]);
}

/**
 * Helper to clear auth cookies
 */
export async function clearAuthCookies(context: BrowserContext): Promise<void> {
  await context.clearCookies();
}
