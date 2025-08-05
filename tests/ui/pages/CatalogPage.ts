import { Page, Locator } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class CatalogPage {
  readonly page: Page;
  readonly categoryLink: Locator;
  readonly categorySectionsLink: Locator;
  readonly popularSectionsLink: Locator;
  readonly selectedItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryLink = page.locator(".catalog-navigation-classifier__item");
    this.categorySectionsLink = page.locator(
      ".catalog-navigation-list__aside-title"
    );
    this.popularSectionsLink = page.locator(
      ".catalog-navigation-list__popular-title"
    );
    this.selectedItem = page.locator(".catalog-form__link_primary-additional");
  }

  async navigate() {
    await this.page.goto(process.env.CATALOG_URL || "");
  }

  async selectCategory(name: string) {
    await this.categoryLink.filter({ hasText: name }).first().click();
  }

  getCategoryHeader() {
    return this.page.locator("div.catalog-navigation-list__aside-title");
  }

  async selectCategorySection(name: string) {
    await this.categorySectionsLink.filter({ hasText: name }).first().click();
  }

  getCategorySectionHeader() {
    return this.page.locator("h1.catalog-form__title");
  }

  async selectPopularSection(name: string) {
    await this.popularSectionsLink.filter({ hasText: name }).first().click();
  }

  async openSelectedItem(name: string) {
    await this.selectedItem.filter({ hasText: name }).first().click();
  }

  getProductTitle() {
    return this.page.locator("h1.catalog-masthead__title");
  }

  getProductImage() {
    return this.page.locator(".offers-description__image");
  }

  getProductPrice() {
    return this.page.locator(
      "a.offers-description__link.offers-description__link_nodecor.js-description-price-link"
    );
  }

  async acceptCookies() {
    const cookieBanner = this.page.locator("#submit-button");
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click();
    }
  }
}
