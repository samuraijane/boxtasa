export const sqlGetVendors = () => (`
  SELECT vendor_id, vendor_name, (
    SELECT count(*)
    FROM transactions t
    WHERE t.vendor_id = v.vendor_id
  ) as count
  FROM vendors v
  ORDER BY v.vendor_name;
`);

/*
NOTE

The `ORDER BY` is case sensitive so vendor names that begin with a
lowercase letter will be at the end of the list.
*/