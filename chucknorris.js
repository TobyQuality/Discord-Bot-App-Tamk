// create an api for getting a random chuck norris joke

const url = "https://api.chucknorris.io/jokes/random";
import { fetchUrl } from "./utils.js";

/**
 * Fetches a random Chuck Norris joke from the API
 * @returns {string} joke
 * @see https://api.chucknorris.io/jokes/random
 */

export async function getChuckNorrisJoke() {
  const response = await fetchUrl(url);
  const json = await response.json();
  const joke = json.value;

  return joke;
}
