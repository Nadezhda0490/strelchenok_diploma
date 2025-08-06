import { test, expect, Browser } from "@playwright/test";
import { PageFactory } from "../factories/PageFactory";
import { CatalogPage } from "../pages/CatalogPage";

let browser: Browser;
let catalogPage: CatalogPage;

test.beforeEach(async () => {
  const result = await PageFactory.getCatalogPage();
  browser = result.browser;
  catalogPage = result.catalogPage;
});

test.afterEach(async () => {
  await browser.close();
});

test.describe("Tests for Catalog page", () => {
  test("should display the selected category title", async () => {
    await catalogPage.navigate();
    await catalogPage.selectCategory("Красота и спорт");

    const selectedCategoryHeader = catalogPage.getCategoryHeader();

    await expect(selectedCategoryHeader).toBeVisible();
    await expect(selectedCategoryHeader).toHaveText("Красота и спорт");
  });

  test("should open the selected category section", async () => {
    await catalogPage.navigate();
    await catalogPage.selectCategory("Красота и спорт");
    await catalogPage.selectCategorySection("Здоровье");

    const categorySectionHeader = catalogPage.getCategorySectionHeader();

    await expect(categorySectionHeader).toBeVisible();
    await expect(categorySectionHeader).toHaveText("Здоровье");
    await expect(catalogPage.page).toHaveURL(/\/zdorove/);
  });

  test("should open product detail page when clicking on item name", async () => {
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
