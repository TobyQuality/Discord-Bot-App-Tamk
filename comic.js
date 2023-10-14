const url = "https://c.xkcd.com/random/comic/";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

async function getComic() {
  const response = await fetch(url);
  let comicUrl = response.url;

  const comicPage = await fetch(comicUrl);
  const html = await comicPage.text();

  const dom = new JSDOM(html);
  let myContent = dom.window.document.querySelector("#comic img").src;

  return myContent;
}

getComic().then((data) => console.log(data));
