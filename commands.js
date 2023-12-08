import "dotenv/config";
import { InstallGlobalCommands } from "./utils.js";

// Command for json db to fetch all messages
const SHOWMESSAGES_COMMAND = {
  name: "showmessages",
  description: "Fetch all messages",
  type: 1,
};

// Command for json db to post a message
const POSTMESSAGE_COMMAND = {
  name: "postmessage",
  description: "Post a message",
  type: 1,
};

// Simple test command
const TEST_COMMAND = {
  name: "test",
  description: "Basic command",
  type: 1,
};

const COMIC_COMMAND = {
  name: "comic",
  description: "Basic command: get a random comic picture from xkcd.com",
  type: 1,
};

const CHUCKNORRIS_COMMAND = {
  name: "chucknorris",
  description: "Get a random Chuck Norris joke",
  type: 1,
};

const STARWARS_COMMAND = {
  name: "starwars",
  description: "Get star wars information",
  type: 1,
};

const ALL_COMMANDS = [
  TEST_COMMAND,
  COMIC_COMMAND,
  POSTMESSAGE_COMMAND,
  SHOWMESSAGES_COMMAND,
  CHUCKNORRIS_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
