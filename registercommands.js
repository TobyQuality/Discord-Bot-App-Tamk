require("dotenv").config();
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const commands = [
  {
    name: "test",
    description: "Basic command",
    type: 1,
  },
  {
    name: "showmessages",
    description: "Fetch all messages",
    type: 1,
  },
  {
    name: "postmessage",
    description: "Post a message",
    type: 1,
  },
];

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });

    console.log("Successfully registered application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();
