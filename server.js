import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express, { json } from "express";
import { dirname, resolve } from 'path';
import { fileURLToPath } from "url";
import authRouter from "./api/auth/auth.js";
import db from "./db.js";
import { checkAuth } from "./middleware/middleware.js";

dotenv.config();

// This allows us to continue to use `__dirname` even though we are using es5 modules
const __dirname = dirname(fileURLToPath(import.meta.url));

const server = express();

const { NODE_ENV, PORT } = process.env;

server.use(json());
server.use(express.static(`${__dirname}/react-ui/build`));
server.use(cookieParser());

server.use('/api/auth', authRouter);

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

server.get('/environment', checkAuth, (req, res) => {
  res.json({
    "env": NODE_ENV
  })
});

server.get('/heartbeat', (req, res) => {
  res.json({
    "is": "working"
  })
});

server.get("/api/auth/verify", checkAuth, (req, res) => {
  res.json({ isAuth: req.isAuth });
});

server.get('/api/transactions', db.getTransactions);
server.post('/api/transactions', db.postCodeToTransaction);

// delegate client-side routing to the client
server.get('*', (req, res) => {
  res.sendFile(resolve(`${__dirname}/react-ui/build/index.html`));
});

server.listen(process.env.PORT || PORT, () => {
  console.log(`The server is listening at port ${PORT}`);
});
