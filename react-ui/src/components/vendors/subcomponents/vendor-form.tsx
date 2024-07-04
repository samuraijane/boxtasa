import { ChangeEvent, MouseEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../app/store";
import { postVendor } from "../../../features/vendorsSlice";
import "./vendor-form.scss";

export const VendorForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [vendorName, setVendorName] = useState("");

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(postVendor(vendorName));
  };

  const handleChange = (e: ChangeEvent) => {
    if (!(e.target instanceof HTMLInputElement)) {
      return;
    }
    const { value } = e.target;
    setVendorName(value);
  };

  return (
    <form className="vendor-form" onSubmit={handleSubmit}>
      <input onChange={handleChange} type="text" value={vendorName} />
      <button>Add vendor</button>
    </form>
  );
};
