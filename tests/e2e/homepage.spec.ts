import { test, expect } from '@playwright/test';

test.describe('Homepage - Premium Hero', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display main headline', async ({ page }) => {
    const headline = page.locator('h1');
    await expect(headline).toBeVisible();
    await expect(headline).toContainText(/Khám Phá|Cuộc Trò Chuyện|Ý Nghĩa/);
  });

  test('should display primary CTA button', async ({ page }) => {
    const cta = page.getByRole('link', { name: /Khám Phá Partners/i });
    await expect(cta).toBeVisible();
    await expect(cta).toHaveAttribute('href', '/search');
  });

  test('should display hero image on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const heroImage = page.locator('section').first().locator('img');
    await expect(heroImage).toBeVisible();
  });

  test('should display trust statistics', async ({ page }) => {
    await expect(page.getByText('10,000+')).toBeVisible();
    await expect(page.getByText(/Cuộc trò chuyện ý nghĩa/i)).toBeVisible();
  });

  test('should display verification badge on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(page.getByText('100% Xác Minh')).toBeVisible();
  });
});

test.describe('Homepage - Trust Indicators', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display verified partners badge', async ({ page }) => {
    await expect(page.getByText('Verified Partners')).toBeVisible();
  });

  test('should display satisfaction rate', async ({ page }) => {
    await expect(page.getByText('98%')).toBeVisible();
  });

  test('should display SSL security badge', async ({ page }) => {
    await expect(page.getByText('Bảo Mật SSL')).toBeVisible();
  });
});

test.describe('Homepage - Featured Partners', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display section heading', async ({ page }) => {
    await expect(page.getByText('Gặp Gỡ Partners')).toBeVisible();
  });

  test('should display partner cards', async ({ page }) => {
    const partnerCards = page.locator('[data-testid="partner-card"]');
    await expect(partnerCards.first()).toBeVisible();
  });

  test('should display view all link', async ({ page }) => {
    const viewAllLink = page.getByRole('link', { name: /Xem tất cả/i });
    await expect(viewAllLink).toBeVisible();
    await expect(viewAllLink).toHaveAttribute('href', '/search');
  });

  test('should have carousel navigation on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const nextButton = page.locator('[data-slot="carousel-next"]');
    await expect(nextButton).toBeVisible();
  });
});

test.describe('Homepage - Value Proposition', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display about section heading', async ({ page }) => {
    await expect(page.getByText('Về Cogie')).toBeVisible();
  });

  test('should display key points', async ({ page }) => {
    await expect(page.getByText('An toàn & Bảo mật')).toBeVisible();
    await expect(page.getByText('Partners được xác minh')).toBeVisible();
  });
});

test.describe('Homepage - How It Works', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all 4 steps', async ({ page }) => {
    await expect(page.getByText('01')).toBeVisible();
    await expect(page.getByText('02')).toBeVisible();
    await expect(page.getByText('03')).toBeVisible();
    await expect(page.getByText('04')).toBeVisible();
  });

  test('should display step titles', async ({ page }) => {
    await expect(page.getByText('Đăng Ký Tài Khoản')).toBeVisible();
    await expect(page.getByText('Tìm Kiếm Partner')).toBeVisible();
    await expect(page.getByText('Đặt Lịch Hẹn')).toBeVisible();
    await expect(page.getByText('Gặp Gỡ & Chia Sẻ')).toBeVisible();
  });
});

test.describe('Homepage - Features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display all 4 features', async ({ page }) => {
    await expect(page.getByText('Kết Nối Thông Minh')).toBeVisible();
    await expect(page.getByText('Đặt Lịch Linh Hoạt')).toBeVisible();
    await expect(page.getByText('An Toàn & Tin Cậy')).toBeVisible();
    await expect(page.getByText('Thanh Toán Bảo Mật')).toBeVisible();
  });
});

test.describe('Homepage - Testimonials', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display testimonial section heading', async ({ page }) => {
    await expect(page.getByText('Khách Hàng Nói Gì')).toBeVisible();
  });

  test('should display testimonial avatars', async ({ page }) => {
    const avatar = page.locator('[data-testid="testimonial-avatar"]');
    await expect(avatar.first()).toBeVisible();
  });
});

test.describe('Homepage - Pricing Preview', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display pricing section', async ({ page }) => {
    await expect(page.getByText('Minh Bạch &')).toBeVisible();
  });

  test('should display starting price', async ({ page }) => {
    await expect(page.getByText('100.000')).toBeVisible();
    await expect(page.getByText('VND / giờ')).toBeVisible();
  });

  test('should display CTA button', async ({ page }) => {
    const ctaButtons = page.getByRole('link', { name: /Xem Các Partners/i });
    await expect(ctaButtons.first()).toBeVisible();
  });
});

test.describe('Homepage - FAQ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display FAQ section heading', async ({ page }) => {
    await expect(page.getByText('Câu Hỏi')).toBeVisible();
  });

  test('should display FAQ items', async ({ page }) => {
    await expect(page.getByText('Cogie là gì?')).toBeVisible();
    await expect(page.getByText('Làm sao để trở thành Partner?')).toBeVisible();
  });

  test('should expand FAQ item on click', async ({ page }) => {
    const faqItem = page.locator('details').first();
    await faqItem.click();
    await expect(faqItem).toHaveAttribute('open', '');
  });
});

test.describe('Homepage - Premium CTA', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display final CTA section', async ({ page }) => {
    await expect(page.getByText('Sẵn Sàng Cho Cuộc')).toBeVisible();
  });

  test('should display sign up CTA', async ({ page }) => {
    const signUpCta = page.getByRole('link', { name: /Tạo Tài Khoản Miễn Phí/i });
    await expect(signUpCta).toBeVisible();
    await expect(signUpCta).toHaveAttribute('href', '/sign-up');
  });

  test('should display become partner CTA', async ({ page }) => {
    const partnerCta = page.getByRole('link', { name: /Trở Thành Partner/i }).last();
    await expect(partnerCta).toBeVisible();
    await expect(partnerCta).toHaveAttribute('href', '/become-partner');
  });
});

test.describe('Homepage - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    const h1 = page.locator('h1');
    await expect(h1).toHaveCount(1);
  });

  test('should have alt text on hero image', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    const heroImage = page.locator('section').first().locator('img').first();
    const alt = await heroImage.getAttribute('alt');
    expect(alt).toBeTruthy();
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.keyboard.press('Tab');
    const focusedElement = page.locator(':focus');
    await expect(focusedElement).toBeVisible();
  });
});

test.describe('Homepage - Responsive', () => {
  test('should display mobile layout correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    // Hero should be visible
    await expect(page.locator('h1')).toBeVisible();

    // Hero image should be hidden on mobile
    const heroImage = page.locator('section').first().locator('img');
    await expect(heroImage).toBeHidden();
  });

  test('should display tablet layout correctly', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');

    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display desktop layout correctly', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });
    await page.goto('/');

    await expect(page.locator('h1')).toBeVisible();
    // Hero image should be visible on desktop
    const heroImage = page.locator('section').first().locator('img');
    await expect(heroImage).toBeVisible();
  });
});
