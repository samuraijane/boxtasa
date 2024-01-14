const sqlGetTransactions = `
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
    _transactions.transaction_memo
  FROM
    accounts _accounts
  INNER JOIN institutions _institutions USING(institution_id)
  INNER JOIN account_types _account_types USING(account_type_id)
  INNER JOIN transactions _transactions USING(account_id)
  INNER JOIN transaction_types _transaction_types USING(transaction_type_id)
  ORDER BY _institutions.long_name;
`;

module.exports = {
  sqlGetTransactions
};
