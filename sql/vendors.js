export const sqlGetVendors = () => (`
  SELECT vendor_id, vendor_name FROM vendors;
`);
