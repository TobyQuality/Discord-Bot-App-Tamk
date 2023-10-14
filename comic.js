const url = "https://c.xkcd.com/random/comic/";
import fetch from "node-fetch";

async function getComic() {
  const response = await fetch(url);
  let comicUrl = response.url;
  console.log(comicUrl);
  const comicPage = await fetch(comicUrl);
  const html = await comicPage.text();
  return html;
}

getComic().then((data) => console.log(data));
