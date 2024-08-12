// TODO replace hardcoded values with dynamic vars
// We are hardcoding for now just to get data quickly

export const sqlGetTransactionsByLabel = () => (`
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
    _codes.code_name,
    COALESCE(ARRAY_AGG(
      jsonb_build_object('id', l.label_id, 'name', l.label_name)
    ) FILTER (WHERE l.label_id IS NOT NULL), '{}') labels
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
  LEFT JOIN
    transactions_x_labels x ON (_transactions.transaction_id = x.transaction_id)
  LEFT JOIN
    labels l ON (x.label_id = l.label_id)
  WHERE
    _codes.code_id = 54 AND l.label_id = 69 AND date_year = '2019'
  GROUP BY
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
      _codes.code_name,
      l.label_id
  ORDER BY
    _years.year_name,
    l.label_id,
    _transactions.amount DESC;
`);
