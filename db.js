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
  pool.query(sqlGetTransactions, (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

module.exports = {
  getTransactions
};
