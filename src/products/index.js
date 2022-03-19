require('dotenv').config();
const cors = require('cors');
const express = require('express');
const serverless = require('serverless-http');

const app = express();

app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  next();
});

app.use(express.json());

app.get('/products', require('./getProds'));

app.post('/products', require('./createProds'));

app.post('/calculate', require('./calculate'));

app.put('/products/:prodId', require('./updateProds'));

app.use((req, res, next) => {
  return res.status(404).json({
    error: 'Not Found',
  });
});

module.exports.handler = serverless(app);
