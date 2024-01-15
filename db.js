import dotenv from "dotenv";
import pg from "pg";
import { sqlGetTransactions } from "./sql/sql.js";

dotenv.config();

const { Pool } = pg;

const {
  CONNECTION_STRING: cs,
  DB_HOST: host,
  DB_NAME: database,
  DB_PORT: port,
  DB_USER: user,
  NODE_ENV: env,
} = process.env;

const config = env === "prod" ? { connectionString: cs } : { database, host, port, user };

const pool = new Pool(config);

const getTransactions = (req, res) => {
  pool.query(`${sqlGetTransactions} ORDER BY _transactions.transaction_id;`, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const postCodeToTransaction = async (req, res) => {
  const { codeName, transactionId } = req.body;
  const query = await pool.query(`SELECT code_id FROM codes WHERE code_name like '${codeName}';`);
  const codeId = query.rows[0].code_id;

  // TODO handle possible errors
  await pool.query(`UPDATE transactions SET code_id = ${codeId} WHERE transaction_id = ${transactionId};`);
  const updated = await pool.query(`${sqlGetTransactions} WHERE transaction_id = ${transactionId};`);
  res.status(200).json({ message: "success", updated: updated.rows[0]});
};

export default {
  getTransactions,
  postCodeToTransaction
};
