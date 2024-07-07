import dotenv from "dotenv";
import pg from "pg";
import {
  sqlDeleteTransaction,
  sqlDeleteVendor,
  sqlGetAccounts,
  sqlGetCodes,
  sqlGetTransaction,
  sqlGetTransactions,
  sqlGetVendors,
  sqlPostVendor,
  sqlUpdateTransaction
} from "./sql/index.js";
import {
  getQueryParamValue,
  getQueryType,
  prepResponseDataAfterBulkUpdate
} from "./utils/utils.js";

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

const deleteTransaction = (req, res) => {
  const { id } = req.params;
  pool.query(sqlDeleteTransaction(), [id], (err, results) => {
    if (err) {
      throw err;
    } else {
      getTransactions(req, res);
    }
  });
};

const deleteVendor = (req, res) => {
  const { id } = req.params;
  pool.query(sqlDeleteVendor(), [id], (err, results) => {
    if (err) {
      throw err;
    } else {
      getVendors(req, res);
    }
  });
};

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
  const { acctId, codeId, fixId, month, year } = req.query;

  // TODO consider refactoring to allow an array of values and get all values in one call
  const _acctId = getQueryParamValue(acctId);
  const _codeId = getQueryParamValue(codeId);
  const _fixId = getQueryParamValue(fixId);
  const _month = getQueryParamValue(month);
  const _year = getQueryParamValue(year);

  const queryType = getQueryType([!!_acctId, !!_codeId, !!_fixId, !!_month, !!_year]);

  pool.query(sqlGetTransactions(queryType), [_acctId, _codeId, _fixId, _month, _year], (err, results) => {
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

const getYears = (req, res) => {
  pool.query(`SELECT year_id, year_name FROM years ORDER BY year_name;`, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const updateTransaction = (req, res) => {
  const { id } = req.params;
  const { note } = req.body;

  let _note = note;

  if (!id) {
    throw new Error("No value for `id` is provided.");
  }

  if (!note) {
    _note = null; // ensures that queries where note is null does not return a false positive (an empty string is not null)
  }

  pool.query(sqlUpdateTransaction(), [id, _note], async (err, results) => {
    if (err) {
      throw err;
    }
    const updated = await pool.query(sqlGetTransaction(), [id]);
    await res.status(200).json(updated.rows[0]);
  });
};

const postBulk = async (req, res) => {
  const bulkTransactions = req.body;

  const updateMultipleTransactions = await bulkTransactions.map(async bulkTransaction => {
    const { codeId, transactionId, vendorId } = bulkTransaction;

    // TODO handle possible errors

    if (codeId && vendorId) {
      throw new Error("Only `codeId` or `vendorId` is allowed but both were provided in the request.")
    }

    if (codeId) {
      await pool.query(`UPDATE transactions SET code_id = $1 WHERE transaction_id = $2;`, [codeId, transactionId]);
      return await pool.query(sqlGetTransaction(), [transactionId]);
    }
  
    if (vendorId) {
      await pool.query(`UPDATE transactions SET vendor_id = $1 WHERE transaction_id = $2;`, [vendorId, transactionId]);
      return await pool.query(sqlGetTransaction(), [transactionId]);
    }
  });

  Promise.all(updateMultipleTransactions).then((x) => {
    const updated = prepResponseDataAfterBulkUpdate(x);
    res.status(200).json({ message: "success", updated });
  });
};

const postTransaction = async (req, res) => {
  const { c: codeId, t: transactionId, v: vendorId } = req.query;

  // TODO handle possible errors

  if (codeId && vendorId) {
    throw new Error("Only `codeId` or `vendorId` is allowed but both were provided in the request.")
  }

  let updated;

  if (codeId) {
    await pool.query(`UPDATE transactions SET code_id = $1 WHERE transaction_id = $2;`, [codeId, transactionId]);
    updated = await pool.query(sqlGetTransaction(), [transactionId]);
  }

  if (vendorId) {
    await pool.query(`UPDATE transactions SET vendor_id = $1 WHERE transaction_id = $2;`, [vendorId, transactionId]);
    updated = await pool.query(sqlGetTransaction(), [transactionId]);
  }
  
  res.status(200).json({ message: "success", updated: updated.rows[0]});
};

const postVendor = async (req, res) => {
  const { vendorName } = req.body;

  if (!vendorName) {
    throw new Error("No value for `vendorName` is provided.")
  }

  const query = await pool.query(`SELECT vendor_id FROM vendors WHERE vendor_name = $1`, [vendorName]);
  const match = query && query.rows[0];

  if (match) {
    res.status(200).json({
      isSuccess: false,
      message: "This vendor already exists."
    });
  } else {
    pool.query(sqlPostVendor(), [vendorName], (err, results) => {
      if (err) {
        throw err;
      }
      // TODO investigate if there is a better way to do this; also consider returning `isSuccess` in the response; see similar in `deleteVendor`
      getVendors(req, res);
    });
  }
};

export default {
  deleteTransaction,
  deleteVendor,
  getAccounts,
  getCodes,
  getTransaction,
  getTransactions,
  getYears,
  getVendors,
  postBulk,
  postTransaction,
  postVendor,
  updateTransaction
};
