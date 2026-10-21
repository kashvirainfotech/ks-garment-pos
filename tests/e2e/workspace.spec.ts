import { expect, test } from "@playwright/test";

test("internal workspace reaches the real API and navigates to setup", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Operations overview" }),
  ).toBeVisible();
  await expect(page.getByRole("status")).toContainText("API connected");
  await page.getByRole("button", { name: "Check connection" }).click();
  await expect(page.getByRole("status")).toContainText("API connected");
  await page.getByRole("link", { name: "View workspace setup" }).click();
  await expect(
    page.getByRole("heading", { name: "The next steps for your store" }),
  ).toBeVisible();
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "The next steps for your store" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
});

test("connection failure is visible and can recover on retry", async ({
  page,
}) => {
  await page.route("**/api/v1/health", (route) =>
    route.fulfill({ status: 503, body: "{}" }),
  );
  await page.goto("/");
  await expect(page.getByRole("status")).toContainText("API unavailable");
  await page.unroute("**/api/v1/health");
  await page.getByRole("button", { name: "Check connection" }).click();
  await expect(page.getByRole("status")).toContainText("API connected");
});

test("workspace remains usable at a narrow viewport and unknown routes are clear", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Operations overview" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page
    .getByRole("link", { name: "Workspace setup", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "The next steps for your store" }),
  ).toBeVisible();
  await page.goto("/missing");
  await expect(
    page.getByRole("heading", { name: "Page not found" }),
  ).toBeVisible();
});
