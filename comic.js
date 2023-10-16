/**
 * Import necessary modules, fetch is needed to get web responses and jsdom
 * is needed to form HTML Dovument from text file.
 */
const url = "https://c.xkcd.com/random/comic/";
import fetch from "node-fetch";
import { JSDOM } from "jsdom";

/**
 * Function to get a random xkcd.com comic. First the function uses constant
 * url to get a random comic url, then it fetches the page of that url and
 * parses the HTML content of the url as plain text. Function then sends the
 * text as a promise object to getComicPic function to format the text,
 * returning the result to calling function.
 *
 * @returns The result of getComicPic as a promise object.
 */
async function getComic() {
  // TODO: make sure the connection and response are valid.
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
