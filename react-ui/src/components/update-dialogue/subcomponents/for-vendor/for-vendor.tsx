import { MouseEventHandler } from "react";
import { Vendor } from "../../../../types/interface";
import "./for-vendor.scss";
import { UpdateToggles } from "../../../../types/enum";

interface UpdateByVendorProps {
  filteredVendors: Vendor[];
  selectedVendor: number;
  handleClick: MouseEventHandler;
}

export const ForVendor = ({
  filteredVendors,
  selectedVendor,
  handleClick,
}: UpdateByVendorProps) => {

  const _vendors = filteredVendors?.map(vendor => {
    const {vendor_id, vendor_name} = vendor;

    return (
      <li
        className={`${selectedVendor === vendor_id ? "for-code__selected-code": ""}`}
        data-id={vendor_id}
        data-type={UpdateToggles.VENDOR}
        data-value={vendor_name}
        key={vendor_id}
        onClick={handleClick}
      >
        <span>{vendor_name}</span>
      </li>
    );
  });

  return (
    <div className="for-vendor">
      {_vendors}
    </div>
  );
};
