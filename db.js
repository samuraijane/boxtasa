const { sqlGetTransactions } = require("./sql/sql");

const Pool = require('pg').Pool;

const {
  DB_HOST: host,
  DB_NAME: database,
  DB_PORT: port,
  DB_USER: user
} = process.env;

const pool = new Pool({ database, host, port, user });

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

module.exports = {
  getTransactions,
  postCodeToTransaction
};
