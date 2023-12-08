// create an api for getting a random chuck norris joke

const url = "https://api.chucknorris.io/jokes/random";
import { JSDOM } from "jsdom";
import { fetchUrl } from "./utils.js";

export async function getChuckNorrisJoke() {
  const response = await fetchUrl(url);
  const json = await response.json();
  const joke = json.value;

  return joke;
}
