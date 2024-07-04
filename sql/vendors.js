export const sqlDeleteVendor = () => (`
  DELETE FROM vendors
  WHERE vendor_id = $1;
`);

export const sqlGetVendors = () => (`
  SELECT vendor_id, vendor_name, (
    SELECT count(*)
    FROM transactions t
    WHERE t.vendor_id = v.vendor_id
  ) as count
  FROM vendors v
  ORDER BY v.vendor_name;
`);

export const sqlPostVendor = () => (`
  INSERT INTO vendors (vendor_name, created_at, updated_at)
  VALUES
    ($1, CURRENT_TIMESTAMP(3), CURRENT_TIMESTAMP(3));  
`);

/*
NOTE

The `ORDER BY` is case sensitive so vendor names that begin with a
lowercase letter will be at the end of the list.
*/