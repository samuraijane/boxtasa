import { getWhere } from "./get-where.js";

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

/**
 * Transactions can be searched with the following optional parameters:
 *   `acctId`, `codeId`, `fixId`, `month`, and/or `year`. If no parameters
 *   are supplied, all transactions in the database will be returned.
 *   Currently, the query is determined by the value of a query type.
 *   While arguably verbose and not entirely DRY, it's what we're going
 *   with for now.
 * @param {string} queryType 
 * @returns 
 */
const sqlGetTransactions = (queryType) => {
  const whereQuery = getWhere(queryType);

  return (`
    ${transactionBaseQuery}
    ${whereQuery}
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
