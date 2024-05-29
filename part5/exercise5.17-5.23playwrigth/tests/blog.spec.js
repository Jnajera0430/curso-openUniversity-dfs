const { test, expect, beforeEach, describe } = require("@playwright/test");
const { loginWith, createBlog, blogs } = require("./helper");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/test/reset");
    await request.post("/api/users", {
      data: {
        name: "Superuser",
        username: "root",
        password: "salainen",
      },
    });
    await page.goto("/");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = page.getByText("log in to application");
    await expect(locator).toBeVisible();

    await page.getByRole("button", { name: "login" }).click();

    const locatorUsername = await page.getByText("username");
    const locatorPassword = await page.getByText("password");

    await expect(locatorUsername).toBeVisible();
    await expect(locatorPassword).toBeVisible();
  });

  describe("Login", () => {
    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("root");
      await page.getByTestId("password").fill("salainen");
      await page.getByRole("button", { name: "login" }).click();

      await expect(page.getByText("Superuser logged-in")).toBeVisible();
    });

    test("fails with wrong credentials", async ({ page }) => {
      await page.getByRole("button", { name: "login" }).click();
      await page.getByTestId("username").fill("root");
      await page.getByTestId("password").fill("wrong");
      await page.getByRole("button", { name: "login" }).click();

      const errorDiv = page.locator(".error");
      await expect(errorDiv).toHaveCSS("border-style", "solid");
      await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
      await expect(errorDiv).toContainText("Wrong username or password");
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root", "salainen");
    });

    test("a new blog can be created", async ({ page }) => {
      const blog = {
        title: "Anxios parents are one who need help",
        author: "new york time",
        url: "http://url.com",
        likes: 9,
      };
      await createBlog(page, blog);
      const successDiv = page.locator(".success");
      await expect(successDiv).toContainText(
        `a new blog ${blog.title} by ${blog.author} added`
      );
    });

    test("a blog can be updated", async ({ page }) => {
      const blog = {
        title: "Anxios parents are one who need help",
        author: "new york time",
        url: "http://url.com",
        likes: 9,
      };
      await createBlog(page, blog);

      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();
      const successDiv = page.locator(".success");
      await expect(successDiv).toContainText(
        `You liked the blog such as ${blog.title}`
      );
    });

    test("a blog can be deleted only by its creator", async ({
      page,
      request,
    }) => {
      const blogUser = {
        title: "Anxios parents are one who need help",
        author: "new york time",
        url: "http://url.com",
        likes: 9,
      };

      await request.post("/api/users", {
        data: {
          name: "user2",
          username: "user2",
          password: "salainen",
        },
      });
      page.on("dialog", async (dialog) => {
        console.log(`dialog: ${dialog.message()}`);
        await dialog.accept();
      });

      await page.getByRole("button", { name: "logout" }).click();
      await loginWith(page, "user2", "salainen");
      await createBlog(page, blogUser);
      await page.getByRole("button", { name: "logout" }).click();
      await loginWith(page, "root", "salainen");

      await page.getByRole("button", { name: "view" }).nth(0).click();
      await page.getByRole("button", { name: "remove" }).click();

      const errorDiv = page.locator(".error");
      await expect(errorDiv).toContainText(
        "An error occurred while trying to delete data"
      );

      await page.getByRole("button", { name: "logout" }).click();

      await loginWith(page, "user2", "salainen");

      await page.getByRole("button", { name: "view" }).nth(0).click();
      await page.getByRole("button", { name: "remove" }).click();

      const successDiv = page.locator(".success");
      await expect(successDiv).toContainText(`Blog has been deleted`);
    });

    test("the first blog is the one with the most likes", async ({ page }) => {
      for (const blog of blogs) {
        await createBlog(page, blog);
      }
      const blogToBeFirst = blogs[1];

      await page.getByRole("button", { name: "view" }).nth(1).click();
      await page.getByRole("button", { name: "like" }).click();

      const successDiv = page.locator(".success");
      await expect(successDiv).toContainText(
        `You liked the blog such as ${blogToBeFirst.title}`
      );

      const blogDiv = page.locator(".cardBlog").nth(0);
      await expect(blogDiv).toContainText(
        `${blogToBeFirst.title} ${blogToBeFirst.author}`
      );
    });
  });
});
