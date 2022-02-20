require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use(express.json());

app.get("/clients/:clientId", require("./getClient"));

app.post("/clients", require("./createClient"));

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
