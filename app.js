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
  DiscordRequest,
  showMessages,
} from "./utils.js";
// import { getShuffledOptions, getResult } from "./game.js";
import getComic from "./comic.js";
import { EmbedBuilder } from "discord.js";
import { getChuckNorrisJoke } from "./chucknorris.js";

// Create an express app
const app = express();
// Get port, or default to 3001
const PORT = process.env.PORT || 3001;
// Parse request body and verifies incoming requests using discord-interactions package
app.use(express.json({ verify: VerifyDiscordRequest(process.env.PUBLIC_KEY) }));

// Store for in-progress games. In production, you'd want to use a DB
// const activeGames = {};

/**
 * Interactions endpoint URL where Discord will send HTTP requests
 */
app.post("/interactions", async function (req, res) {
  // Interaction type and data

  const { type, id, data, options } = req.body;
  console.log("req body: " + req.body);

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
    const { name, options } = data;
    console.log("name: " + name);
    console.log("options: " + options);

    // "test" command
    if (name === "test") {
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
      // Fetches url for random comic picture, and the title of the comic,
      // from xkcd.com
      let comic = await getComic();
      console.log(comic);
      console.log(comic.title);
      console.log(comic.image);

      // Embed the image and title of comic using EmbedBuilder from discord.js.
      // Also embed the original comic url in the footer of the embed.
      // Example https://discordjs.guide/popular-topics/embeds.html#using-the-embed-constructor
      const embed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle(comic.title)
        .setDescription(comic.url)
        .setImage(comic.image)
        .setTimestamp();
    }
    // "chucknorris" command
    if (name === "chucknorris") {
      // Send a message into the channel where command was triggered from
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: getChuckNorrisJoke(),
        },
      });
    }

    // "post message" command
    if (name === "postmessage") {
      console.log(options);
      // Send a message into the channel where command was triggered from
      const messageContent = options ? options[0]?.value : null; // Ensure options exist and access the value property

      try {
        if (!messageContent) {
          throw new Error("No message content provided.");
        }

        const response = await postMessage(messageContent);
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: response.data + " " + getRandomEmoji(),
          },
        });
      } catch (err) {
        console.error(err);
        return res.send({
          type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
          data: {
            content: "Failed to create message: " + err.message,
          },
        });
      }
    }

    // "show messages" command
    if (name === "showmessages") {
      const messages = await showMessages();
      console.log(messages);
      return res.send({
        type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
        data: {
          content: JSON.stringify(messages),
        },
      });
    }
  }
});

app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
