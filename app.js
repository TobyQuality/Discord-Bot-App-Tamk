import "dotenv/config";
import express from "express";
import {
  InteractionType,
  InteractionResponseType,
  // InteractionResponseFlags,
  // MessageComponentTypes,
  // ButtonStyleTypes,
} from "discord-interactions";
import {
  VerifyDiscordRequest,
  getRandomEmoji,
  // DiscordRequest,
} from "./utils.js";
// import { getShuffledOptions, getResult } from "./game.js";
import getComic from "./comic.js";
import { EmbedBuilder } from "discord.js";

// Create an express app
const app = express();
// Get port, or default to 3000
const PORT = process.env.PORT || 3000;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
// const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data
  // const { type, id, data } = req.body;
  const { type, data } = req.body;

  /**
   * Handle verification requests
   */
  if (type === InteractionType.PING) {
    return res.send({ type: InteractionResponseType.PONG });
  }

  /**
   * Handle slash command requests
   * See https://discord.com/developers/docs/interactions/application-commands#slash-commands
   */
  if (type === InteractionType.APPLICATION_COMMAND) {
    const { name } = data;

    // "test" command
    if (name === "test") {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          // Fetches a random emoji to send from a helper function
          content: "hello world " + getRandomEmoji(),
        },
      });
    }

    /* "comic" command, right now posts link to xkcd.com comic img on channel,
    should implement image posting directly.
    */
    if (name === "comic") {
      let comic = "";
      // Fetches url for random comic picture, and the title of the comic,
      // from xkcd.com
      getComic()
        .then((result) => (comic = result))
        .then((comic) => (comic = comic.json()))
        .catch((err) => (comic = err));
      // console.log(comic); works, prints the img url

      // Embed the image and title of comic using EmbedBuilder from discord.js
      // Example https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor
      const embed = new EmbedBuilder()
        .setTitle(comic.title)
        .setImage(comic.image);
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        embeds: [embed],
      });
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
