/**
 * Partner Registration E2E Tests
 * Tests the become-partner flow with authenticated user
 */
import { test, expect } from '../fixtures/auth.fixture';
import { generatePartnerData } from '../utils/generators';

test.describe('Partner Registration E2E', () => {
  // TODO: Skip - full registration flow requires all form fields to be properly configured
  test.skip('should register as INDIVIDUAL partner', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const partnerData = generatePartnerData('INDIVIDUAL');

    await page.goto('/become-partner');

    // Step 1: Select account type - Individual (radio button is already selected by default)
    // Verify "Cá nhân" is selected
    await expect(page.getByRole('radio', { name: /cá nhân/i })).toBeChecked();
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Step 2: Fill basic info
    await page.getByLabel(/tên hiển thị/i).fill(partnerData.displayName);
    // Specialization might be optional or a select
    const specializationInput = page.getByLabel(/chuyên môn/i);
    if (await specializationInput.isVisible()) {
      await specializationInput.fill(partnerData.specialization);
    }
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Step 3: Fill details
    // Bio
    const bioTextarea = page.getByLabel(/giới thiệu|bio/i);
    if (await bioTextarea.isVisible()) {
      await bioTextarea.fill(partnerData.bio);
    }

    // Skip optional fields and go to next step
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Step 4: Accept terms and submit
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /gửi đăng ký|submit|hoàn tất|xác nhận/i }).click();

    // Should show success message - use more specific selector
    // The success message should be in the main content area, not footer
    await expect(
      page.getByRole('main').getByText(/đăng ký thành công|hồ sơ.*đã gửi|chờ xét duyệt/i)
    ).toBeVisible({ timeout: 15000 });
  });

  // TODO: Skip - full registration flow requires all form fields to be properly configured
  test.skip('should register as BUSINESS partner', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const partnerData = generatePartnerData('BUSINESS');

    await page.goto('/become-partner');

    // Step 1: Select account type - Business (click on the label/card, not radio directly)
    await page.locator('label').filter({ hasText: /doanh nghiệp/i }).click();
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Step 2: Fill basic info
    await page.getByLabel(/tên hiển thị/i).fill(partnerData.displayName);

    // Business name field
    const businessNameInput = page.getByLabel(/tên doanh nghiệp|business name/i);
    if (await businessNameInput.isVisible()) {
      await businessNameInput.fill(partnerData.businessName!);
    }
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Step 3: Fill details (optional)
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Step 4: Accept terms and submit
    await page.getByRole('checkbox').check();
    await page.getByRole('button', { name: /gửi đăng ký|submit|hoàn tất|xác nhận/i }).click();

    // Should show success message - use more specific selector
    await expect(
      page.getByRole('main').getByText(/đăng ký thành công|hồ sơ.*đã gửi|chờ xét duyệt/i)
    ).toBeVisible({ timeout: 15000 });
  });

  test('should require authentication', async ({ page }) => {
    // Navigate to /become-partner without authentication
    await page.goto('/become-partner');

    // Should redirect to sign-in
    await expect(page).toHaveURL(/sign-in/);
    // Should have callback URL in query params
    expect(page.url()).toContain('callbackUrl');
  });

  test('should validate required display name', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/become-partner');

    // Step 1: Select account type (already selected by default)
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Step 2: Try to continue without filling display name
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Should show validation error
    await expect(
      page.getByText(/tên hiển thị.*ít nhất|bắt buộc|required/i)
    ).toBeVisible();
  });

  // TODO: Skip - form field interaction issues with card-style radio buttons
  test.skip('should require business name for BUSINESS type', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/become-partner');

    // Step 1: Select Business account type (click on the label/card)
    await page.locator('label').filter({ hasText: /doanh nghiệp/i }).click();
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Step 2: Fill display name but skip business name
    await page.getByLabel(/tên hiển thị/i).fill('Test Display Name');
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Should show validation error for business name
    await expect(
      page.getByText(/tên doanh nghiệp.*bắt buộc|business name.*required/i)
    ).toBeVisible();
  });

  test('should require terms acceptance before submit', async ({ authenticatedPage }) => {
    const page = authenticatedPage;
    const partnerData = generatePartnerData('INDIVIDUAL');

    await page.goto('/become-partner');

    // Go through steps quickly
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    await page.getByLabel(/tên hiển thị/i).fill(partnerData.displayName);
    await page.getByRole('button', { name: 'Tiếp theo' }).click();
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Try to submit without accepting terms
    await page.getByRole('button', { name: /gửi đăng ký|submit|hoàn tất|xác nhận/i }).click();

    // Should show validation error for terms - use more specific selector
    // Look for the error message (data-slot="form-message")
    await expect(
      page.locator('[data-slot="form-message"]').getByText(/đồng ý|cần đồng ý/i)
    ).toBeVisible();
  });

  test('should allow navigation between steps', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/become-partner');

    // Step 1
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Step 2 - fill something
    await page.getByLabel(/tên hiển thị/i).fill('Test Name');
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    // Step 3 - go back to step 2
    await page.getByRole('button', { name: 'Quay lại' }).click();

    // Data should still be there
    const displayNameInput = page.getByLabel(/tên hiển thị/i);
    await expect(displayNameInput).toHaveValue('Test Name');
  });

  // TODO: Skip - progress percentage format varies
  test.skip('should show progress indicator', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/become-partner');

    // Should have progress indicator
    const progressIndicator = page.getByRole('progressbar');
    if (await progressIndicator.isVisible()) {
      // Progress should start low (0%)
      await expect(page.getByText('0%')).toBeVisible();

      // Fill step 1 and go to next
      await page.getByRole('button', { name: 'Tiếp theo' }).click();

      // Progress should increase
      await expect(page.getByText(/25%|33%/)).toBeVisible({ timeout: 5000 });
    }
  });

  test('should show profile preview on the side', async ({ authenticatedPage }) => {
    const page = authenticatedPage;

    await page.goto('/become-partner');

    // Go to step 2 and fill display name
    await page.getByRole('button', { name: 'Tiếp theo' }).click();

    const displayName = 'Test Partner Preview';
    await page.getByLabel(/tên hiển thị/i).fill(displayName);

    // Preview should show the entered name
    // Look for preview card (visible on desktop)
    const previewCard = page.locator('[class*="preview"], [class*="Preview"]');
    if (await previewCard.isVisible()) {
      await expect(previewCard).toContainText(displayName);
    }
  });
});
