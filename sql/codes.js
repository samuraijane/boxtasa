export const sqlGetCodes = () => (`
  SELECT code_id, code_name, code_description,
    (
      SELECT count(*)
      FROM transactions t
      WHERE t.code_id = c.code_id
    ) as count,
    (
      SELECT sum(t.amount)
      FROM transactions t
      WHERE t.code_id = c.code_id
    ) as total
  FROM codes c
  ORDER BY c.code_name;
`);
