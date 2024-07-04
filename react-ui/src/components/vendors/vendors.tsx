import { useSelector } from "react-redux";
import { selectVendor } from "../../features/vendorsSlice";
import "./vendors.scss";

export const Vendors = () => {
  const vendors = useSelector(selectVendor);

  const _vendors = vendors.map(vendor => {
    const { count, vendor_id: id, vendor_name: name } = vendor;

    return (
      <li data-id={id} key={id}>
        <span className="vendors__count">{count}</span>
        <span>{name}</span>
        <div className="vendors__btns">
          <span className="vendors__btn">
            <button>View</button>
          </span>
          <span className="vendors__btn">
            <button>Delete</button>
          </span>
        </div>
      </li>
    );
  });

  return (
    <div className="vendors">
      <h1>Vendors</h1>
      <div className="vendors__col">
        <ul>{_vendors}</ul>
      </div>
    </div>
  );
};
