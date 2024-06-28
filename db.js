import dotenv from "dotenv";
import pg from "pg";
import {
  sqlGetAccounts,
  sqlGetCodes,
  sqlGetTransaction,
  sqlGetTransactions,
  sqlGetVendors
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

const getAccounts = (req, res) => {
  pool.query(sqlGetAccounts(), (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getCodes = (req, res) => {
  pool.query(sqlGetCodes(), (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getTransaction = (req, res) => {
  const { id } = req.params;

  pool.query(sqlGetTransaction(), [id], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getTransactions = (req, res) => {
  const { acctId, codeId, year } = req.query;

  const _acctId = (typeof acctId === "undefined" || !acctId) ? null : parseInt(acctId);
  const _codeId = (typeof codeId === "undefined" || !codeId) ? null : parseInt(codeId);
  const _year = (typeof year === "undefined" || !year) ? null : parseInt(year);

  const queryType = getQueryType([!!acctId, !!codeId, !!year]);

  pool.query(sqlGetTransactions(queryType), [_acctId, _codeId, _year], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getVendors = (req, res) => {
  pool.query(sqlGetVendors(), (err, results) => {
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
  const { c: codeId, t: transactionId } = req.query;

  // TODO handle possible errors
  await pool.query(`UPDATE transactions SET code_id = $1 WHERE transaction_id = $2;`, [codeId, transactionId]);
  const updated = await pool.query(sqlGetTransaction(), [transactionId]);
  
  res.status(200).json({ message: "success", updated: updated.rows[0]});
};

export default {
  getAccounts,
  getCodes,
  getTransaction,
  getTransactions,
  getVendors,
  postCodesInBulk,
  postCodeToTransaction
};
