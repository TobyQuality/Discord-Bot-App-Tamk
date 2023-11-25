import axios from "axios";

// create functions to make API calls

// create a function to get all posts
export async function getMessages() {
  const res = await axios.get("http://localhost:3000/api/messages");
  return res.data;
}

// create a function to create a new message
export async function createMessage(message) {
  const res = await axios.post("http://localhost:3000/api/messages", message);
  return res.data;
}
