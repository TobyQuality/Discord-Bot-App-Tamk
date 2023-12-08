// create a function for fetching star wars information from the star wars api: https://swapi.dev/api/

import { fetchUrl } from "./utils.js";

const url = "https://swapi.dev/api/";

export async function getStarWarsInfo() {
  try {
    const response = await fetchUrl(url);
    const json = await response.json();
    const info = json;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }

  return info;
}
