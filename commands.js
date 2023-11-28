import "dotenv/config";
import { getRPSChoices } from "./game.js";
import { capitalize, InstallGlobalCommands } from "./utils.js";

// Get the game choices from game.js
function createCommandChoices() {
  const choices = getRPSChoices();
  const commandChoices = [];

  for (let choice of choices) {
    commandChoices.push({
      name: capitalize(choice),
      value: choice.toLowerCase(),
    });
  }

  return commandChoices;
}

// Command for json db to fetch all messages
const SHOWMESSAGES_COMMAND = {
  name: "shmsgs",
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

// Command containing options
const CHALLENGE_COMMAND = {
  name: "challenge",
  description: "Challenge to a match of rock paper scissors",
  options: [
    {
      type: 3,
      name: "object",
      description: "Pick your object",
      required: true,
      choices: createCommandChoices(),
    },
  ],
  type: 1,
};

const ALL_COMMANDS = [
  TEST_COMMAND,
  CHALLENGE_COMMAND,
  POSTMESSAGE_COMMAND,
  SHOWMESSAGES_COMMAND,
];

InstallGlobalCommands(process.env.APP_ID, ALL_COMMANDS);
