require("dotenv").config();
const cors = require("cors");
const express = require("express");
const serverless = require("serverless-http");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/clients/:clientId", require("./getClient"));

app.get("/clients", require("./getAllClient"));

app.post("/clients", require("./createClient"));

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Ruta no encontrada",
  });
});

module.exports.handler = serverless(app);
