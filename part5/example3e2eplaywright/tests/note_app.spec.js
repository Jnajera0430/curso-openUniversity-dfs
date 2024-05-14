const { test, expect, describe, beforeEach } = require("@playwright/test");
const { loginWith, createNote } = require("./helper");

describe("Note app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("/api/tests/reset");
    await request.post("/api/users", {
      data: {
        name: "Superuser",
        username: "root",
        password: "salainen",
      },
    });
    await page.goto("/");
  });

  test("front page can be opened", async ({ page }) => {
    const locator = await page.getByText("Notes");
    await expect(locator).toBeVisible();

    await expect(
      page.getByText(
        "Note app, Department of Computer Science, University of Helsinki 2024"
      )
    ).toBeVisible();
  });

  test("login form can be opened", async ({ page }) => {
    await loginWith(page, "root", "salainen");

    await expect(page.getByText("Superuser logged in")).toBeVisible();
  });

  test("login fails with wrong password", async ({ page }) => {
    await page.getByRole("button", { name: "log in" }).click();
    await page.getByTestId("username").fill("mluukkai");
    await page.getByTestId("password").fill("wrong");
    await page.getByRole("button", { name: "login" }).click();

    const errorDiv = await page.locator(".error");
    await expect(errorDiv).toHaveCSS("border-style", "solid");
    await expect(errorDiv).toHaveCSS("color", "rgb(255, 0, 0)");
    await expect(errorDiv).toContainText("Wrong credentials");

    await expect(
      page.getByText("Matti Luukkainen logged in")
    ).not.toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root", "salainen");
    });

    test("a new note can be created", async ({ page }) => {
      await createNote(page, "a note created by playwright", true);
      await expect(
        page.getByText("a note created by playwright")
      ).toBeVisible();
    });
  });

  describe("and a note exists", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root", "salainen");
      await createNote(page, "another note by playwright", true);
      await createNote(page, "second note", true);
      await createNote(page, "third note", true);
    });

    test("importance can be changed", async ({ page }) => {
      const otherNoteText = await page.getByText("second note");
      const otherNoteElement = await otherNoteText.locator("..");
      await page.getByRole("button", { name: "show all" }).click();
      await otherNoteElement
        .getByRole("button", { name: "make not important" })
        .click();
      await expect(otherNoteElement.getByText("make important")).toBeVisible();
    });
  });

  describe("and several notes exists", () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, "root", "salainen");
      await createNote(page, "first note", true);
      await createNote(page, "second note", true);
    });

    test("one of those can be made nonimportant", async ({ page }) => {
      await page.pause();
      const otherNoteText = await page.getByText("first note");
      const otherNoteElement = await otherNoteText.locator("..");

      await otherNoteElement
        .getByRole("button", { name: "make not important" })
        .click();
      await page.getByRole("button", { name: "show all" }).click();
      await expect(otherNoteElement.getByText("make important")).toBeVisible();
    });
  });
});
