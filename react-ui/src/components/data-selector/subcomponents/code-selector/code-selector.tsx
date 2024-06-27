import { useSelector } from "react-redux";
import { selectCode } from "../../../../features/codesSlice";
import { SelectorProps } from "../date-selector/types";
import "./code-selector.scss";

export const CodeSelector = ({ action, selected }: SelectorProps): JSX.Element => {
  const codes = useSelector(selectCode);

  const _codes = codes.map((code) => {
    const { code_id, code_name } = code;

    return (
      <li
        className={`selector-container${parseInt(selected) === code_id ? " selector-container--selected" : ""}`}
        data-id={code_id}
        data-type="codeId"
        key={code.code_id}
        onClick={action}
      >
        {code_name}
      </li>
    )
  });

  return (
    <div className="code-selector">
      <ul className="code-selector__codes">{_codes}</ul>
    </div>
  );
};
