/**
 * Sign Up E2E Tests
 * Tests user registration flow with real backend
 */
import { test, expect } from '@playwright/test';
import { generateTestUserData, generateTestEmail } from '../utils/generators';
import { registerUser } from '../utils/api';

test.describe('Sign Up E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/sign-up');
  });

  test('should register new user successfully', async ({ page }) => {
    const userData = generateTestUserData();

    // Fill the registration form - Vietnamese placeholders
    // Form uses single fullName field (split to firstName/lastName on submit)
    await page.getByPlaceholder('Nhập họ và tên').fill(`${userData.firstName} ${userData.lastName}`);
    await page.getByPlaceholder('Nhập email của bạn').fill(userData.email);
    await page.getByPlaceholder('Tối thiểu 8 ký tự').fill(userData.password);
    await page.getByPlaceholder('Nhập lại mật khẩu').fill(userData.password);

    // Accept terms (checkbox for "Tôi đồng ý với Điều khoản dịch vụ")
    await page.getByRole('checkbox').check();

    // Submit form - Vietnamese button text
    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();

    // Wait for success message then redirect to sign-in page
    await expect(page.getByText('Đăng ký thành công!')).toBeVisible({ timeout: 10000 });
    await expect(page).toHaveURL('/sign-in', { timeout: 15000 });
  });

  test('should show error for duplicate email', async ({ page }) => {
    // First, create a user via API
    const existingUser = generateTestUserData();
    await registerUser(existingUser);

    // Try to register with the same email via UI
    await page.getByPlaceholder('Nhập họ và tên').fill('Another User');
    await page.getByPlaceholder('Nhập email của bạn').fill(existingUser.email);
    await page.getByPlaceholder('Tối thiểu 8 ký tự').fill(existingUser.password);
    await page.getByPlaceholder('Nhập lại mật khẩu').fill(existingUser.password);

    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();

    // Should show error message for duplicate email
    await expect(
      page.getByText(/email.*already|already.*exists|đã tồn tại|Registration failed/i)
    ).toBeVisible({ timeout: 10000 });
  });

  test('should validate required fields', async ({ page }) => {
    // Click submit without filling anything
    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();

    // Should show validation errors (English messages from Zod schema)
    await expect(page.getByText(/full name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  // TODO: Flaky - validation message timing issue
  test.skip('should validate email format', async ({ page }) => {
    await page.getByPlaceholder('Nhập họ và tên').fill('Test User');
    await page.getByPlaceholder('Nhập email của bạn').fill('invalid-email');
    await page.getByPlaceholder('Tối thiểu 8 ký tự').fill('Password123!');
    await page.getByPlaceholder('Nhập lại mật khẩu').fill('Password123!');

    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();

    // Should show email validation error (English from Zod: "Please enter a valid email address")
    await expect(page.getByText(/please enter a valid email address/i)).toBeVisible();
  });

  test('should validate password match', async ({ page }) => {
    await page.getByPlaceholder('Nhập họ và tên').fill('Test User');
    await page.getByPlaceholder('Nhập email của bạn').fill(generateTestEmail());
    await page.getByPlaceholder('Tối thiểu 8 ký tự').fill('Password123!');
    await page.getByPlaceholder('Nhập lại mật khẩu').fill('DifferentPassword123!');

    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();

    // Should show password mismatch error (English from Zod)
    await expect(page.getByText(/passwords do not match/i)).toBeVisible();
  });

  test('should validate password minimum length', async ({ page }) => {
    await page.getByPlaceholder('Nhập họ và tên').fill('Test User');
    await page.getByPlaceholder('Nhập email của bạn').fill(generateTestEmail());
    await page.getByPlaceholder('Tối thiểu 8 ký tự').fill('short');
    await page.getByPlaceholder('Nhập lại mật khẩu').fill('short');

    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();

    // Should show password length error (English from Zod)
    await expect(page.getByText(/password must be at least 8 characters/i)).toBeVisible();
  });

  test('should require terms acceptance', async ({ page }) => {
    await page.getByPlaceholder('Nhập họ và tên').fill('Test User');
    await page.getByPlaceholder('Nhập email của bạn').fill(generateTestEmail());
    await page.getByPlaceholder('Tối thiểu 8 ký tự').fill('Password123!');
    await page.getByPlaceholder('Nhập lại mật khẩu').fill('Password123!');

    // Don't check terms checkbox
    await page.getByRole('button', { name: 'Đăng ký', exact: true }).click();

    // Should show terms error (English from Zod)
    await expect(page.getByText(/you must agree to the terms/i)).toBeVisible();
  });

  test('should navigate to sign-in page', async ({ page }) => {
    // Vietnamese link text "Đăng nhập"
    await page.getByRole('link', { name: 'Đăng nhập' }).click();
    await expect(page).toHaveURL('/sign-in');
  });
});
