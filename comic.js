/**
 * Import necessary modules, fetch is needed to get web responses and jsdom
 * is needed to form HTML Dovument from text file.
 */
const url = "https://c.xkcd.com/random/comic/";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

/**
 *
 * @returns
 */
async function getComic() {
  const response = await fetch(url);
  let comicUrl = response.url;

  const comicPage = await fetch(comicUrl);
  const html = await comicPage.text();

  return await getComicPic(html);
}

/**
 *
 * @param {Promise} comicHtml
 * @returns
 */
async function getComicPic(comicHtml) {
  const dom = new JSDOM(comicHtml);
  let myContent = dom.window.document.querySelector("#comic img").src;

  return myContent;
}

getComic().then((data) => console.log(data));
