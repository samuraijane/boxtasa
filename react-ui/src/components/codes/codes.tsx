import { MouseEvent, useState } from "react";
import { useSelector } from "react-redux";
import { selectCode } from "../../features/codesSlice";
import { TransactionsByCode } from "./subcomponents/transactions-by-code";
import "./codes.scss";

enum CodeCtas {
  VIEW = "view",
}

export const Codes = () => {
  const codes = useSelector(selectCode);

  const [activeCode, setActiveCode] = useState("");

  const _codes = codes.map(code => {
    const { count, total, code_id: id, code_name: name } = code;

    const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLLIElement>) => {
      if (!(e.target instanceof HTMLButtonElement)) {
        return;
      }
      const { id, name, type } = e.target.dataset;
      if (!id) {
        console.error("`id` is undefined");
        return;
      }
      if (type === CodeCtas.VIEW) {
        setActiveCode(name ? name : "")
      }
    }

    return (
      <li key={id} onClick={handleClick}>
        <span className="codes__count">{count}</span>
        <span className="codes__count">{total}</span>
        <span>{name}</span>
        <div className="codes__btns">
          <span className="codes__btn">
            <button data-id={id} data-name={name} data-type={CodeCtas.VIEW}>View</button>
          </span>
        </div>
      </li>
    );
  });

  return (
    <div className="codes">
      <h1>Vendors</h1>
      <div className="codes__columns">
        <div className="codes__col">
          <ul>{_codes}</ul>
        </div>
        {activeCode && (
          <div className="codes__col">
            <TransactionsByCode codeName={activeCode} />
          </div>
        )}
      </div>
    </div>
  );
};
