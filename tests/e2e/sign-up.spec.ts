import { test, expect } from "@playwright/test";

test.describe("Sign Up Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/sign-up");
  });

  test("should display sign up form", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Create Account" })
    ).toBeVisible();
    await expect(page.getByPlaceholder("Enter your full name")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your email")).toBeVisible();
    await expect(page.getByPlaceholder("Enter your password")).toBeVisible();
    await expect(page.getByPlaceholder("Confirm your password")).toBeVisible();
    await expect(page.getByRole("checkbox")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign Up", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Sign Up with Google" })
    ).toBeVisible();
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

  test("should toggle confirm password visibility", async ({ page }) => {
    const confirmPasswordInput = page.getByPlaceholder("Confirm your password");
    const toggleButton = page.getByTestId("toggle-confirm-password");

    await expect(confirmPasswordInput).toHaveAttribute("type", "password");

    await toggleButton.click();
    await expect(confirmPasswordInput).toHaveAttribute("type", "text");

    await toggleButton.click();
    await expect(confirmPasswordInput).toHaveAttribute("type", "password");
  });

  test("should have link to sign in page", async ({ page }) => {
    const signInLink = page.getByRole("link", { name: "Sign In" });
    await expect(signInLink).toBeVisible();
    await expect(signInLink).toHaveAttribute("href", "/sign-in");
  });

  test("should have links to terms and privacy policy", async ({ page }) => {
    const termsLink = page.getByRole("link", { name: "Terms of Service" });
    const privacyLink = page.getByRole("link", { name: "Privacy Policy" });

    await expect(termsLink).toBeVisible();
    await expect(termsLink).toHaveAttribute("href", "/terms");
    await expect(privacyLink).toBeVisible();
    await expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  test("should show validation errors for empty form submission", async ({ page }) => {
    await page.getByRole("button", { name: "Sign Up", exact: true }).click();

    await expect(page.getByText("Full name is required")).toBeVisible();
    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("should accept valid form data without errors", async ({ page }) => {
    await page.getByPlaceholder("Enter your full name").fill("John Doe");
    await page.getByPlaceholder("Enter your email").fill("test@example.com");
    await page.getByPlaceholder("Enter your password").fill("password123");
    await page.getByPlaceholder("Confirm your password").fill("password123");
    await page.getByRole("checkbox").click();
    await page.getByRole("button", { name: "Sign Up", exact: true }).click();

    // Should not show validation errors for valid data
    await expect(page.getByText("Full name is required")).not.toBeVisible();
    await expect(page.getByText("Email is required")).not.toBeVisible();
  });

  test("should show validation error for password mismatch", async ({ page }) => {
    await page.getByPlaceholder("Enter your full name").fill("John Doe");
    await page.getByPlaceholder("Enter your email").fill("test@example.com");
    await page.getByPlaceholder("Enter your password").fill("password123");
    await page.getByPlaceholder("Confirm your password").fill("differentpassword");
    await page.getByRole("checkbox").click();
    await page.getByRole("button", { name: "Sign Up", exact: true }).click();

    await expect(page.getByText("Passwords do not match")).toBeVisible();
  });

  test("should show validation error for short password", async ({ page }) => {
    await page.getByPlaceholder("Enter your full name").fill("John Doe");
    await page.getByPlaceholder("Enter your email").fill("test@example.com");
    await page.getByPlaceholder("Enter your password").fill("short");
    await page.getByPlaceholder("Confirm your password").fill("short");
    await page.getByRole("checkbox").click();
    await page.getByRole("button", { name: "Sign Up", exact: true }).click();

    await expect(page.getByText("Password must be at least 8 characters")).toBeVisible();
  });

  test("should show validation error when terms not accepted", async ({ page }) => {
    await page.getByPlaceholder("Enter your full name").fill("John Doe");
    await page.getByPlaceholder("Enter your email").fill("test@example.com");
    await page.getByPlaceholder("Enter your password").fill("password123");
    await page.getByPlaceholder("Confirm your password").fill("password123");
    await page.getByRole("button", { name: "Sign Up", exact: true }).click();

    await expect(page.getByText("You must agree to the terms and conditions")).toBeVisible();
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
