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
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Toinen Kayttaja",
        username: "toinenKayttaja",
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

    test("a new blog can be created and liked", async ({ page }) => {
      await page.getByText("New Blog").click();
      await page.getByTestId("title-input").fill("testblog");
      await page.getByTestId("author-input").fill("tester");
      await page.getByTestId("url-input").fill("test.com");
      await page.getByRole("button", { name: "create" }).click();

      const messageDiv = await page.locator(".user-message");
      await expect(messageDiv).toContainText("testblog by tester added");
      await expect(page.getByText("testblog tester")).toBeVisible();

      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();
      await expect(page.getByText("likes 1")).toBeVisible();
      await expect(messageDiv).toContainText("testblog updated");
    });

    test("a blog can be removed by the user who created it", async ({
      page,
    }) => {
      await page.getByText("New Blog").click();
      await page.getByTestId("title-input").fill("testblog");
      await page.getByTestId("author-input").fill("tester");
      await page.getByTestId("url-input").fill("test.com");
      await page.getByRole("button", { name: "create" }).click();

      const messageDiv = page.locator(".user-message");
      await expect(messageDiv).toContainText("testblog by tester added");

      const blogElement = page.getByText("testblog by tester").locator("..");
      await blogElement.getByRole("button", { name: "view" }).click();

      page.once("dialog", async (dialog) => {
        expect(dialog.message()).toContain("Remove blog testblog by tester");
        await dialog.accept();
      });

      await blogElement.getByRole("button", { name: "delete" }).click();

      await expect(page.getByText("testblog by tester")).toHaveCount(0);
    });

    test("a blog cannot be removed by another user", async ({ page }) => {
      await page.getByText("New Blog").click();
      await page.getByTestId("title-input").fill("testblog");
      await page.getByTestId("author-input").fill("tester");
      await page.getByTestId("url-input").fill("test.com");
      await page.getByRole("button", { name: "create" }).click();

      await page.getByText("logout").click();
      await page.getByTestId("username-input").fill("toinenKayttaja");
      await page.getByTestId("password-input").fill("salainen");
      await page.getByText("login").click();

      await expect(page.getByText("Toinen Kayttaja logged in")).toBeVisible();
      await expect(page.getByText("testblog tester")).toBeVisible();
      const blogElement = page.getByText("testblog by tester").locator("..");
      await blogElement.getByRole("button", { name: "view" }).click();
      await expect(
        blogElement.getByRole("button", { name: "delete" })
      ).toHaveCount(0);
    });
  });
});
