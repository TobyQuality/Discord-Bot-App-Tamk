const url = "https://c.xkcd.com/random/comic/";
import fetch from "node-fetch";

async function getComic() {
  const response = await fetch(url);
  return response;
}

getComic().then((data) => console.log(data));
