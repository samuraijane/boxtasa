export const sqlGetLabels = () => (`
  SELECT
    label_id AS id,
    label_name AS name
  FROM labels l
  ORDER BY l.label_name;
`);
