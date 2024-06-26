export const sqlGetAccounts = () => (`
  SELECT
    _accounts.account_id,
    _account_types.account_type_name,
    _accounts.is_active,
    _accounts.acct_no,
    _institutions.short_name
  FROM
    accounts _accounts
  INNER JOIN institutions _institutions USING(institution_id)
  INNER JOIN account_types _account_types USING(account_type_id)
  ORDER BY
    _institutions.short_name,
    _accounts.acct_no
    ASC;
`);
