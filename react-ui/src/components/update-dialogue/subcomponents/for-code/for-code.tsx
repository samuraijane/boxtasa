import { MouseEvent, useState } from "react";
import "./for-code.scss";
import { Code } from "../../../../types/interface";

interface UpdateByCodeProps {
  filteredCodes: Code[];
  selectedCode: number;
  setInputValue: Function;
  setSelectedCode: Function;
}

export const ForCode = ({ filteredCodes, selectedCode, setInputValue, setSelectedCode }: UpdateByCodeProps) => {

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    const { id, value } = e.currentTarget.dataset;
    if (!id || !value) {
      console.error("A value is missing.") // TODO handle error gracefully
      return;
    }
    setSelectedCode(id);
    setInputValue(value);
  };

  const _codes = filteredCodes?.map(code => {
    const {code_description, code_id, code_name} = code;

    return (
      <li
        className={`${selectedCode === code_id ? "for-code__selected-code": ""}`}
        data-id={code_id}
        data-value={code_name}
        key={code_id}
        onClick={handleClick}
      >
        <span>{code_name}</span><span>{code_description}</span>
      </li>
    );
  });

  return (
    <div className="for-code">
      <ul className="for-code__codes">
        {_codes}
      </ul>
    </div>
  );
};
