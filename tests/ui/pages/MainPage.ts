import { Page, Locator, FrameLocator } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class MainPage {
  readonly page: Page;
  readonly logo: Locator;
  readonly catalogLink: Locator;
  readonly searchInput: Locator;
  readonly searchFrame: FrameLocator;
  readonly autoMarketLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator(".onliner_logo");
    this.catalogLink = page.locator(".b-main-navigation__item:first-child");
    this.searchInput = page.locator(".fast-search__input");
    this.searchFrame = page.frameLocator("#fast-search-modal iframe");
    this.autoMarketLink = page.locator(
      ".b-main-navigation__item:nth-of-type(3)"
    );
  }

  async navigate() {
    await this.page.goto(process.env.ONLINER_BASE_URL || "");
  }

  async returnToMainViaLogo() {
    await this.logo.click();
    await this.page.waitForURL(process.env.ONLINER_BASE_URL || "");
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    await this.searchInput.press("Enter");
  }

  async clickCatalog() {
    await this.catalogLink.click();
  }

  getCategoryTitleByName(name: string) {
    return this.searchFrame
      .locator(".category__title")
      .filter({ hasText: name });
  }

  async clickAutoMarket() {
    await this.autoMarketLink.click();
  }
}
