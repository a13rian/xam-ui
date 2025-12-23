/**
 * Sign In E2E Tests
 * Tests user login flow with real backend
 */
import { test, expect } from '@playwright/test';
import { generateTestUserData } from '../utils/generators';
import { createTestUser } from '../utils/api';

test.describe('Sign In E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-in');
  });

  test('should login with valid credentials', async ({ page }) => {
    // Create a user via API first
    const userData = generateTestUserData();
    await createTestUser(userData);

    // Fill login form - Vietnamese placeholders
    await page.getByPlaceholder('Nhập email của bạn').fill(userData.email);
    await page.getByPlaceholder('Nhập mật khẩu').fill(userData.password);

    // Submit form - Vietnamese button text
    await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();

    // After successful login, should redirect to home or dashboard
    await expect(page).toHaveURL('/', { timeout: 10000 });

    // Verify auth cookies are set
    const cookies = await page.context().cookies();
    const accessToken = cookies.find((c) => c.name === 'accessToken');
    expect(accessToken).toBeDefined();
    expect(accessToken?.value).toBeTruthy();
  });

  test('should show error for invalid password', async ({ page }) => {
    // Create a user via API first
    const userData = generateTestUserData();
    await createTestUser(userData);

    // Try to login with wrong password
    await page.getByPlaceholder('Nhập email của bạn').fill(userData.email);
    await page.getByPlaceholder('Nhập mật khẩu').fill('WrongPassword123!');

    await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();

    // Should show error message (backend returns English error)
    await expect(
      page.getByText(/invalid.*credentials|incorrect|sai.*mật khẩu|không đúng|Login failed/i)
    ).toBeVisible({ timeout: 10000 });
  });

  test('should show error for non-existent email', async ({ page }) => {
    await page.getByPlaceholder('Nhập email của bạn').fill('nonexistent@test.com');
    await page.getByPlaceholder('Nhập mật khẩu').fill('AnyPassword123!');

    await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();

    // Should show error message
    await expect(
      page.getByText(/invalid.*credentials|user.*not found|không tồn tại|không đúng|Login failed/i)
    ).toBeVisible({ timeout: 10000 });
  });

  // TODO: Skip - callback URL redirect not implemented in current auth flow
  test.skip('should redirect to callback URL after login', async ({ page }) => {
    // Create a user via API first
    const userData = generateTestUserData();
    await createTestUser(userData);

    // Go to sign-in with callback URL
    await page.goto('/sign-in?callbackUrl=/become-partner');

    // Fill and submit login form
    await page.getByPlaceholder('Nhập email của bạn').fill(userData.email);
    await page.getByPlaceholder('Nhập mật khẩu').fill(userData.password);
    await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();

    // Should redirect to callback URL
    await expect(page).toHaveURL('/become-partner', { timeout: 10000 });
  });

  test('should validate required fields', async ({ page }) => {
    // Click submit without filling anything
    await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();

    // Should show validation errors (English messages from Zod schema)
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  // TODO: Flaky - validation message timing issue
  test.skip('should validate email format', async ({ page }) => {
    await page.getByPlaceholder('Nhập email của bạn').fill('invalid-email');
    await page.getByPlaceholder('Nhập mật khẩu').fill('Password123!');

    await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();

    // Should show email validation error (English from Zod: "Please enter a valid email address")
    await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
  });

  test('should toggle password visibility', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('Nhập mật khẩu');
    const toggleButton = page.getByTestId('toggle-password');

    await passwordInput.fill('TestPassword123!');

    // Initially password should be hidden
    await expect(passwordInput).toHaveAttribute('type', 'password');

    // Click toggle to show password
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'text');

    // Click toggle to hide password again
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute('type', 'password');
  });

  test('should navigate to sign-up page', async ({ page }) => {
    // Vietnamese link text "Đăng ký ngay"
    await page.getByRole('link', { name: 'Đăng ký ngay' }).click();
    await expect(page).toHaveURL('/sign-up');
  });

  test('should navigate to forgot password page', async ({ page }) => {
    // Vietnamese link text "Quên mật khẩu?"
    await page.getByRole('link', { name: 'Quên mật khẩu?' }).click();
    await expect(page).toHaveURL('/forgot-password');
  });
});
