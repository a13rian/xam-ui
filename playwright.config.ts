import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",

  // Global setup to check backend is ready
  globalSetup: "./tests/e2e/global-setup.ts",

  use: {
    // Frontend runs on port 8100, backend on 3100
    baseURL: "http://localhost:8100",
    trace: "on-first-retry",
    // Screenshot on failure
    screenshot: "only-on-failure",
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],

  webServer: {
    command: "bun run dev",
    url: "http://localhost:8100",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
