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
  WHERE _transactions.date_year = $1
  ORDER BY
    _transactions.date_year,
    _transactions.date_month,
    _transactions.date_day,
    _transactions.amount DESC;
`);

const sqlGetAllTransactionsAcrossAllTables = () => (`
  (SELECT
    _transactionsA.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsA.date_day,
    _transactionsA.date_month,
    _transactionsA.date_year,
    _transactionsA.amount,
    _transaction_types.transaction_type_name,
    _transactionsA.transaction_memo,
    _codes.code_name
  FROM
    axos0172 _transactionsA
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
  WHERE _transactionsA.code_id = $1
  ORDER BY
    _transactionsA.date_year,
    _transactionsA.date_month,
    _transactionsA.date_day,
    _transactionsA.amount DESC
  )
  UNION
  (SELECT
    _transactionsB.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsB.date_day,
    _transactionsB.date_month,
    _transactionsB.date_year,
    _transactionsB.amount,
    _transaction_types.transaction_type_name,
    _transactionsB.transaction_memo,
    _codes.code_name
  FROM
    axos1466 _transactionsB
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
  WHERE _transactionsB.code_id = $1
  ORDER BY
    _transactionsB.date_year,
    _transactionsB.date_month,
    _transactionsB.date_day,
    _transactionsB.amount DESC
  )
  UNION
  (SELECT
    _transactionsC.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsC.date_day,
    _transactionsC.date_month,
    _transactionsC.date_year,
    _transactionsC.amount,
    _transaction_types.transaction_type_name,
    _transactionsC.transaction_memo,
    _codes.code_name
  FROM
    axos1474 _transactionsC
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
  WHERE _transactionsC.code_id = $1
  ORDER BY
    _transactionsC.date_year,
    _transactionsC.date_month,
    _transactionsC.date_day,
    _transactionsC.amount DESC
  )
  UNION
  (SELECT
    _transactionsD.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsD.date_day,
    _transactionsD.date_month,
    _transactionsD.date_year,
    _transactionsD.amount,
    _transaction_types.transaction_type_name,
    _transactionsD.transaction_memo,
    _codes.code_name
  FROM
    axos9152 _transactionsD
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
  WHERE _transactionsD.code_id = $1
  ORDER BY
    _transactionsD.date_year,
    _transactionsD.date_month,
    _transactionsD.date_day,
    _transactionsD.amount DESC
  )
  UNION
  (SELECT
    _transactionsE.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsE.date_day,
    _transactionsE.date_month,
    _transactionsE.date_year,
    _transactionsE.amount,
    _transaction_types.transaction_type_name,
    _transactionsE.transaction_memo,
    _codes.code_name
  FROM
    axos9160 _transactionsE
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
  WHERE _transactionsE.code_id = $1
  ORDER BY
    _transactionsE.date_year,
    _transactionsE.date_month,
    _transactionsE.date_day,
    _transactionsE.amount DESC
  )
  UNION
  (SELECT
    _transactionsF.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsF.date_day,
    _transactionsF.date_month,
    _transactionsF.date_year,
    _transactionsF.amount,
    _transaction_types.transaction_type_name,
    _transactionsF.transaction_memo,
    _codes.code_name
  FROM
    capt1130 _transactionsF
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
  WHERE _transactionsF.code_id = $1
  ORDER BY
    _transactionsF.date_year,
    _transactionsF.date_month,
    _transactionsF.date_day,
    _transactionsF.amount DESC
  )
  UNION
  (SELECT
    _transactionsG.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsG.date_day,
    _transactionsG.date_month,
    _transactionsG.date_year,
    _transactionsG.amount,
    _transaction_types.transaction_type_name,
    _transactionsG.transaction_memo,
    _codes.code_name
  FROM
    capt4433 _transactionsG
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
  WHERE _transactionsG.code_id = $1
  ORDER BY
    _transactionsG.date_year,
    _transactionsG.date_month,
    _transactionsG.date_day,
    _transactionsG.amount DESC
  )
  UNION
  (SELECT
    _transactionsH.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsH.date_day,
    _transactionsH.date_month,
    _transactionsH.date_year,
    _transactionsH.amount,
    _transaction_types.transaction_type_name,
    _transactionsH.transaction_memo,
    _codes.code_name
  FROM
    capt4978 _transactionsH
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
  WHERE _transactionsH.code_id = $1
  ORDER BY
    _transactionsH.date_year,
    _transactionsH.date_month,
    _transactionsH.date_day,
    _transactionsH.amount DESC
  )
  UNION
  (SELECT
    _transactionsI.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsI.date_day,
    _transactionsI.date_month,
    _transactionsI.date_year,
    _transactionsI.amount,
    _transaction_types.transaction_type_name,
    _transactionsI.transaction_memo,
    _codes.code_name
  FROM
    capt6710 _transactionsI
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
  WHERE _transactionsI.code_id = $1
  ORDER BY
    _transactionsI.date_year,
    _transactionsI.date_month,
    _transactionsI.date_day,
    _transactionsI.amount DESC
  )
  UNION
  (SELECT
    _transactionsJ.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsJ.date_day,
    _transactionsJ.date_month,
    _transactionsJ.date_year,
    _transactionsJ.amount,
    _transaction_types.transaction_type_name,
    _transactionsJ.transaction_memo,
    _codes.code_name
  FROM
    payp47z4 _transactionsJ
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
  WHERE _transactionsJ.code_id = $1
  ORDER BY
    _transactionsJ.date_year,
    _transactionsJ.date_month,
    _transactionsJ.date_day,
    _transactionsJ.amount DESC
  )
  UNION
  (SELECT
    _transactionsK.transaction_id,
    _accounts.acct_no,
    _accounts.short_name,
    _accounts.account_type_name,
    _transactionsK.date_day,
    _transactionsK.date_month,
    _transactionsK.date_year,
    _transactionsK.amount,
    _transaction_types.transaction_type_name,
    _transactionsK.transaction_memo,
    _codes.code_name
  FROM
    usba2659 _transactionsK
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
  WHERE _transactionsK.code_id = $1
  ORDER BY
    _transactionsK.date_year,
    _transactionsK.date_month,
    _transactionsK.date_day,
    _transactionsK.amount DESC
  );
`);


export {
  sqlGetAllTransactionsAcrossAllTables,
  sqlGetTransaction,
  sqlGetTransactions
};

// TODO determine if it's okay to build a dynamic SQL query by passing in a variable like this.
// Using a parameterized query to rename a column is not allowed so that's why we've done it
// this way.