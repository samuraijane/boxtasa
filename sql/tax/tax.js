export const sqlGetTaxDetails = () => (`
  SELECT
    t.transaction_id,
    a.acct_no,
    a.short_name,
    a.account_type_name,
    t.date_day,
    t.date_month,
    y.year_name,
    t.amount,
    tt.transaction_type_name,
    t.transaction_memo,
    t.note,
    v.vendor_name,
    c.code_name,
    COALESCE(ARRAY_AGG(
      jsonb_build_object('id', l.label_id, 'name', l.label_name)
    )) labels
  FROM
    (
      SELECT
        *
      FROM
        transactions_x_labels
      WHERE
        transaction_id in
          (
            SELECT
              transaction_id
            FROM
              transactions_x_labels
            WHERE
              label_id = ANY($1::integer[])
            GROUP BY
              transaction_id
            HAVING COUNT(*) > $2
          )
      ORDER BY
        label_id
    ) as relevant_transactions
	INNER JOIN
		labels l
		on (relevant_transactions.label_id = l.label_id)
	INNER JOIN
		transactions t
		on (relevant_transactions.transaction_id = t.transaction_id)
  INNER JOIN
    (
      SELECT
        a.account_id,
        a.acct_no,
        i.short_name,
        _account_types.account_type_name
      FROM
        accounts a
      INNER JOIN
        institutions i USING(institution_id)
      INNER JOIN
        account_types _account_types USING(account_type_id)
    ) as a USING(account_id)
  INNER JOIN
    transaction_types tt USING(transaction_type_id)
  INNER JOIN
    codes c USING(code_id)
  INNER JOIN
    vendors v USING(vendor_id)
  INNER JOIN
    years y USING(year_id)
  WHERE
    y.year_name = $3
	GROUP BY
		t.transaction_id,
    a.acct_no,
    a.short_name,
    a.account_type_name,
    y.year_name,
    tt.transaction_type_name,
    v.vendor_name,
    c.code_name
  ORDER BY
    y.year_name,
    t.date_month,
    t.date_day
  ;
`);

export const sqlGetTaxSubtotals = () => (`
  SELECT
    l.label_id,
    SUM(t.amount) as subtotal
  FROM
    (
      SELECT
        *
      FROM
        transactions_x_labels
      WHERE
        transaction_id in
          (
            SELECT
              transaction_id
            FROM
              transactions_x_labels
            WHERE
              label_id = ANY($1::integer[])
            GROUP BY
              transaction_id
            HAVING COUNT(*) > $2
          )
    ) as relevant_transactions
    INNER JOIN
      labels l
      on (relevant_transactions.label_id = l.label_id)
    INNER JOIN
      transactions t
      on (relevant_transactions.transaction_id = t.transaction_id)
    WHERE
      t.date_year = $3
    GROUP BY
      l.label_id
  ;
`);
