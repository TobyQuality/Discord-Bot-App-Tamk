import "dotenv/config";
import fetch from "node-fetch";
import { verifyKey } from "discord-interactions";
import axios from "axios";

function createId() {
  return Math.random().toString(36).substr(2, 9);
}

export function VerifyDiscordRequest(clientKey) {
  return function (req, res, buf /*encoding*/) {
    const signature = req.get("X-Signature-Ed25519");
    const timestamp = req.get("X-Signature-Timestamp");

    const isValidRequest = verifyKey(buf, signature, timestamp, clientKey);
    if (!isValidRequest) {
      res.status(401).send("Bad request signature");
      throw new Error("Bad request signature");
    }
  };
}

export async function DiscordRequest(endpoint, options) {
  // append endpoint to root API URL
  const url = "https://discord.com/api/v10/" + endpoint;
  // Stringify payloads
  if (options.body) options.body = JSON.stringify(options.body);
  // Use node-fetch to make requests
  const res = await fetch(url, {
    headers: {
      Authorization: `Bot ${process.env.DISCORD_TOKEN}`,
      "Content-Type": "application/json; charset=UTF-8",
      "User-Agent":
        "DiscordBot https://8cc1-88-112-110-204.ngrok-free.app, 1.0.0)",
    },
    ...options,
  });
  // throw API errors
  if (!res.ok) {
    const data = await res.json();
    console.log(res.status);
    throw new Error(JSON.stringify(data));
  }
  // return original response
  return res;
}

export async function InstallGlobalCommands(appId, commands) {
  // API endpoint to overwrite global commands
  const endpoint = `applications/${appId}/commands`;
  console.log("InstallGlobalCommands");

  try {
    // This is calling the bulk overwrite endpoint: https://discord.com/developers/docs/interactions/application-commands#bulk-overwrite-global-application-commands
    const discordRequest = await DiscordRequest(endpoint, {
      method: "PUT",
      body: commands,
    });
    console.log(discordRequest);
  } catch (err) {
    console.error(err);
  }
}

// Simple method that returns a random emoji from list
export function getRandomEmoji() {
  console.log("getRandomEmoji");
  const emojiList = [
    "😭",
    "😄",
    "😌",
    "🤓",
    "😎",
    "😤",
    "🤖",
    "😶‍🌫️",
    "🌏",
    "📸",
    "💿",
    "👋",
    "🌊",
    "✨",
  ];
  return emojiList[Math.floor(Math.random() * emojiList.length)];
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Simple fetch function utilizing node-fetch, that has a check for
 * bad requests.
 *
 * @param {string} url The url to use fetch on.
 * @returns Promise<Response>, the response if fetching was ok.
 */
export async function fetchUrl(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  return response;
}

export async function showMessages() {
  try {
    const response = await axios.get("http://localhost:4000/messages");
    console.log(response.data);
    const data = response.data;
    // show all messages, show as string
    let messages = "";
    for (let i = 0; i < data.length; i++) {
      messages += " " + data[i].message + " ";
    }
    return messages;
  } catch (err) {
    console.error(err);
  }
}

export async function postMessage(message) {
  try {
    const response = await axios.post("http://localhost:4000/messages", {
      message: message,
    });
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}
