const Discord = require("discord.js");
const axios = require("axios");

const client = new Discord.Client();
const prefix = "/"; // Command prefix

// Function to fetch messages from db.json
async function showMessages() {
  try {
    const response = await axios.get("http://localhost:4000/messages"); // Replace with your JSON server URL
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return "Error fetching messages";
  }
}

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});
