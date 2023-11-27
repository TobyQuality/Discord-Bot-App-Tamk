import express from "express";
import jsonServer from "json-server";

// Create an instance of Express
const app = express();

// Create an instance of json-server
const jsonApp = jsonServer.create();

// Use the router from json-server
const jsonRouter = jsonServer.router("db.json");

// Set default middlewares (logger, static, cors, etc.)
jsonApp.use(jsonServer.defaults());

// Use the router middleware
jsonApp.use(jsonRouter);

// Mount the json-server app on a specific path in the main Express app
app.use("/api", jsonApp);

// Start the Express server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Main app listening on port ${PORT}`);
});
