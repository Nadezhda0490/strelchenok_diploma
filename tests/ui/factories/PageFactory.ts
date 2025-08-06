import { chromium, Browser } from "@playwright/test";
import { MainPage } from "../pages/MainPage";
import { CatalogPage } from "../pages/CatalogPage";

export class PageFactory {
  static async getMainPage(): Promise<{
    browser: Browser;
    mainPage: MainPage;
  }> {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    const mainPage = new MainPage(page);
    return { browser, mainPage };
  }

  static async getCatalogPage(): Promise<{
    browser: Browser;
    catalogPage: CatalogPage;
  }> {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();
    const catalogPage = new CatalogPage(page);
    return { browser, catalogPage };
  }
}
