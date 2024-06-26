import dotenv from "dotenv";
import pg from "pg";
import {
  sqlGetCodes,
  sqlGetTransaction,
  sqlGetTransactions
} from "./sql/index.js";
import { getQueryType, prepResponseDataAfterBulkUpdate } from "./utils/utils.js";

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

const getCodes = (req, res) => {
  pool.query(sqlGetCodes(), (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getTransactions = (req, res) => {
  const { acctId, code, year } = req.query;

  const _acctId = typeof acctId === "undefined" ? null : parseInt(acctId);
  const _code = typeof code === "undefined" ? null : code;
  const _year = typeof year === "undefined" ? null : parseInt(year);

  const queryType = getQueryType([!!acctId, !!code, !!year]);

  pool.query(sqlGetTransactions(queryType), [_acctId, _code, _year], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const postCodesInBulk = async (req, res) => {
  const bulkTransactions = req.body;

  const updateMultipleTransactions = await bulkTransactions.map(async bulkTransaction => {
    const { account, code, transactionId } = bulkTransaction;

    const query = await pool.query(`SELECT code_id FROM codes WHERE code_name like '${code}';`);
    const codeId = query.rows[0].code_id;
  
    // TODO handle possible errors
    await pool.query(`UPDATE ${account} SET code_id = $1 WHERE transaction_id = $2;`, [codeId, transactionId]);
    return await pool.query(sqlGetTransaction(account), [transactionId]);
  });

  Promise.all(updateMultipleTransactions).then((x) => {
    const updated = prepResponseDataAfterBulkUpdate(x);
    res.status(200).json({ message: "success", updated });
  });
};

const postCodeToTransaction = async (req, res) => {
  const { a: account, c: code, t: transactionId } = req.query;

  const query = await pool.query(`SELECT code_id FROM codes WHERE code_name like '${code}';`);
  const codeId = query.rows[0].code_id;

  // TODO handle possible errors
  await pool.query(`UPDATE ${account} SET code_id = $1 WHERE transaction_id = $2;`, [codeId, transactionId]);
  const updated = await pool.query(sqlGetTransaction(account), [transactionId]);
  
  res.status(200).json({ message: "success", updated: updated.rows[0]});
};

export default {
  getCodes,
  getTransactions,
  postCodesInBulk,
  postCodeToTransaction
};
