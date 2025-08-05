import { test, expect, Browser } from "@playwright/test";
import { BrowserSingleton } from "../core/BrowserSingleton";
import { PageFactory } from "../factories/PageFactory";

test.describe("Tests for Main page", () => {
  let browser: Browser;

  test.beforeAll(async () => {
    browser = await BrowserSingleton.getInstance();
  });

  test.afterAll(async () => {
    await BrowserSingleton.close();
  });

  test("should return to the Main page when clicking the logo", async () => {
    const mainPage = await PageFactory.getMainPage(browser);
    await mainPage.navigate();
    await mainPage.clickCatalog();
    await mainPage.returnToMainViaLogo();

    await expect(mainPage.page).toHaveURL(process.env.ONLINER_BASE_URL || "");
  });

  test("should search by name", async () => {
    const mainPage = await PageFactory.getMainPage(browser);
    await mainPage.navigate();
    await mainPage.search("Утюги");

    const ironCategory = mainPage.getCategoryTitleByName("Утюги").first();

    await expect(ironCategory).toBeVisible();
    await expect(ironCategory).toContainText("Утюги");
  });

  test("should open catalog", async () => {
    const mainPage = await PageFactory.getMainPage(browser);
    await mainPage.navigate();
    await mainPage.clickCatalog();

    await expect(mainPage.page).toHaveURL(/\/catalog\.onliner\.by\//);
    await expect(mainPage.page).toHaveTitle("Каталог Onlíner");
  });

  test("should open auto market from header menu", async () => {
    const mainPage = await PageFactory.getMainPage(browser);
    await mainPage.navigate();
    await mainPage.clickAutoMarket();

    await expect(mainPage.page).toHaveURL(/\/ab\.onliner\.by\//);
    await expect(mainPage.page).toHaveTitle(/Автобарахолка/);
  });
});
