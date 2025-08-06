import { test, expect, Browser } from "@playwright/test";
import { PageFactory } from "../factories/PageFactory";
import { MainPage } from "../pages/MainPage";

let browser: Browser;
let mainPage: MainPage;

test.beforeEach(async () => {
  const result = await PageFactory.getMainPage();
  browser = result.browser;
  mainPage = result.mainPage;
});

test.afterEach(async () => {
  await browser.close();
});

test.describe("Tests for Main page", () => {
  test("should return to the Main page when clicking the logo", async () => {
    await mainPage.navigate();
    await mainPage.clickCatalog();
    await mainPage.returnToMainViaLogo();

    await expect(mainPage.page).toHaveURL(process.env.ONLINER_BASE_URL || "");
  });

  test("should search by name", async () => {
    await mainPage.navigate();
    await mainPage.search("Утюги");

    const ironCategory = mainPage.getCategoryTitleByName("Утюги").first();

    await expect(ironCategory).toBeVisible();
    await expect(ironCategory).toContainText("Утюги");
  });

  test("should open catalog", async () => {
    await mainPage.navigate();
    await mainPage.clickCatalog();

    await expect(mainPage.page).toHaveURL(/\/catalog\.onliner\.by\//);
    await expect(mainPage.page).toHaveTitle("Каталог Onlíner");
  });

  test("should open auto market from header menu", async () => {
    await mainPage.navigate();
    await mainPage.clickAutoMarket();

    await expect(mainPage.page).toHaveURL(/\/ab\.onliner\.by\//);
    await expect(mainPage.page).toHaveTitle(/Автобарахолка/);
  });
});
