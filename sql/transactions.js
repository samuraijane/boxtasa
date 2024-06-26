const sqlGetTransaction = () => (`
  SELECT
    _transactions.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactions.date_day,
    _transactions.date_month,
    _transactions.date_year,
    _transactions.amount,
    _transaction_types.transaction_type_name,
    _transactions.transaction_memo,
    _codes.code_name
  FROM
  transactions _transactions
  INNER JOIN (
    SELECT
      _accounts.account_id,
      _accounts.acct_no,
      _institutions.short_name,
      _account_types.account_type_name
    FROM accounts _accounts
    INNER JOIN institutions _institutions USING(institution_id)
    INNER JOIN account_types _account_types USING(account_type_id)
  ) as _accounts USING(account_id)
  INNER JOIN transaction_types _transaction_types USING(transaction_type_id)
  INNER JOIN codes _codes USING(code_id)
  WHERE _transactions.transaction_id = $1;
`);

const transactionBaseQuery = `
  SELECT
  _transactions.transaction_id,
  _accounts.acct_no,
  _accounts.short_name,
  _accounts.account_type_name,
  _transactions.date_day,
  _transactions.date_month,
  _transactions.date_year,
  _transactions.amount,
  _transaction_types.transaction_type_name,
  _transactions.transaction_memo,
  _codes.code_name
  FROM
  transactions _transactions
  INNER JOIN (
  SELECT
    _accounts.account_id,
    _accounts.acct_no,
    _institutions.short_name,
    _account_types.account_type_name
  FROM accounts _accounts
  INNER JOIN institutions _institutions USING(institution_id)
  INNER JOIN account_types _account_types USING(account_type_id)
  ) as _accounts USING(account_id)
  INNER JOIN transaction_types _transaction_types USING(transaction_type_id)
  INNER JOIN codes _codes USING(code_id)
`;

const transactionOrderBy = `
  ORDER BY
  _transactions.date_year,
  _transactions.date_month,
  _transactions.date_day,
  _transactions.amount DESC;
`;

// all transactions
const sqlGetTransactionsA = `
  WHERE $1::int IS NULL
  AND $2::text IS NULL
  AND $3::int IS NULL
`;

// acctId, code, year
const sqlGetTransactionsB = `
  WHERE _accounts.account_id = $1
  AND _codes.code_name = $2
  AND _transactions.date_year = $3
`;

// acctId, code
const sqlGetTransactionsC = `
  WHERE _accounts.account_id = $1
  AND _codes.code_name = $2
  AND $3::int IS NULL
`;

// acctId, year
const sqlGetTransactionsD = `
  WHERE _accounts.account_id = $1
  AND $2::text IS NULL
  AND _transactions.date_year = $3
`;

// acctId
const sqlGetTransactionsE = `
  WHERE _accounts.account_id = $1
  AND $2::text IS NULL
  AND $3::int IS NULL
`;

// code
const sqlGetTransactionsF = `
  WHERE $1::int IS NULL
  AND _codes.code_name = $2
  AND $3::int IS NULL
`;

// code, year
const sqlGetTransactionsG = `
  WHERE $1::int IS NULL
  AND _codes.code_name = $2
  AND _transactions.date_year = $3
`;

// year
const sqlGetTransactionsH = `
  WHERE $1::int IS NULL
  AND $2::text IS NULL
  AND _transactions.date_year = $3
`;

/**
 * Transactions can be searched with the following optional parameters:
 *   `acctId` (number), `code` (string), and/or `year` (number). If no
 *   parameters are supplied, all transactions in the database will be
 *   returned. Currently, the query is determined by the value of a
 *   query type. While arguably verbose and not entirely DRY, it's what
 *   we're going with for now.
 * @param {string} queryType 
 * @returns 
 */
const sqlGetTransactions = (queryType) => {
  const dict = {
    A: sqlGetTransactionsA,
    B: sqlGetTransactionsB,
    C: sqlGetTransactionsC,
    D: sqlGetTransactionsD,
    E: sqlGetTransactionsE,
    F: sqlGetTransactionsF,
    G: sqlGetTransactionsG,
    H: sqlGetTransactionsH,
  };

  return (`
    ${transactionBaseQuery}
    ${dict[queryType]}
    ${transactionOrderBy}
  `)
};

export {
  sqlGetTransaction,
  sqlGetTransactions
};
