import { useSelector } from "react-redux";
import { selectVendor } from "../../features/vendorsSlice";
import "./vendors.scss";

export const Vendors = () => {
  const vendors = useSelector(selectVendor);

  const _vendors = vendors.map(vendor => (
    <li data-id={vendor.vendor_id} key={vendor.vendor_id}>{vendor.vendor_name}</li>
  ));

  return (
    <>
      <ul>{_vendors}</ul>
    </>
  );
};
