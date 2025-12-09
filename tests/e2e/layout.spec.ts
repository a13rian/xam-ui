import { test, expect } from "@playwright/test";

test.describe("Header", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display logo with link to home", async ({ page }) => {
    const logoLink = page.locator("header").locator("a").filter({ has: page.locator("text=Cogie") });
    await expect(logoLink).toBeVisible();
    await expect(logoLink).toHaveAttribute("href", "/");
  });

  test("should display navigation links on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await expect(page.locator("header").getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "About" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Features" })).toBeVisible();
    await expect(page.locator("header").getByRole("link", { name: "Pricing" })).toBeVisible();
  });

  test("should display Become a Partner and Sign In buttons", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    const partnerButton = page.locator("header").getByRole("link", { name: "Become a Partner" });
    const signInButton = page.locator("header").getByRole("link", { name: "Sign In" });

    await expect(partnerButton).toBeVisible();
    await expect(partnerButton).toHaveAttribute("href", "/partner");
    await expect(signInButton).toBeVisible();
    await expect(signInButton).toHaveAttribute("href", "/sign-in");
  });

  test("should have mobile menu button on small screens", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByRole("button", { name: "Toggle menu" });
    await expect(menuButton).toBeVisible();
  });

  test("should toggle mobile menu when clicking hamburger", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    const menuButton = page.getByRole("button", { name: "Toggle menu" });
    await menuButton.click();

    // Check mobile menu is visible with navigation links
    await expect(page.locator("header nav").getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.locator("header nav").getByRole("link", { name: "Become a Partner" })).toBeVisible();
    await expect(page.locator("header nav").getByRole("link", { name: "Sign In" })).toBeVisible();
  });

  test("should navigate to sign in from header", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await page.locator("header").getByRole("link", { name: "Sign In" }).click();
    await expect(page).toHaveURL("/sign-in");
  });
});

test.describe("Footer", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display newsletter subscription form", async ({ page }) => {
    await expect(page.locator("footer").getByPlaceholder("Enter your email address")).toBeVisible();
    await expect(page.locator("footer").getByRole("button", { name: "Subscribe" })).toBeVisible();
  });

  test("should display social media links", async ({ page }) => {
    await expect(page.locator("footer").getByLabel(/Go to Instagram/i)).toBeVisible();
    await expect(page.locator("footer").getByLabel(/Go to Twitter/i)).toBeVisible();
    await expect(page.locator("footer").getByLabel(/Go to LinkedIn/i)).toBeVisible();
    await expect(page.locator("footer").getByLabel(/Go to GitHub/i)).toBeVisible();
  });

  test("should display footer navigation sections", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 720 });

    await expect(page.locator("footer").getByText("Product")).toBeVisible();
    await expect(page.locator("footer").getByText("Resources")).toBeVisible();
    await expect(page.locator("footer").getByText("Support")).toBeVisible();
    await expect(page.locator("footer").getByText("Legal")).toBeVisible();
  });

  test("should have links to privacy and terms in footer", async ({ page }) => {
    const privacyLink = page.locator("footer").getByRole("link", { name: "Privacy Policy" }).first();
    const termsLink = page.locator("footer").getByRole("link", { name: "Terms of Service" }).first();

    await expect(privacyLink).toBeVisible();
    await expect(termsLink).toBeVisible();
  });

  test("should display copyright text", async ({ page }) => {
    const currentYear = new Date().getFullYear();
    await expect(page.locator("footer").getByText(`Copyright © Cogie Inc. ${currentYear}`)).toBeVisible();
  });

  test("should have back to top button", async ({ page }) => {
    const backToTopButton = page.locator("footer").getByRole("button", { name: "Back to top" });
    await expect(backToTopButton).toBeVisible();
  });

  test("should show validation error for empty newsletter email", async ({ page }) => {
    await page.locator("footer").getByRole("button", { name: "Subscribe" }).click();
    await expect(page.locator("footer").getByText("Email is required")).toBeVisible();
  });
});

test.describe("Terms of Service Page", () => {
  test("should display terms of service content", async ({ page }) => {
    await page.goto("/terms");

    await expect(page.getByRole("heading", { name: "Terms of Service" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "1. Acceptance of Terms" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "2. Description of Service" })).toBeVisible();
  });

  test("should be accessible from footer", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name: "Terms of Service" }).first().click();
    await expect(page).toHaveURL("/terms");
  });
});

test.describe("Privacy Policy Page", () => {
  test("should display privacy policy content", async ({ page }) => {
    await page.goto("/privacy");

    await expect(page.getByRole("heading", { name: "Privacy Policy" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "1. Introduction" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "2. Information We Collect" })).toBeVisible();
  });

  test("should be accessible from footer", async ({ page }) => {
    await page.goto("/");
    await page.locator("footer").getByRole("link", { name: "Privacy Policy" }).first().click();
    await expect(page).toHaveURL("/privacy");
  });
});
