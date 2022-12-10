import puppeteer from "puppeteer";

export const fetchData = async (pageN: number) => {
  const url = `https://www.sreality.cz/hledani/prodej/byty?strana=${pageN}}`;
  const browser = await puppeteer.launch({
    headless: false,
    userDataDir: "./tmp",
  });
  const page = await browser.newPage();
  await page.setViewport({
    width: 1920,
    height: 1080,
  });
  await page.goto(url);
  const divs = await page.$$("div.property.ng-scope");
  const list: Array<any> = [];

  for (const div of divs) {
    let title: string | undefined | null = "Null";
    let imgs: Array<any> = [];
    let location: string | undefined | null = "Null";

    // titles
    try {
      title = await page.evaluate(
        (el) => el.querySelector(".name")?.textContent,
        div
      );
      // console.log(title);
    } catch (e: any) {
      console.log(e);
    }

    // location
    try {
      location = await page.evaluate(
        (el) => el.querySelector(".locality")?.textContent,
        div
      );
      // console.log(location);
    } catch (e) {
      console.log(e);
    }

    // image urls
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

    if (title != "Null" && location != "Null" && imgs.length != 0) {
      list.push({ title, location, imgs });
    }
  }

  console.log(list.length);
  console.log(list);
};
