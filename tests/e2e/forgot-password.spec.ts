import { test, expect } from "@playwright/test";

test.describe("Forgot Password Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/forgot-password");
  });

  test("should display forgot password form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Forgot Password" })
    ).toBeVisible();
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Send Reset Link" })
    ).toBeVisible();
  });

  test("should have link to sign in page", async ({ page }) => {
    const signInLink = page.getByRole("link", { name: "Sign In" });
    await expect(signInLink).toBeVisible();
    await expect(signInLink).toHaveAttribute("href", "/sign-in");
  });

  test("should be accessible from sign in page", async ({ page }) => {
    await page.goto("/sign-in");
    const forgotPasswordLink = page.getByRole("link", {
      name: "Forgot Password",
    });
    await expect(forgotPasswordLink).toBeVisible();
    await forgotPasswordLink.click();
    await expect(page).toHaveURL("/forgot-password");
  });

  test("should show validation error for empty email", async ({ page }) => {
    await page.getByRole("button", { name: "Send Reset Link" }).click();
    await expect(page.getByText("Email is required")).toBeVisible();
  });

  test("should accept valid email without errors", async ({ page }) => {
    await page.getByPlaceholder("Enter your email").fill("test@example.com");
    await page.getByRole("button", { name: "Send Reset Link" }).click();
    // Wait a moment for form processing
    await page.waitForTimeout(500);
    // Should not show validation errors for valid email
    await expect(page.getByText("Email is required")).not.toBeVisible();
  });

  test("should have logo link to home", async ({ page }) => {
    const logoLink = page.locator("a").filter({ has: page.locator("text=Cogie") }).first();
    await expect(logoLink).toHaveAttribute("href", "/");
  });

  test("should navigate to sign in page", async ({ page }) => {
    await page.getByRole("link", { name: "Sign In" }).click();
    await expect(page).toHaveURL("/sign-in");
  });
});
