import { test, expect, Browser } from "@playwright/test";
import { BrowserSingleton } from "../core/BrowserSingleton";
import { PageFactory } from "../factories/PageFactory";
import { CatalogPage } from "../pages/CatalogPage";

test.describe("Tests for Catalog page", () => {
  let browser: Browser;

  test.beforeAll(async () => {
    browser = await BrowserSingleton.getInstance();
  });

  test.afterAll(async () => {
    await BrowserSingleton.close();
  });

  test("should display the selected category title", async () => {
    const catalogPage = await PageFactory.getCatalogPage(browser);
    await catalogPage.navigate();
    await catalogPage.selectCategory("Красота и спорт");

    const selectedCategoryHeader = catalogPage.getCategoryHeader();

    await expect(selectedCategoryHeader).toBeVisible();
    await expect(selectedCategoryHeader).toHaveText("Красота и спорт");
  });

  test("should open the selected category section", async () => {
    const catalogPage = await PageFactory.getCatalogPage(browser);
    await catalogPage.navigate();
    await catalogPage.selectCategory("Красота и спорт");
    await catalogPage.selectCategorySection("Здоровье");

    const categorySectionHeader = catalogPage.getCategorySectionHeader();

    await expect(categorySectionHeader).toBeVisible();
    await expect(categorySectionHeader).toHaveText("Здоровье");
    await expect(catalogPage.page).toHaveURL(/\/zdorove/);
  });

  test("should open product detail page when clicking on item name", async () => {
    const catalogPage = await PageFactory.getCatalogPage(browser);
    await catalogPage.navigate();
    await catalogPage.selectCategory("Красота и спорт");
    await catalogPage.selectPopularSection("Фены");
    await catalogPage.acceptCookies();
    await catalogPage.openSelectedItem(
      "Фен-стайлер Dreame AirStyle Pro AMF18A Gold Titanium"
    );

    const productTitle = catalogPage.getProductTitle();

    await expect(productTitle).toBeVisible();
    await expect(productTitle).toHaveText(
      "Фен-стайлер Dreame AirStyle Pro AMF18A Gold Titanium"
    );
    await expect(catalogPage.page).toHaveURL(
      /\/hairdryer\/dreame\/airstyleproamf18$/
    );
  });

  test("should display product image when clicking on item name", async () => {
    const catalogPage = await PageFactory.getCatalogPage(browser);
    await catalogPage.navigate();
    await catalogPage.selectCategory("Красота и спорт");
    await catalogPage.selectPopularSection("Фены");
    await catalogPage.acceptCookies();
    await catalogPage.openSelectedItem(
      "Фен-стайлер Dreame AirStyle Pro AMF18A Gold Titanium"
    );

    const productImage = catalogPage.getProductImage();
    await expect(productImage).toBeVisible();
  });

  test("should display product price on the product detail page", async () => {
    const catalogPage = await PageFactory.getCatalogPage(browser);
    await catalogPage.navigate();
    await catalogPage.selectCategory("Красота и спорт");
    await catalogPage.selectPopularSection("Фены");
    await catalogPage.acceptCookies();
    await catalogPage.openSelectedItem(
      "Фен-стайлер Dreame AirStyle Pro AMF18A Gold Titanium"
    );

    const productPrice = catalogPage.getProductPrice();

    await expect(productPrice).toBeVisible();
    await expect(productPrice).toHaveText(/[\d\s]+,?\d*\sр\./);
  });
});
