import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: false,
  use: { baseURL: "http://127.0.0.1:5173", trace: "retain-on-failure" },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: [
    {
      command: "npm run dev:backend",
      url: "http://127.0.0.1:3000/api/v1/health",
      reuseExistingServer: false,
      timeout: 60000,
    },
    {
      command: "npm run dev:frontend",
      url: "http://127.0.0.1:5173",
      reuseExistingServer: false,
      timeout: 60000,
    },
  ],
});
