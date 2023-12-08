// create an api for getting a random chuck norris joke

const url = "https://api.chucknorris.io/jokes/random";
import { JSDOM } from "jsdom";
import { fetchUrl } from "./utils.js";

async function getChuckNorrisJoke() {
  const response = await fetchUrl(url);
  const joke = await response.json();
  console.log(joke);
  return joke;
}
