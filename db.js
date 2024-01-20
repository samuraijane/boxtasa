import dotenv from "dotenv";
import pg from "pg";
import { sqlGetTransaction, sqlGetTransactions } from "./sql/sql.js";

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

export const pool = new Pool(config);

const getTransactions = (req, res) => {
  const { acctName, year } = req.query;

  pool.query(sqlGetTransactions(acctName), [year], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const postCodeToTransaction = async (req, res) => {
  const { a: account, c: code, t: transactionId } = req.query;

  const query = await pool.query(`SELECT code_ref FROM codes WHERE code_name like '${code}';`);
  const codeId = query.rows[0].code_ref;

  // TODO handle possible errors
  await pool.query(`UPDATE ${account} SET code_ref = $1 WHERE transaction_id = $2;`, [codeId, transactionId]);
  const updated = await pool.query(sqlGetTransaction(account), [transactionId]);
  
  res.status(200).json({ message: "success", updated: updated.rows[0]});
};

export default {
  getTransactions,
  postCodeToTransaction
};
