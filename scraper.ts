import puppeteer from "puppeteer";
import { Client } from "whatsapp-web.js";

const url = "https://roobai.com/";
const wait = (msec: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, msec);
  });

const scrap = async (whatsappClient: Client) => {
  const prodArray: string[] = [];
  const browser = await puppeteer.launch();
  console.log("browser launched");
  const page = await browser.newPage();
  await page.goto(url);
  console.log("url loaded");
  while (true) {
    console.log("evaluation started");
    try {
      const res = await page.evaluate(() => {
        console.log('sample query');
        console.log(document.getElementsByClassName("single-products"));
        return Array.from(
          document.getElementsByClassName("single-products")
        ).map((prod) => {
          return {
            title: (
              prod.getElementsByClassName("post-title")[0] as HTMLElement
            ).innerText.replace("₹", ""),
            currentPrice: (
              prod.getElementsByClassName("off-price")[0] as HTMLElement
            ).innerText,
            offerPrice: (
              prod.getElementsByClassName("cur-price")[0] as HTMLElement
            ).innerText,
            discountPercent: Number.parseInt(
              (prod.getElementsByClassName("discount-rb")[0] as HTMLElement)
                .innerText
            ),
            url: (
              (prod.getElementsByClassName("btn-bottom-nav")[0] as HTMLElement)
                .children[1] as HTMLAnchorElement
            ).href,
            imageUrl: (
              prod.getElementsByClassName(
                "img-res-thumb"
              )[0] as HTMLImageElement
            ).src,
          };
        });
      });
      console.log("evaluation done");
      console.log('got response', res);
      res
        .filter((res) => res.discountPercent >= 80||res.title.toLowerCase().includes('mouse')||res.title.toLowerCase().includes('laptop')||res.title.toLowerCase().includes('monitor'))
        .forEach((product) => {
          if (!prodArray.includes(product.title)) {
            prodArray.push(product.title);
            console.log(product);
            console.log('sending whatsapp message')!
            whatsappClient.sendMessage(
              "917200632341@c.us",
              `TITLE: ${product.title}\nOFFER PRICE: ${product.offerPrice}\nMRP PRICE: ${product.currentPrice}\nDISCOUNT: ${product.discountPercent}%\nURL:${product.url}\nIMAGE URL:${product.imageUrl}`
            );
            console.log('message sent')!
          }
        });
      await wait(30000);
      await page.reload();
      console.log("reloaded page");
    } catch (e) {
      console.log(e);
    }
  }
  await browser.close();
};

export default scrap;
