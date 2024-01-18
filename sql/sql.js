const sqlGetTransactions = (acctName) => (`
  SELECT
    _transactions.transaction_id,
    _account_types.account_type_name,
    _institutions.short_name,
    _accounts.acct_no,
    _transactions.date_day,
    _transactions.date_month,
    _transactions.date_year,
    _transactions.amount,
    _transaction_types.transaction_type_name,
    _transactions.transaction_memo,
    _codes.code_name
  FROM
    accounts _accounts
  INNER JOIN institutions _institutions USING(institution_id)
  INNER JOIN account_types _account_types USING(account_type_id)
  INNER JOIN ${acctName} _transactions USING(account_id)
  INNER JOIN transaction_types _transaction_types USING(transaction_type_id)
  INNER JOIN codes _codes USING(code_id)
  WHERE _transactions.date_year = $1
  ORDER BY _transactions.transaction_id;
`);

export {
  sqlGetTransactions
};

// TODO determine if it's okay to build a dynamic SQL query by passing in a variable like this.
// Using a parameterized query to rename a column is not allowed so that's why we've done it
// this way.