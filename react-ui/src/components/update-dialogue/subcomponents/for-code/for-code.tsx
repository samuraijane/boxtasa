import { MouseEventHandler, useState } from "react";
import "./for-code.scss";
import { Code } from "../../../../types/interface";
import { UpdateToggles } from "../../../../types/enum";

interface UpdateByCodeProps {
  filteredCodes: Code[];
  selectedCode: number;
  handleClick: MouseEventHandler;
}

export const ForCode = ({
  filteredCodes,
  selectedCode,
  handleClick
}: UpdateByCodeProps) => {
  const _codes = filteredCodes?.map(code => {
    const {code_description, code_id, code_name} = code;

    return (
      <li
        className={`${selectedCode === code_id ? "for-code__selected-code": ""}`}
        data-id={code_id}
        data-type={UpdateToggles.CODE}
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
