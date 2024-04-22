import { MouseEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectCode } from "../../features/codesSlice";
import { getTransactionsByCode } from "../../features/activeDataSlice";
import { AppDispatch } from "../../app/store";
import "./codes.scss";
import { Code } from "../../types/interface";



export const Codes = () => {
  const codes = useSelector(selectCode);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCode, setSelectedCode] = useState("");

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    if (!(e.currentTarget instanceof HTMLLIElement)) {
      return;
    }
    const { id } = e.currentTarget.dataset;
    if (!id) {
      console.error("No ID found on clicked element.");
      return;
    }
    if (id === selectedCode) {
      setSelectedCode("");
    } else {
      setSelectedCode(id);
      dispatch(getTransactionsByCode({codeId: id}));
    }
  };

  const renderClickedCode = () => {
    const clickedCode = codes.find(x => x.code_id.toString() === selectedCode);
    if (!clickedCode) {
      console.error("The clicked code is not in the database.");
      return;
    }
    return renderCode({
      code_description: clickedCode.code_description,
      code_id: clickedCode.code_id,
      code_name: clickedCode.code_name
    });
  };

  const renderCode = ({
    code_description: description,
    code_id: id,
    code_name: name
  }: Code) => {
    return (
      <li data-id={id} key={id} onClick={handleClick}>
        <div>{name}</div>
        <p>{description}</p>
      </li>
    );
  };

  const _codes = codes.map(code => renderCode({
    code_description: code.code_description,
    code_id: code.code_id,
    code_name: code.code_name
  }));

  return (
    <ul className="codes">
      {
        !selectedCode
        ? _codes
        : renderClickedCode()
      }
    </ul>
  )
}
