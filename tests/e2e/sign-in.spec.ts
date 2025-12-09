import { test, expect } from "@playwright/test";

test.describe("Sign In Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-in");
  });

  test("should display sign in form", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your password")).toBeVisible();
    await expect(page.getByRole("button", { name: "Sign In", exact: true })).toBeVisible();
  });

  test("should have Google sign in button", async ({ page }) => {
    await expect(page.getByRole("button", { name: /Sign In with Google/i })).toBeVisible();
  });

  test("should have sign up link", async ({ page }) => {
    await expect(page.getByRole("link", { name: "Sign Up" })).toBeVisible();
  });

  test("should have remember me checkbox", async ({ page }) => {
    await expect(page.getByText("Remember me")).toBeVisible();
  });

  test("should have forgot password link", async ({ page }) => {
    const forgotPasswordLink = page.getByRole("link", { name: "Forgot Password" });
    await expect(forgotPasswordLink).toBeVisible();
    await expect(forgotPasswordLink).toHaveAttribute("href", "/forgot-password");
  });

  test("should toggle password visibility", async ({ page }) => {
    const passwordInput = page.getByPlaceholder("Enter your password");
    const toggleButton = page.getByTestId("toggle-password");

    await expect(passwordInput).toHaveAttribute("type", "password");
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "text");
    await toggleButton.click();
    await expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("should show validation errors for empty form submission", async ({ page }) => {
    await page.getByRole("button", { name: "Sign In", exact: true }).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("should accept valid form data without errors", async ({ page }) => {
    await page.getByPlaceholder("Enter your email").fill("test@example.com");
    await page.getByPlaceholder("Enter your password").fill("password123");
    await page.getByRole("button", { name: "Sign In", exact: true }).click();

    // Should not show validation errors for valid data
    await expect(page.getByText("Email is required")).not.toBeVisible();
    await expect(page.getByText("Password is required")).not.toBeVisible();
  });

  test("should show validation error for short password", async ({ page }) => {
    await page.getByPlaceholder("Enter your email").fill("test@example.com");
    await page.getByPlaceholder("Enter your password").fill("short");
    await page.getByRole("button", { name: "Sign In", exact: true }).click();

    await expect(page.getByText("Password must be at least 8 characters")).toBeVisible();
  });

  test("should have logo link to home", async ({ page }) => {
    const logoLink = page.locator("a").filter({ has: page.locator("text=Cogie") }).first();
    await expect(logoLink).toHaveAttribute("href", "/");
  });

  test("should navigate to sign up page", async ({ page }) => {
    await page.getByRole("link", { name: "Sign Up" }).click();
    await expect(page).toHaveURL("/sign-up");
  });
});
