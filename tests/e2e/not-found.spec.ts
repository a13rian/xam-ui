import { test, expect } from "@playwright/test";

test.describe("404 Not Found Page", () => {
  test("should display 404 page for invalid routes", async ({ page }) => {
    await page.goto("/some-invalid-route-that-does-not-exist");

    await expect(page.getByText("Page Not Found")).toBeVisible();
    await expect(
      page.getByText("Sorry, the page you are looking for could not be found.")
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Return Home" })
    ).toBeVisible();
  });

  test("should navigate to home when clicking Return Home", async ({
    page,
  }) => {
    await page.goto("/invalid-page");

    const returnHomeLink = page.getByRole("link", { name: "Return Home" });
    await expect(returnHomeLink).toHaveAttribute("href", "/");

    await returnHomeLink.click();
    await expect(page).toHaveURL("/");
  });
});
