const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await expect(page.getByTestId("username-input")).toBeVisible();
    await expect(page.getByTestId("password-input")).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByTestId("username-input").fill("mluukkai");
      await page.getByTestId("password-input").fill("salainen");
      await page.getByText("login").click();
      await expect(page.getByText("Matti Luukkainen logged in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByTestId("username-input").fill("msdfsdfsdf");
      await page.getByTestId("password-input").fill("ssdfsdfsdf");
      await page.getByText("login").click();

      await expect(
        page.getByText("Matti Luukkainen logged in")
      ).not.toBeVisible();
      const messageDiv = await page.locator(".user-message");
      await expect(messageDiv).toContainText("invalid username or password");
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username-input").fill("mluukkai");
      await page.getByTestId("password-input").fill("salainen");
      await page.getByText("login").click();
    });

    test.only("a new blog can be created", async ({ page }) => {
      await page.getByText("New Blog").click();
      await page.getByTestId("title-input").fill("testblog");
      await page.getByTestId("author-input").fill("tester");
      await page.getByTestId("url-input").fill("test.com");
      await page.getByRole("button", { name: "create" }).click();

      const messageDiv = await page.locator(".user-message");
      await expect(messageDiv).toContainText("testblog by tester added");
      await expect(page.getByText("testblog tester")).toBeVisible();
    });
  });
});
