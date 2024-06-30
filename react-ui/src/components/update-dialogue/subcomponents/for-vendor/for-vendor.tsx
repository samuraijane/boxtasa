import { MouseEvent } from "react";
import { Vendor } from "../../../../types/interface";
import "./for-vendor.scss";

interface UpdateByVendorProps {
  filteredVendors: Vendor[];
  selectedVendor: number;
  setInputValue: Function;
  setSelectedVendor: Function;
}

export const ForVendor = ({
  filteredVendors,
  selectedVendor,
  setInputValue,
  setSelectedVendor
}: UpdateByVendorProps) => {

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const { id, value } = e.currentTarget.dataset;
    if (!id || !value) {
      console.error("A value is missing.") // TODO handle error gracefully
      return;
    }
    setSelectedVendor(id);
    setInputValue(value);
  };

  const _vendors = filteredVendors?.map(vendor => {
    const {vendor_id, vendor_name} = vendor;

    return (
      <li
        className={`${selectedVendor === vendor_id ? "for-code__selected-code": ""}`}
        data-id={vendor_id}
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
