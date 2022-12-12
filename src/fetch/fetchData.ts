import puppeteer, { Browser, Page } from "puppeteer";
import { createPostsAndImgs } from "../services/postsImgs.service";

/**
 * Opens headless browser, visits page and scrapes title, location and image urls of each available property.
 * With each property scraped a DB insert is made.
 * @param {number} pagesToScrape how many pages should be scraped
 *
 *
 */
export const fetchData = async (pagesToScrape: number) => {
  const url = `https://www.sreality.cz/hledani/prodej/byty?strana=1}`;
  const browser: Browser = await puppeteer.launch({
    // headless: false,
    userDataDir: "./tmp",
  });
  const page: Page = await browser.newPage();
  // await page.setViewport({
  //   width: 1920,
  //   height: 1080,
  // });
  await page.goto(url);
  let isEnd: boolean = false;
  while (!isEnd) {
    // scrape all divs with class "div.property.ng-scope"
    await page.waitForSelector("div.property.ng-scope");
    const divs = await page.$$("div.property.ng-scope");

    for (const div of divs) {
      let title: string | undefined | null = "";
      let imgs: Array<any> = [];
      let location: string | undefined | null = "";

      // scrape titles
      try {
        title = await page.evaluate(
          (el) => el.querySelector(".name")?.textContent,
          div
        );
        // console.log(title);
      } catch (e: any) {
        console.log(e);
      }

      // scrape location
      try {
        location = await page.evaluate(
          (el) => el.querySelector(".locality")?.textContent,
          div
        );
        // console.log(location);
      } catch (e) {
        console.log(e);
      }

      // scrape image urls
      try {
        imgs = await page.evaluate(
          (el) =>
            Array.from(
              el.querySelectorAll("._2vc3VMce92XEJFrv8_jaeN > img"),
              (img) => img.getAttribute("src")
            ),
          div
        );
        // console.log(imgs);
      } catch (e: any) {
        console.log(e);
      }

      // save to DB
      if (
        title != null &&
        typeof title != "undefined" &&
        location != null &&
        typeof location != "undefined" &&
        imgs.length != 0
      ) {
        try {
          await createPostsAndImgs(title, location, imgs);
        } catch (e: any) {
          console.log(e);
        }
      }
    }

    // check current page number
    await page.waitForSelector("a.btn-paging.ng-binding.active");
    const pageNumber = await page.evaluate(() => {
      const el = document.querySelector(
        "a.btn-paging.ng-binding.active"
      )?.textContent;
      return Number(el);
    });
    console.log(pageNumber);
    if (pageNumber === pagesToScrape) {
      isEnd = true;
    }
    // click on next button
    await page.waitForSelector(
      "a.btn-paging-pn.icof.icon-arr-right.paging-next"
    );
    await page.click("a.btn-paging-pn.icof.icon-arr-right.paging-next");
  }

  // close browser
  await browser.close();
};
