// create an api for getting a random chuck norris joke

/**
 * Fetches a random Chuck Norris joke from the API
 * @returns {string} joke
 * @see https://api.chucknorris.io/jokes/random
 */

const url = "https://api.chucknorris.io/jokes/random";
import { JSDOM } from "jsdom";
import { fetchUrl } from "./utils.js";

export async function getChuckNorrisJoke() {
  const response = await fetchUrl(url);
  const json = await response.json();
  const joke = json.value;

  return joke;
}
