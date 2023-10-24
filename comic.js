/**
 * This module contains functionality to post a webcomic at xkcd.com to a
 * custom Discord server.
 */

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
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    let comicUrl = response.url;

    const comicPage = await fetch(comicUrl);
    if (!comicPage.ok) {
      throw new Error(`HTTP error! Status: ${comicPage.status}`);
    }

    const html = await comicPage.text();

    return await getComicPic(html);
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

/**
 * Function gets a String promise object and makes a HTML document out of it
 * if possible. Since the given string should contain source html of a xkcd
 * comic page, we can query the HTML document for the picture of the comic,
 * returnin it as a string promise object.
 *
 * @param {Promise} comicHtml, contains String
 * @returns The comic image source address.
 */
async function getComicPic(comicHtml) {
  const dom = new JSDOM(comicHtml);
  let myContent =
    "https:" + dom.window.document.querySelector("#comic img").src;

  return myContent;
}

/**
 * Testing
 */
getComic()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
