import db from "./db.js";
import dotenv from "dotenv";
import express, { json } from "express";
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

// This allows us to continue to use `__dirname` even though we are using es5 modules
const __dirname = dirname(fileURLToPath(import.meta.url));

const server = express();

const { NODE_ENV, PORT } = process.env;

server.use(json());
server.use(express.static(resolve(`${__dirname}/react-ui/build`)));

// CORS
server.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE');
  // TODO find out what this means
  if (req.method === 'OPTIONS') {
    return res.send(204);
  }
  next();
});

server.get('/environment', (req, res) => {
  res.json({
    "env": NODE_ENV
  })
});

server.get('/heartbeat', (req, res) => {
  res.json({
    "is": "working"
  })
});

server.get('/transactions', db.getTransactions);
server.post('/transactions', db.postCodeToTransaction);

// delegate client-side routing to the client
server.get('*', (req, res) => {
  res.sendFile(resolve(`${__dirname}/react-ui/build/index.html)`));
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`The server is listening at port ${PORT}`);
});
