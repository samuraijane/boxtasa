import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCode } from "../../features/codesSlice";
import { getTransactionsByCode } from "../../features/activeDataSlice";
import { AppDispatch } from "../../app/store";
import "./codes.scss";

export const Codes = () => {
  const codes = useSelector(selectCode);
  const dispatch = useDispatch<AppDispatch>();

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    if (!(e.currentTarget instanceof HTMLLIElement)) {
      return;
    }
    const { id } = e.currentTarget.dataset;
    if (!id) {
      console.error("No ID found on clicked element.");
      return;
    }
    dispatch(getTransactionsByCode({codeId: id}));
  };

  const _codes = codes.map(code => (
    <li data-id={code.code_id} key={code.code_id} onClick={handleClick}>
      <div>{code.code_name}</div>
      <p>{code.code_description}</p>
    </li>
  ));

  return (
    <ul className="codes">
      {_codes}
    </ul>
  )
}
