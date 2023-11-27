import express from "express";
import jsonServer from "./jsonServer";

// create an instance of express
const app = express();

// mount json-server on no specific path
app.use(jsonServer);

// create functions to make API calls

const url = "http://localhost:4000/messages";

// create a function to get all posts
export async function getMessages() {
  const res = await axios.get(url);
  return res.data;
}

// create a function to create a new message
export async function createMessage(message) {
  const res = await axios.post(url, message);
  return res.data;
}
