/* eslint-disable react-hooks/rules-of-hooks */
/**
 * Playwright fixtures for authenticated tests
 *
 * Note: ESLint rule disabled because Playwright's `use` function
 * is incorrectly flagged as a React Hook violation
 */
import { test as base, expect as baseExpect, type Page, type BrowserContext } from '@playwright/test';
import { generateTestUserData } from '../utils/generators';

/**
 * Extended test fixtures
 */
type AuthFixtures = {
  /** Page with auth cookies set via real UI login */
  authenticatedPage: Page;
};

/**
 * Test with auth fixtures
 * Uses real UI registration and login flow
 */
export const test = base.extend<AuthFixtures>({
  // Page authenticated via real UI sign-up and sign-in flow
  authenticatedPage: async ({ page }, use) => {
    // Capture console errors
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    // 1. Generate unique user data
    const userData = generateTestUserData();

    // 2. Register via UI
    await page.goto('/sign-up');
    await page
      .getByPlaceholder('Nhập họ và tên')
      .fill(`${userData.firstName} ${userData.lastName}`);
    await page.getByPlaceholder('Nhập email của bạn').fill(userData.email);
    await page.getByPlaceholder('Tối thiểu 8 ký tự').fill(userData.password);
    await page.getByPlaceholder('Nhập lại mật khẩu').fill(userData.password);
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();

    // 3. Wait for success message then redirect to sign-in
    await baseExpect(page.getByText('Đăng ký thành công!')).toBeVisible({ timeout: 10000 });
    await page.waitForURL('/sign-in', { timeout: 15000 });

    // 4. Login via UI
    await page.getByPlaceholder('Nhập email của bạn').fill(userData.email);
    await page.getByPlaceholder('Nhập mật khẩu').fill(userData.password);
    await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();

    // 5. Wait for redirect to home (login success)
    await page.waitForURL('/', { timeout: 10000 });

    // 6. Wait for page to fully load and auth state to hydrate
    await page.waitForLoadState('networkidle');

    // 7. Wait for authenticated UI element (user menu button)
    // This confirms Zustand store has hydrated and user is logged in
    await baseExpect(page.getByLabel('User menu')).toBeVisible({ timeout: 10000 });

    // 8. Verify authentication by checking cookies
    const cookies = await page.context().cookies();
    const accessToken = cookies.find((c) => c.name === 'accessToken');
    if (!accessToken) {
      throw new Error('Authentication failed - no accessToken cookie found');
    }

    // 9. Log any console errors for debugging
    if (consoleErrors.length > 0) {
      console.log('Console errors during fixture:', consoleErrors);
    }

    // 10. Keep listening for errors during test execution
    page.on('pageerror', (error) => {
      console.log('Page error during test:', error.message);
    });

    // 11. Page now has auth cookies and hydrated state
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
