const sqlGetTransaction = (acctName) => (`
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
  ${acctName} _transactions
  INNER JOIN (
    SELECT
      _accounts.account_ref,
      _accounts.acct_no,
      _institutions.short_name,
      _account_types.account_type_name
    FROM accounts _accounts
    INNER JOIN institutions _institutions USING(institution_ref)
    INNER JOIN account_types _account_types USING(account_type_ref)
  ) as _accounts USING(account_ref)
  INNER JOIN transaction_types _transaction_types USING(transaction_type_ref)
  INNER JOIN codes _codes USING(code_ref)
  WHERE _transactions.transaction_id = $1;
`);

const sqlGetTransactions = (acctName) => (`
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
    ${acctName} _transactions
  INNER JOIN (
    SELECT
      _accounts.account_ref,
      _accounts.acct_no,
      _institutions.short_name,
      _account_types.account_type_name
    FROM accounts _accounts
    INNER JOIN institutions _institutions USING(institution_ref)
    INNER JOIN account_types _account_types USING(account_type_ref)
  ) as _accounts USING(account_ref)
  INNER JOIN transaction_types _transaction_types USING(transaction_type_ref)
  INNER JOIN codes _codes USING(code_ref)
  WHERE _transactions.date_year = $1
  ORDER BY
    _transactions.date_year,
    _transactions.date_month,
    _transactions.date_day,
    _transactions.amount DESC;
`);

export {
  sqlGetTransaction,
  sqlGetTransactions
};

// TODO determine if it's okay to build a dynamic SQL query by passing in a variable like this.
// Using a parameterized query to rename a column is not allowed so that's why we've done it
// this way.