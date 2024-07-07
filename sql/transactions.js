const sqlDeleteTransaction = () => (`
  DELETE FROM transactions
  WHERE transaction_id = $1;
`);

const sqlGetTransaction = () => (`
  SELECT
    _transactions.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactions.date_day,
    _transactions.date_month,
    _years.year_name,
    _transactions.amount,
    _transaction_types.transaction_type_name,
    _transactions.transaction_memo,
    _transactions.note,
    _vendors.vendor_name,
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
  INNER JOIN vendors _vendors USING(vendor_id)
  INNER JOIN years _years USING(year_id)
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
    _years.year_name,
    _transactions.amount,
    _transaction_types.transaction_type_name,
    _transactions.transaction_memo,
    _transactions.note,
    _vendors.vendor_name,
    _codes.code_name
  FROM
    transactions _transactions
  INNER JOIN
    (
      SELECT
        _accounts.account_id,
        _accounts.acct_no,
        _institutions.short_name,
        _account_types.account_type_name
      FROM
        accounts _accounts
      INNER JOIN
        institutions _institutions USING(institution_id)
      INNER JOIN
        account_types _account_types USING(account_type_id)
    ) as _accounts USING(account_id)
  INNER JOIN
    transaction_types _transaction_types USING(transaction_type_id)
  INNER JOIN
    codes _codes USING(code_id)
  INNER JOIN
    vendors _vendors USING(vendor_id)
  INNER JOIN
    years _years USING(year_id)
`;

const transactionOrderBy = `
  ORDER BY
  _years.year_name,
  _transactions.date_month,
  _transactions.date_day,
  _transactions.amount DESC;
`;

// do not filter (e.g. return all transactions in the database)
const sqlGetTransactionsA = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// acctId
const sqlGetTransactionsB = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// acctId, codeId
const sqlGetTransactionsC = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// acctId, codeId, fix
const sqlGetTransactionsD = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// acctId, codeId, fix, month
const sqlGetTransactionsE = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;

// code
const sqlGetTransactionsF = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// code, fix
const sqlGetTransactionsG = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// code, fix, month
const sqlGetTransactionsH = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;

// code, fix, month, year
const sqlGetTransactionsI = `
  WHERE $1::int IS NULL
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// fix
const sqlGetTransactionsJ = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND $5::int IS NULL
`;

// fix, month
const sqlGetTransactionsK = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;

// fix, month, year
const sqlGetTransactionsL = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// acctId, fix, month, year
const sqlGetTransactionsM = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// month
const sqlGetTransactionsN = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND $5::int IS NULL
`;

// month, year
const sqlGetTransactionsO = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// acctId, month, year
const sqlGetTransactionsP = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// acctId, codeId, month, year
const sqlGetTransactionsQ = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND _transactions.date_month = $4
  AND _years.year_name = $5
`;

// year
const sqlGetTransactionsR = `
  WHERE $1::int IS NULL
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND _years.year_name = $5
`;

// acctId, year
const sqlGetTransactionsS = `
  WHERE _accounts.account_id = $1
  AND $2::int IS NULL
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND _years.year_name = $5
`;

// acctId, codeId, year
const sqlGetTransactionsT = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND $3::int IS NULL
  AND $4::int IS NULL
  AND _years.year_name = $5
`;

// acctId, codeId, fix, year
const sqlGetTransactionsU = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND $4::int IS NULL
  AND _years.year_name = $5
`;

// acctId, codeId, fix, month, year
const sqlGetTransactionsV = `
  WHERE _accounts.account_id = $1
  AND _codes.code_id = $2
  AND _transactions.vendor_id = $3
  AND _transactions.date_month = $4
  AND _years.year_name = $5
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
    I: sqlGetTransactionsI,
    J: sqlGetTransactionsJ,
    K: sqlGetTransactionsK,
    L: sqlGetTransactionsL,
    M: sqlGetTransactionsM,
    N: sqlGetTransactionsN,
    O: sqlGetTransactionsO,
    P: sqlGetTransactionsP,
    Q: sqlGetTransactionsQ,
    R: sqlGetTransactionsR,
    S: sqlGetTransactionsS,
    T: sqlGetTransactionsT,
    U: sqlGetTransactionsU,
    V: sqlGetTransactionsV
  };

  return (`
    ${transactionBaseQuery}
    ${dict[queryType]}
    ${transactionOrderBy}
  `)
};

// Currently, user can only update `note` in a transaction
const sqlUpdateTransaction = () => (`
  UPDATE transactions
  SET note = $2
  WHERE transaction_id = $1;
`);

export {
  sqlDeleteTransaction,
  sqlGetTransaction,
  sqlGetTransactions,
  sqlUpdateTransaction
};
