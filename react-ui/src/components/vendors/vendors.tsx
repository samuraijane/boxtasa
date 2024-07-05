import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../app/store";
import { deleteVendor, selectVendor } from "../../features/vendorsSlice";
import { VendorForm } from "./subcomponents/vendor-form";
import { TransactionsByVendor } from "./subcomponents/transactions-by-vendor";
import "./vendors.scss";

enum VendorCtas {
  DELETE = "delete",
  VIEW = "view",
}

export const Vendors = () => {
  const dispatch = useDispatch<AppDispatch>();
  const vendors = useSelector(selectVendor);

  const [activeVendor, setActiveVendor] = useState("");

  const _vendors = vendors.map(vendor => {
    const { count, total, vendor_id: id, vendor_name: name } = vendor;

    const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLLIElement>) => {
      if (!(e.target instanceof HTMLButtonElement)) {
        return;
      }
      const { id, name, type } = e.target.dataset;
      if (!id) {
        console.error("`id` is undefined");
        return;
      }
      if (type === VendorCtas.DELETE) {
        dispatch(deleteVendor(id))
        return;
      }
      if (type === VendorCtas.VIEW) {
        setActiveVendor(name ? name : "")
      }
    }

    return (
      <li key={id} onClick={handleClick}>
        <span className="vendors__count">{count}</span>
        <span className="vendors__count">{total}</span>
        <span>{name}</span>
        <div className="vendors__btns">
          <span className="vendors__btn">
            <button data-id={id} data-name={name} data-type={VendorCtas.VIEW}>View</button>
          </span>
          <span className="vendors__btn">
            <button data-id={id} data-type={VendorCtas.DELETE}>Delete</button>
          </span>
        </div>
      </li>
    );
  });

  return (
    <div className="vendors">
      <h1>Vendors</h1>
      <VendorForm />
      <div className="vendors__columns">
        <div className="vendors__col">
          <ul>{_vendors}</ul>
        </div>
        {activeVendor && (
          <div className="vendors__col">
            <TransactionsByVendor vendorName={activeVendor} />
          </div>
        )}
      </div>
    </div>
  );
};
